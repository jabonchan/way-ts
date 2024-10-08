import * as strings from '../strings.ts'
import * as regexs from '../regexs.ts'

export function parseURL(entrypath: string | URL) {
    if (entrypath instanceof URL) {
        entrypath = entrypath.href;
    }

    if (!regexs.FILE_PROTOCOL.test(entrypath)) {
        return entrypath;
    }

    entrypath = decodeURIComponent(entrypath);
    entrypath = entrypath.replace(regexs.FILE_PROTOCOL, strings.UNIX_SEP);

    return entrypath;
}