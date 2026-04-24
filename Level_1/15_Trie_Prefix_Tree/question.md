# Q15: Search Suggestions System (Trie)

## Problem Description
Implement a search system where, as a user types a search word, the system suggests at most 3 words from a dictionary that share the same prefix.

## The Trick (Trie)
A **Trie (Prefix Tree)** is a tree where each node represents a character.
1. Build a Trie from the dictionary.
2. At each node, you can store a list of words that pass through this node (sorted lexicographically).
3. As the user types, navigate down the Trie and return the pre-stored words.

## Example
Input: `products = ["mobile","mouse","moneypot"], word = "mouse"`
Typed 'm': `["mobile","moneypot","mouse"]`
Typed 'mo': `["mobile","moneypot","mouse"]`
Typed 'mou': `["mouse"]`
