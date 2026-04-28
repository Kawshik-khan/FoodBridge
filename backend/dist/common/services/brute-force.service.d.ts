export declare class BruteForceService {
    private readonly maxAttempts;
    private readonly lockSeconds;
    private readonly attempts;
    registerFailure(key: string): Promise<number>;
    clear(key: string): Promise<void>;
    isBlocked(key: string): Promise<Date | null>;
}
