<h1 align="center">╰┈way-ts┈➤</h1>

<div align="center">
  <img src="https://github.com/jabonchan/way-ts/actions/workflows/deno.yml/badge.svg?branch=main"></img>
  <img src="https://img.shields.io/badge/Tested%20on%20Deno-2.7.14-blue"></img>
  <img src="https://img.shields.io/badge/Dependencies-1-yellow"></img>
</div>
<br />

A simple library I've made to work easily with paths in Deno 🦕 in a more
standardized 🌎 and predictable way.

<hr /><br />

## Why? 🤔

I know there are great and way more robust `path` libraries for Deno out there.
But honestly, I've never liked how they tend to use your OS' separator instead
of using a unified one. That has been a problem for me sometimes, so I decided
to code my own library that _—at least from my POV—_ is more predictable in the
resulting path string.

## Quick Note 📝

I originally created this library for my own personal use, but I thought it
could be helpful to others, so I decided to make it public. That said, updates
will **mostly depend on my own needs** as I continue to use **way-ts** in my
projects. While the APIs will reflect my current requirements, I'll aim to keep
it user-friendly. Just keep in mind that updates may not be frequent.

## Coding Style ✍️

<img align="right" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Deno_Logo_2024.svg/250px-Deno_Logo_2024.svg.png" alt="Deno Logo" width="80" height="80" />

The **way-ts** project follows Deno's official formatting standards. All source
code is automatically formatted using the `deno fmt` command, with settings
defined in the `deno.json` configuration file.

## Changelog 📋

### v0.0.4: The new ideal

- Now `normalize` no longer removes automatically the forbidden characters on
  Windows **unless** you use the windows formatting function. **This is a
  breaking change.**
- Updated the LICENSE's year.
- Included an automatic publishing workflow for JSR uploading.
- Updated Deno version on the testing workflow.
- Checking functions are no longer case insensitive. This removes security
  concerns.
- Retrieving the extension of a path returns the extension without normalizing
  it to lower/bigger case.

## Documentation 📚

You can import **way-ts** in your project like this:

```ts
import * as way from "jsr:@jabonchan/way-ts";
```

## Types 🗃️

#### `ParsedPath`

Encapsulates information about a path in a single structured object. The
properties correspond to the results returned by the various methods:

