# marked-tree-to-html

Marked extension for rendering ASCII tree structures as HTML tables.

## Installation

```bash
npm install marked-tree-to-html tree-to-html marked
```

Or install from GitHub:

```json
{
  "dependencies": {
    "marked-tree-to-html": "github:iafan/marked-tree-to-html",
    "tree-to-html": "github:iafan/tree-to-html"
  }
}
```

## Usage

```typescript
import { marked } from 'marked'
import { treeExtension, renderTreeBlocks } from 'marked-tree-to-html'

// Register the extension
marked.use({ extensions: [treeExtension] })

// Parse markdown
const html = marked.parse(markdown)

// Insert into DOM
document.body.innerHTML = html

// Post-process to render tree structures
renderTreeBlocks()
```

## How It Works

The extension intercepts:
1. Code blocks marked with ` ```tree `
2. Unmarked code blocks that contain ASCII tree characters (├, └, ─)

These are rendered as placeholders that `renderTreeBlocks()` converts to HTML tables.

## API

### `treeExtension`

Marked extension object. Use with `marked.use({ extensions: [treeExtension] })`.

### `renderTreeBlocks(): void`

Post-processes the DOM to convert tree placeholders to actual HTML tables.

### `isTreeStructure(code: string): boolean`

Check if a string contains ASCII tree characters.

## Styling

See [tree-to-html](https://github.com/iafan/tree-to-html) for CSS class documentation.

## License

This is free and unencumbered software released into the public domain (Unlicense).
