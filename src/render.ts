import type { Node } from "./types.ts";

export const render = (fields: Node[], depth = 0): string => {
  return fields
    .map((node) => {
      const line = "  ".repeat(depth) + "- " + node.name;
      return node.children.length > 0
        ? line + "\n" + render(node.children, depth + 1)
        : line;
    })
    .join("\n");
};
