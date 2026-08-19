import { minorWords } from "./config.js";
import { AnimationController, BoxOptions, CycleOptions, FlickerOptions, GradientOptions, HideTextOptions, InOutOptions, PlayOptions, ScrambleOptions, TextInfo, TruncateOptions, WaveOptions } from "./types.js";
import { generateCycleFrames, generateFlickerFrames, generateInOutFrames, generateScrambleFrames, generateWaveFrames, hideText, toBox, toGradient, truncateText } from "./utils.js";

export class Title {
    text: string;

    constructor(text: string) {
        this.text = text.trim();
    }

    /**
     * @description Get information about the text.
     * @returns {TextInfo}
     */
    info(): TextInfo {
        const words = this.text.split(' ');
        return {
            chars: this.text.length,
            words: words.length,
            hasMinorWords: words.some((word) => minorWords.includes(word)),
        }
    }

    /**
     * @description Truncates the text.
     * @param {Object} options - Options to control the truncation.
     * @param {number} options.max - The maximum length of the text.
     * @param {string} options.suffix - The suffix to add to the truncated text.
     * @returns {string}
     * @example "the lord of the rings" => "the lord of the..."
     */
    truncate(options: TruncateOptions = {}): string {
        return truncateText(this.text, options);
    }

    /**
     * @description Hides the text.
     * @param {Object} options - Options to control the hiding.
     * @param {number} options.from - The index to start hiding from.
     * @param {number} options.numChar - The number of characters to hide.
     * @param {string} options.hideChar - The character to use for hiding.
     * @returns {string}
     * @example "the lord of the rings" => "**********of the rings" (hide first 10 chars)
     */
    hide(options: HideTextOptions = {}): string {
        return hideText(this.text, options);
    }

    /**
     * @description Converts the text to a gradient.
     * @param {GradientOptions} options - Options to control the gradient.
     * @returns {string}
     * @example "the lord of the rings" => "\u001b[38;2;118;183;166mthe\u001b[0m \u001b[38;2;118;183;171mlord\u001b[0m ..."
     */
    gradient(options: GradientOptions): string {
        return toGradient(this.text, options);
    }

    /**
     * @description Converts the text to a box.
     * @param {BoxOptions} options - Options to control the box.
     * @returns {string}
     * @example "the lord of the rings" => "╭─────────────────────╮\n│ the lord of the rings │\n╰─────────────────────╯"
     */
    box(options: BoxOptions = {}): string {
        return toBox(this.text, options);
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
     * @param {InOutOptions} options - Options to control the animation.
     * @returns {string[]}
     */
    inout(options: InOutOptions = {}): string[] {
        return generateInOutFrames(this.text, options);
    }

    /**
     * @description Scrambles the text.
     * @param {ScrambleOptions} options - Options to control the scramble.
     * @returns {string[]}
     */
    scramble(options: ScrambleOptions = {}): string[] {
        return generateScrambleFrames(this.text, options);
    }

    /**
     * @description Cycles through a list of words.
     * @param {string[]} words - The list of words to cycle through.
     * @param {CycleOptions} options - Options to control the animation.
     * @returns {string[]}
     */
    cycle(options: CycleOptions = {}): string[] {
        return generateCycleFrames(this.text, options);
    }

    /**
     * @description Creates waves in the text.
     * @param {WaveOptions} options - Options to control the wave animation.
     * @returns {string[]}
     */
    wave(options: WaveOptions = {}): string[] {
        return generateWaveFrames(this.text, options);
    }

    /**
     * @description Flickers the text.
     * @param {FlickerOptions} options - Options to control the animation.
     * @returns {string[]}
     */
    flicker(options: FlickerOptions = {}): string[] {
        return generateFlickerFrames(this.text, options);
    }

    /**
     * @description Animates the text.
     * @param {PlayOptions} options - Options to control the animation.
     * @returns {AnimationController}
     * @example
     */
    play(options: PlayOptions = {}): AnimationController {
        const {
            speedMs = 60,
            loop = false,
            onTick,
            onComplete,
            animation = 'inout',
            animationOptions
        } = options;
        let frames: string[] = [];

        if (animation === 'inout') {
            frames = this.inout(animationOptions as InOutOptions);
        } else if (animation === 'scramble') {
            frames = this.scramble(animationOptions as ScrambleOptions);
        } else if (animation === 'cycle') {
            frames = this.cycle(animationOptions as CycleOptions);
        } else if (animation === 'wave') {
            frames = this.wave(animationOptions as WaveOptions);
        } else if (animation === 'flicker') {
            frames = this.flicker(animationOptions as FlickerOptions);
        }

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