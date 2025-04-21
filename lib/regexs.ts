export const ONLY_SEPARATORS = /^(\\|\/)+$/;

export const FILE_PROTOCOL = /^file:(\\|\/)*/i;

export const WINDOWS_ROOT = /^(?:\\|\/)*([a-zA-Z]):(?:\\|\/)*/;
export const UNIX_ROOT = /^\/+/;

export const WINDOWS_SEP = /\\+/g;
export const UNIX_SEP = /\/+/g;
export const PATH_SEP = /(\\|\/)+/g;

export const LEADING_RELATIVE = /^((?:\.{1,2}\/?)+$|(?:\.{1,2}\/)+)/;
export const RELATIVE_DIR = /^\.+$/;
export const CURRENT_DIR = /^\.$/;
export const PARENT_DIR = /^\.{2,}$/;

export const FORBIDDEN_CHARSET = /\:|\*|\?|\"|\<|\>|\|/g;
