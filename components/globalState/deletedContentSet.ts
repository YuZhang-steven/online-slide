import { ContentLocal } from "./contentsMap";

export const deletedContentSet = new Set<ContentLocal>();

export function getDeletedContentsIDArray() {
    return Array.from(deletedContentSet).map(content => content.id);
}
export function getDeletedContentsUrlArray() {
    return Array.from(deletedContentSet).map(content => content.url);
}