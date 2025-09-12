/*
# RMIT University Vietnam 
# Course: COSC2769 - Full Stack Development 
# Semester: 2025B 
# Assessment: Assignment 02 
# Author: Nguyen Thanh Dat
# ID: s4060872
*/



const path = require("path")

/**
 * Walks upward from `startDir` until it finds an ancestor directory
 * whose name matches `folderName` (case-insensitive).
 * Returns the absolute path if found, or null otherwise.
 */
function findAncestorNamed(startDir, folderName) {
    let dir = path.resolve(startDir);
    while (true) {
        if (path.basename(dir).toLowerCase() === folderName.toLowerCase()) return dir;
        const parent = path.dirname(dir);
        if (parent === dir) break; // reached filesystem root
        dir = parent;
    }
    return null;
}
// Find project root ("fullstack" folder)
const root = findAncestorNamed(__dirname, "fullstack")
// Build asset directories
const avatar_dir = path.join(root, "client", "assets", "user_avatar")
const item_image_dir = path.join(root, "client", "assets", "item_image")

module.exports = { avatar_dir, item_image_dir }