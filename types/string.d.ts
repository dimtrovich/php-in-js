/**
 * Quote string with slashes in a C style
 * @param str - The string to be escaped
 * @param charlist - A list of characters to be escaped
 * @returns The escaped string
 */
export function addcslashes(str: string, charlist: string): string;

/**
 * Quote string with slashes
 * @param str - The string to be escaped
 * @returns The escaped string
 */
export function addslashes(str: string): string;

/**
 * Convert binary data into hexadecimal representation
 * @param s - A string
 * @returns The hexadecimal representation of the given string
 */
export function bin2hex(s: string): string;

/**
 * Alias of rtrim()
 * @param str - The input string
 * @param charlist - The list of characters to strip
 * @returns The modified string
 */
export function chop(str: string, charlist?: string): string;

/**
 * Generate a single-byte string from a number
 * @param codePt - The code point to convert to a character
 * @returns A single-character string containing the specified byte
 */
export function chr(codePt: number): string;

/**
 * Split a string into smaller chunks
 * @param body - The string to be chunked
 * @param chunklen - The chunk length
 * @param end - The line ending sequence
 * @returns The chunked string
 */
export function chunk_split(body: string, chunklen?: number, end?: string): string;

/**
 * Convert from one Cyrillic character set to another
 * @param str - The string to be converted
 * @param from - The source Cyrillic character set
 * @param to - The target Cyrillic character set
 * @returns The converted string
 */
export function convert_cyr_string(str: string, from: string, to: string): string;

/**
 * Uuencode a string
 * @param str - The string to be encoded
 * @returns The uuencoded data
 */
export function convert_uuencode(str: string): string;

/**
 * Return information about characters used in a string
 * @param str - The string to be examined
 * @param mode - See the manual for the different modes
 * @returns Depending on mode, returns an array or string with character information
 */
export function count_chars(str: string, mode: number): { [key: number]: number } | string;

/**
 * Calculates the crc32 polynomial of a string
 * @param str - The data
 * @returns The crc32 checksum of str
 */
export function crc32(str: string): number;

/**
 * Split a string by string
 * @param delimiter - The boundary string
 * @param string - The input string
 * @param limit - If limit is set and positive, the returned array will contain a maximum of limit elements
 * @returns Array of strings or null if delimiter is empty
 */
export function explode(delimiter: string, string: string, limit?: number): string[] | null;

/**
 * Returns the translation table used by htmlspecialchars() and htmlentities()
 * @param table - Which table to return
 * @param quote_style - The quote style
 * @returns The translation table as an array
 */
export function get_html_translation_table(table: number | string, quote_style?: number | string): { [key: string]: string };

/**
 * Convert HTML entities to their corresponding characters
 * @param string - The input string
 * @param quote_style - The quote style
 * @returns The decoded string
 */
export function html_entity_decode(string: string, quote_style?: number | string): string;

/**
 * Convert all applicable characters to HTML entities
 * @param string - The input string
 * @param quote_style - The quote style
 * @param charset - The character set
 * @param double_encode - Whether to encode existing html entities
 * @returns The encoded string
 */
export function htmlentities(string: string, quote_style?: number | string, charset?: string, double_encode?: boolean): string;

/**
 * Convert special characters to HTML entities
 * @param string - The string being converted
 * @param quote_style - The quote style
 * @param charset - The character set
 * @param double_encode - Whether to encode existing html entities
 * @returns The converted string
 */
export function htmlspecialchars(string: string, quote_style?: number | string, charset?: string, double_encode?: boolean): string;

/**
 * Convert special HTML entities back to characters
 * @param string - The string to decode
 * @param quote_style - The quote style
 * @returns The decoded string
 */
export function htmlspecialchars_decode(string: string, quote_style?: number | string): string;

/**
 * Join array elements with a string
 * @param glue - The string to use as glue
 * @param pieces - The array of strings to join
 * @returns A string containing a string representation of all the array elements in the same order, with the glue string between each element
 */
export function implode(glue: string, pieces: any[] | object): string;

