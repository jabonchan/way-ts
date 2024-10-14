<h1 align="center">╰┈way.ts┈➤</h1>

<div align="center">
  <img src="https://github.com/jabonchan/way.ts/actions/workflows/deno.yml/badge.svg"></img>
  <img src="https://img.shields.io/badge/Tested%20on%20Deno-2.0.0rc.10-blue"></img>
  <img src="https://img.shields.io/badge/way.ts%20Version-nightly-blue"></img>
  <img src="https://img.shields.io/badge/Dependencies-1-yellow"></img>
</div>
<br />

A simple library I've made to work easily with paths in Deno 🦕 in a more standardized 🌎 and predictable way.

<hr /><br />

## Why?

I know there are great and way more robust `path` libraries for Deno out there. But honestly, I've never liked how they tend to use your OS' separator instead of using a unified one. That has been a problem for me sometimes, so I decided to code my own library that *—at least from my POV—* is more predictable in the resulting path string.

## Quick Note 📝

I originally created this library for my own personal use, but I thought it could be helpful to others, so I decided to make it public. That said, updates will **mostly depend on my own needs** as I continue to use **way.ts** in my projects. While the APIs will reflect my current requirements, I'll aim to keep it user-friendly. Just keep in mind that updates may not be frequent.

## Changelog 📰

You can check the changes log [here](./CHANGELOG.md).

## Documentation 📚

You can import **way.ts** in your project like this:
```ts
import * as way from 'https://raw.githubusercontent.com/jabonchan/way.ts/refs/heads/main/mod.ts'
```

#### `way.normalize`
> Unless otherwise stated, all paths returned by the functions in this module are passed to `way.normalize` first before being returned.

Normalizes a path-like `string` or `URL`. Normalizes relative directives, removes surrounding slashes *(Except for root-only paths, such as `C:/` or `/`)*, parses `file:` URLs, uses upper case for drive letters, removes forbidden characters in Windows *(whether you're using UNIX-based systems or Windows)*. UNIX separators *(`/`)* are always used. Empty paths return `./`.
```ts
function normalize(entrypath: string | URL): string
```

#### `way.execPath`
> 🗝️ Requires `--allow-read` permission.

Returns the path provided by `Deno.execPath`.
```ts
function execPath(): string
```

#### `way.cwd`
> 🗝️ Requires `--allow-read` permission.
> 
Returns the path provided by `Deno.cwd`.
```ts
function cwd(): string
```

#### `way.join`
Combines all the given paths into a single one by appending each one at the end of the previous one. Resolves relative directives. It can't go higher than the root path by using relative directives *(i.e. `/` or `C:/`)*.
```ts
function join(entrypath1: string | URL, ...entrypaths: (string | URL)[]): string
```

#### `way.separate`
Splits the path by its separators, returning an array of base names or relative directives.
```ts
function separate(entrypath: string | URL): string[]
```

#### `way.windows`
Normalizes and replaces UNIX separators in the path with Windows separators. If it's absolute and doesn't have a drive letter, it adds `C:/` at the start of the path.
```ts
function windows(entrypath: string | URL): string
```

#### `way.unix`
Normalizes the path, and, if it's absolute and has a drive letter, it removes it.
```ts
function unix(entrypath: string | URL): string
```

#### `way.basename`
Returns the base name of a given path. If the path consists solely of a relative directive *(e.g., `./` or `../`)*, `null` is returned. Additionally, the drive letter *(including the `:`)* is treated as a base name. In this library, the *"base name"* refers to both the stem and the extension—essentially, the full name of the entry.
```ts
function basename(entrypath: string | URL): string | null
```

#### `way.extname`
Returns the extension name *(including the `.`)* of the path in lower case. If it doesn't has an extension *(i.e. `make` or `../`)* , `null` is returned instead.
```ts
function extname(entrypath: string | URL): string | null
```

#### `way.stemname`
Returns the stem name of the path. If it doesn't has a stem name *(i.e. `.env` or `../`)*, `null` is returned instead. Additionally, the drive letter *(including the `:`)* is treated as a stem name.
```ts
function stemname(entrypath: string | URL): string | null
```

#### `way.dirname`
Returns the parent directory's base name of the given path. If it doesn't has a parent directory *(i.e. `./entry` or `../`)*, `null` is returned instead.
```ts
function dirname(entrypath: string | URL): string | null
```

#### `way.dirpath`
Returns the parent directory of the given path. It can't go higher than the root path *(i.e. `/` or `C:/`)*.
```ts
function dirpath(entrypath: string | URL): string
```

#### `way.driveletter`
Returns the given path's drive letter *(`:` is not included)*. If none found, `null` is returned.
```ts
function driveletter(entrypath: string | URL): string | null
```

#### `way.isAbsolute`
Checks if the provided path is absolute.
```ts
function isAbsolute(entrypath: string | URL): boolean
```

#### `way.isRelative`
Checks if the provided path is relative.
```ts
function isRelative(entrypath: string | URL): boolean
```

#### `way.isSandboxed`
Checks whether the `entrypath` is located within the `sandbox` path. This check is **case-insensitive**. It will always return `false` if one or both paths are relative.
```ts
function isSandboxed(sandbox: string | URL, entrypath: string | URL): boolean
```

### `way.isDriveLetter`
Checks if `drive` is a Windows drive letter. Returns `true` only for `LETTER:` or `LETTER:/`. If the path includes anything beyond the drive letter, it returns `false`.
```ts
function isDriveLetter(drive: string | URL): boolean
```

## Running Tests ⚙️

**way.ts** uses Deno's built-in test feature. To run all the tests, use the following command:
```bash
deno test
```

You can also pass the `--filter` flag to run specific tests based on their name pattern:
```bash
deno test --filter match-pattern
```

To see the available test names, you can check the source code. Some of the test names include:
- `path-checks`
- `path-info`
- `formatting`

## Dependencies 🗃️

**way.ts** uses Deno's [expect](https://jsr.io/@std/expect) from the [Deno Standard Library](https://jsr.io/@std) for testing, which is licensed under the MIT license. I do not own nor have any right over this dependency.

<br /><hr />

## LICENSE 🔒

**way.ts** is licensed under the MIT License. By using this library, you agree to all the terms and conditions stated in the license.
