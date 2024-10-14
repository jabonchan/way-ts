import { expect } from 'jsr:@std/expect'
import * as way from '../mod.ts'

Deno.test('path-checks-sandbox', async t => {
    await t.step('(Not sandboxed) C:/ !-> C:/', () => {
        const result = way.isSandboxed('C:/', 'C:/');
        expect(result).toBeFalsy();
    });
    await t.step('(Not sandboxed) / !-> C:/', () => {
        const result = way.isSandboxed('C:/', '/');
        expect(result).toBeFalsy();
    });

    await t.step('(Not sandboxed) C:/ !-> /', () => {
        const result = way.isSandboxed('/', 'C:/');
        expect(result).toBeFalsy();
    });
    
    await t.step('(Not sandboxed) /usr !-> C:/', () => {
        const result = way.isSandboxed('C:/', '/usr');
        expect(result).toBeFalsy();
    });

    await t.step('(Not sandboxed) / !-> /', () => {
        const result = way.isSandboxed('/', '/');
        expect(result).toBeFalsy();
    });

    await t.step('(Not sandboxed) C:/Users/userB !-> C:/Users/user', () => {
        const result = way.isSandboxed('C:/Users/user', 'C:/Users/userB');
        expect(result).toBeFalsy();
    });

    await t.step('(Sandboxed) C:/Users -> C:/', () => {
        const result = way.isSandboxed('C:/', 'C:/Users');
        expect(result).toBeTruthy();
    });

    await t.step('(Sandboxed) /usr -> /', () => {
        const result = way.isSandboxed('/', '/usr');
        expect(result).toBeTruthy();
    });

    await t.step('(Sandboxed) /home/files/stuff/something -> /home/files', () => {
        const result = way.isSandboxed('/home/files', '/home/files/stuff/something');
        expect(result).toBeTruthy();
    });
});

Deno.test('path-checks-is-relative/absolute', async t => {
    await t.step('(Relative) ./', () => {
        const result = way.isRelative('./');
        expect(result).toBeTruthy();
    });

    await t.step('(Relative) ../', () => {
        const result = way.isRelative('../');
        expect(result).toBeTruthy();
    });

    await t.step('(Relative) ../B/../C/../', () => {
        const result = way.isRelative('../B/../C/../');
        expect(result).toBeTruthy();
    });

    await t.step('(Relative) ../C/././../C/../', () => {
        const result = way.isRelative('../C/././../C/../');
        expect(result).toBeTruthy();
    });

    await t.step('(Absolute) C:/../../', () => {
        const result = way.isAbsolute('C:/../../');
        expect(result).toBeTruthy();
    });
});

Deno.test('path-checks-is-drive-letter', async t => {
    await t.step('C:/ -> true', () => {
        const result = way.isDriveLetter('C:/');
        expect(result).toBeTruthy();
    });

    await t.step('D:/ -> true', () => {
        const result = way.isDriveLetter('D:/');
        expect(result).toBeTruthy();
    });

    await t.step('f:// -> true', () => {
        const result = way.isDriveLetter('f://');
        expect(result).toBeTruthy();
    });

    await t.step('N:/Dir -> false', () => {
        const result = way.isDriveLetter('N:/Dir');
        expect(result).toBeFalsy();
    });

    await t.step('/ -> false', () => {
        const result = way.isDriveLetter('/');
        expect(result).toBeFalsy();
    });

    await t.step("URL('file:////D:/') -> true", () => {
        const result = way.isDriveLetter(new URL('file:////D:/'));
        expect(result).toBeTruthy();
    });

    await t.step('M: -> true', () => {
        const result = way.isDriveLetter('M:');
        expect(result).toBeTruthy();
    });

    await t.step('\\Z:\\ -> true', () => {
        const result = way.isDriveLetter('\\Z:\\');
        expect(result).toBeTruthy();
    });
});