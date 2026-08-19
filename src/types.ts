export interface PlayOptions {
    speedMs?: number;
    loop?: boolean;
    onTick?: (frame: string) => void;
    onComplete?: () => void;
    animation?: 'animate' | 'scramble';
    animationOptions?: InOutOptions | ScrambleOptions
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