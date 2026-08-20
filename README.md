# Red Rover Code Challenge

Take a string and return a string with nested structure based on `(` `)` and `,`. Accept all other characters as allowable labels.

## Instructions

- `npm start`

Input string to test and hit enter. Response prints to console

## Decisions

I looped over the input and used a stack instead of recursion to build the tree

- A `Node` consists of a `name` and an array of `Node`.
- A `name` is any collection of characters that are not `(` `)` or `,`

A few edge cases/assumptions to call out

- trailing commas are accepted
- parens must be balanced
- if input string is wrapped in quotes, they are stripped out before string is parsed
