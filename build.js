#!/usr/bin/env node
/**
 * build.js
 * --------
 * Converts every Markdown file in posts/ (except files starting
 * with "_") into a static HTML page under blog/, and rewrites
 * blog.html to list all posts (newest first).
 *
 * Each Markdown file should start with a small frontmatter block:
 *
 *   ---
 *   title: My post title
 *   date: 2026-06-14
 *   tags: math, notes
 *   summary: One sentence shown on the blog index.
 *   ---
 *
 *   Rest of the post in Markdown...
 *
 * Run with:  node build.js
 * (Also run automatically by .github/workflows/build.yml on push.)
 */

const fs = require("fs");
const path = require("path");

const ROOT = __dirname;
const POSTS_DIR = path.join(ROOT, "posts");
const BLOG_DIR = path.join(ROOT, "blog");
const TEMPLATE_PATH = path.join(POSTS_DIR, "_template.html");
const BLOG_INDEX_PATH = path.join(ROOT, "blog.html");

// ---------------------------------------------------------------
// Minimal Markdown -> HTML converter (no dependencies)
// Supports: headings, paragraphs, bold/italic, inline code, code
// blocks, links, images, blockquotes, unordered/ordered lists, hr.
// This intentionally covers common cases for a personal blog
// without requiring npm install.
// ---------------------------------------------------------------
function mdToHtml(md) {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let inCodeBlock = false;
  let codeLang = "";
  let codeBuffer = [];
  let inMathBlock = false;
  let mathBuffer = [];
  let listType = null; // 'ul' | 'ol' | null
  let paragraphBuffer = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length) {
      html.push(`<p>${inlineMd(paragraphBuffer.join(" "))}</p>`);
      paragraphBuffer = [];
    }
  };

  const closeList = () => {
    if (listType) {
      html.push(`</${listType}>`);
      listType = null;
    }
  };

  for (let raw of lines) {
    const line = raw;

    // Display math block: $$ ... $$ (possibly spanning multiple lines)
    if (inMathBlock) {
      mathBuffer.push(line);
      if (trimmedEndsMath(line)) {
        inMathBlock = false;
        const raw = mathBuffer.join("\n");
        const inner = raw.replace(/^\s*\$\$/, "").replace(/\$\$\s*$/, "");
        html.push(`<div class="math-display">$$${inner}$$</div>`);
        mathBuffer = [];
      }
      continue;
    }
    if (line.trim().startsWith("$$")) {
      flushParagraph();
      closeList();
      const trimmedLine = line.trim();
      // Single-line $$...$$
      if (trimmedLine.length > 2 && trimmedLine.endsWith("$$") && trimmedLine !== "$$") {
        html.push(`<div class="math-display">${trimmedLine}</div>`);
        continue;
      }
      inMathBlock = true;
      mathBuffer = [trimmedLine];
      continue;
    }

    // Code blocks
    if (line.trim().startsWith("```")) {
      if (!inCodeBlock) {
        flushParagraph();
        closeList();
        inCodeBlock = true;
        codeLang = line.trim().slice(3).trim();
        codeBuffer = [];
      } else {
        inCodeBlock = false;
        html.push(
          `<pre><code${codeLang ? ` class="language-${escapeHtml(codeLang)}"` : ""}>${escapeHtml(
            codeBuffer.join("\n")
          )}</code></pre>`
        );
      }
      continue;
    }
    if (inCodeBlock) {
      codeBuffer.push(line);
      continue;
    }

    const trimmed = line.trim();

    // Blank line
    if (trimmed === "") {
      flushParagraph();
      closeList();
      continue;
    }

    // Horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      flushParagraph();
      closeList();
      html.push("<hr>");
      continue;
    }

    // Headings
    const headingMatch = trimmed.match(/^(#{1,6})\s+(.*)$/);
    if (headingMatch) {
      flushParagraph();
      closeList();
      const level = headingMatch[1].length;
      html.push(`<h${level}>${inlineMd(headingMatch[2])}</h${level}>`);
      continue;
    }

    // Blockquote
    if (trimmed.startsWith(">")) {
      flushParagraph();
      closeList();
      html.push(`<blockquote>${inlineMd(trimmed.replace(/^>\s?/, ""))}</blockquote>`);
      continue;
    }

    // Unordered list
    const ulMatch = trimmed.match(/^[-*+]\s+(.*)$/);
    if (ulMatch) {
      flushParagraph();
      if (listType !== "ul") {
        closeList();
        html.push("<ul>");
        listType = "ul";
      }
      html.push(`<li>${inlineMd(ulMatch[1])}</li>`);
      continue;
    }

    // Ordered list
    const olMatch = trimmed.match(/^\d+\.\s+(.*)$/);
    if (olMatch) {
      flushParagraph();
      if (listType !== "ol") {
        closeList();
        html.push("<ol>");
        listType = "ol";
      }
      html.push(`<li>${inlineMd(olMatch[1])}</li>`);
      continue;
    }

    // Image on its own line
    const imgMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imgMatch) {
      flushParagraph();
      closeList();
      html.push(`<img src="${escapeAttr(imgMatch[2])}" alt="${escapeAttr(imgMatch[1])}">`);
      continue;
    }

    // Otherwise: paragraph text (accumulate)
    closeList();
    paragraphBuffer.push(trimmed);
  }

  flushParagraph();
  closeList();
  if (inCodeBlock && codeBuffer.length) {
    html.push(`<pre><code>${escapeHtml(codeBuffer.join("\n"))}</code></pre>`);
  }

  return html.join("\n");
}

