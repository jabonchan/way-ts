import { normalize } from "./normalize.ts";
import { separate } from "./separate.ts";
import { dirpath } from "./entry-path-names.ts";

import * as strings from "../strings.ts";
import * as regexs from "../regexs.ts";

export function isAbsolute(entrypath: string | URL) {
    entrypath = normalize(entrypath);

    if (
        regexs.WINDOWS_ROOT.test(entrypath) || regexs.UNIX_ROOT.test(entrypath)
    ) {
        return true;
    }

    return false;
}

export function isRelative(entrypath: string | URL) {
    return !isAbsolute(entrypath);
}

export function isSandboxed(sandbox: string | URL, entrypath: string | URL) {
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

export function isDriveLetter(drive: string | URL) {
    drive = normalize(drive);
    drive = drive.replace(regexs.WINDOWS_ROOT, strings.EMPTY);

    return !drive.length;
}
