# Removable Indices

## Problem Statement

Given two strings, `str1`, and `str2`, where `str1` contains exactly one character more than `str2`, find the indices of the characters in `str1` that can be removed to make `str1` equal to `str2`. Return the array of indices in increasing order. If it is not possible, return the array `[-1]`.

**Note:** Use 0-based indexing.

### Example

`str1 = "abdgggda"`
`str2 = "abdggda"`

Any "g" character at positions 3, 4, or 5 can be deleted to obtain `str2`. Return `[3, 4, 5]`.

## Input Format

The function `getRemovableIndices` has the following parameters:
- `string str1`: the string to modify
- `string str2`: the target string

## Output Format

- `int[]`: the indices of characters that can be removed from `str1` in ascending order, or `[-1]` if it is not possible to match `str2`.

## Constraints

- $2 \le |str1| \le 2 * 10^5$
- $1 \le |str2| \le 2 * 10^5$
- $|str1| = |str2| + 1$
- `str1` and `str2` only contain lowercase English letters.

## Performance & Optimization

### Naive Approach (O(N²))
A simple approach is to iterate through `str1`, remove the character at index `i`, and compare the resulting string with `str2`.
- **Complexity**: $O(N^2)$ because `.slice()` and string concatenation take $O(N)$ time inside a loop of size $N$.
- **Outcome**: This will likely cause a **Timeout** on hidden test cases where $N = 2 \times 10^5$.

### Optimized Approach (O(N))
Instead of modifying the string, we find the boundaries of matching characters from both ends:
1.  **Prefix Match (L)**: Find the longest common prefix length.
2.  **Suffix Match (R)**: Find the longest common suffix length.
3.  **Result Range**: Any index `i` such that the prefix before it and suffix after it match is valid. This range is `[n - 1 - R, L]`.
- **Complexity**: $O(N)$ as we only traverse the strings twice.
- **Outcome**: Passes all test cases within the time limit.
