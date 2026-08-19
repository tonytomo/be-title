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
}

export interface ScrambleOptions {
    scrambleChars?: string;
    iterationsPerChar?: number;
}

export interface CycleOptions {
    pauseFrames?: number;
    cursor?: string;
}