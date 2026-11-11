const vscode = require('vscode');

function activate(context) {
  const flash = vscode.window.createTextEditorDecorationType({
    backgroundColor: 'rgba(255, 215, 0, 0.35)',
    isWholeLine: false
  });
  const timers = new Map();
  const DURATION_MS = 700;

  context.subscriptions.push(
    flash,
    vscode.workspace.onDidChangeTextDocument(e => {
      const doc = e.document;
      if (!['latex', 'tex'].includes(doc.languageId) || !e.contentChanges.length) return;
      const editor = vscode.window.visibleTextEditors.find(ed => ed.document === doc);
      if (!editor) return;

      const ranges = e.contentChanges.map(c => {
        const s = c.range.start;
        if (!c.text) {
          return doc.lineAt(Math.min(s.line, doc.lineCount - 1)).range;
        }
        const lines = c.text.split(/\r\n|\r|\n/);
        const endLine = s.line + lines.length - 1;
        const endChar = lines.length === 1
          ? s.character + c.text.length
          : lines[lines.length - 1].length;
        return new vscode.Range(s, new vscode.Position(endLine, endChar));
      });

      editor.setDecorations(flash, ranges);
      const key = doc.uri.toString();
      clearTimeout(timers.get(key));
      timers.set(key, setTimeout(() => editor.setDecorations(flash, []), DURATION_MS));
    })
  );
}

function deactivate() {}
module.exports = { activate, deactivate };