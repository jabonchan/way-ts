import { normalize } from "./normalize.ts";
import { parseURL } from "../internal/parse-url.ts";

import * as strings from "../strings.ts";

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
