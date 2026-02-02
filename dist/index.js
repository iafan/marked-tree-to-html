// src/index.ts
import { renderTree } from "tree-to-html";
function isTreeStructure(code) {
  const hasBranch = code.includes("\u251C");
  const hasCorner = code.includes("\u2514");
  const hasDash = code.includes("\u2500");
  return (hasBranch || hasCorner) && hasDash;
}
function renderTreeBlocks() {
  const containers = document.querySelectorAll(".tree-container-raw");
  for (const container of containers) {
    const source = container.textContent || "";
    if (!source.trim()) continue;
    try {
      const html = renderTree(source);
      container.outerHTML = html;
    } catch (error) {
      console.error("Failed to render tree:", error);
    }
  }
}
var treeExtension = {
  name: "tree",
  level: "block",
  start(src) {
    const match = src.match(/^```(?:tree)?\n/);
    return match?.index;
  },
  tokenizer(src) {
    const treeMatch = src.match(/^```tree\n([\s\S]*?)\n```/);
    if (treeMatch) {
      return {
        type: "tree",
        raw: treeMatch[0],
        text: treeMatch[1]
      };
    }
    const codeMatch = src.match(/^```\n([\s\S]*?)\n```/);
    if (codeMatch && isTreeStructure(codeMatch[1])) {
      return {
        type: "tree",
        raw: codeMatch[0],
        text: codeMatch[1]
      };
    }
    return void 0;
  },
  renderer(token) {
    const escaped = token.text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    return `<div class="tree-container-raw">${escaped}</div>
`;
  }
};
export {
  isTreeStructure,
  renderTreeBlocks,
  treeExtension
};
//# sourceMappingURL=index.js.map