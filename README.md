# ╰┈way.ts┈➤
A simple library I've made to work easily with paths in Deno 🦕 in a more standardized 🌎 and predictable way.

---

## Why?

I know there are great and way more robust `path` libraries for Deno out there. But honestly, I've never liked how they tend to use your OS' separator instead of using a unified one.
That has been a problem for me sometimes, so I decided to code my own library that *—at least from my POV—* is more predictable in the resulting path string.

## Quick Note

I made this library for purely personal usage. Eventually, I decided to make it public, 'cuz why not? However, for the same reason, I won't really be updating this unless I need it.
Therefore, changes may or may not construct a very practical API, though it will <sup><sub>likely</sup></sub> remain "easy."

## Documentation

You can import **way.ts** in your project like this:
```ts
import * as way from 'https://raw.githubusercontent.com/jabonchan/way.ts/refs/heads/main/mod.ts'
```

#### `way.normalize`
> Unless otherwise stated, all paths returned by the functions in this module are passed to `way.normalize` first before being returned.

Normalizes a path-like `string` or `URL`. It normalizes relative directives, removes surrounding slashes, parses `file:` URLs, removes forbidden characters in Windows *(whether you're using
UNIX-based systems or Windows)*, and replaces Windows separators with UNIX separators.
```ts
function normalize(entrypath: string | URL): string
```

#### `way.execPath`
Returns the path provided by `Deno.execPath`.
```ts
function execPath(): string
```

#### `way.cwd`
Returns the path provided by `Deno.cwd`.
```ts
function cwd(): string
```

#### `way.join`
Combines all the given paths into a single one by appending each one at the end of the previous one. Resolves relative directives.
```ts
function join(entrypath1: string | URL, ...entrypaths: (string | URL)[]): string
```

#### `way.separate`
Splits the path by its separators, returning an array of base names or relative directives.
```ts
function separate(entrypath: string | URL): string[]
```

#### `way.windows`
Replaces UNIX separators in the path with Windows separators. If it's absolute and doesn't have a drive letter, it adds `C:/` at the start of the path.
```ts
function windows(entrypath: string): string
```

#### `way.unix`
Replaces Windows separators in the path with UNIX separators. If it's absolute and has a drive letter, it removes it.
```ts
function unix(entrypath: string): string
```

#### `way.basename`
Returns the base name of the path. If the path only contains a relative directive, it returns null. The drive letter (including the `:`) is also returned if it's the only one available.
```ts
function basename(entrypath: string | URL): string | null
```

Remaining exports coming soon™ <sup><sub>Don't count on it</sup></sub>

---

## LICENSE 🔒

**way.ts** is licensed under the MIT License. By using this library, you agree to all the terms and conditions stated in the license.
