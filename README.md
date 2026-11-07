
## How to add publications

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

## Write a blog post

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

