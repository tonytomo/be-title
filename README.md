# be-title

Converts text into other string cases.

## Basic Cases

- camelCase: The first word starts lowercase, and every following word starts uppercase.
- PascalCase: Every word starts with an uppercase letter, including the first word.
- kebab-case: Words are all lowercase and separated by hyphens (also known as slug case or dash-case).
- snake_case: Words are all lowercase and separated by underscores.
- UPPER_SNAKE_CASE: Words are all uppercase and separated by underscores (often called CONSTANT_CASE).
- Train-Case: Words are separated by hyphens, and every word starts with an uppercase letter. [3, 4, 5, 6, 7]

## Database Cases

These are specifically optimized for data storage and query language readability.

- snake_case: The most common default standard for SQL database columns and table names.
- UPPERCASE: Used in some legacy databases or for SQL keywords like SELECT and WHERE.
- lowercase: Used in databases to avoid case-sensitivity bugs across different operating systems. [8]

## Typography and Text Cases

These are standard casing styles used for human-readable content in documents, apps, and articles.

- Sentence case: Only the first letter of the first word is uppercase (along with proper nouns).
- Title Case: The first letter of every major word is uppercase.
- Capital Case: The first letter of every single word is uppercase, including minor words like "and" or "the".
- Small Caps: Lowercase letters look like smaller versions of uppercase letters. [9, 10, 11, 12, 13]

## Internet Culture Cases

These formats arose from online memes, security practices, and gaming.

- AlTeRnAtInG cAsE: Letters alternate between uppercase and lowercase to mock or mimic a sarcastic tone.
- sPoNgEbOb CaSe: Letters are randomized between upper and lowercase for extreme sarcasm.
- StudlyCaps: Capitalization is randomized or follows a hidden pattern, often used in 90s gaming handles. [14, 15]

## Animating Utils

- Per Letter: A list of the text from first letter to full text arranged orderly, can be reversed.
- Per Word: A list of the text from first word to full text arranged orderly, can also be reversed.

All function must have index input `from` and `num`
