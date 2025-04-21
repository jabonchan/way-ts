import { expect } from "jsr:@std/expect";
import * as way from "../mod.ts";

Deno.test("path-info-parse", async (t) => {
    await t.step('way.parse("C:/")', () => {
        const result = way.parse("C:/");

        expect(result).toEqual({
            entry: {
                extension: null,
                stem: "C:",
                base: "C:",
                path: {
                    normal: "C:/",
                    unix: "/",
                    windows: "C:\\",
                },
            },

            directory: {
                name: "C:",
                path: "C:/",
            },

            entries: ["C:"],
            drive: "C",
        });
    });

    await t.step('way.parse("C:/.ENV")', () => {
        const result = way.parse("C:/.ENV");

        expect(result).toEqual({
            entry: {
                extension: ".env",
                stem: null,
                base: ".ENV",
                path: {
                    normal: "C:/.ENV",
                    windows: "C:\\.ENV",
                    unix: "/.ENV",
                },
            },

            directory: {
                name: "C:",
                path: "C:/",
            },

            entries: ["C:", ".ENV"],
            drive: "C",
        });
    });

    await t.step('way.parse("C:/Dir1/Dir2/Dir3/.././../Dir4")', () => {
        const result = way.parse("C:/Dir1/Dir2/Dir3/.././../Dir4");

        expect(result).toEqual({
            entry: {
                extension: null,
                stem: "Dir4",
                base: "Dir4",
                path: {
                    normal: "C:/Dir1/Dir4",
                    windows: "C:\\Dir1\\Dir4",
                    unix: "/Dir1/Dir4",
                },
            },

            directory: {
                name: "Dir1",
                path: "C:/Dir1",
            },

            entries: ["C:", "Dir1", "Dir4"],
            drive: "C",
        });
    });

    await t.step('way.parse("/a/b.C")', () => {
        const result = way.parse("/a/b.C");

        expect(result).toEqual({
            entry: {
                extension: ".c",
                stem: "b",
                base: "b.C",
                path: {
                    normal: "/a/b.C",
                    windows: "C:\\a\\b.C",
                    unix: "/a/b.C",
                },
            },

            directory: {
                name: "a",
                path: "/a",
            },

            entries: ["a", "b.C"],
            drive: null,
        });
    });
});

Deno.test("path-info-separate", async (t) => {
    await t.step('way.separate("../Dir1/Dir2/Dir3")', () => {
        const result = way.separate("../Dir1/Dir2/Dir3");
        expect(result).toEqual(["..", "Dir1", "Dir2", "Dir3"]);
    });

    await t.step('way.separate("./Dir1/Dir2/Dir3")', () => {
        const result = way.separate("./Dir1/Dir2/Dir3");
        expect(result).toEqual([".", "Dir1", "Dir2", "Dir3"]);
    });

    await t.step('way.separate("../././../../")', () => {
        const result = way.separate("../././../../");
        expect(result).toEqual(["..", "..", ".."]);
    });
});

Deno.test("path-info-stemname", async (t) => {
    await t.step('way.stemname("C:/")', () => {
        const result = way.stemname("C:/");
        expect(result).toBe("C:");
    });

    await t.step('way.stemname("C:/.ENV")', () => {
        const result = way.stemname("C:/.ENV");
        expect(result).toBe(null);
    });

    await t.step('way.stemname("C:/env")', () => {
        const result = way.stemname("C:/env");
        expect(result).toBe("env");
    });

    await t.step('way.stemname("/a/b.C")', () => {
        const result = way.stemname("/a/b.C");
        expect(result).toBe("b");
    });

    await t.step('way.stemname("/")', () => {
        const result = way.stemname("/");
        expect(result).toBe(null);
    });
});

Deno.test("path-info-extame", async (t) => {
    await t.step('way.extname("C:/")', () => {
        const result = way.extname("C:/");
        expect(result).toBe(null);
    });

    await t.step('way.extname("C:/.ENV")', () => {
        const result = way.extname("C:/.ENV");
        expect(result).toBe(".env");
    });

    await t.step('way.extname("C:/env")', () => {
        const result = way.extname("C:/env");
        expect(result).toBe(null);
    });

    await t.step('way.extname("/a/b.C")', () => {
        const result = way.extname("/a/b.C");
        expect(result).toBe(".c");
    });

    await t.step('way.extname("/")', () => {
        const result = way.extname("/");
        expect(result).toBe(null);
    });
});

