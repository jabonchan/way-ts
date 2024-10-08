import { normalize } from './normalize.ts'

export function execPath() {
    return normalize(Deno.execPath());
}

export function cwd() {
    return normalize(Deno.cwd());
}