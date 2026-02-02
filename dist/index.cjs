"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  isTreeStructure: () => isTreeStructure,
  renderTreeBlocks: () => renderTreeBlocks,
  treeExtension: () => treeExtension
});
module.exports = __toCommonJS(index_exports);
var import_tree_to_html = require("tree-to-html");
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
      const html = (0, import_tree_to_html.renderTree)(source);
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isTreeStructure,
  renderTreeBlocks,
  treeExtension
});
//# sourceMappingURL=index.cjs.map