export interface CursorPaginationQuery {
    limit?: number;
    cursor?: string;
}
export declare function normalizeLimit(limit?: number, fallback?: number, max?: number): number;
