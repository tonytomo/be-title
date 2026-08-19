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
    animation?: 'inout' | 'scramble' | 'cycle';
    animationOptions?: InOutOptions | ScrambleOptions | CycleOptions
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