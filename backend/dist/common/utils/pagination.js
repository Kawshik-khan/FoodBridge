"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeLimit = normalizeLimit;
function normalizeLimit(limit, fallback = 20, max = 100) {
    if (!limit || Number.isNaN(Number(limit)))
        return fallback;
    return Math.min(Number(limit), max);
}
//# sourceMappingURL=pagination.js.map