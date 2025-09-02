import { normalize } from "./normalize.ts";
import * as strings from "../strings.ts";

/**
 * Splits the path by its separators, returning an array
 * of base names or relative directives.
 */
export function separate(entrypath: string | URL): string[] {
    entrypath = normalize(entrypath);

    return entrypath.split(strings.UNIX_SEP).filter((entry) => entry.length);
}
