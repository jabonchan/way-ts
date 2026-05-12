import { isRelative } from "./entry-path-checks.ts";
import { normalize } from "./normalize.ts";

import * as strings from "../strings.ts";
import * as regexs from "../regexs.ts";

/**
 * This method builds upon the output of `way.normalize`.
 * While it replaces path separators with `\` and removes forbidden charset
 * for Windows compatibility, all other aspects of the path remain
 * normalized according to the rules defined by `way.normalize`.
 */
export function windows(entrypath: string | URL): string {
    entrypath = normalize(entrypath);

    if (isRelative(entrypath) || regexs.WINDOWS_ROOT.test(entrypath)) {
        entrypath = entrypath.slice(0, 2) +
            entrypath.slice(2).replace(regexs.FORBIDDEN_CHARSET, strings.EMPTY);
        entrypath = normalize(entrypath);

        return entrypath.replace(
            regexs.UNIX_SEP,
            strings.WINDOWS_SEP,
        );
    }

    return normalize(
        `C:${entrypath.replace(regexs.FORBIDDEN_CHARSET, strings.EMPTY)}`,
    ).replace(
        regexs.UNIX_SEP,
        strings.WINDOWS_SEP,
    );
}

/**
 * This method builds upon the output of `way.normalize`.
 * While it removes the drive letter, all other aspects of the path
 * remain normalized according to the rules defined by `way.normalize`.
 */
export function unix(entrypath: string | URL): string {
    entrypath = normalize(entrypath);

    if (isRelative(entrypath) || regexs.UNIX_ROOT.test(entrypath)) {
        return entrypath;
    }

    return entrypath.slice(2); // Remove drive letter and :
}
