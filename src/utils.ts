import { BOX_STYLES, BoxOptions, CycleOptions, FlickerOptions, GradientOptions, HideTextOptions, InOutOptions, ScrambleOptions, TruncateOptions, WaveOptions } from "./types.js";

export function truncateText(text: string, options?: TruncateOptions): string {
    const max = options?.max || 15;
    const suffix = options?.suffix || '...';
    const preserveWords = options?.preserveWords || true;
    if (text.length <= max) return text;

    const targetLen = max - suffix.length;
    if (targetLen <= 0) return suffix.slice(0, max);

    if (!preserveWords) {
        return text.slice(0, targetLen) + suffix;
    }

    const trimmed = text.slice(0, targetLen);
    const lastSpaceIndex = trimmed.lastIndexOf(" ");

    if (lastSpaceIndex === -1) {
        return trimmed + suffix;
    }

    return trimmed.slice(0, lastSpaceIndex).trimEnd() + suffix;
}

export function hideText(text: string, options?: HideTextOptions): string {
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

export function generateWaveFrames(text: string, options: WaveOptions = {}): string[] {
    const { wavesCount = 2 } = options;
    const frames: string[] = [];
    const chars = text.toLowerCase().split('');

    for (let w = 0; w < wavesCount; w++) {
        for (let i = 0; i < chars.length; i++) {
            if (chars[i] === ' ') continue;
            const frame = chars
                .map((char, idx) => (idx === i ? char.toUpperCase() : char))
                .join('');
            frames.push(frame);
        }
    }
    return frames;
}

export function generateFlickerFrames(
    text: string,
    options: FlickerOptions = {}
): string[] {
    const { flickerCount = 6 } = options;
    const frames: string[] = [];
    const blank = " ".repeat(text.length);

    for (let i = 0; i < flickerCount; i++) {
        // Alternate between visible, blank, and partial dimming
        frames.push(i % 2 === 0 ? blank : text);
    }
    frames.push(text); // Final stable state
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

export function toBox(text: string, options: BoxOptions = {}): string {
    const { padding = 1, style = 'rounded' } = options;
    const b = BOX_STYLES[style];
    const padStr = ' '.repeat(padding);
    const innerText = `${padStr}${text}${padStr}`;
    const width = innerText.length;

    const top = `${b.tl}${b.h.repeat(width)}${b.tr}`;
    const middle = `${b.v}${innerText}${b.v}`;
    const bottom = `${b.bl}${b.h.repeat(width)}${b.br}`;

    return [top, middle, bottom].join('\n');
}