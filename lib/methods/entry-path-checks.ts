import { normalize } from "./normalize.ts";
import { separate } from "./separate.ts";
import { dirpath } from "./entry-path-names.ts";

import * as strings from "../strings.ts";
import * as regexs from "../regexs.ts";

/**
 * Checks if the provided path is absolute.
 */
export function isAbsolute(entrypath: string | URL): boolean {
    entrypath = normalize(entrypath);

    if (
        regexs.WINDOWS_ROOT.test(entrypath) || regexs.UNIX_ROOT.test(entrypath)
    ) {
        return true;
    }

    return false;
}

/**
 * Checks if the provided path is relative.
 */
export function isRelative(entrypath: string | URL): boolean {
    return !isAbsolute(entrypath);
}

/**
 * Checks whether the `entrypath` is located within the `sandbox` path.
 * This check is **case-insensitive**. It will always return `false` if one
 * or both paths are relative.
 */
export function isSandboxed(sandbox: string | URL, entrypath: string | URL): boolean {
    if (isRelative(sandbox) || isRelative(entrypath)) {
        return false;
    }

    const entriesEntrypath = separate(entrypath);
    const entriesSandbox = separate(sandbox);

    if (entriesEntrypath.length <= entriesSandbox.length) {
        return false;
    }

    const entryDirpath = `${dirpath(entrypath).toLowerCase()}/`;
    sandbox = `${normalize(sandbox).toLowerCase()}/`;

    return entryDirpath.startsWith(sandbox);
}

/**
 * Checks if `drive` is a Windows drive letter. Returns `true` only for `LETTER:`
 * or `LETTER:/`. If the path includes anything beyond the drive letter,
 * it returns `false`.
 */
export function isDriveLetter(drive: string | URL): boolean {
    drive = normalize(drive);
    drive = drive.replace(regexs.WINDOWS_ROOT, strings.EMPTY);

    return !drive.length;
}
