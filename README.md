# marker-brackets

> [!WARNING]
> **This package is deprecated.** Its marker layer now ships with [bracket-matcher](https://github.com/lumine-code/bracket-matcher) itself — the marker-* adapter packages were folded into their host packages, and this layer's settings moved to `bracket-matcher.marker.*`. This repository is archived and no longer maintained.

Show matching bracket positions on the scrollbar and minimap.

A marker layer, drawn by [scrollmap](https://github.com/lumine-code/scrollmap) and [minimap](https://github.com/lumine-code/minimap).

## Features

- **Bracket markers**: shows the currently matched bracket pair on every map.
- **Pair tracking**: markers follow the cursor as the highlighted pair changes.
- **Tag support**: matching HTML tag pairs are marked as well.

## Installation

To install `marker-brackets` search for it in the Install pane of the Lumine settings, or run the command `lumine --install lumine-code/marker-brackets`.

## Customization

The marker style can be adjusted in the `styles.css` file, e.g. change the marker color:

```css
.marker.marker-brackets {
  background-color: var(--text-color-info);
}
```

## Services

- `marker.layer`: provided to render matching bracket markers as a layer on the editor's overview maps.
- `bracket-matcher`: consumed to observe the currently highlighted bracket pair in each editor.

## Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub. Any feedback is welcome!
