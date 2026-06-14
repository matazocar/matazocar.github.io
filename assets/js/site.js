/* ============================================================
   SITE CONFIGURATION
   Edit this file to update your name, tagline, and social links
   everywhere on the site at once.
   ============================================================ */

const SITE = {
  name: "Your Name",
  initials: "Y", // shown before the dot in the nav logo, e.g. "Y."
  role: "PhD Candidate in Mathematics",
  affiliation: "Your University, Department of Mathematics",
  email: "you@example.edu",
  // Leave any of these as "" to hide the button automatically.
  links: {
    github: "https://github.com/yourusername",
    arxiv: "https://arxiv.org/a/yourname",
    googleScholar: "https://scholar.google.com/citations?user=XXXXXXX",
    orcid: "https://orcid.org/0000-0000-0000-0000",
    linkedin: ""
  }
};

function renderSocialLinks(containerId) {
  const el = document.getElementById(containerId);
  if (!el) return;
  const items = [];
  if (SITE.email) items.push(`<a href="mailto:${SITE.email}">Email</a>`);
  if (SITE.links.github) items.push(`<a href="${SITE.links.github}" target="_blank" rel="noopener">GitHub</a>`);
  if (SITE.links.googleScholar) items.push(`<a href="${SITE.links.googleScholar}" target="_blank" rel="noopener">Google Scholar</a>`);
  if (SITE.links.arxiv) items.push(`<a href="${SITE.links.arxiv}" target="_blank" rel="noopener">arXiv</a>`);
  if (SITE.links.orcid) items.push(`<a href="${SITE.links.orcid}" target="_blank" rel="noopener">ORCID</a>`);
  if (SITE.links.linkedin) items.push(`<a href="${SITE.links.linkedin}" target="_blank" rel="noopener">LinkedIn</a>`);
  el.innerHTML = items.join("");
}

document.addEventListener("DOMContentLoaded", () => renderSocialLinks("social-links"));