function trimmedEndsMath(line) {
  const t = line.trim();
  return t.endsWith("$$");
}

function inlineMd(text) {
  // Protect inline math $...$ from markdown transforms (bold/italic/code use
  // _ and * which are common inside LaTeX, e.g. subscripts and \frac{a}{b}).
  const mathSpans = [];
  let protectedText = text.replace(/\$([^$\n]+)\$/g, (m, inner) => {
    mathSpans.push(inner);
    return `\u0000MATH${mathSpans.length - 1}\u0000`;
  });

  let out = escapeHtml(protectedText);
  // Inline code (do this before bold/italic so contents aren't mangled)
  out = out.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
  // Bold
  out = out.replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
  out = out.replace(/__([^_]+)__/g, "<strong>$1</strong>");
  // Italic
  out = out.replace(/\*([^*]+)\*/g, "<em>$1</em>");
  out = out.replace(/_([^_]+)_/g, "<em>$1</em>");
  // Links
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
    const external = /^https?:\/\//.test(url);
    return `<a href="${escapeAttr(url)}"${external ? ' target="_blank" rel="noopener"' : ""}>${label}</a>`;
  });

  // Restore inline math, unescaped (MathJax needs raw LaTeX)
  out = out.replace(/\u0000MATH(\d+)\u0000/g, (_, i) => `$${mathSpans[Number(i)]}$`);

  return out;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function escapeAttr(s) {
  return escapeHtml(s).replace(/"/g, "&quot;");
}

// ---------------------------------------------------------------
// Frontmatter parsing
// ---------------------------------------------------------------
function parseFrontmatter(raw) {
  raw = raw.replace(/\r\n/g, "\n");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { meta: {}, body: raw };
  }
  const meta = {};
  for (const line of match[1].split("\n")) {
    const m = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (m) meta[m[1].trim()] = m[2].trim();
  }
  return { meta, body: match[2] };
}

function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}

// ---------------------------------------------------------------
// Main build
// ---------------------------------------------------------------
function build() {
  if (!fs.existsSync(BLOG_DIR)) fs.mkdirSync(BLOG_DIR, { recursive: true });

  const template = fs.readFileSync(TEMPLATE_PATH, "utf8");

  const files = fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".md") && !f.startsWith("_"));

  console.log(files);
  
  const posts = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), "utf8");
    const { meta, body } = parseFrontmatter(raw);

    const slug = (meta.slug || path.basename(file, ".md")).trim();
    const title = meta.title || slug;
    const date = meta.date || "";
    const tags = (meta.tags || "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);
    const summary = meta.summary || "";

    const contentHtml = mdToHtml(body);

    const tagsHtml = tags.length
      ? `<span class="meta-sep">&middot;</span><span class="post-tags">${tags
          .map((t) => `<span class="tag">${escapeHtml(t)}</span>`)
          .join("")}</span>`
      : "";

    const page = template
      .replace(/{{TITLE}}/g, () => escapeHtml(title))
      .replace(/{{DATE}}/g, () => formatDate(date))
      .replace(/{{TAGS}}/g, () => tagsHtml)
      .replace(/{{CONTENT}}/g, () => contentHtml);

    fs.writeFileSync(path.join(BLOG_DIR, `${slug}.html`), page);

    posts.push({ slug, title, date, summary });
  }

  // Sort newest first
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

  // Build post-list HTML
  const listHtml = posts
    .map(
      (p) => `      <a class="post-item" href="blog/${p.slug}.html">
        <span class="post-date">${formatDate(p.date)}</span>
        <h3>${escapeHtml(p.title)}</h3>
        ${p.summary ? `<p>${escapeHtml(p.summary)}</p>` : ""}
      </a>`
    )
    .join("\n");

  // Inject into blog.html
  let blogIndex = fs.readFileSync(BLOG_INDEX_PATH, "utf8");
  const placeholderRegex = /<!--POST_LIST-->[\s\S]*?(?=\n {4}<\/div>)|<!--POST_LIST-->/;

  if (blogIndex.includes("<!--POST_LIST-->")) {
    blogIndex = blogIndex.replace(
      /<!--POST_LIST-->[\s\S]*?(?=\n {4}<\/div>\s*<\/main>)/,
      `<!--POST_LIST-->\n${listHtml}`
    );
  }

  fs.writeFileSync(BLOG_INDEX_PATH, blogIndex);

  console.log(`Built ${posts.length} post(s).`);
}

build();
