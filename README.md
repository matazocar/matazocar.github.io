# Your Name — academic site

A simple, self-contained academic homepage: a landing page, a
publications list (with PDF / arXiv / journal-version buttons), a CV
page, a blog, and a free-form "notes" section. No framework, no build
tools required to run it — just HTML, CSS, and a little JavaScript,
plus one small Node script for the blog.

## 1. Put this on GitHub Pages

1. Create a new repository on GitHub (it can be named anything, but
   `yourusername.github.io` gives you the shortest URL).
2. Upload **all the files in this folder** to that repository
   (keep the folder structure — `assets/`, `posts/`, `.github/`, etc.).
3. In the repository, go to **Settings → Pages**.
4. Under "Build and deployment", set **Source** to **GitHub Actions**.
5. Push to the `main` branch (or just wait — the included workflow runs
   automatically). After a minute or two, your site will be live at:
   - `https://yourusername.github.io/` (if the repo is named
     `yourusername.github.io`), or
   - `https://yourusername.github.io/repository-name/` otherwise.

That's it — every time you push changes, the site rebuilds and
redeploys automatically.

## 2. Customize your info

Almost everything personal lives in a few places:

- **`assets/js/site.js`** — your name, role, affiliation, email, and
  social links (GitHub, Google Scholar, arXiv, ORCID, LinkedIn). These
  are pulled into the homepage automatically.
- **`index.html`** — homepage text (the short bio under your name) and
  the profile photo (`assets/img/profile.jpg`, optional — if it's
  missing the photo is just hidden).
- **`cv.html`** — education, positions, talks, awards. Plain HTML
  blocks you can copy/paste/edit; also links to a downloadable
  `assets/papers/cv.pdf` if you want one.
- **`notes.html`** — a free-form section for anything else (reading
  lists, software, expository notes, etc.).
- Every page's `<title>` tag and footer `© 2026 Your Name` — update
  these too (simple find-and-replace across files works fine).

To rename the site/repo title, also update `<a class="site-title">`
in every HTML page (the `> Your Name` text in the top-left).

## 3. Add publications

Edit **`assets/js/publications.js`**. Each entry is one object:

```js
{
  title: "Title of the paper",
  authors: "You, A. Collaborator",
  venue: "Journal or conference name (leave empty string if unpublished)",
  year: "2026",
  status: "preprint",   // or "published"
  abstract: "Optional one-sentence summary.",
  links: {
    pdf: "assets/papers/your-paper.pdf",
    arxiv: "https://arxiv.org/abs/XXXX.XXXXX",
    journal: "https://doi.org/...",
    code: ""             // leave empty to hide the button
  }
}
```

Add new entries at the **top** of the array (most recent first). Any
link field left as `""` simply doesn't show a button. Drop the
corresponding PDF into `assets/papers/`.

## 4. Write a blog post

1. Add a new file to `posts/`, e.g. `posts/my-new-post.md`, starting
   with a frontmatter block:

   ```
   ---
   title: My new post
   date: 2026-07-01
   tags: math, notes
   summary: One sentence shown on the blog index page.
   ---

   Your post content in Markdown goes here. Supports headings,
   **bold**, *italic*, `code`, links, lists, blockquotes, images,
   and fenced code blocks.
   ```

2. Push to GitHub. The workflow runs `node build.js`, which:
   - converts `posts/my-new-post.md` → `blog/my-new-post.html`
   - adds it to the list on `blog.html` (newest first, by `date`)

To preview locally before pushing, run `node build.js` (requires only
Node.js, no `npm install`) and open `index.html` in a browser.

## 5. Add more sections

To add a whole new page (e.g. "Teaching"):

1. Duplicate `notes.html`, rename it (e.g. `teaching.html`), and edit
   its content.
2. Add `<a href="teaching.html">Teaching</a>` to the `<nav>` in
   **every** HTML page (including the post template at
   `posts/_template.html`, if you want it to appear on blog posts too).
3. Optionally add a card for it in the "Explore" grid on `index.html`.

## File structure

```
index.html              Homepage
publications.html       Publications list
cv.html                  CV
blog.html                Blog index (auto-updated by build.js)
notes.html               Free-form extra section
build.js                 Generates blog/*.html from posts/*.md
posts/                   Write new blog posts here (Markdown)
blog/                    Generated blog post pages (don't edit by hand)
assets/css/style.css     All styling
assets/js/site.js        Your name/links — edit this
assets/js/publications.js  Your papers — edit this
assets/js/render-publications.js  (don't need to edit)
assets/img/              Profile photo etc.
assets/papers/           PDFs (CV, papers, notes)
.github/workflows/build.yml  Auto-build + deploy to GitHub Pages
```
