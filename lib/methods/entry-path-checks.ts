import { normalize } from './normalize.ts'
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
    entrypath = normalize(entrypath).toLowerCase();
    sandbox = normalize(sandbox).toLowerCase();

    if (isRelative(sandbox) || isRelative(entrypath)) {
        return false;
    }

    return entrypath.startsWith(sandbox);
}