---
title: Welcome to my blog
date: 2026-06-14
tags: meta
summary: A short note on what this blog is for, and how the site is built.
---

This is an example post. Replace it with your own writing, or delete it
once you've added real posts.

## How this works

Every file in the `posts/` folder that ends in `.md` becomes a page under
`blog/`. Each post starts with a small block of metadata:

```
---
title: My post title
date: 2026-06-14
tags: math, notes
summary: One sentence shown on the blog index.
---
```

After the `---` you can write normally in Markdown: **bold**, *italic*,
`inline code`, [links](https://example.com), lists, blockquotes, and code
blocks all work.

> A blockquote looks like this.

- First point
- Second point
- Third point

When you push your changes, GitHub Actions runs `node build.js`
automatically, which regenerates this page and updates the blog index.
