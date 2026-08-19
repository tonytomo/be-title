export interface PlayOptions {
    speedMs?: number;
    loop?: boolean;
    onTick?: (frame: string) => void;
    onComplete?: () => void;
    options?: AnimateOptions
}

export interface AnimationController {
    pause: () => void;
    resume: () => void;
    stop: () => void;
    readonly isRunning: boolean;
}

export interface AnimateOptions {
    type?: 'letter' | 'word';
    reversed?: boolean;
    out?: boolean;
}