const { Disposable } = require("atom");

module.exports = {
  activate() {
    // One layer per editor: the marker hub builds a single layer per
    // (provider, editor), however many overview maps draw it.
    this.layers = new Map();
  },

  deactivate() {
    this.layers.clear();
  },

  consumeBracketMatcher(api) {
    const sub = api.observe((editor, match) => {
      const layer = this.layers.get(editor);
      if (layer) {
        layer.cache.set("match", match);
        layer.update();
      }
    });
    return { dispose: () => sub.dispose() };
  },

  provideMarkerLayer() {
    return {
      name: "brackets",
      description: "Matching bracket markers",
      initialize: (layer) => {
        this.layers.set(layer.editor, layer);
        layer.disposables.add(
          new Disposable(() => {
            this.layers.delete(layer.editor);
          }),
        );
      },
      getItems: ({ editor, cache }) => {
        const match = cache.get("match");
        if (!match) return [];
        const row1 = editor.screenRowForBufferRow(match.range1.start.row);
        const row2 = editor.screenRowForBufferRow(match.range2.start.row);
        const items = [{ row: row1 }];
        if (row2 !== row1) items.push({ row: row2 });
        return items;
      },
    };
  },
};
