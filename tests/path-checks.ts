import { expect } from 'jsr:@std/expect'
import * as way from '../mod.ts'

Deno.test('path-checks-sandbox', async t => {
    // Should NOT be sandboxed
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

    // Should be sandboxed
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
    // Should be relative
    await t.step('(Relative) ./', () => {
        const result = way.isRelative('./');
        expect(result).toBeTruthy();
    })

    await t.step('(Relative) ../', () => {
        const result = way.isRelative('../');
        expect(result).toBeTruthy();
    })

    await t.step('(Relative) ../B/../C/../', () => {
        const result = way.isRelative('../B/../C/../');
        expect(result).toBeTruthy();
    })

    await t.step('(Relative) ../C/././../C/../', () => {
        const result = way.isRelative('../C/././../C/../');
        expect(result).toBeTruthy();
    })

    // Should be absolute
    await t.step('(Absolute) C:/../../', () => {
        const result = way.isAbsolute('C:/../../');
        expect(result).toBeTruthy();
    })
});