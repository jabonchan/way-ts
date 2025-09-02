import { normalize } from "./normalize.ts";
import { parseURL } from "../internal/parse-url.ts";

import * as strings from "../strings.ts";

/**
 * Combines all the given paths into a single one by appending
 * each one at the end of the previous one. Resolves relative
 * directives. It can't go higher than the root path by using
 * relative directives *(i.e. `/` or `C:/`)*.
 */
export function join(
    entrypath1: string | URL,
    ...entrypaths: (string | URL)[]
): string {
    entrypath1 = parseURL(entrypath1);
    entrypaths = entrypaths.map(parseURL);

    return normalize(
        entrypath1 + strings.UNIX_SEP + entrypaths.join(strings.UNIX_SEP),
    );
}
