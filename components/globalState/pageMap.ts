/**
 * A global Map to manage page-to-content relationships.
 * 
 * Each key is a string, typically the page ID or presentation ID.
 * Each value is a Set of content IDs (`string`) that belong to that page.
 * 
 * This is useful for:
 *  - Quickly retrieving all content IDs for a given page.
 *  - Managing page-specific operations (adding, removing, or reordering content).
 *  - Synchronizing content state in the canvas editor with the current page.
 */
export const pageMap = new Map<string, Set<string>>();