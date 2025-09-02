import { normalize } from "./normalize.ts";
import { separate } from "./separate.ts";
import { join } from "./join.ts";

import * as regexs from "../regexs.ts";

/**
 * Returns the base name of a given path. If the path consists
 * solely of a relative directive *(e.g., `./` or `../`)*, `null`
 * is returned. Additionally, the drive letter *(including the `:`)*
 * is treated as a base name. In this library, the *"base name"*
 * refers to both the stem and the extension—essentially, the full
 * name of the entry.
 */
export function basename(entrypath: string | URL): string | null {
    const name = separate(entrypath).at(-1);

    if (!name) {
        return null;
    }

    if (regexs.CURRENT_DIR.test(name) || regexs.PARENT_DIR.test(name)) {
        return null;
    }

    return name;
}

/**
 * Returns the extension name *(including the `.`)* of the path in
 * lower case. If it doesn't has an extension *(i.e. `make` or `../`)* ,
 * `null` is returned instead.
 */
export function extname(entrypath: string | URL): string | null {
    const base = basename(entrypath);

    if (!base || !base.includes(".")) {
        return null;
    }

    const ext = base.split(".").at(-1)!.toLowerCase();

    return `.${ext}`;
}

/**
 * Returns the stem name of the path. If it doesn't has a stem name
 * *(i.e. `.env` or `../`)*, `null` is returned instead. Additionally,
 * the drive letter *(including the `:`)* is treated as a stem name.
 */
export function stemname(entrypath: string | URL): string | null {
    const base = basename(entrypath);
    const ext = extname(entrypath);

    if (!ext || !base) {
        return base;
    }

    return base.slice(0, -ext.length) || null;
}

/**
 * Returns the parent directory of the given path. It can't go higher than
 * the root path *(i.e. `/` or `C:/`)*.
 */
export function dirpath(entrypath: string | URL): string {
    return join(entrypath, "../");
}

/**
 * Returns the parent directory's base name of the given path.
 * If it doesn't has a parent directory *(i.e. `./entry` or `../`)*,
 * `null` is returned instead.
 */
export function dirname(entrypath: string | URL): string | null {
    return basename(dirpath(entrypath));
}

/**
 * Returns the given path's drive letter *(`:` is not included)*. If
 * none found, `null` is returned.
 */
export function driveletter(entrypath: string | URL): string | null {
    entrypath = normalize(entrypath);
    const drive = entrypath.match(regexs.WINDOWS_ROOT)?.[1];

    if (!drive) {
        return null;
    }

    return drive;
}