/**
 * Alias of implode()
 * @param glue - The string to use as glue
 * @param pieces - The array of strings to join
 * @returns A string containing a string representation of all the array elements
 */
export function join(glue: string, pieces: any[] | object): string;

/**
 * Make a string's first character lowercase
 * @param str - The input string
 * @returns The resulting string
 */
export function lcfirst(str: string): string;

/**
 * Calculate Levenshtein distance between two strings
 * @param s1 - The first string
 * @param s2 - The second string
 * @returns The Levenshtein distance between the two argument strings
 */
export function levenshtein(s1: string, s2: string): number;

/**
 * Strip whitespace (or other characters) from the beginning of a string
 * @param str - The input string
 * @param charlist - The list of characters to strip
 * @returns The modified string
 */
export function ltrim(str: string, charlist?: string): string;

/**
 * Calculate the metaphone key of a string
 * @param word - The input string
 * @param max_phonemes - This parameter restricts the returned metaphone key to max_phonemes characters
 * @returns The metaphone key as a string
 */
export function metaphone(word: string, max_phonemes?: number): string;

/**
 * Inserts HTML line breaks before all newlines in a string
 * @param str - The input string
 * @param is_xhtml - Whether to use XHTML compatible line breaks
 * @returns The altered string
 */
export function nl2br(str: string, is_xhtml?: boolean): string;

/**
 * Format a number with grouped thousands
 * @param number - The number being formatted
 * @param decimals - Sets the number of decimal points
 * @param dec_point - Sets the separator for the decimal point
 * @param thousands_sep - Sets the thousands separator
 * @returns A formatted version of number
 */
export function number_format(number: number, decimals?: number, dec_point?: string, thousands_sep?: string): string;

/**
 * Return ASCII value of character
 * @param string - A character
 * @returns The ASCII value as an integer
 */
export function ord(string: string): number;

/**
 * Parses the string into variables
 * @param str - The input string
 * @param array - If the second parameter array is provided, variables are stored in this variable as array elements
 */
export function parse_str(str: string, array?: any): void;

/**
 * Convert a quoted-printable string to an 8 bit string
 * @param str - The input string
 * @returns The 8-bit binary string
 */
export function quoted_printable_decode(str: string): string;

/**
 * Convert a 8 bit string to a quoted-printable string
 * @param str - The input string
 * @returns The encoded string
 */
export function quoted_printable_encode(str: string): string;

/**
 * Quote meta characters
 * @param str - The input string
 * @returns The string with meta characters quoted
 */
export function quotemeta(str: string): string;

/**
 * Strip whitespace (or other characters) from the end of a string
 * @param str - The input string
 * @param charlist - The list of characters to strip
 * @returns The modified string
 */
export function rtrim(str: string, charlist?: string): string;

/**
 * Calculate the similarity between two strings
 * @param first - The first string
 * @param second - The second string
 * @param percent - By passing a reference as third argument, similar_text() will calculate the similarity in percent
 * @returns The number of matching chars
 */
export function similar_text(first: string, second: string, percent?: any): number;

/**
 * Calculate the soundex key of a string
 * @param str - The input string
 * @returns The soundex key as a string
 */
export function soundex(str: string): string;

/**
 * Split string into array by regular expression (deprecated)
 * @param delimiter - The regular expression pattern
 * @param string - The input string
 * @returns Array of strings or null on failure
 */
export function split(delimiter: string, string: string): string[] | null;

/**
 * Return a formatted string
 * @param format - The format string
 * @param args - The arguments to format
 * @returns The formatted string
 */
export function sprintf(format: string, ...args: any[]): string;

/**
 * Parses input from a string according to a format
 * @param str - The input string
 * @param format - The interpreted format for str
 * @param args - The variables to store the results
 * @returns Array of parsed values or number of assigned values
 */
export function sscanf(str: string, format: string, ...args: any[]): any[] | number;

/**
 * Parse a CSV string into an array
 * @param input - The string to parse
 * @param delimiter - Set the field delimiter (one character only)
 * @param enclosure - Set the field enclosure character (one character only)
 * @param escape - Set the escape character (one character only)
 * @returns An indexed array containing the fields read
 */
