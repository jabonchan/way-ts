import { expect } from 'jsr:@std/expect'
import * as way from '../mod.ts'

Deno.test('formatting-normalize', async t => {
    await t.step('EMPTY -> ./', () => {
        const result = way.normalize('');
        expect(result).toEqual('./');
    });

    await t.step('(Only separators) //\\/ -> /', () => {
        const result = way.normalize('//\\/');
        expect(result).toEqual('/');
    });

    await t.step('(Only separators) / -> /', () => {
        const result = way.normalize('\\/');
        expect(result).toEqual('/');
    });

    await t.step('D -> ./D', () => {
        const result = way.normalize('D');
        expect(result).toEqual('./D');
    });

    await t.step('A//B//C -> ./A/B/C', () => {
        const result = way.normalize('A//B//C');
        expect(result).toEqual('./A/B/C');
    });

    await t.step('./../B/./C/../../D -> ../D', () => {
        const result = way.normalize('./../B/./C/../../D');
        expect(result).toEqual('../D');
    });

    await t.step('C:/./../B/./C/../../D/../../../ -> C:/', () => {
        const result = way.normalize('C:/./../B/./C/../../D/../../../');
        expect(result).toEqual('C:/');
    });

    await t.step('file:///C:/D/../E/./././L/..env.. -> C:/E/L/.env', () => {
        const result = way.normalize('file:///C:/D/../E/./././L/.env..');
        expect(result).toEqual('C:/E/L/.env');
    });

    await t.step('.. -> ../', () => {
        const result = way.normalize('..');
        expect(result).toEqual('../');
    });

    await t.step('C:\\ -> C:/', () => {
        const result = way.normalize('C:\\');
        expect(result).toEqual('C:/');
    });

    await t.step('C:\\.env -> C:/.env', () => {
        const result = way.normalize('C:\\.env');
        expect(result).toBe('C:/.env');
    });

    await t.step('./../B/../../ -> ../../', () => {
        const result = way.normalize('./../B/../../');
        expect(result).toBe('../../');
    });
});

Deno.test('formatting-join', async t => {
    await t.step('C:/Users/user + ../ -> C:/Users', () => {
        const result = way.join('C:/Users/user', '../');
        expect(result).toEqual('C:/Users');
    });

    await t.step('C:\\ + ..\ -> C:/', () => {
        const result = way.join('C:\\', '..\\');
        expect(result).toEqual('C:/');
    });
});

Deno.test('formatting-os', async t => {
    await t.step('(Windows) C:/Test -> C:\\Test', () => {
        const result = way.windows('C:/Test');
        expect(result).toEqual('C:\\Test');
    })
    await t.step('(Windows) /Test -> C:\\Test', () => {
        const result = way.windows('/Test');
        expect(result).toEqual('C:\\Test');
    });

    await t.step('(UNIX) C:\\Test -> /Test', () => {
        const result = way.unix('C:\\Test');
        expect(result).toEqual('/Test');
    });

    await t.step('(UNIX) \\Test -> /Test', () => {
        const result = way.unix('\\Test');
        expect(result).toEqual('/Test');
    });
});