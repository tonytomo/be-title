# be-title

A lightweight TypeScript/JavaScript library to convert strings into different casing styles and generate step-by-step text animation frames.

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

| Method | Output | Description |
| :--- | :--- | :--- |
| `toUpper()` | `"THE LORD OF THE RINGS"` | Converts all characters to uppercase. |
| `toLower()` | `"the lord of the rings"` | Converts all characters to lowercase. |
| `toSentence()` | `"The lord of the rings"` | Capitalizes only the first letter of the sentence. |
| `toTitle()` | `"The Lord of the Rings"` | Capitalizes major words while keeping minor words (articles, conjunctions, short prepositions) lowercase. |
| `toCapital()` | `"The Lord Of The Rings"` | Capitalizes the first letter of every single word. |
| `toCamelCase()` | `"theLordOfTheRings"` | First word is lowercase, subsequent words start with uppercase. |
| `toPascalCase()` | `"TheLordOfTheRings"` | Every word starts with an uppercase letter without separators. |
| `toSnakeCase()` | `"the_lord_of_the_rings"` | Lowercase words separated by underscores. |
| `toKebabCase()` | `"the-lord-of-the-rings"` | Lowercase words separated by hyphens (slug format). |
| `toTrainCase()` | `"The-Lord-Of-The-Rings"` | Capitalized words separated by hyphens. |
| `toConstantCase()` | `"THE_LORD_OF_THE_RINGS"` | Uppercase words separated by underscores. |
| `toAlternating()` | `"ThE LoRd Of ThE rInGs"` | Alternates characters between uppercase and lowercase. |
| `toSpongeBob()` | `"ThE lOrD oF tHe RiNgS"` | Randomizes uppercase and lowercase letters for sarcasm/mocking tone. |

---

### Text Animation Helpers

Generates arrays of progressive string frames suitable for typing effects, ticker animations, or terminal loaders.

#### `animatePerLetter(options?)`
Splits text letter-by-letter.

| Options | Example (`"hello"`) | Result |
| :--- | :--- | :--- |
| `{}` (default) | `title.animatePerLetter()` | `["h", "he", "hel", "hell", "hello"]` |
| `{ out: true }` | `title.animatePerLetter({ out: true })` | `["hello", "hell", "hel", "he", "h"]` |
| `{ reversed: true }` | `title.animatePerLetter({ reversed: true })` | `["o", "lo", "llo", "ello", "hello"]` |
| `{ reversed: true, out: true }` | `title.animatePerLetter({ reversed: true, out: true })` | `["hello", "ello", "llo", "lo", "o"]` |

#### `animatePerWord(options?)`
Splits text word-by-word.

| Options | Example (`"hello world"`) | Result |
| :--- | :--- | :--- |
| `{}` (default) | `title.animatePerWord()` | `["hello", "hello world"]` |
| `{ out: true }` | `title.animatePerWord({ out: true })` | `["hello world", "world"]` |
| `{ reversed: true }` | `title.animatePerWord({ reversed: true })` | `["world", "hello world"]` |
| `{ reversed: true, out: true }` | `title.animatePerWord({ reversed: true, out: true })` | `["world", "hello world"]` |

---

## License

[MIT](LICENCE.md)
