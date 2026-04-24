
/**
 * L2_04: Nested Comments Tree Transformation.
 */

const flatComments = [
    { id: 1, parentId: null, text: "Great post!" },
    { id: 2, parentId: 1, text: "I agree!" },
    { id: 3, parentId: 1, text: "Thanks for sharing." },
    { id: 4, parentId: 2, text: "Me too!" },
    { id: 5, parentId: null, text: "Interesting perspective." }
];

function transformToTree(comments) {
    const map = new Map();
    const tree = [];

    // Initialize map with empty replies
    comments.forEach(c => map.set(c.id, { ...c, replies: [] }));

    comments.forEach(c => {
        const commentWithReplies = map.get(c.id);
        if (c.parentId === null) {
            tree.push(commentWithReplies);
        } else {
            const parent = map.get(c.parentId);
            if (parent) {
                parent.replies.push(commentWithReplies);
            }
        }
    });

    return tree;
}

function renderComments(tree, depth = 0) {
    tree.forEach(comment => {
        console.log("  ".repeat(depth) + "↳ " + comment.text);
        if (comment.replies.length > 0) {
            renderComments(comment.replies, depth + 1);
        }
    });
}

// --- Test Suite ---
const commentTree = transformToTree(flatComments);
console.log("Rendering Nested Comments:");
renderComments(commentTree);
