/* Renders the PUBLICATIONS array (assets/js/publications.js) into the
   #pub-list container as a citation-style list.

   On the live site build.js already writes this list into
   publications.html, so this script only fills the list when it is
   empty (for example when the page is opened locally without building).
   The same formatting lives in build.js: change both together. */

function formatPublication(pub, i) {
  const end = /[.?!]$/.test(pub.title) ? "" : ".";
  const where = pub.status === "published" && pub.venue ? pub.venue : "Preprint";

  const l = pub.links || {};
  const links = [];
  if (l.pdf) links.push(`[<a href="${l.pdf}" target="_blank" rel="noopener">pdf</a>]`);
  if (l.arxiv) links.push(`[<a href="${l.arxiv}" target="_blank" rel="noopener">arXiv</a>]`);
  if (l.journal) links.push(`[<a href="${l.journal}" target="_blank" rel="noopener">journal</a>]`);
  if (l.code) links.push(`[<a href="${l.code}" target="_blank" rel="noopener">code</a>]`);
  if (pub.abstract) {
    links.push(`[<button class="link-button" onclick="togglePub(${i})" aria-expanded="false" id="pub-toggle-${i}">abstract</button>]`);
  }

  return `      <article class="pub" id="pub-${i}">
        <p class="cite"><span class="authors">${pub.authors}${/\.$/.test(pub.authors) ? "" : "."}</span> <span class="title">${pub.title}${end}</span> ${where}, ${pub.year}.</p>
        ${links.length ? `<p class="pub-links">${links.join(" ")}</p>` : ""}
        ${pub.abstract ? `<p class="abstract">${pub.abstract}</p>` : ""}
      </article>`;
}

function renderPublications() {
  const container = document.getElementById("pub-list");
  if (!container || container.querySelector(".pub")) return;

  if (typeof PUBLICATIONS === "undefined" || PUBLICATIONS.length === 0) {
    container.innerHTML = "<p>No publications listed yet.</p>";
    return;
  }

  container.innerHTML = PUBLICATIONS.map(formatPublication).join("\n");

  // Typeset any $...$ in titles that were added after MathJax ran.
  if (window.MathJax && MathJax.typesetPromise) MathJax.typesetPromise([container]);
}

function togglePub(i) {
  const el = document.getElementById(`pub-${i}`);
  const btn = document.getElementById(`pub-toggle-${i}`);
  const expanded = el.classList.toggle("expanded");
  btn.setAttribute("aria-expanded", expanded ? "true" : "false");
  btn.textContent = expanded ? "hide abstract" : "abstract";
}

document.addEventListener("DOMContentLoaded", renderPublications);
