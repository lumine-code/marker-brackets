# marker-brackets

Show matching bracket positions on the scrollbar and minimap.

A marker layer, drawn by [scrollmap](https://github.com/lumine-code/scrollmap) and [minimap](https://github.com/lumine-code/minimap).

## Features

- **Bracket markers**: shows the currently matched bracket pair on every map.
- **Pair tracking**: markers follow the cursor as the highlighted pair changes.
- **Tag support**: matching HTML tag pairs are marked as well.

## Installation

To install `marker-brackets` search for _marker-brackets_ in the Install pane of the Lumine settings or run `lumine --install lumine-code/marker-brackets`.

## Customization

The marker style can be adjusted in the `styles.css` file, e.g. change the marker color:

```css
.marker.marker-brackets {
  background-color: var(--text-color-info);
}
```

## Services

- **marker.layer** (`1.0.0`): provided to render matching bracket markers as a layer on the editor's overview maps.
- **bracket-matcher** (`^1.0.0`): consumed to observe the currently highlighted bracket pair in each editor.

## Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub. Any feedback is welcome!
