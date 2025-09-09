/**
 * Decodes a JSON string
 * @param str_json - The JSON string being decoded
 * @returns The value encoded in JSON in appropriate PHP type
 */
export function json_decode(str_json: string): any;

/**
 * Returns the JSON representation of a value
 * @param mixed_val - The value being encoded
 * @returns JSON encoded string on success or null on failure
 */
export function json_encode(mixed_val: any): string | null;

/**
 * Returns the last error occurred
 * @returns An integer, the value can be one of the JSON error constants
 */
export function json_last_error(): number;
