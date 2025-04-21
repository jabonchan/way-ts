import * as format from "./format.ts";
import * as names from "./entry-path-names.ts";

import { normalize } from "./normalize.ts";
import { separate } from "./separate.ts";

export interface ParsedPath {
    entry: {
        extension: string | null;
        stem: string | null;
        base: string | null;
        path: {
            windows: string;
            unix: string;
            normal: string;
        };
    };

    directory: {
        name: string | null;
        path: string | null;
    };

    entries: string[];
    drive: string | null;
}

export function parse(entrypath: string | URL): ParsedPath {
    entrypath = normalize(entrypath);

    return {
        entry: {
            extension: names.extname(entrypath),
            stem: names.stemname(entrypath),
            base: names.basename(entrypath),
            path: {
                windows: format.windows(entrypath),
                unix: format.unix(entrypath),
                normal: entrypath,
            },
        },

        directory: {
            name: names.dirname(entrypath),
            path: names.dirpath(entrypath),
        },

        entries: separate(entrypath),
        drive: names.driveletter(entrypath),
    };
}
