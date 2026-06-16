/* ============================================================
   PUBLICATIONS DATA
   ------------------------------------------------------------
   Add one object per paper. Fields:
     - title       (string, required)
     - authors     (string, required) — write exactly as you want
                    it displayed, e.g. "A. Researcher, B. Coauthor"
     - venue       (string, optional) — journal/conference name.
                    Leave as "" if not yet published.
     - year        (string/number, required)
     - status      ("preprint" | "published")
     - abstract    (string, optional) — short summary, shown when
                    the reader clicks "Abstract"
     - links: {
         pdf    -> path to a PDF you've placed in assets/papers/
                   (or any external URL), or "" to hide the button
         arxiv  -> full arXiv URL, or "" to hide
         journal-> full URL to the published version, or "" to hide
         code   -> link to a code repository, or "" to hide
       }

   New entries should be added at the TOP of the array so the
   most recent paper appears first.
   ============================================================ */

const PUBLICATIONS = [
  {
     
    title: "Canonical Ramsey theorem for graphs with clean intersections",
    authors: "M.A., A. Basu, Chr. Reiher, V. Rödl, G. Santos, M. Schacht",
    venue: "",
    year: "2026",
    status: "preprint",
    abstract:
      "Canonical Ramsey theorem with minimal intersection between copies of the desired graph",
    links: {
      pdf: "assets/papers/canonical-clean.pdf",
      arxiv: "https://arxiv.org/abs/2606.16955",
      journal: "",
      code: ""
    }
  },
  
  {
    title: "The density of graphs with no $l$-path connecting equal-degree vertices: a short proof",
    authors: "Y. Attwa, M.A., S. Boyadzhiyska, T. Pierron, A. Taraz",
    venue: "",
    year: "2026",
    status: "preprint",
    abstract:
      "Asymptotical bound on the edge density needed to guarantee that two vertices of the same degree are connected by a path of a fixed length",
    links: {
      pdf: "assets/papers/same-degree-l-path.pdf",
      arxiv: "https://arxiv.org/abs/2605.09798",
      journal: "",
      code: ""
    }
  },
   {
    title: "Canonical Ramsey numbers for partite hypergraphs",
    authors: "M.A., G. Santos, M. Schacht",
    venue: "",
    year: "2024",
    status: "preprint",
    abstract:
      "We show that canonical Ramsey numbers for partite hypergraphs grow single exponentially for any fixed uniformity",
    links: {
      pdf: "assets/papers/canonical-partite.pdf",
      arxiv: "https://arxiv.org/abs/2411.16218",
      journal: "",
      code: ""
    }
   }

 
];
