/* Theme (light/dark) handling.
   - Applies the saved theme (or system preference) as early as
     possible to avoid a flash of the wrong theme.
   - Wires up any element with id="theme-toggle" to flip themes
     and persist the choice in localStorage. */

(function () {
  var stored = null;
  try {
    stored = localStorage.getItem("theme");
  } catch (e) {
    /* localStorage unavailable (e.g. privacy mode) — fall back to system */
  }

  var theme = stored;
  if (!theme) {
    theme = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  document.documentElement.setAttribute("data-theme", theme);

  document.addEventListener("DOMContentLoaded", function () {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    btn.addEventListener("click", function () {
      var current = document.documentElement.getAttribute("data-theme");
      var next = current === "dark" ? "light" : "dark";
      document.documentElement.setAttribute("data-theme", next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* ignore */
      }
    });
  });
})();
