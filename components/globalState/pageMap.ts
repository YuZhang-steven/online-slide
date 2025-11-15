/**
 * A global Map to store page-related data.
 * The key is a string (e.g., presentation ID),
 * and the value is a Set of contents id. 
*/
export const pageMap = new Map<string, Set<string>>();