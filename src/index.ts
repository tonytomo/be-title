import { minorWords } from "./config.js";

export interface CaseConverterProps {
    from?: number;
    num?: number;
    fromText?: string;
    toText?: string;
    exactText?: string;
}

export class Title {
    private _text: string;

    constructor(text: string) {
        this._text = text;
    }

    get text() {
        return this._text;
    }

    set text(text: string) {
        this._text = text;
    }

    /**
     * @description Converts the text to uppercase.
     * @returns {string}
     * @example "the lord of the rings" => "THE LORD OF THE RINGS"
     */
    toUpper(): string {
        return this._text.toUpperCase();
    }

    /**
     * @description Converts the text to lowercase.
     * @returns {string}
     * @example "the lord of the rings" => "the lord of the rings"
     */
    toLower(): string {
        return this._text.toLowerCase();
    }

    /**
     * @description Only the first letter of the first word is uppercase (along with proper nouns)
     * @returns {string}
     * @example "the lord of the rings" => "The lord of the rings"
     */
    toSentence(): string {
        const text = this._text.toLowerCase();
        const firstLetter = text.charAt(0).toUpperCase();
        const restOfText = text.slice(1);
        return firstLetter + restOfText;
    }

    /**
     * @description The first letter of every major word is uppercase.
     * @returns {string}
     * @example "the lord of the rings" => "The Lord of the Rings"
     */
    toTitle(): string {
        const words = this._text.toLowerCase().split(' ');
        return words.map((word, index) => {
            if (minorWords.includes(word) && index !== 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }

    /**
     * @description The first letter of every single word is uppercase, including minor words.
     * @returns {string}
     * @example "the lord of the rings" => "The Lord Of The Rings"
     */
    toCapital(): string {
        const words = this._text.split(' ');
        return words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }

    /**
     * @description Letters alternate between uppercase and lowercase to mock or mimic a sarcastic tone.
     * @returns {string}
     * @example "the lord of the rings" => "ThE LoRd Of ThE rInGs"
     */
    toAlternating(): string {
        const text = this._text.split('');
        return text.map((letter, index) => {
            return index % 2 === 0 ? letter.toUpperCase() : letter.toLowerCase();
        }).join('');
    }

    /**
     * @description Letters are randomized between upper and lowercase for extreme sarcasm.
     * @returns {string}
     * @example "the lord of the rings" => "ThE lOrD oF tHe RiNgS"
     */
    toSpongeBob(): string {
        const text = this._text.split('');
        return text.map((letter) => {
            const random = Math.random() > 0.5;
            return random ? letter.toUpperCase() : letter.toLowerCase();
        }).join('');
    }

    /**
     * @description Words are all lowercase and separated by underscores (often called CONSTANT_CASE).
     * @returns {string}
     * @example "the lord of the rings" => "the_lord_of_the_rings"
     */
    toSnakeCase(): string {
        const text = this._text.toLowerCase();
        return text.split(' ').join('_');
    }

    /**
     * @description Words are all lowercase and separated by hyphens (also known as slug case or dash-case).
     * @returns {string}
     * @example "the lord of the rings" => "the-lord-of-the-rings"
     */
    toKebabCase(): string {
        const text = this._text.toLowerCase();
        return text.split(' ').join('-');
    }

    /**
     * @description The first word starts lowercase, and every following word starts uppercase.
     * @returns {string}
     * @example "the lord of the rings" => "theLordOfTheRings"
     */
    toCamelCase(): string {
        const text = this._text.toLowerCase();
        return text.split(' ').map((word, index) => {
            if (index === 0) return word;
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('');
    }

    /**
     * @description Every word starts with an uppercase letter, including the first word.
     * @returns {string}
     * @example "the lord of the rings" => "TheLordOfTheRings"
     */
    toPascalCase(): string {
        const text = this._text.toLowerCase();
        return text.split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('');
    }

    /**
     * @description Words are separated by hyphens, and every word starts with an uppercase letter.
     * @returns {string}
     * @example "the lord of the rings" => "The-Lord-Of-The-Rings"
     */
    toTrainCase(): string {
        const text = this._text.toLowerCase();
        return text.split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('-');
    }

    /**
     * @description Words are all uppercase and separated by underscores (often called CONSTANT_CASE).
     * @returns {string}
     * @example "the lord of the rings" => "THE_LORD_OF_THE_RINGS"
     */
    toConstantCase(): string {
        const text = this._text.toLowerCase();
        return text.split(' ').join('_').toUpperCase();
    }

    /**
     * @description A list of the text from first letter to full text arranged orderly, can be reversed.
     * @param {{ reversed: boolean, out: boolean }} options - Options to reverse the text or not.
     * @returns {string[]}
     * @example "hello" => ["h", "he", "hel", "hell", "hello"]
     * @example "hello" with out => ["hello", "hell", "hel", "he", "h"]
     * @example "hello" with reversed => ["o", "lo", "llo", "ello", "hello"]
     * @example "hello" with reversed and out => ["hello", "ello", "llo", "lo", "o"]
     */
    animatePerLetter({ reversed, out }: { reversed?: boolean, out?: boolean }): string[] {
        const text = this._text.split('');
        const maxLength = text.length;

        if (reversed && out) return text.map((_, index) => {
            return text.slice(index, maxLength - 1).join('');
        });

        if (reversed) return text.map((_, index) => {
            return text.slice(maxLength - index).join('');
        });

        if (out) return text.map((_, index) => {
            return text.slice(0, maxLength - index).join('');
        });

        return text.map((_, index) => {
            return text.slice(0, index + 1).join('');
        });
    }

    /**
     * @description A list of the text from first word to full text arranged orderly, can be reversed.
     * @param {{ reversed: boolean, out: boolean }} options - Options to reverse the text or not.
     * @returns {string[]}
     * @example "hello world" => ["hello", "hello world"]
     * @example "hello world" with out => ["hello world", "world"]
     * @example "hello world" with reversed => ["world", "hello world"]
     * @example "hello world" with reversed and out => ["world", "hello world"]
     */
    animatePerWord({ reversed, out }: { reversed?: boolean, out?: boolean }): string[] {
        const words = this._text.split(' ');
        const maxLength = words.length;

        if (reversed && out) return words.map((_, index) => {
            return words.slice(index, maxLength - 1).join(' ');
        });

        if (reversed) return words.map((_, index) => {
            return words.slice(maxLength - index).join(' ');
        });

        if (out) return words.map((_, index) => {
            return words.slice(0, maxLength - index).join(' ');
        });

        return words.map((_, index) => {
            return words.slice(0, index + 1).join(' ');
        });
    }
}