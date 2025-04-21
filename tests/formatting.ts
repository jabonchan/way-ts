import { expect } from "jsr:@std/expect";
import * as way from "../mod.ts";

Deno.test("formatting-normalize", async (t) => {
    await t.step('way.normalize("")', () => {
        const result = way.normalize("");
        expect(result).toEqual("./");
    });

    await t.step('way.normalize("//\\/")', () => {
        const result = way.normalize("//\\/");
        expect(result).toEqual("/");
    });

    await t.step('way.normalize("\\/")', () => {
        const result = way.normalize("\\/");
        expect(result).toEqual("/");
    });

    await t.step('way.normalize("D")', () => {
        const result = way.normalize("D");
        expect(result).toEqual("./D");
    });

    await t.step('way.normalize("A//B//C")', () => {
        const result = way.normalize("A//B//C");
        expect(result).toEqual("./A/B/C");
    });

    await t.step('way.normalize("./../B/./C/../../D")', () => {
        const result = way.normalize("./../B/./C/../../D");
        expect(result).toEqual("../D");
    });

    await t.step('way.normalize("C:/./../B/./C/../../D/../../../")', () => {
        const result = way.normalize("C:/./../B/./C/../../D/../../../");
        expect(result).toEqual("C:/");
    });

    await t.step('way.normalize("file:///C:/D/../E/./././L/.env..")', () => {
        const result = way.normalize("file:///C:/D/../E/./././L/.env..");
        expect(result).toEqual("C:/E/L/.env");
    });

    await t.step('way.normalize("..")', () => {
        const result = way.normalize("..");
        expect(result).toEqual("../");
    });

    await t.step('way.normalize("C:\\")', () => {
        const result = way.normalize("C:\\");
        expect(result).toEqual("C:/");
    });

    await t.step('way.normalize("C:\\.env")', () => {
        const result = way.normalize("C:\\.env");
        expect(result).toBe("C:/.env");
    });

    await t.step('way.normalize("./../B/../../")', () => {
        const result = way.normalize("./../B/../../");
        expect(result).toBe("../../");
    });
});

Deno.test("formatting-join", async (t) => {
    await t.step('way.join("C:/Users/user", "../")', () => {
        const result = way.join("C:/Users/user", "../");
        expect(result).toEqual("C:/Users");
    });

    await t.step('way.join("C:\\", "..\\")', () => {
        const result = way.join("C:\\", "..\\");
        expect(result).toEqual("C:/");
    });
});

Deno.test("formatting-os", async (t) => {
    await t.step('way.windows("C:/Test")', () => {
        const result = way.windows("C:/Test");
        expect(result).toEqual("C:\\Test");
    });
    await t.step('way.windows("/Test")', () => {
        const result = way.windows("/Test");
        expect(result).toEqual("C:\\Test");
    });

    await t.step('way.unix("C:\\Test")', () => {
        const result = way.unix("C:\\Test");
        expect(result).toEqual("/Test");
    });

    await t.step('way.unix("\\Test")', () => {
        const result = way.unix("\\Test");
        expect(result).toEqual("/Test");
    });
});
