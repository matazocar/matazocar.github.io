/* Renders the PUBLICATIONS array (assets/js/publications.js)
   into the #pub-list container on the publications page. */

function renderPublications() {
  const container = document.getElementById("pub-list");
  if (!container) return;

  if (!PUBLICATIONS || PUBLICATIONS.length === 0) {
    container.innerHTML =
      '<p class="lede">No publications listed yet — check back soon.</p>';
    return;
  }

  container.innerHTML = PUBLICATIONS.map((pub, i) => {
    const statusLabel = pub.status === "published" ? "Published" : "Preprint";
    const tagClass = pub.status === "published" ? "published" : "preprint";

    const pubLinks = pub.links || {};
    const links = [];
    if (pubLinks.pdf) links.push(`<a href="${pubLinks.pdf}" target="_blank" rel="noopener">PDF</a>`);
    if (pubLinks.arxiv) links.push(`<a href="${pubLinks.arxiv}" target="_blank" rel="noopener">arXiv</a>`);
    if (pubLinks.journal) links.push(`<a href="${pubLinks.journal}" target="_blank" rel="noopener">Journal version</a>`);
    if (pubLinks.code) links.push(`<a href="${pubLinks.code}" target="_blank" rel="noopener">Code</a>`);
    if (pub.abstract) links.push(`<button onclick="togglePub(${i})" aria-expanded="false" id="pub-toggle-${i}">Abstract</button>`);

    return `
      <article class="pub" id="pub-${i}">
        <div class="pub-head">
          <span class="pub-label"><span class="tag ${tagClass}">${statusLabel}</span></span>
          <span class="pub-year">${pub.year}</span>
        </div>
        <h3>${pub.title}</h3>
        <p class="authors">${pub.authors}</p>
        ${pub.venue ? `<p class="venue">${pub.venue}</p>` : ""}
        ${pub.abstract ? `<p class="abstract">${pub.abstract}</p>` : ""}
        ${links.length ? `<div class="pub-links">${links.join("")}</div>` : ""}
      </article>
    `;
  }).join("");
}

function togglePub(i) {
  const el = document.getElementById(`pub-${i}`);
  const btn = document.getElementById(`pub-toggle-${i}`);
  const expanded = el.classList.toggle("expanded");
  btn.setAttribute("aria-expanded", expanded ? "true" : "false");
  btn.textContent = expanded ? "Hide abstract" : "Abstract";
}

document.addEventListener("DOMContentLoaded", renderPublications);