export function str_getcsv(input: string, delimiter?: string, enclosure?: string, escape?: string): string[];

/**
 * Case-insensitive version of str_replace()
 * @param search - The value being searched for
 * @param replace - The replacement value that replaces found search values
 * @param subject - The string or array being searched and replaced on
 * @returns String or array with replaced values
 */
export function str_ireplace(search: string | string[], replace: string | string[], subject: string | string[]): string | string[];

/**
 * Pad a string to a certain length with another string
 * @param input - The input string
 * @param pad_length - The length of the result string
 * @param pad_string - The string to use for padding
 * @param pad_type - Can be STR_PAD_RIGHT, STR_PAD_LEFT, or STR_PAD_BOTH
 * @returns The padded string
 */
export function str_pad(input: string, pad_length: number, pad_string?: string, pad_type?: string): string;

/**
 * Repeat a string
 * @param input - The string to be repeated
 * @param multiplier - Number of time the input string should be repeated
 * @returns The repeated string
 */
export function str_repeat(input: string, multiplier: number): string;

/**
 * Replace all occurrences of the search string with the replacement string
 * @param search - The value being searched for
 * @param replace - The replacement value that replaces found search values
 * @param subject - The string or array being searched and replaced on
 * @param count - If passed, this will be set to the number of replacements performed
 * @returns String or array with replaced values
 */
export function str_replace(search: string | string[], replace: string | string[], subject: string | string[], count?: any): string | string[];

/**
 * Perform the rot13 transform on a string
 * @param str - The input string
 * @returns The ROT13 version of the given string
 */
export function str_rot13(str: string): string;

/**
 * Randomly shuffles a string
 * @param str - The input string
 * @returns The shuffled string
 */
export function str_shuffle(str: string): string;

/**
 * Convert a string to an array
 * @param string - The input string
 * @param split_length - Maximum length of the chunk
 * @returns Array of chunks or false if split_length is less than 1
 */
export function str_split(string: string, split_length?: number): string[] | false;

/**
 * Binary safe case-insensitive string comparison
 * @param f_string1 - The first string
 * @param f_string2 - The second string
 * @returns Returns < 0 if f_string1 is less than f_string2; > 0 if f_string1 is greater than f_string2, and 0 if they are equal
 */
export function strcasecmp(f_string1: string, f_string2: string): number;

/**
 * Alias of strstr()
 * @param haystack - The input string
 * @param needle - If needle is not a string, it is converted to an integer and applied as the ordinal value of a character
 * @param bool - If true, strstr() returns the part of the haystack before the first occurrence of the needle
 * @returns The portion of string, or false if needle is not found
 */
export function strchr(haystack: string, needle: string, bool?: boolean): string | false;

/**
 * Binary safe string comparison
 * @param str1 - The first string
 * @param str2 - The second string
 * @returns Returns < 0 if str1 is less than str2; > 0 if str1 is greater than str2, and 0 if they are equal
 */
export function strcmp(str1: string, str2: string): number;

/**
 * Find length of initial segment not matching mask
 * @param str - The string to examine
 * @param mask - The list of characters to stop at
 * @param start - The position in str to start searching
 * @param length - The length of the segment from str to examine
 * @returns The length of the initial segment of str which consists entirely of characters not in mask
 */
export function strcspn(str: string, mask: string, start?: number, length?: number): number;

/**
 * Strip HTML and PHP tags from a string
 * @param input - The input string
 * @param allowed - You can use the optional second parameter to specify tags which should not be stripped
 * @returns The stripped string
 */
export function strip_tags(input: string, allowed?: string): string;

/**
 * Find position of first occurrence of a case-insensitive string
 * @param f_haystack - The string to search in
 * @param f_needle - The string to search for
 * @param f_offset - If specified, search will start this number of characters counted from the beginning of the string
 * @returns The position of where the needle exists relative to the beginning of the haystack string, or false if not found
 */
