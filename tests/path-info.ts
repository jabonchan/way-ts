import { expect } from 'jsr:@std/expect'
import * as way from '../mod.ts'

Deno.test('path-info-separate', async t => {
    await t.step("(Split) ../Dir1/Dir2/Dir3 -> [ '..', 'Dir1', 'Dir2', 'Dir3' ]", () => {
        const result = way.separate('../Dir1/Dir2/Dir3');
        expect(result).toEqual([ '..', 'Dir1', 'Dir2', 'Dir3' ]);
    });

    await t.step("(Split) ./Dir1/Dir2/Dir3 -> [ '.', 'Dir1', 'Dir2', 'Dir3' ]", () => {
        const result = way.separate('./Dir1/Dir2/Dir3');
        expect(result).toEqual([ '.', 'Dir1', 'Dir2', 'Dir3' ]);
    });

    await t.step("(Split) ../././../../ -> [ '..', '..', '..' ]", () => {
        const result = way.separate('../././../../');
        expect(result).toEqual([ '..', '..', '..' ]);
    });
});

Deno.test('path-info-stemname', async t => {
    await t.step('(Stemname) C:/ -> C:', () => {
        const result = way.stemname('C:/');
        expect(result).toBe('C:');
    });

    await t.step('(Stemname) C:/.ENV -> null', () => {
        const result = way.stemname('C:/.ENV');
        expect(result).toBe(null);
    });
    
    await t.step('(Stemname) C:/env -> env', () => {
        const result = way.stemname('C:/env');
        expect(result).toBe('env');
    });
    
    await t.step('(Stemname) /a/b.C -> b', () => {
        const result = way.stemname('/a/b.C');
        expect(result).toBe('b');
    });
    
    await t.step('(Stemname) / -> null', () => {
        const result = way.stemname('/');
        expect(result).toBe(null);
    });
});

Deno.test('path-info-extame', async t => {
    await t.step('(Extname) C:/ -> null', () => {
        const result = way.extname('C:/');
        expect(result).toBe(null);
    });

    await t.step('(Extname) C:/.ENV -> .env', () => {
        const result = way.extname('C:/.ENV');
        expect(result).toBe('.env');
    });
    
    await t.step('(Extname) C:/env -> null', () => {
        const result = way.extname('C:/env');
        expect(result).toBe(null);
    });
    
    await t.step('(Extname) /a/b.C -> .c', () => {
        const result = way.extname('/a/b.C');
        expect(result).toBe('.c');
    });
    
    await t.step('(Extname) / -> null', () => {
        const result = way.extname('/');
        expect(result).toBe(null);
    });
});

Deno.test('path-info-basename', async t => {
    await t.step('(Basename) C:/ -> C:', () => {
        const result = way.basename('C:/');
        expect(result).toBe('C:');
    });

    await t.step('(Basename) C:/.ENV -> .ENV', () => {
        const result = way.basename('C:/.ENV');
        expect(result).toBe('.ENV');
    });
    
    await t.step('(Basename) C:/env -> env', () => {
        const result = way.basename('C:/env');
        expect(result).toBe('env');
    });
    
    await t.step('(Basename) /a/b.C -> b.C', () => {
        const result = way.basename('/a/b.C');
        expect(result).toBe('b.C');
    });
    
    await t.step('(Basename) / -> null', () => {
        const result = way.basename('/');
        expect(result).toBe(null);
    });
});

Deno.test('path-info-dirname', async t => {
    await t.step('(Dirname) C:/ -> C:', () => {
        const result = way.dirname('C:/');
        expect(result).toBe('C:');
    });

    await t.step('(Dirname) C:/.ENV -> C:', () => {
        const result = way.dirname('C:/.ENV');
        expect(result).toBe('C:');
    });
    
    await t.step('(Dirname) C:/env -> C:', () => {
        const result = way.dirname('C:/env');
        expect(result).toBe('C:');
    });
    
    await t.step('(Dirname) /a/b.C -> a', () => {
        const result = way.dirname('/a/b.C');
        expect(result).toBe('a');
    });
    
    await t.step('(Dirname) / -> null', () => {
        const result = way.dirname('/');
        expect(result).toBe(null);
    });
    
    await t.step('(Dirname) ../MyDir/MyFile -> MyDir', () => {
        const result = way.dirname('../MyDir/MyFile');
        expect(result).toBe('MyDir');
    });
    
    await t.step('(Dirname) ../MyDir/../ -> null', () => {
        const result = way.dirname('../MyDir/../');
        expect(result).toBe(null);
    });
});

Deno.test('path-info-dirpath', async t => {
    await t.step('(Dirpath) C:/ -> C:/', () => {
        const result = way.dirpath('C:/');
        expect(result).toBe('C:/');
    });

    await t.step('(Dirpath) C:/.ENV -> C:/', () => {
        const result = way.dirpath('C:/.ENV');
        expect(result).toBe('C:/');
    });
    
    await t.step('(Dirpath) C:/env -> C:/', () => {
        const result = way.dirpath('C:/env');
        expect(result).toBe('C:/');
    });
    
    await t.step('(Dirpath) /a/b.C -> /a', () => {
        const result = way.dirpath('/a/b.C');
        expect(result).toBe('/a');
    });
    
    await t.step('(Dirpath) / -> /', () => {
        const result = way.dirpath('/');
        expect(result).toBe('/');
    });
    
    await t.step('(Dirpath) ../MyDir/MyFile -> MyDir', () => {
        const result = way.dirpath('../MyDir/MyFile');
        expect(result).toBe('../MyDir');
    });
    
    await t.step('(Dirpath) ../MyDir/../ -> ../../', () => {
        const result = way.dirpath('../MyDir/../');
        expect(result).toBe('../../');
    });
    
    await t.step('(Dirpath) ../MyDirA/MyDirB/MyDirC/MyFile -> ../MyDirA/MyDirB/MyDirC', () => {
        const result = way.dirpath('../MyDirA/MyDirB/MyDirC/MyFile');
        expect(result).toBe('../MyDirA/MyDirB/MyDirC');
    });  
});

Deno.test('path-info-driveletter', async t => {
    await t.step('(Drive Letter) ../ -> null', () => {
        const result = way.driveletter('../');
        expect(result).toBe(null);
    });

    await t.step('(Drive Letter) C:/../ -> C', () => {
        const result = way.driveletter('C:/../');
        expect(result).toBe('C');
    });

    await t.step('(Drive Letter) F:/.././A/B/C ->F', () => {
        const result = way.driveletter('F:/.././A/B/C');
        expect(result).toBe('F');
    });

    await t.step('(Drive Letter) ./ -> null', () => {
        const result = way.driveletter('./');
        expect(result).toBe(null);
    });

    await t.step('(Drive Letter) / -> null', () => {
        const result = way.driveletter('/');
        expect(result).toBe(null);
    });

    await t.step('(Drive Letter) F/ -> null', () => {
        const result = way.driveletter('F/');
        expect(result).toBe(null);
    });
});