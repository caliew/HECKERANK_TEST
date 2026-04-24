
/**
 * L2_02: LRU Cache Implementation.
 * Logic: Use a JS Map to maintain order. 
 * When an item is accessed, delete it and re-insert it to make it "Most Recent".
 */
class LRUCache {
    constructor(capacity) {
        this.capacity = capacity;
        this.cache = new Map();
    }

    get(key) {
        if (!this.cache.has(key)) return -1;

        // Move to the "end" (most recently used)
        const value = this.cache.get(key);
        this.cache.delete(key);
        this.cache.set(key, value);
        return value;
    }

    put(key, value) {
        if (this.cache.has(key)) {
            this.cache.delete(key);
        }
        
        this.cache.set(key, value);

        if (this.cache.size > this.capacity) {
            // Map.keys().next().value gives the FIRST (oldest) key
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }
    }
}

// --- Test Suite ---
const myCache = new LRUCache(2);

console.log("Action: Put(1, 1), Put(2, 2)");
myCache.put(1, 1);
myCache.put(2, 2);

console.log("Action: Get(1) -> Result:", myCache.get(1), "| Expected: 1"); // 1 becomes most recent

console.log("Action: Put(3, 3) (Capacity reached, should evict 2)");
myCache.put(3, 3);

console.log("Action: Get(2) -> Result:", myCache.get(2), "| Expected: -1");
console.log("Action: Get(3) -> Result:", myCache.get(3), "| Expected: 3");
