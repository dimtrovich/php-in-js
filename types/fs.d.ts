export type PATHINFO_OPTIONS = 'PATHINFO_DIRNAME' | 'PATHINFO_BASENAME' | 'PATHINFO_EXTENSION' | 'PATHINFO_FILENAME' | 'PATHINFO_ALL'

/**
 * Escape a string to be used as a shell argument
 * @param arg - The argument to escape
 * @returns The escaped string
 */
export function escapeshellarg(arg: string): string;

/**
 * Returns trailing name component of path
 * @param path - The path
 * @param suffix - If the name component ends in suffix, this will also be cut off
 * @returns The base name of the given path
 */
export function basename(path: string, suffix?: string): string;

/**
 * Returns parent directory's path
 * @param path - The path
 * @returns The parent directory's path
 */
export function dirname(path: string): string;

/**
 * Reads entire file into a string
 * @param url - URL or filename to read
 * @param flags - Flags to use when opening the file
 * @param context - Stream context resource
 * @param offset - The offset where the reading starts
 * @param maxLen - Maximum length of data read
 * @returns The read data or false on failure
 */
export function file_get_contents(url: string, flags?: number, context?: any, offset?: number, maxLen?: number): string | boolean;

/**
 * Returns information about a file path
 * @param path - The path to be parsed
 * @param options - Options specifying which elements to return
 * @returns Associative array or string containing path information
 */
export function pathinfo(path: string, options?: number|PATHINFO_OPTIONS|PATHINFO_OPTIONS[]): string | object | null;

/**
 * Returns canonicalized absolute pathname
 * @param path - The path being checked
 * @returns The canonicalized absolute path on success
 */
export function realpath(path: string): string;
