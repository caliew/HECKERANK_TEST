
/**
 * Q15: Trie (Prefix Tree).
 */
class TrieNode {
    constructor() {
        this.children = {};
        this.suggestions = [];
    }
}

function suggestedProducts(products, searchWord) {
    products.sort();
    let root = new TrieNode();
    
    for (let p of products) {
        let curr = root;
        for (let char of p) {
            if (!curr.children[char]) curr.children[char] = new TrieNode();
            curr = curr.children[char];
            if (curr.suggestions.length < 3) curr.suggestions.push(p);
        }
    }
    
    let result = [];
    let curr = root;
    for (let char of searchWord) {
        if (curr) curr = curr.children[char];
        result.push(curr ? curr.suggestions : []);
    }
    return result;
}


// --- Test Suite ---
const products = ["mobile","mouse","moneypot","monitor","mousepad"];
const searchWord = "mouse";

console.log("Testing Trie Suggestions for 'mouse'...");
const results = suggestedProducts(products, searchWord);
results.forEach((sugg, i) => {
    console.log(`  Type "${searchWord.substring(0, i+1)}": [${sugg}]`);
});