export function stripos(f_haystack: string, f_needle: string, f_offset?: number): number | false;

/**
 * Un-quotes a quoted string
 * @param str - The input string
 * @returns A string with backslashes stripped off
 */
export function stripslashes(str: string): string;

/**
 * Case-insensitive strstr()
 * @param haystack - The string to search in
 * @param needle - The string to search for
 * @param bool - If true, returns the part of the haystack before the first occurrence of the needle
 * @returns The portion of string, or false if needle is not found
 */
export function stristr(haystack: string, needle: string, bool?: boolean): string | false;

/**
 * Get string length
 * @param string - The string being measured for length
 * @returns The length of the string on success
 */
export function strlen(string: string): number;

/**
 * String comparisons using a "natural order" algorithm, case insensitive
 * @param str1 - The first string
 * @param str2 - The second string
 * @returns Returns < 0 if str1 is less than str2; > 0 if str1 is greater than str2, and 0 if they are equal
 */
export function strnatcasecmp(str1: string, str2: string): number;

/**
 * Binary safe case-insensitive string comparison of the first n characters
 * @param argStr1 - The first string
 * @param argStr2 - The second string
 * @param len - Number of characters to use in the comparison
 * @returns Returns < 0 if argStr1 is less than argStr2; > 0 if argStr1 is greater than argStr2, and 0 if they are equal
 */
export function strncasecmp(argStr1: string, argStr2: string, len: number): number;

/**
 * String comparisons using a "natural order" algorithm
 * @param f_string1 - The first string
 * @param f_string2 - The second string
 * @param f_version - If true, uses version_compare() instead
 * @returns Returns < 0 if f_string1 is less than f_string2; > 0 if f_string1 is greater than f_string2, and 0 if they are equal
 */
export function strnatcmp(f_string1: string, f_string2: string, f_version?: boolean): number;

/**
 * Binary safe string comparison of the first n characters
 * @param str1 - The first string
 * @param str2 - The second string
 * @param lgth - Number of characters to use in the comparison
 * @returns Returns < 0 if str1 is less than str2; > 0 if str1 is greater than str2, and 0 if they are equal
 */
export function strncmp(str1: string, str2: string, lgth: number): number;

/**
 * Search a string for any of a set of characters
 * @param haystack - The string where char_list is looked for
 * @param char_list - This parameter is case sensitive
 * @returns A string starting from the character found, or false if it is not found
 */
export function strpbrk(haystack: string, char_list: string): string | false;

/**
 * Find position of first occurrence of a string
 * @param haystack - The string to search in
 * @param needle - The string to search for
 * @param offset - If specified, search will start this number of characters counted from the beginning of the string
 * @returns The position of where the needle exists relative to the beginning of the haystack string, or false if not found
 */
export function strpos(haystack: string, needle: string, offset?: number): number | false;

/**
 * Find the last occurrence of a character in a string
 * @param haystack - The string to search in
 * @param needle - If needle contains more than one character, only the first is used
 * @returns This function returns the portion of haystack which starts at the last occurrence of needle and goes until the end of haystack
 */
export function strrchr(haystack: string, needle: string): string | false;

/**
 * Reverse a string
 * @param string - The string to be reversed
 * @returns The reversed string
 */
export function strrev(string: string): string;

/**
 * Find position of last occurrence of a case-insensitive string in a string
 * @param haystack - The string to search in
 * @param needle - The string to search for
 * @param offset - May be specified to begin searching an arbitrary number of characters into the string
 * @returns The position of where the needle exists relative to the beginning of the haystack string, or false if not found
 */
export function strripos(haystack: string, needle: string, offset?: number): number | false;

/**
 * Find position of last occurrence of a string in a string
 * @param haystack - The string to search in
 * @param needle - The string to search for
 * @param offset - May be specified to begin searching an arbitrary number of characters into the string
 * @returns The position of where the needle exists relative to the beginning of the haystack string, or false if not found
 */
export function strrpos(haystack: string, needle: string, offset?: number): number | false;

