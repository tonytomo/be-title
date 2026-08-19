# be-title

[![npm version](https://img.shields.io/npm/v/be-title.svg)](https://www.npmjs.com/package/be-title)
[![license](https://img.shields.io/npm/l/be-title.svg)](LICENSE.md)

A lightweight TypeScript/JavaScript library to convert strings into different casing styles and generate text animation frames.

## Installation

```bash
npm install be-title
```

## Quick Start

```typescript
import { Title } from "be-title";

const title = new Title("the lord of the rings");

console.log(title.toTitle()); // "The Lord of the Rings"
console.log(title.toCamelCase()); // "theLordOfTheRings"
console.log(title.toKebabCase()); // "the-lord-of-the-rings"
```

---

## API Reference

### Initializing

```typescript
const title = new Title("hello world");
```

#### Get / Set Raw Text

You can access or update the internal text value anytime:

```typescript
console.log(title.text); // "hello world"

title.text = "new text here";
console.log(title.toTitle()); // "New Text Here"
```

---

### Case Conversions

Assuming `const title = new Title("the lord of the rings");`:

| Method          | Output                    | Description                                                                                               |
| :-------------- | :------------------------ | :-------------------------------------------------------------------------------------------------------- |
| `upper()`       | `"THE LORD OF THE RINGS"` | Converts all characters to uppercase.                                                                     |
| `lower()`       | `"the lord of the rings"` | Converts all characters to lowercase.                                                                     |
| `sentence()`    | `"The lord of the rings"` | Capitalizes only the first letter of the sentence.                                                        |
| `title()`       | `"The Lord of the Rings"` | Capitalizes major words while keeping minor words (articles, conjunctions, short prepositions) lowercase. |
| `capital()`     | `"The Lord Of The Rings"` | Capitalizes the first letter of every single word.                                                        |
| `camel()`       | `"theLordOfTheRings"`     | First word is lowercase, subsequent words start with uppercase.                                           |
| `pascal()`      | `"TheLordOfTheRings"`     | Every word starts with an uppercase letter without separators.                                            |
| `snake()`       | `"the_lord_of_the_rings"` | Lowercase words separated by underscores.                                                                 |
| `kebab()`       | `"the-lord-of-the-rings"` | Lowercase words separated by hyphens (slug format).                                                       |
| `train()`       | `"The-Lord-Of-The-Rings"` | Capitalized words separated by hyphens.                                                                   |
| `constant()`    | `"THE_LORD_OF_THE_RINGS"` | Uppercase words separated by underscores.                                                                 |
| `alternating()` | `"ThE LoRd Of ThE rInGs"` | Alternates characters between uppercase and lowercase.                                                    |
| `spongebob()`   | `"ThE lOrD oF tHe RiNgS"` | Randomizes uppercase and lowercase letters for sarcasm/mocking tone.                                      |

---

### Text Animation

Play animations with title text.

#### `inOut(options)`

- **type**: `'letter'` | `'word'`
- **reversed**: `true` | `false`
- **out**: `true` | `false`

#### `scramble(options)`

- **scrambleChars**: `string`
- **iterationsPerChar**: `number`

#### `cycle(options)`

- **pauseFrames**: `number`
- **cursor**: `string`

---

## License

[MIT](LICENCE.md)
