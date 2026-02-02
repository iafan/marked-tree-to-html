import { TokenizerExtension, RendererExtension } from 'marked';

/**
 * Check if a code block contains ASCII tree characters.
 */
declare function isTreeStructure(code: string): boolean;
/**
 * Post-process rendered HTML to convert tree containers to actual tree HTML.
 * Call this after marked.parse() completes and DOM is ready.
 */
declare function renderTreeBlocks(): void;
/**
 * Marked extension that intercepts code blocks with tree structure.
 * Use with: marked.use({ extensions: [treeExtension] })
 */
declare const treeExtension: TokenizerExtension & RendererExtension;

export { isTreeStructure, renderTreeBlocks, treeExtension };
