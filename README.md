# scrollmap-brackets

Show matching bracket positions on the scrollbar.

A layer package for [scrollmap](https://github.com/lumine-code/scrollmap).

## Features

- **Bracket markers**: shows the currently matched bracket pair on the scrollbar.
- **Pair tracking**: markers follow the cursor as the highlighted pair changes.
- **Tag support**: matching HTML tag pairs are marked as well.

## Installation

To install `scrollmap-brackets` search for _scrollmap-brackets_ in the Install pane of the Lumine settings or run `lumine --install lumine-code/scrollmap-brackets`.

## Customization

The marker style can be adjusted in the `styles.less` file, e.g. change the marker color:

```less
.scrollmap .marker.marker-brackets {
  background-color: var(--text-color-info);
}
```

## Services

- **[scrollmap.layer](https://lumine-code.github.io/docs.html#services/scrollmap.layer)** (`1.0.0`): provided to render matching bracket markers as a layer on the editor scrollbar.
- **[bracket-matcher](https://lumine-code.github.io/docs.html#services/bracket-matcher)** (`^1.0.0`): consumed to observe the currently highlighted bracket pair in each editor.

## Contributing

Got ideas to make this package better, found a bug, or want to help add new features? Just drop your thoughts on GitHub. Any feedback is welcome!