- [`way.extname`](#wayextname)
- [`way.stemname`](#waystemname)
- [`way.basename`](#waybasename)
- [`way.dirname`](#waydirname)
- [`way.dirpath`](#waydirpath)
- [`way.separate`](#wayseparate)
- [`way.driveletter`](#waydriveletter)
- [`way.normalize`](#waynormalize)
- [`way.windows`](#waywindows)
- [`way.unix`](#wayunix)

In the example below, each property includes a comment indicating the method it
derives from:

```ts
interface ParsedPath {
    entry: {
        extension: string | null; // way.extname
        stem: string | null; // way.stemname
        base: string | null; // way.basename
        path: {
            windows: string; // way.windows
            unix: string; // way.unix
            normal: string; // way.normalize
        };
    };

    directory: {
        name: string | null; // way.dirname
        path: string | null; // way.dirpath
    };

    entries: string[]; // way.separate
    drive: string | null; // way.driveletter
}
```

## Methods ✨

> This section provides an overview of the available methods in **way-ts**. Each
> method is designed to simplify path manipulation and ensure consistent
> behavior across different environments.

#### Formatting

- [`way.normalize`](#waynormalize): Normalize paths for consistency.
- [`way.separate`](#wayseparate): Split paths into components.
- [`way.windows`](#waywindows): Convert paths to Windows format.
- [`way.unix`](#wayunix): Convert paths to UNIX format.
- [`way.join`](#wayjoin): Combine multiple paths into one.

#### Runtime Info

- [`way.execPath`](#wayexecpath): Retrieve the executable path.
- [`way.cwd`](#waycwd): Get the current working directory.

#### Path Info

- [`way.basename`](#waybasename): Extract the base name of a path.
- [`way.extname`](#wayextname): Get the extension of a path.
- [`way.stemname`](#waystemname): Retrieve the stem name of a path.
- [`way.dirname`](#waydirname): Get the parent directory's name.
- [`way.dirpath`](#waydirpath): Retrieve the parent directory's path.
- [`way.driveletter`](#waydriveletter): Extract the drive letter from a path.
- [`way.parse`](#wayparse): Returns an object containing info about the path.

#### Logical Checks

- [`way.isAbsolute`](#wayisabsolute): Check if a path is absolute.
- [`way.isRelative`](#wayisrelative): Check if a path is relative.
- [`way.isSandboxed`](#wayissandboxed): Verify if a path is within a sandbox.
- [`way.isDriveLetter`](#wayisdriveletter): Determine if a string is a valid
  drive letter.

Each method is documented in detail below, with examples to help you understand
its usage.

---

#### `way.normalize`

> Unless otherwise stated, all paths returned by the functions in this module
> are passed to `way.normalize` first before being returned.

Normalizes a path-like `string` or `URL`. Normalizes relative directives,
removes surrounding slashes _(Except for root-only paths, such as `C:/` or
`/`)_, parses `file:` URLs, uses upper case for drive letters, does not remove
forbidden characters in Windows _(whether you're using UNIX-based systems or
Windows)_. UNIX separators _(`/`)_ are always used. Empty paths return `./`.

```ts
function normalize(entrypath: string | URL): string;
```

#### `way.separate`

Splits the path by its separators, returning an array of base names or relative
directives.

```ts
function separate(entrypath: string | URL): string[];
```

#### `way.windows`

> This method builds upon the output of [`way.normalize`](#waynormalize). While
> it replaces path separators with `\` and removes forbidden charset for Windows
> compatibility, all other aspects of the path remain normalized according to
> the rules defined by [`way.normalize`](#waynormalize).

Normalizes and replaces UNIX separators in the path with Windows separators. If
it's absolute and doesn't have a drive letter, it adds `C:/` at the start of the
path.

```ts
function windows(entrypath: string | URL): string;
```

#### `way.unix`

> This method builds upon the output of [`way.normalize`](#waynormalize). While
> it removes the drive letter, all other aspects of the path remain normalized
> according to the rules defined by [`way.normalize`](#waynormalize).

Normalizes the path, and, if it's absolute and has a drive letter, it removes
it.

```ts
function unix(entrypath: string | URL): string;
```

#### `way.join`

Combines all the given paths into a single one by appending each one at the end
of the previous one. Resolves relative directives. It can't go higher than the
root path by using relative directives _(i.e. `/` or `C:/`)_.

```ts
function join(
    entrypath1: string | URL,
    ...entrypaths: (string | URL)[]
): string;
```

#### `way.execPath`

> 🗝️ Requires `--allow-read` permission.

Returns the path provided by `Deno.execPath`.

```ts
function execPath(): string;
```

#### `way.cwd`

> 🗝️ Requires `--allow-read` permission.

Returns the path provided by `Deno.cwd`.

```ts
function cwd(): string;
```

#### `way.basename`

Returns the base name of a given path. If the path consists solely of a relative
directive _(e.g., `./` or `../`)_, `null` is returned. Additionally, the drive
letter _(including the `:`)_ is treated as a base name. In this library, the
_"base name"_ refers to both the stem and the extension—essentially, the full
name of the entry.

```ts
function basename(entrypath: string | URL): string | null;
```

#### `way.extname`

Returns the extension name _(including the `.`)_ of the path without changing
case. If it doesn't has an extension _(i.e. `make` or `../`)_ , `null` is
returned instead.

```ts
function extname(entrypath: string | URL): string | null;
```

#### `way.stemname`

Returns the stem name of the path. If it doesn't has a stem name _(i.e. `.env`
or `../`)_, `null` is returned instead. Additionally, the drive letter
_(including the `:`)_ is treated as a stem name.

```ts
function stemname(entrypath: string | URL): string | null;
```

#### `way.dirname`

Returns the parent directory's base name of the given path. If it doesn't has a
parent directory _(i.e. `./entry` or `../`)_, `null` is returned instead.

```ts
function dirname(entrypath: string | URL): string | null;
```

#### `way.dirpath`

Returns the parent directory of the given path. It can't go higher than the root
path _(i.e. `/` or `C:/`)_.

```ts
function dirpath(entrypath: string | URL): string;
```

#### `way.driveletter`

Returns the given path's drive letter _(`:` is not included)_. If none found,
`null` is returned.

```ts
function driveletter(entrypath: string | URL): string | null;
```

#### `way.parse`

Extracts information from the given path and returns it as a
[`ParsedPath`](#parsedpath) object. For details, see
[`ParsedPath`](#parsedpath).

```ts
function parse(entrypath: string | URL): ParsedPath;
```

#### `way.isAbsolute`

Checks if the provided path is absolute.

```ts
function isAbsolute(entrypath: string | URL): boolean;
```

#### `way.isRelative`

Checks if the provided path is relative.

```ts
function isRelative(entrypath: string | URL): boolean;
```

#### `way.isSandboxed`

Checks whether the `entrypath` is located within the `sandbox` path. This check
is **case-insensitive**. It will always return `false` if one or both paths are
relative.

```ts
function isSandboxed(sandbox: string | URL, entrypath: string | URL): boolean;
```

#### `way.isDriveLetter`

Checks if `drive` is a Windows drive letter. Returns `true` only for `LETTER:`
or `LETTER:/`. If the path includes anything beyond the drive letter, it returns
`false`.

```ts
function isDriveLetter(drive: string | URL): boolean;
```

## Running Tests ⚙️

**way-ts** uses Deno's built-in test feature. To run all the tests, use the
following command:

```bash
deno test
```

You can also pass the `--filter` flag to run specific tests based on their name
pattern:

```bash
deno test --filter match-pattern
```

To see the available test names, you can check the source code. Some of the test
names include:

- `path-checks`
- `path-info`
- `formatting`

## Dependencies 🗃️

**way-ts** uses Deno's [expect](https://jsr.io/@std/expect) from the
[Deno Standard Library](https://jsr.io/@std) for testing, which is licensed
under the MIT license. I do not own nor have any right over this dependency.

<br /><hr />

## LICENSE 🔒

**way-ts** is licensed under the MIT License. By using this library, you agree
to all the terms and conditions stated in the license.
