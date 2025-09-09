/**
 * Absolute value
 * @param mixed_number - The numeric value to process
 * @returns The absolute value of number
 */
export function abs(mixed_number: number): number;

/**
 * Arc cosine
 * @param arg - The argument to process
 * @returns The arc cosine of arg in radians
 */
export function acos(arg: number): number;

/**
 * Inverse hyperbolic cosine
 * @param arg - The value to process
 * @returns The inverse hyperbolic cosine of arg
 */
export function acosh(arg: number): number;

/**
 * Arc sine
 * @param arg - The argument to process
 * @returns The arc sine of arg in radians
 */
export function asin(arg: number): number;

/**
 * Inverse hyperbolic sine
 * @param arg - The value to process
 * @returns The inverse hyperbolic sine of arg
 */
export function asinh(arg: number): number;

/**
 * Arc tangent
 * @param arg - The argument to process
 * @returns The arc tangent of arg in radians
 */
export function atan(arg: number): number;

/**
 * Arc tangent of two variables
 * @param y - Dividend parameter
 * @param x - Divisor parameter
 * @returns The arc tangent of y/x in radians
 */
export function atan2(y: number, x: number): number;

/**
 * Inverse hyperbolic tangent
 * @param arg - The value to process
 * @returns The inverse hyperbolic tangent of arg
 */
export function atanh(arg: number): number;

/**
 * Convert a number between arbitrary bases
 * @param number - The number to convert
 * @param frombase - The base number is in
 * @param tobase - The base to convert number to
 * @returns Number converted to base tobase
 */
export function base_convert(number: string | number, frombase: number, tobase: number): string;

/**
 * Binary to decimal
 * @param binary_string - The binary string to convert
 * @returns The decimal value of binary_string
 */
export function bindec(binary_string: string): number;

/**
 * Round fractions up
 * @param value - The value to round
 * @returns Value rounded up to the next highest integer
 */
export function ceil(value: number): number;

/**
 * Cosine
 * @param arg - The argument to process
 * @returns The cosine of arg
 */
export function cos(arg: number): number;

/**
 * Hyperbolic cosine
 * @param arg - The argument to process
 * @returns The hyperbolic cosine of arg
 */
export function cosh(arg: number): number;

/**
 * Decimal to binary
 * @param number - Decimal value to convert
 * @returns Binary string representation of number
 */
export function decbin(number: number): string;

/**
 * Decimal to hexadecimal
 * @param number - Decimal value to convert
 * @returns Hexadecimal string representation of number
 */
export function dechex(number: number): string;

/**
 * Decimal to octal
 * @param number - Decimal value to convert
 * @returns Octal string representation of number
 */
export function decoct(number: number): string;

/**
 * Converts the number in degrees to the radian equivalent
 * @param angle - Angular value in degrees
 * @returns The radian equivalent of angle
 */
export function deg2rad(angle: number): number;

/**
 * Calculates the exponent of e
 * @param arg - The argument to process
 * @returns 'e' raised to the power of arg
 */
export function exp(arg: number): number;

/**
 * Returns exp(number) - 1, computed in a way that is accurate even when the value of number is close to zero
 * @param x - The argument to process
 * @returns 'e' to the power of x minus one
 */
export function expm1(x: number): number;

/**
 * Round fractions down
 * @param value - The value to round
 * @returns Value rounded down to the next lowest integer
 */
export function floor(value: number): number;

/**
 * Returns the floating point remainder (modulo) of the division of the arguments
 * @param x - The dividend
 * @param y - The divisor
 * @returns The floating point remainder of x/y
 */
export function fmod(x: number, y: number): number;

/**
 * Show largest possible random value
 * @returns The largest possible random value returned by rand()
 */
export function getrandmax(): number;

/**
 * Hexadecimal to decimal
 * @param hex_string - The hexadecimal string to convert
 * @returns The decimal representation of hex_string
 */
export function hexdec(hex_string: string): number;

/**
 * Calculate the length of the hypotenuse of a right-angle triangle
 * @param x - Length of first side
 * @param y - Length of second side
 * @returns Length of the hypotenuse
 */
export function hypot(x: number, y: number): number;

/**
 * Finds whether a value is a finite number
 * @param val - The value to check
 * @returns True if val is a finite number, false otherwise
 */
