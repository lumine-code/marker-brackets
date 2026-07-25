module.exports = {
  consumeBracketMatcher(api) {
    const sub = api.observe((editor, match) => {
      const layer = editor.scrollmap?.layers.get("brackets");
      if (!layer) return;
      layer.cache.set("match", match);
      layer.update();
    });
    return { dispose: () => sub.dispose() };
  },

  provideScrollmap() {
    return {
      name: "brackets",
      description: "Matching bracket markers",
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
