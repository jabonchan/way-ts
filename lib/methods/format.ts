import { isRelative } from "./entry-path-checks.ts";
import { normalize } from "./normalize.ts";

import * as strings from "../strings.ts";
import * as regexs from "../regexs.ts";

export function windows(entrypath: string | URL) {
    entrypath = normalize(entrypath).replace(
        regexs.UNIX_SEP,
        strings.WINDOWS_SEP,
    );

    if (isRelative(entrypath) || regexs.WINDOWS_ROOT.test(entrypath)) {
        return entrypath;
    }

    return `C:${entrypath}`;
}

export function unix(entrypath: string | URL) {
    entrypath = normalize(entrypath);

    if (isRelative(entrypath) || regexs.UNIX_ROOT.test(entrypath)) {
        return entrypath;
    }

    return entrypath.slice(2); // Remove drive letter and :
}
