import { parseURL } from '../internal/parse-url.ts'

import * as strings from '../strings.ts'
import * as regexs from '../regexs.ts'

export function normalize(entrypath: string | URL) {
    entrypath = parseURL(entrypath);

    if (regexs.ONLY_SEPARATORS.test(entrypath)) {
        return '/';
    }

    entrypath = strings.removeTrailing(
                    entrypath
                        .replace(regexs.FILE_PROTOCOL, strings.UNIX_SEP)
                        .replace(regexs.PATH_SEP, strings.UNIX_SEP)
                        .replace(regexs.WINDOWS_ROOT, '$1:/'),
                        
                    strings.UNIX_SEP);

    const entries = [ strings.CURRENT_DIR ];
    const root = regexs.WINDOWS_ROOT.test(entrypath) ? `${entrypath[0].toUpperCase()}:/` :
                 regexs.UNIX_ROOT.test(entrypath) ? strings.UNIX_SEP : strings.EMPTY;
    entrypath = entrypath.slice(root.length);
    
    for (let entryname of entrypath.split(strings.UNIX_SEP)) {
        if (regexs.RELATIVE_DIR.test(entryname)) {
            if (entryname === strings.CURRENT_DIR) {
                continue;
            }

            switch (entries.at(-1)) {
                case strings.PARENT_DIR:
                    entries.push(strings.PARENT_DIR);
                    break;

                case strings.CURRENT_DIR:
                    entries[0] = strings.PARENT_DIR;
                    break;

                default:
                    entries.pop();
                    break;
            }

            continue;
        }

        entryname = strings.removeTrailing(
                        entryname
                            .replace(regexs.FORBIDDEN_CHARSET, strings.EMPTY)
                            .trim(),

                        strings.CURRENT_DIR).trim();

        if (!entryname.length) {
            continue;
        }
        
        entries.push(entryname);
    }

    entrypath = entries.join(strings.UNIX_SEP);

    if (root.length) {
        entrypath = entrypath.replace(regexs.LEADING_RELATIVE, strings.EMPTY);
        entrypath = root + entrypath;
    }

    if (regexs.RELATIVE_DIR.test(entrypath) || (entrypath.endsWith(strings.TRAILING_CURRENT_DIR) || entrypath.endsWith(strings.TRAILING_PARENT_DIR))) {
        entrypath += strings.UNIX_SEP;
    }

    return entrypath;
}