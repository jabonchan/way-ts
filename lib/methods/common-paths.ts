import { normalize } from "./normalize.ts";

export function execPath(): string {
    return normalize(Deno.execPath());
}

export function cwd(): string {
    return normalize(Deno.cwd());
}
