import { normalize } from "./normalize.ts";
import * as strings from "../strings.ts";

export function separate(entrypath: string | URL): string[] {
    entrypath = normalize(entrypath);

    return entrypath.split(strings.UNIX_SEP).filter((entry) => entry.length);
}