Deno.test("path-info-basename", async (t) => {
    await t.step('way.basename("C:/")', () => {
        const result = way.basename("C:/");
        expect(result).toBe("C:");
    });

    await t.step('way.basename("C:/.ENV")', () => {
        const result = way.basename("C:/.ENV");
        expect(result).toBe(".ENV");
    });

    await t.step("(Basename) C:/env -> env", () => {
        const result = way.basename("C:/env");
        expect(result).toBe("env");
    });

    await t.step('way.basename("/a/b.C")', () => {
        const result = way.basename("/a/b.C");
        expect(result).toBe("b.C");
    });

    await t.step('way.basename("/")', () => {
        const result = way.basename("/");
        expect(result).toBe(null);
    });
});

Deno.test("path-info-dirname", async (t) => {
    await t.step('way.dirname("C:/")', () => {
        const result = way.dirname("C:/");
        expect(result).toBe("C:");
    });

    await t.step('way.dirname("C:/.ENV")', () => {
        const result = way.dirname("C:/.ENV");
        expect(result).toBe("C:");
    });

    await t.step('way.dirname("C:/env")', () => {
        const result = way.dirname("C:/env");
        expect(result).toBe("C:");
    });

    await t.step('way.dirname("/a/b.C")', () => {
        const result = way.dirname("/a/b.C");
        expect(result).toBe("a");
    });

    await t.step('way.dirname("/")', () => {
        const result = way.dirname("/");
        expect(result).toBe(null);
    });

    await t.step('way.dirname("../MyDir/MyFile")', () => {
        const result = way.dirname("../MyDir/MyFile");
        expect(result).toBe("MyDir");
    });

    await t.step('way.dirname("../MyDir/../")', () => {
        const result = way.dirname("../MyDir/../");
        expect(result).toBe(null);
    });
});

Deno.test("path-info-dirpath", async (t) => {
    await t.step('way.dirpath("C:/")', () => {
        const result = way.dirpath("C:/");
        expect(result).toBe("C:/");
    });

    await t.step('way.dirpath("C:/.ENV")', () => {
        const result = way.dirpath("C:/.ENV");
        expect(result).toBe("C:/");
    });

    await t.step('way.dirpath("C:/env")', () => {
        const result = way.dirpath("C:/env");
        expect(result).toBe("C:/");
    });

    await t.step('way.dirpath("/a/b.C")', () => {
        const result = way.dirpath("/a/b.C");
        expect(result).toBe("/a");
    });

    await t.step('way.dirpath("/")', () => {
        const result = way.dirpath("/");
        expect(result).toBe("/");
    });

    await t.step('way.dirpath("../MyDir/MyFile")', () => {
        const result = way.dirpath("../MyDir/MyFile");
        expect(result).toBe("../MyDir");
    });

    await t.step('way.dirpath("../MyDir/../")', () => {
        const result = way.dirpath("../MyDir/../");
        expect(result).toBe("../../");
    });

    await t.step('way.dirpath("../MyDirA/MyDirB/MyDirC/MyFile")', () => {
        const result = way.dirpath("../MyDirA/MyDirB/MyDirC/MyFile");
        expect(result).toBe("../MyDirA/MyDirB/MyDirC");
    });
});

Deno.test("path-info-driveletter", async (t) => {
    await t.step('way.driveletter("../")', () => {
        const result = way.driveletter("../");
        expect(result).toBe(null);
    });

    await t.step('way.driveletter("C:/../")', () => {
        const result = way.driveletter("C:/../");
        expect(result).toBe("C");
    });

    await t.step('way.driveletter("F:/.././A/B/C")', () => {
        const result = way.driveletter("F:/.././A/B/C");
        expect(result).toBe("F");
    });

    await t.step('way.driveletter("./")', () => {
        const result = way.driveletter("./");
        expect(result).toBe(null);
    });

    await t.step('way.driveletter("/")', () => {
        const result = way.driveletter("/");
        expect(result).toBe(null);
    });

    await t.step('way.driveletter("F/")', () => {
        const result = way.driveletter("F/");
        expect(result).toBe(null);
    });
});
