import { expect } from 'jsr:@std/expect'
import * as way from '../mod.ts'

Deno.test('formatting-normalize', async t => {
    await t.step('EMPTY -> ./', () => {
        const result = way.normalize('');
        expect(result).toEqual('./');
    })

    await t.step('(Only separators) //\\/ -> /', () => {
        const result = way.normalize('//\\/');
        expect(result).toEqual('/');
    })

    await t.step('(Only separators) / -> /', () => {
        const result = way.normalize('\\/');
        expect(result).toEqual('/');
    })

    await t.step('./../B/./C/../../D -> ../D', () => {
        const result = way.normalize('./../B/./C/../../D');
        expect(result).toEqual('../D');
    })

    await t.step('C:/./../B/./C/../../D/../../../ -> C:/', () => {
        const result = way.normalize('C:/./../B/./C/../../D/../../../');
        expect(result).toEqual('C:/');
    })

    await t.step('file:///C:/D/../E/./././L/..env.. -> C:/E/L/.env', () => {
        const result = way.normalize('file:///C:/D/../E/./././L/.env..');
        expect(result).toEqual('C:/E/L/.env');
    })
})