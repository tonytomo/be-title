export interface TextInfo {
    chars: number;
    words: number;
    hasMinorWords: boolean;
}

export interface PlayOptions {
    speedMs?: number;
    loop?: boolean;
    onTick?: (frame: string) => void;
    onComplete?: () => void;
    animation?: 'inout' | 'scramble' | 'cycle' | 'wave';
    animationOptions?: InOutOptions | ScrambleOptions | CycleOptions | WaveOptions
}

export interface AnimationController {
    pause: () => void;
    resume: () => void;
    stop: () => void;
    readonly isRunning: boolean;
}

export interface InOutOptions {
    type?: 'letter' | 'word';
    reversed?: boolean;
    out?: boolean;
    cursor?: string;
    blinkSpeed?: number;
}

export interface ScrambleOptions {
    scrambleChars?: string;
    iterationsPerChar?: number;
}

export interface CycleOptions {
    pauseFrames?: number;
    cursor?: string;
    blinkSpeed?: number;
}

export interface WaveOptions {
    wavesCount?: number
}

export interface GradientOptions {
    fromColor: [number, number, number]; // [R, G, B]
    toColor: [number, number, number];   // [R, G, B]
    format?: 'ansi' | 'html';
}

export interface BoxOptions {
    padding?: number;
    style?: 'single' | 'double' | 'rounded';
}

export const BOX_STYLES = {
    single: { tl: '┌', tr: '┐', bl: '└', br: '┘', h: '─', v: '│' },
    double: { tl: '╔', tr: '╗', bl: '╚', br: '╝', h: '═', v: '║' },
    rounded: { tl: '╭', tr: '╮', bl: '╰', br: '╯', h: '─', v: '│' },
};