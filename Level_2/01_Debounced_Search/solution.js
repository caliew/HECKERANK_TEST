
/**
 * L2_01: Debounced Search Logic.
 * This simulates a frontend component behavior.
 */


// 1. The Debounce Wrapper
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        if (timeoutId) clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

// 2. Mock API Call with variable delay to simulate network issues
async function mockApiSearch(query, networkDelay = 500) {
    console.log(`📡 API: Searching for "${query}" (Delay: ${networkDelay}ms)...`);
    return new Promise(resolve => setTimeout(() => {
        resolve(`Results for ${query}`);
    }, networkDelay));
}

// 3. The Implementation with Race Condition Protection
let lastQueryId = 0; // Keep track of the most recent request

const handleSearch = debounce(async (query) => {
    const myId = ++lastQueryId; // Increment ID for this specific call
    
    // Simulate a race condition: "h" is slow, "hack" is fast
    const delay = query === "h" ? 1000 : 200; 
    
    const results = await mockApiSearch(query, delay);
    
    // Check if a newer request has started since this one began
    if (myId !== lastQueryId) {
        console.log(`⚠️ RACE CONDITION: Ignoring outdated results for "${query}"`);
        return;
    }
    
    console.log(`✅ UI: Displaying ${results}`);
}, 300);

// --- Test Suite (Simulating Race Condition) ---
console.log("⌨️ User types 'h', waits, then types 'hack'...");

// Call 1: User types "h" and pauses
handleSearch("h"); 

// Call 2: After some time, user types "hack" and pauses
setTimeout(() => {
    handleSearch("hack");
}, 500); 

// Expected behavior: 
// 1. "h" starts first but is slow (1000ms).
// 2. "hack" starts later but is fast (200ms).
// 3. "hack" finishes first and updates UI.
// 4. "h" finishes last but IS IGNORED because it's outdated.
