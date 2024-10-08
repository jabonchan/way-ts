export const WINDOWS_SEP = '\\';
export const UNIX_SEP = '/';
export const EMPTY = '';

export const CURRENT_DIR = '.';
export const PARENT_DIR = '..';

export const TRAILING_CURRENT_DIR = '/.';
export const TRAILING_PARENT_DIR = '/..';

export function removeSurrounding(target: string, search: string) {
    return removeTrailing(removeLeading(target, search), search);
}

export function removeLeading(target: string, search: string) {
    while (target.startsWith(search))
        target = target.slice(search.length);

    return target;
}

export function removeTrailing(target: string, search: string) {
    while (target.endsWith(search))
        target = target.slice(0, -search.length);

    return target;
}