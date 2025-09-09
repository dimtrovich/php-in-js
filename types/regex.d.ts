/**
 * Return array entries that match the pattern
 * @param pattern - The pattern to search for, as a string or RegExp
 * @param input - The input array
 * @param flags - If set to PREG_GREP_INVERT, this function returns the elements of the input array that do not match the given pattern
 * @returns Array containing the matching elements
 */
export function preg_grep(pattern: string | RegExp, input: any, flags?: number | string): any;

/**
 * Quote regular expression characters
 * @param str - The input string
 * @param delimiter - If the optional delimiter is specified, it will also be escaped
 * @returns The quoted (escaped) string
 */
export function preg_quote(str: string, delimiter?: string): string;
