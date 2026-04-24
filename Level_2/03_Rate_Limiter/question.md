# Level 2 - Project 03: Rate Limiter (API Security)

## The Challenge
Implement a Rate Limiter that allows a maximum of `N` requests per `T` seconds for a given User ID.

### Requirements:
1.  If a user exceeds the limit, return `false` (or a "429 Too Many Requests" message).
2.  If within the limit, return `true`.
3.  **Efficiency:** It must handle many users without leaking memory.

### Why this is "Level 2":
It's a foundational skill for Backend and BFF development. It requires you to think about **timestamps** and **data cleanup**.

## The "Trick" (Sliding Window Log)
Keep a list of timestamps for each user. 
When a request comes in:
1. Filter out all timestamps older than `T` seconds.
2. If the remaining count is less than `N`, add the current timestamp and allow the request.
3. Otherwise, block it.
