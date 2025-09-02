import { normalize } from "./normalize.ts";

/**
 * 🗝️ Requires `--allow-read` permission.
 * 
 * Returns the path provided by `Deno.execPath`
 */
export function execPath(): string {
    return normalize(Deno.execPath());
}

/**
 * 🗝️ Requires `--allow-read` permission.
 *
 * Returns the path provided by `Deno.cwd`.
 */
export function cwd(): string {
    return normalize(Deno.cwd());
}
