/**
 * Validate a Gregorian date
 * @param m - Month (1-12)
 * @param d - Day (1-31, depending on month)
 * @param y - Year (1-32767)
 * @returns True if the date is valid, false otherwise
 */
export function checkdate(m: number, d: number, y: number): boolean;

/**
 * Format a local time/date
 * @param format - The format string
 * @param timestamp - Optional timestamp (default: current time)
 * @returns Formatted date string
 */
export function date(format: string, timestamp?: number): string;

/**
 * Returns associative array with detailed info about given date
 * @param date - Date string in a format supported by strtotime()
 * @returns Associative array with date information
 */
export function date_parse(date: string): any;

/**
 * Get date/time information
 * @param timestamp - Optional timestamp (default: current time)
 * @returns Associative array with date/time information
 */
export function getdate(timestamp?: number): any;

/**
 * Format a GMT/UTC date/time
 * @param format - The format string
 * @param timestamp - Optional timestamp (default: current time)
 * @returns Formatted GMT date string
 */
export function gmdate(format: string, timestamp?: number): string;

/**
 * Get current time
 * @param return_float - Whether to return as float instead of array
 * @returns Array or float containing current time information
 */
export function gettimeofday(return_float?: boolean): any;

/**
 * Get Unix timestamp for a GMT date
 * @param hour - Hour (0-23)
 * @param minute - Minute (0-59)
 * @param second - Second (0-59)
 * @param month - Month (1-12)
 * @param day - Day (1-31)
 * @param year - Year (1-32767)
 * @returns Unix timestamp
 */
export function gmmktime(hour?: number, minute?: number, second?: number, month?: number, day?: number, year?: number): number;

/**
 * Format a local time/date as integer
 * @param format - The format character
 * @param timestamp - Optional timestamp (default: current time)
 * @returns Integer representation of the formatted date
 */
export function idate(format: string, timestamp?: number): number;

/**
 * Return current Unix timestamp with microseconds
 * @param get_as_float - Whether to return as float instead of string
 * @returns String or float containing current time in seconds.microseconds
 */
export function microtime(get_as_float?: boolean): string | number;

/**
 * Get Unix timestamp for a date
 * @param hour - Hour (0-23)
 * @param minute - Minute (0-59)
 * @param second - Second (0-59)
 * @param month - Month (1-12)
 * @param day - Day (1-31)
 * @param year - Year (1-32767)
 * @returns Unix timestamp
 */
export function mktime(hour?: number, minute?: number, second?: number, month?: number, day?: number, year?: number): number;

/**
 * Parse about any English textual datetime description into a Unix timestamp
 * @param text - The string to parse
 * @param now - The timestamp used to calculate relative dates
 * @returns Unix timestamp on success, false on failure
 */
export function strtotime(text: string, now?: number): number;

/**
 * Return current Unix timestamp
 * @returns Current Unix timestamp
 */
export function time(): number;
