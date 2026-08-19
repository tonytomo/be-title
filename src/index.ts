import { minorWords } from "./config.js";
import { AnimateOptions, AnimationController, PlayOptions } from "./types.js";

export class Title {
    text: string;

    constructor(text: string) {
        this.text = text;
    }

    /**
     * @description Converts the text to uppercase.
     * @returns {string}
     * @example "the lord of the rings" => "THE LORD OF THE RINGS"
     */
    upper(): string {
        return this.text.toUpperCase();
    }

    /**
     * @description Converts the text to lowercase.
     * @returns {string}
     * @example "the lord of the rings" => "the lord of the rings"
     */
    lower(): string {
        return this.text.toLowerCase();
    }

    /**
     * @description Only the first letter of the first word is uppercase (along with proper nouns)
     * @returns {string}
     * @example "the lord of the rings" => "The lord of the rings"
     */
    sentence(): string {
        const text = this.text.toLowerCase();
        const firstLetter = text.charAt(0).toUpperCase();
        const restOfText = text.slice(1);
        return firstLetter + restOfText;
    }

    /**
     * @description The first letter of every major word is uppercase.
     * @returns {string}
     * @example "the lord of the rings" => "The Lord of the Rings"
     */
    title(): string {
        const words = this.text.toLowerCase().split(' ');
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
    capital(): string {
        const words = this.text.split(' ');
        return words.map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }

    /**
     * @description Letters alternate between uppercase and lowercase to mock or mimic a sarcastic tone.
     * @returns {string}
     * @example "the lord of the rings" => "ThE LoRd Of ThE rInGs"
     */
    alternating(): string {
        const text = this.text.split('');
        return text.map((letter, index) => {
            return index % 2 === 0 ? letter.toUpperCase() : letter.toLowerCase();
        }).join('');
    }

    /**
     * @description Letters are randomized between upper and lowercase for extreme sarcasm.
     * @returns {string}
     * @example "the lord of the rings" => "ThE lOrD oF tHe RiNgS"
     */
    spongebob(): string {
        const text = this.text.split('');
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
    snake(): string {
        const text = this.text.toLowerCase();
        return text.split(' ').join('_');
    }

    /**
     * @description Words are all lowercase and separated by hyphens (also known as slug case or dash-case).
     * @returns {string}
     * @example "the lord of the rings" => "the-lord-of-the-rings"
     */
    kebab(): string {
        const text = this.text.toLowerCase();
        return text.split(' ').join('-');
    }

    /**
     * @description The first word starts lowercase, and every following word starts uppercase.
     * @returns {string}
     * @example "the lord of the rings" => "theLordOfTheRings"
     */
    camel(): string {
        const text = this.text.toLowerCase();
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
    pascal(): string {
        const text = this.text.toLowerCase();
        return text.split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('');
    }

    /**
     * @description Words are separated by hyphens, and every word starts with an uppercase letter.
     * @returns {string}
     * @example "the lord of the rings" => "The-Lord-Of-The-Rings"
     */
    train(): string {
        const text = this.text.toLowerCase();
        return text.split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join('-');
    }

    /**
     * @description Words are all uppercase and separated by underscores (often called CONSTANT_CASE).
     * @returns {string}
     * @example "the lord of the rings" => "THE_LORD_OF_THE_RINGS"
     */
    constant(): string {
        const text = this.text.toLowerCase();
        return text.split(' ').join('_').toUpperCase();
    }

    /**
     * @description Creates a list of the text from first letter to full text arranged orderly, can be reversed and out.
     * @param {AnimateOptions} options - Options to control the animation.
     * @returns {string[]}
     * @example "hello" => ["h", "he", "hel", "hell", "hello"]
     * @example "hello" with reversed => ["o", "lo", "llo", "ello", "hello"]
     * @example "hello" with out => ["hello", "hell", "hel", "he", "h"]
     * @example "hello" with reversed and out => ["hello", "ello", "llo", "lo", "o"]
     */
    animate(options: AnimateOptions = { type: 'letter', reversed: false, out: false }): string[] {
        const chars = this.text.split("");
        const words = this.text.split(" ");
        const frames: string[] = [];

        if (options.out && options.reversed) {
            if (options.type === 'letter') {
                for (let i = 0; i <= chars.length; i++) {
                    const text = chars.slice(i)
                    frames.push(text.join(""));
                }
            } else if (options.type === 'word') {
                for (let i = 0; i <= words.length; i++) {
                    const text = words.slice(i)
                    frames.push(text.join(" "));
                }
            }
        } else if (options.reversed) {
            if (options.type === 'letter') {
                for (let i = chars.length; i >= 0; i--) {
                    const text = chars.slice(i);
                    frames.push(text.join(""));
                }
            } else if (options.type === 'word') {
                for (let i = words.length; i >= 0; i--) {
                    const text = words.slice(i);
                    frames.push(text.join(" "));
                }
            }
        } else if (options.out) {
            if (options.type === 'letter') {
                for (let i = chars.length; i >= 0; i--) {
                    const text = chars.slice(0, i);
                    frames.push(text.join(""));
                }
            } else if (options.type === 'word') {
                for (let i = words.length; i >= 0; i--) {
                    const text = words.slice(0, i);
                    frames.push(text.join(" "));
                }
            }
        } else {
            if (options.type === 'letter') {
                for (let i = 0; i <= chars.length; i++) {
                    const text = chars.slice(0, i)
                    frames.push(text.join(""));
                }
            } else if (options.type === 'word') {
                for (let i = 0; i <= words.length; i++) {
                    const text = words.slice(0, i)
                    frames.push(text.join(" "));
                }
            }
        }
        return frames;
    }

    /**
     * @description Animates the text.
     * @param {PlayOptions} options - Options to control the animation.
     * @returns {AnimationController}
     * @example
     */
    play(options: PlayOptions = {}): AnimationController {
        const { speedMs = 60, loop = false, onTick, onComplete } = options;
        const frames = this.animate(options.options);

        let currentIndex = 0;
        let timerId: ReturnType<typeof setTimeout> | null = null;
        let isRunning = false;

        const tick = () => {
            if (!isRunning) return;

            if (currentIndex < frames.length) {
                onTick?.(frames[currentIndex]);
                currentIndex++;
                timerId = setTimeout(tick, speedMs);
            } else if (loop) {
                currentIndex = 0;
                timerId = setTimeout(tick, speedMs);
            } else {
                isRunning = false;
                onComplete?.();
            }
        };

        const controller: AnimationController = {
            get isRunning() {
                return isRunning;
            },
            pause: () => {
                isRunning = false;
                if (timerId !== null) clearTimeout(timerId);
            },
            resume: () => {
                if (!isRunning) {
                    isRunning = true;
                    tick();
                }
            },
            stop: () => {
                isRunning = false;
                if (timerId !== null) clearTimeout(timerId);
                currentIndex = 0;
            },
        };

        controller.resume();
        return controller;
    }
}