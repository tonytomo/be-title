import { CycleOptions, GradientOptions, InOutOptions, ScrambleOptions } from "./types";

export function truncateText(text: string, options?: { max?: number, suffix?: string }): string {
    const max = options?.max || 15;
    const suffix = options?.suffix || '...';
    if (text.length <= max) return text;
    return text.slice(0, max).trimEnd() + suffix;
}

export function hideText(text: string, options?: { from?: number, numChar?: number, hideChar?: string }): string {
    const from = options?.from || 0;
    const numChar = options?.numChar || 1;
    const hideChar = options?.hideChar || '•';
    if (text.length <= from) return text;
    return text.slice(0, from) + hideChar.repeat(numChar) + text.slice(from + numChar);
}

export function generateInOutFrames(
    targetText: string,
    options: InOutOptions = {}
): string[] {
    const { type = 'letter', reversed = false, out = false, cursor = '', blinkSpeed = 2 } = options;

    const chars = targetText.split("");
    const words = targetText.split(" ");
    const frames: string[] = [];

    const addFrame = (text: string) => {
        const showCursor = Math.floor(frames.length / Math.max(1, blinkSpeed)) % 2 === 0;
        const currentCursor = showCursor ? cursor : '';
        frames.push(reversed ? currentCursor + text : text + currentCursor);
    };

    if (out && reversed) {
        if (type === 'letter') {
            for (let i = 0; i <= chars.length; i++) {
                const text = chars.slice(i);
                addFrame(text.join(""));
            }
        } else if (type === 'word') {
            for (let i = 0; i <= words.length; i++) {
                const text = words.slice(i);
                addFrame(text.join(" "));
            }
        }
    } else if (reversed) {
        if (type === 'letter') {
            for (let i = chars.length; i >= 0; i--) {
                const text = chars.slice(i);
                addFrame(text.join(""));
            }
        } else if (type === 'word') {
            for (let i = words.length; i >= 0; i--) {
                const text = words.slice(i);
                addFrame(text.join(" "));
            }
        }
    } else if (out) {
        if (type === 'letter') {
            for (let i = chars.length; i >= 0; i--) {
                const text = chars.slice(0, i);
                addFrame(text.join(""));
            }
        } else if (type === 'word') {
            for (let i = words.length; i >= 0; i--) {
                const text = words.slice(0, i);
                addFrame(text.join(" "));
            }
        }
    } else {
        if (type === 'letter') {
            for (let i = 0; i <= chars.length; i++) {
                const text = chars.slice(0, i);
                addFrame(text.join(""));
            }
        } else if (type === 'word') {
            for (let i = 0; i <= words.length; i++) {
                const text = words.slice(0, i);
                addFrame(text.join(" "));
            }
        }
    }
    return frames;
}

export function generateScrambleFrames(
    targetText: string,
    options: ScrambleOptions = {}
): string[] {
    const {
        scrambleChars = "!@#$%^&*()_+-=[]{}|;:,.<>/?0123456789",
        iterationsPerChar = 3,
    } = options;

    const totalLength = targetText.length;
    const totalFrames = totalLength * iterationsPerChar;
    const frames: string[] = [];

    const getRandomChar = () =>
        scrambleChars[Math.floor(Math.random() * scrambleChars.length)];

    for (let frameIdx = 0; frameIdx <= totalFrames; frameIdx++) {
        const revealedCount = Math.floor(frameIdx / iterationsPerChar);
        let frame = "";

        for (let i = 0; i < totalLength; i++) {
            if (i < revealedCount) {
                // Character is resolved
                frame += targetText[i];
            } else if (targetText[i] === " ") {
                // Keep whitespace intact
                frame += " ";
            } else {
                // Scrambled glitch character
                frame += getRandomChar();
            }
        }
        frames.push(frame);
    }

    // Ensure the exact target string is the final frame
    frames.push(targetText);
    return frames;
}

export function generateCycleFrames(
    text: string,
    options: CycleOptions = {}
): string[] {
    const { pauseFrames = 10, cursor = '', blinkSpeed = 2 } = options;
    const frames: string[] = [];
    const words = text.split(" ");

    words.forEach((word) => {
        // 1. Type forward
        for (let i = 1; i <= word.length; i++) {
            frames.push(word.slice(0, i) + cursor);
        }

        // 2. Pause on complete word
        for (let p = 0; p < pauseFrames; p++) {
            const showCursor = Math.floor(p / Math.max(1, blinkSpeed)) % 2 === 0;
            frames.push(word + (showCursor ? cursor : ''));
        }

        // 3. Backspace / Delete
        for (let i = word.length - 1; i >= 0; i--) {
            frames.push(word.slice(0, i) + cursor);
        }
    });

    return frames;
}

export function toGradient(text: string, options: GradientOptions): string {
    const { fromColor, toColor, format = 'ansi' } = options;
    const len = text.length;
    if (len === 0) return '';

    return text
        .split('')
        .map((char, i) => {
            if (char === ' ') return char;
            const factor = len > 1 ? i / (len - 1) : 0;
            const r = Math.round(fromColor[0] + factor * (toColor[0] - fromColor[0]));
            const g = Math.round(fromColor[1] + factor * (toColor[1] - fromColor[1]));
            const b = Math.round(fromColor[2] + factor * (toColor[2] - fromColor[2]));

            return format === 'ansi'
                ? `\x1b[38;2;${r};${g};${b}m${char}\x1b[0m`
                : `<span style="color: rgb(${r}, ${g}, ${b})">${char}</span>`;
        })
        .join('');
}