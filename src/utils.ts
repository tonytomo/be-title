import { CycleOptions, InOutOptions, ScrambleOptions } from "./types";

export function generateInOutFrames(
    targetText: string,
    options: InOutOptions = {}
): string[] {
    const { type = 'letter', reversed = false, out = false, cursor = '', blinkSpeed = 100 } = options;

    const chars = targetText.split("");
    const words = targetText.split(" ");
    const frames: string[] = [];

    if (out && reversed) {
        if (type === 'letter') {
            for (let i = 0; i <= chars.length; i++) {
                const text = chars.slice(i)
                frames.push(text.join(""));
            }
        } else if (type === 'word') {
            for (let i = 0; i <= words.length; i++) {
                const text = words.slice(i)
                frames.push(text.join(" "));
            }
        }
    } else if (reversed) {
        if (type === 'letter') {
            for (let i = chars.length; i >= 0; i--) {
                const text = chars.slice(i);
                frames.push(text.join(""));
            }
        } else if (type === 'word') {
            for (let i = words.length; i >= 0; i--) {
                const text = words.slice(i);
                frames.push(text.join(" "));
            }
        }
    } else if (out) {
        if (type === 'letter') {
            for (let i = chars.length; i >= 0; i--) {
                const text = chars.slice(0, i);
                frames.push(text.join(""));
            }
        } else if (type === 'word') {
            for (let i = words.length; i >= 0; i--) {
                const text = words.slice(0, i);
                frames.push(text.join(" "));
            }
        }
    } else {
        if (type === 'letter') {
            for (let i = 0; i <= chars.length; i++) {
                const text = chars.slice(0, i)
                frames.push(text.join(""));
            }
        } else if (type === 'word') {
            for (let i = 0; i <= words.length; i++) {
                const text = words.slice(0, i)
                frames.push(text.join(" "));
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