export function is_finite(val: any): boolean;

/**
 * Finds whether a value is infinite
 * @param val - The value to check
 * @returns True if val is infinite, false otherwise
 */
export function is_infinite(val: any): boolean;

/**
 * Finds whether a value is not a number
 * @param val - The value to check
 * @returns True if val is 'not a number', false otherwise
 */
export function is_nan(val: any): boolean;

/**
 * Combined linear congruential generator
 * @returns A pseudo random float between 0.0 and 1.0
 */
export function lcg_value(): number;

/**
 * Natural logarithm
 * @param arg - The value to calculate the logarithm for
 * @param base - The optional logarithmic base to use
 * @returns The logarithm of arg to base, if given, or the natural logarithm
 */
export function log(arg: number, base?: number): number;

/**
 * Base-10 logarithm
 * @param arg - The value to calculate the logarithm for
 * @returns The base-10 logarithm of arg
 */
export function log10(arg: number): number;

/**
 * Returns log(1 + number), computed in a way that is accurate even when the value of number is close to zero
 * @param x - The argument to process
 * @returns log(1 + x)
 */
export function log1p(x: number): number;

/**
 * Find highest value
 * @param args - Values to compare
 * @returns The highest value
 */
export function max(...args: any[]): any;

/**
 * Find lowest value
 * @param args - Values to compare
 * @returns The lowest value
 */
export function min(...args: any[]): any;

/**
 * Show largest possible random value
 * @returns The largest possible random value returned by mt_rand()
 */
export function mt_getrandmax(): number;

/**
 * Generate a better random value
 * @param min - Optional lowest value to be returned (default: 0)
 * @param max - Optional highest value to be returned (default: mt_getrandmax())
 * @returns A random integer between min (or 0) and max (or mt_getrandmax())
 */
export function mt_rand(min?: number, max?: number): number;

/**
 * Octal to decimal
 * @param oct_string - The octal string to convert
 * @returns The decimal representation of oct_string
 */
export function octdec(oct_string: string): number;

/**
 * Get value of pi
 * @returns The value of pi as float
 */
export function pi(): number;

/**
 * Exponential expression
 * @param base - The base to use
 * @param exp - The exponent
 * @returns base raised to the power of exp
 */
export function pow(base: number, exp: number): number;

/**
 * Converts the radian number to the equivalent number in degrees
 * @param angle - A radian value
 * @returns The equivalent of angle in degrees
 */
export function rad2deg(angle: number): number;

/**
 * Generate a random integer
 * @param min - Optional lowest value to be returned (default: 0)
 * @param max - Optional highest value to be returned (default: getrandmax())
 * @returns A random integer between min (or 0) and max (or getrandmax())
 */
export function rand(min?: number, max?: number): number;

/**
 * Rounds a float
 * @param value - The value to round
 * @param precision - The optional number of decimal digits to round to
 * @param mode - The mode to use for rounding
 * @returns The rounded value
 */
export function round(value: number, precision?: number, mode?: string): number;

/**
 * Sine
 * @param arg - The argument to process
 * @returns The sine of arg
 */
export function sin(arg: number): number;

/**
 * Hyperbolic sine
 * @param arg - The argument to process
 * @returns The hyperbolic sine of arg
 */
export function sinh(arg: number): number;

/**
 * Square root
 * @param arg - The argument to process
 * @returns The square root of arg
 */
export function sqrt(arg: number): number;

/**
 * Tangent
 * @param arg - The argument to process
 * @returns The tangent of arg
 */
export function tan(arg: number): number;

/**
 * Hyperbolic tangent
 * @param arg - The argument to process
 * @returns The hyperbolic tangent of arg
 */
export function tanh(arg: number): number;

/**
 * Pack data into binary string
 * @param format - The format string
 * @param args - The data to pack
 * @returns Binary string containing data
 */
export function pack(format: string, ...args: any[]): string;

/**
 * Generate a unique ID
 * @param prefix - Can be useful, for instance, if you generate identifiers simultaneously on several hosts
 * @param more_entropy - If set to true, uniqid() will add additional entropy
 * @returns The unique identifier, as a string
 */
export function uniqid(prefix?: string, more_entropy?: boolean): string;
