/**
 * Output one or more strings
 * @param args - The expressions to output
 */
export function echo(...args: any[]): void;

/**
 * Prints human-readable information about a variable
 * @param array - The expression to be printed
 * @param return_val - If set to true, print_r() will return the information rather than print it
 * @returns The information if return_val is true, otherwise true
 */
export function print_r(array: any, return_val?: boolean): string | boolean;

/**
 * Dumps information about one or more variables
 * @param args - The expressions to dump
 */
export function var_dump(...args: any[]): void;

/**
 * Outputs or returns a parsable string representation of a variable
 * @param mixed_expression - The variable you want to export
 * @param bool_return - If used and set to true, var_export() will return the variable representation instead of outputting it
 * @returns The variable representation when bool_return is true, otherwise null
 */
export function var_export(mixed_expression: any, bool_return?: boolean): string | null;
