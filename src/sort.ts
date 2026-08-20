import type { Node } from "./types.ts";

export const sort = (fields: Node[]): Node[] => {
  return fields
    .map((field) => ({
      name: field.name,
      children: sort(field.children),
    }))
    .sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
};
