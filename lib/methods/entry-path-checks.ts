import { normalize } from './normalize.ts'
import { separate } from './separate.ts'
import { dirpath } from './entry-path-names.ts'

import * as regexs from '../regexs.ts'

export function isAbsolute(entrypath: string | URL) {
    entrypath = normalize(entrypath);

    if (regexs.WINDOWS_ROOT.test(entrypath) || regexs.UNIX_ROOT.test(entrypath)) {
        return true;
    }

    return false;
}

export function isRelative(entrypath: string | URL) {
    return !isAbsolute(entrypath);
}

export function isSandboxed(sandbox: string | URL, entrypath: string | URL) {
    if (isRelative(sandbox) || isRelative(entrypath) || separate(entrypath).length < 2) {
        return false;
    }

    const entryDirpath = `${dirpath(entrypath).toLowerCase()}/`;
    sandbox = `${normalize(sandbox).toLowerCase()}/`;

    return entryDirpath.startsWith(sandbox);
}
