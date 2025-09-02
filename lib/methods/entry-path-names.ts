import { normalize } from "./normalize.ts";
import { separate } from "./separate.ts";
import { join } from "./join.ts";

import * as regexs from "../regexs.ts";

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

export function extname(entrypath: string | URL): string | null {
    const base = basename(entrypath);

    if (!base || !base.includes(".")) {
        return null;
    }

    const ext = base.split(".").at(-1)!.toLowerCase();

    return `.${ext}`;
}

export function stemname(entrypath: string | URL): string | null {
    const base = basename(entrypath);
    const ext = extname(entrypath);

    if (!ext || !base) {
        return base;
    }

    return base.slice(0, -ext.length) || null;
}

export function dirpath(entrypath: string | URL): string {
    return join(entrypath, "../");
}

export function dirname(entrypath: string | URL): string | null {
    return basename(dirpath(entrypath));
}

export function driveletter(entrypath: string | URL): string | null {
    entrypath = normalize(entrypath);
    const drive = entrypath.match(regexs.WINDOWS_ROOT)?.[1];

    if (!drive) {
        return null;
    }

    return drive;
}