/**
 * Find length of initial segment matching mask
 * @param str1 - The first string
 * @param str2 - The second string
 * @param start - The start position of the string to examine
 * @param length - The length of the string from start to examine
 * @returns The length of the initial segment of str1 which consists entirely of characters in str2
 */
export function strspn(str1: string, str2: string, start?: number, length?: number): number;

/**
 * Find first occurrence of a string
 * @param haystack - The input string
 * @param needle - The string to search for
 * @param bool - If true, returns the part of the haystack before the first occurrence of the needle
 * @returns The portion of string, or false if needle is not found
 */
export function strstr(haystack: string, needle: string, bool?: boolean): string | false;

/**
 * Tokenize string
 * @param str - The string being tokenized
 * @param tokens - The list of token separators
 * @returns A string token
 */
export function strtok(str: string, tokens: string): string;

/**
 * Make a string lowercase
 * @param str - The input string
 * @returns The lowercased string
 */
export function strtolower(str: string): string;

/**
 * Make a string uppercase
 * @param str - The input string
 * @returns The uppercased string
 */
export function strtoupper(str: string): string;

/**
 * Return part of a string
 * @param str - The input string
 * @param start - If start is non-negative, the returned string will start at the start'th position in string
 * @param len - If length is given and is positive, the string returned will contain at most length characters
 * @returns The extracted part of string or false on failure
 */
export function substr(str: string, start: number, len?: number): string | false;

/**
 * Binary safe comparison of two strings from an offset, up to length characters
 * @param main_str - The main string being compared
 * @param str - The secondary string being compared
 * @param offset - The start position for the comparison
 * @param length - The length of the comparison
 * @param case_insensitivity - If true, comparison is case insensitive
 * @returns Returns < 0 if main_str from position offset is less than str, > 0 if it is greater than str, and 0 if they are equal
 */
export function substr_compare(main_str: string, str: string, offset: number, length?: number, case_insensitivity?: boolean): number | false;

/**
 * Count the number of substring occurrences
 * @param haystack - The string to search in
 * @param needle - The substring to search for
 * @param offset - The offset where to start counting
 * @param length - The maximum length after the specified offset to search for the substring
 * @returns The number of times the needle substring occurs in the haystack string or false on failure
 */
export function substr_count(haystack: string, needle: string, offset?: number, length?: number): number | false;

/**
 * Replace text within a portion of a string
 * @param str - The input string
 * @param replace - The replacement string
 * @param start - If start is positive, the replacing will begin at the start'th offset into string
 * @param length - If given and is positive, it represents the length of the portion of string which is to be replaced
 * @returns The result string
 */
export function substr_replace(str: string, replace: string, start: number, length?: number): string;

/**
 * Strip whitespace (or other characters) from the beginning and end of a string
 * @param str - The string that will be trimmed
 * @param charlist - The list of characters to strip
 * @returns The trimmed string
 */
export function trim(str: string, charlist?: string): string;

/**
 * Make a string's first character uppercase
 * @param str - The input string
 * @returns The resulting string
 */
export function ucfirst(str: string): string;

/**
 * Uppercase the first character of each word in a string
 * @param str - The input string
 * @returns The modified string
 */
export function ucwords(str: string): string;

/**
 * Converts a string from UTF-8 to ISO-8859-1
 * @param str_data - The UTF-8 encoded string
 * @returns Returns the ISO-8859-1 translation of str_data
 */
export function utf8_decode(str_data: string): string;

/**
 * Encodes an ISO-8859-1 string to UTF-8
 * @param argString - The ISO-8859-1 string
 * @returns The UTF-8 translation of argString
 */
export function utf8_encode(argString: string): string;

/**
 * Wraps a string to a given number of characters
 * @param str - The input string
 * @param int_width - The number of characters at which the string will be wrapped
 * @param str_break - The line is broken using the optional break parameter
 * @param cut - If the cut is set to true, the string is always wrapped at or before the specified width
 * @returns The given string wrapped at the specified column
 */
export function wordwrap(str: string, int_width?: number, str_break?: string, cut?: boolean): string;
