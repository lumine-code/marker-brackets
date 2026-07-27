const { Disposable } = require("atom");

module.exports = {
  activate() {
    // A set of layers per editor, not one: every renderer builds its own layer
    // from the descriptor, so one editor has as many layers as there are maps.
    this.layers = new Map();
  },

  deactivate() {
    this.layers.clear();
  },

  consumeBracketMatcher(api) {
    const sub = api.observe((editor, match) => {
      const layers = this.layers.get(editor);
      if (!layers) return;
      for (const layer of layers) {
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
        let layers = this.layers.get(layer.editor);
        if (!layers) {
          layers = new Set();
          this.layers.set(layer.editor, layers);
        }
        layers.add(layer);
        layer.disposables.add(
          new Disposable(() => {
            layers.delete(layer);
            if (layers.size === 0) {
              this.layers.delete(layer.editor);
            }
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
