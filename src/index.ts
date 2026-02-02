import type { TokenizerExtension, RendererExtension } from 'marked'
import { renderTree } from 'tree-to-html'

/**
 * Check if a code block contains ASCII tree characters.
 */
export function isTreeStructure(code: string): boolean {
  const hasBranch = code.includes('├')
  const hasCorner = code.includes('└')
  const hasDash = code.includes('─')
  return (hasBranch || hasCorner) && hasDash
}

/**
 * Post-process rendered HTML to convert tree containers to actual tree HTML.
 * Call this after marked.parse() completes and DOM is ready.
 */
export function renderTreeBlocks(): void {
  const containers = document.querySelectorAll<HTMLElement>('.tree-container-raw')

  for (const container of containers) {
    const source = container.textContent || ''
    if (!source.trim()) continue

    try {
      const html = renderTree(source)
      container.outerHTML = html
    } catch (error) {
      console.error('Failed to render tree:', error)
    }
  }
}

/**
 * Marked extension that intercepts code blocks with tree structure.
 * Use with: marked.use({ extensions: [treeExtension] })
 */
export const treeExtension: TokenizerExtension & RendererExtension = {
  name: 'tree',
  level: 'block',
  start(src: string) {
    // Look for code blocks that might contain tree structure
    const match = src.match(/^```(?:tree)?\n/)
    return match?.index
  },
  tokenizer(src: string) {
    // Match code blocks: ```tree or ``` followed by tree content
    const treeMatch = src.match(/^```tree\n([\s\S]*?)\n```/)
    if (treeMatch) {
      return {
        type: 'tree',
        raw: treeMatch[0],
        text: treeMatch[1],
      }
    }

    // Match unmarked code blocks that contain tree characters
    const codeMatch = src.match(/^```\n([\s\S]*?)\n```/)
    if (codeMatch && isTreeStructure(codeMatch[1])) {
      return {
        type: 'tree',
        raw: codeMatch[0],
        text: codeMatch[1],
      }
    }

    return undefined
  },
  renderer(token) {
    const escaped = token.text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    return `<div class="tree-container-raw">${escaped}</div>\n`
  },
}
