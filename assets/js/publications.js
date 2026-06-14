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
    title: "Example: A General Framework for Understanding Things",
    authors: "Your Name, A. Collaborator",
    venue: "",
    year: "2026",
    status: "preprint",
    abstract:
      "A short, one- or two-sentence summary of the paper's main contribution. This text is optional and only shown if the reader expands the abstract.",
    links: {
      pdf: "assets/papers/example-paper.pdf",
      arxiv: "https://arxiv.org/abs/0000.00000",
      journal: "",
      code: ""
    }
  },
  {
    title: "Example: An Earlier Result on a Related Problem",
    authors: "Your Name, B. Coauthor, C. Coauthor",
    venue: "Proceedings of the Example Conference (ExampleConf)",
    year: "2025",
    status: "published",
    abstract:
      "Another short summary. Replace or remove these example entries with your real publications.",
    links: {
      pdf: "assets/papers/earlier-result.pdf",
      arxiv: "https://arxiv.org/abs/0000.00001",
      journal: "https://doi.org/10.0000/example",
      code: "https://github.com/yourname/example-code"
    }
  }
];
