
/**
 * L2_03: Rate Limiter (Sliding Window).
 */
class RateLimiter {
    constructor(limit, windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
        this.requests = new Map(); // userId -> [timestamps]
    }

    isAllowed(userId) {
        const now = Date.now();
        if (!this.requests.has(userId)) {
            this.requests.set(userId, [now]);
            return true;
        }

        let timestamps = this.requests.get(userId);
        
        // Remove timestamps outside the window
        timestamps = timestamps.filter(t => now - t < this.windowMs);
        
        if (timestamps.length < this.limit) {
            timestamps.push(now);
            this.requests.set(userId, timestamps);
            return true;
        }

        return false;
    }
}

// --- Test Suite ---
const limiter = new RateLimiter(3, 1000); // 3 requests per second

console.log("User 'Alice' makes 4 quick requests...");
console.log("Req 1:", limiter.isAllowed("Alice")); // true
console.log("Req 2:", limiter.isAllowed("Alice")); // true
console.log("Req 3:", limiter.isAllowed("Alice")); // true
console.log("Req 4:", limiter.isAllowed("Alice")); // false (Limit reached)

setTimeout(() => {
    console.log("Action: Wait 1 second...");
    console.log("Req 5 (After wait):", limiter.isAllowed("Alice")); // true
}, 1100);
