import { expect } from "jsr:@std/expect";
import * as way from "../mod.ts";

Deno.test("path-checks-sandbox", async (t) => {
    await t.step('way.isSandboxed("C:/", "C:/")', () => {
        const result = way.isSandboxed("C:/", "C:/");
        expect(result).toBeFalsy();
    });
    await t.step('way.isSandboxed("C:/", "/")', () => {
        const result = way.isSandboxed("C:/", "/");
        expect(result).toBeFalsy();
    });

    await t.step('way.isSandboxed("/", "C:/")', () => {
        const result = way.isSandboxed("/", "C:/");
        expect(result).toBeFalsy();
    });

    await t.step('way.isSandboxed("C:/", "/usr")', () => {
        const result = way.isSandboxed("C:/", "/usr");
        expect(result).toBeFalsy();
    });

    await t.step('way.isSandboxed("/", "/")', () => {
        const result = way.isSandboxed("/", "/");
        expect(result).toBeFalsy();
    });

    await t.step('way.isSandboxed("C:/Users/user", "C:/Users/userB")', () => {
        const result = way.isSandboxed("C:/Users/user", "C:/Users/userB");
        expect(result).toBeFalsy();
    });

    await t.step('way.isSandboxed("C:/", "C:/Users")', () => {
        const result = way.isSandboxed("C:/", "C:/Users");
        expect(result).toBeTruthy();
    });

    await t.step('way.isSandboxed("/", "/usr")', () => {
        const result = way.isSandboxed("/", "/usr");
        expect(result).toBeTruthy();
    });

    await t.step(
        'way.isSandboxed("/home/files", "/home/files/stuff/something")',
        () => {
            const result = way.isSandboxed(
                "/home/files",
                "/home/files/stuff/something",
            );

            expect(result).toBeTruthy();
        },
    );
});

Deno.test("path-checks-is-relative/absolute", async (t) => {
    await t.step('way.isRelative("./")', () => {
        const result = way.isRelative("./");
        expect(result).toBeTruthy();
    });

    await t.step('way.isRelative("../")', () => {
        const result = way.isRelative("../");
        expect(result).toBeTruthy();
    });

    await t.step('ay.isRelative("../B/../C/../")', () => {
        const result = way.isRelative("../B/../C/../");
        expect(result).toBeTruthy();
    });

    await t.step('way.isRelative("../C/././../C/../")', () => {
        const result = way.isRelative("../C/././../C/../");
        expect(result).toBeTruthy();
    });

    await t.step('way.isAbsolute("C:/../../")', () => {
        const result = way.isAbsolute("C:/../../");
        expect(result).toBeTruthy();
    });
});

Deno.test("path-checks-is-drive-letter", async (t) => {
    await t.step('way.isDriveLetter("C:/")', () => {
        const result = way.isDriveLetter("C:/");
        expect(result).toBeTruthy();
    });

    await t.step('way.isDriveLetter("D:/")', () => {
        const result = way.isDriveLetter("D:/");
        expect(result).toBeTruthy();
    });

    await t.step('way.isDriveLetter("f://")', () => {
        const result = way.isDriveLetter("f://");
        expect(result).toBeTruthy();
    });

    await t.step('way.isDriveLetter("N:/Dir")', () => {
        const result = way.isDriveLetter("N:/Dir");
        expect(result).toBeFalsy();
    });

    await t.step('way.isDriveLetter("/")', () => {
        const result = way.isDriveLetter("/");
        expect(result).toBeFalsy();
    });

    await t.step('way.isDriveLetter(new URL("file:////D:/"))', () => {
        const result = way.isDriveLetter(new URL("file:////D:/"));
        expect(result).toBeTruthy();
    });

    await t.step('way.isDriveLetter("M:")', () => {
        const result = way.isDriveLetter("M:");
        expect(result).toBeTruthy();
    });

    await t.step('way.isDriveLetter("\\Z:\\")', () => {
        const result = way.isDriveLetter("\\Z:\\");
        expect(result).toBeTruthy();
    });
});
