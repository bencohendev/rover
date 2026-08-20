import { type Node } from "./types.ts";

export const parse = (input: string) => {
  const fields: Node[] = [];
  const stack = [fields];
  let buffer = "";

  const getName = () => {
    const name = buffer.trim();
    buffer = "";
    return name;
  };

  const pushNode = (name: string) => {
    const node = { name, children: [] };
    stack[stack.length - 1].push(node);
    return node;
  };

  for (let i = 0; i < input.length; i++) {
    const ch = input[i];
    if (ch === "(") {
      const name = getName();
      if (name) {
        const node = pushNode(name);
        stack.push(node.children);
      } else {
        stack.push(stack[stack.length - 1]);
      }
    } else if (ch === ")") {
      if (stack.length <= 1)
        throw new Error(`Unexpected end of field group at position ${i}`);
      const name = getName();
      if (name) pushNode(name);
      stack.pop();
    } else if (ch === ",") {
      const name = getName();
      if (name) pushNode(name);
    } else {
      buffer += ch;
    }
  }

  //final node left in buffer after loop finishes
  const last = getName();
  if (last) pushNode(last);
  if (stack.length > 1) throw new Error("Unclosed field group");
  return fields;
};
