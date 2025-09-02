import * as format from "./format.ts";
import * as names from "./entry-path-names.ts";

import { normalize } from "./normalize.ts";
import { separate } from "./separate.ts";

/**
 * Encapsulates information about a path in a single structured object. The properties correspond to the results returned by the various methods:
 * - `way.extname`
 * - `way.stemname`
 * - `way.basename`
 * - `way.dirname`
 * - `way.dirpath`
 * - `way.separate`
 * - `way.driveletter`
 * - `way.normalize`
 * - `way.windows`
 * - `way.unix`
 *
 * In the example below, each property includes a comment indicating the method it derives from:
 * ```ts
 * interface ParsedPath {
 *     entry: {
 *         extension: string | null; // way.extname
 *         stem: string | null;      // way.stemname
 *         base: string | null;      // way.basename
 *         path: {
 *             windows: string; // way.windows
 *             unix: string;    // way.unix
 *             normal: string;  // way.normalize
 *         }
 *     }
 *
 *     directory: {
 *         name: string | null; // way.dirname
 *         path: string | null; // way.dirpath
 *     }
 *
 *     entries: string[];    // way.separate
 *     drive: string | null; // way.driveletter
 * }
 * ```
 */
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

/**
 * Extracts information from the given path and returns it as a `ParsedPath`
 * object. For details, see `ParsedPath`.
 */
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
