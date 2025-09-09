/**
 * Decodes data encoded with MIME base64
 * @param data - The encoded data
 * @returns The decoded data
 */
export function base64_decode(data: string): string;

/**
 * Encodes data with MIME base64
 * @param data - The data to encode
 * @returns The encoded data
 */
export function base64_encode(data: string): string;

/**
 * Parse a URL and return its components
 * @param str - The URL to parse
 * @param component - Specify one of PHP_URL_SCHEME, PHP_URL_HOST, PHP_URL_PORT, PHP_URL_USER, PHP_URL_PASS, PHP_URL_PATH, PHP_URL_QUERY or PHP_URL_FRAGMENT to retrieve just a specific URL component
 * @returns Associative array or string with URL components
 */
export function parse_url(str: string, component?: string): any;

/**
 * Decode URL-encoded strings
 * @param str - The string to be decoded
 * @returns The decoded string
 */
export function rawurldecode(str: string): string;

/**
 * URL-encode according to RFC 3986
 * @param str - The string to be encoded
 * @returns The encoded string
 */
export function rawurlencode(str: string): string;

/**
 * Decodes URL-encoded string
 * @param str - The string to be decoded
 * @returns The decoded string
 */
export function urldecode(str: string): string;

/**
 * URL-encodes a string
 * @param str - The string to be encoded
 * @returns The encoded string
 */
export function urlencode(str: string): string;

/**
 * Fetches all the headers sent by the server in response to an HTTP request
 * @param url - The target URL
 * @param format - If the optional format parameter is set to true, get_headers() parses the response and sets the array's keys
 * @returns An indexed or associative array with the headers
 */
export function get_headers(url: string, format?: boolean): any;

/**
 * Generate URL-encoded query string
 * @param formdata - The object or array containing properties
 * @param numeric_prefix - If numeric indices are used in the base array and this parameter is provided, it will be prepended to the numeric index for elements in the base array only
 * @param arg_separator - arg_separator.output is used to separate arguments
 * @returns A URL-encoded string
 */
export function http_build_query(formdata: any, numeric_prefix?: string, arg_separator?: string): string;
