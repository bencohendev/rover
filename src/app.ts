import readline from "readline";
import { render } from "./render.ts";
import { parse } from "./parse.ts";
import { sort } from "./sort.ts";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const stripQuotes = (input: string): string => {
  const trimmed = input.trim();
  const firstChar = trimmed[0];
  const hasQuotes =
    (firstChar === '"' || firstChar === "'") &&
    trimmed.length > 1 &&
    trimmed.endsWith(firstChar);
  return hasQuotes ? trimmed.slice(1, -1) : trimmed;
};

rl.question("Enter a string to parse ", (input: string) => {
  const formattedInput = stripQuotes(
    input ||
      "(id, name, email, type(id, name, customFields(c1, c2, c3)), externalId)",
  );

  try {
    const parsed = parse(formattedInput);
    const sourceOrder = render(parsed);
    const alphabeticOrder = render(sort(parsed));
    console.log("\nSource Order:\n" + sourceOrder);
    console.log("\nAlphabetic Sorting:\n" + alphabeticOrder);
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
  rl.close();
});
