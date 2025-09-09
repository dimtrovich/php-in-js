/**
 * Determine whether a variable is empty
 * @param mixed_var - Variable to be checked
 * @returns True if var is empty, false otherwise
 */
export function empty(mixed_var: any): boolean;

/**
 * Get float value of a variable
 * @param mixed_var - The scalar value being converted to a float
 * @returns The float value of the given variable
 */
export function floatval(mixed_var: any): number;

/**
 * Alias of floatval()
 * @param mixed_var - The scalar value being converted to a float
 * @returns The float value of the given variable
 */
export function doubleval(mixed_var: any): number;

/**
 * Get the type of a variable
 * @param mixed_var - The variable being type checked
 * @returns The type of the variable
 */
export function gettype(mixed_var: any): string;

/**
 * Get the integer value of a variable
 * @param mixed_var - The scalar value being converted to an integer
 * @param base - The base for the conversion
 * @returns The integer value of var on success, or 0 on failure
 */
export function intval(mixed_var: any, base?: number): number;

/**
 * Finds whether a variable is an array
 * @param mixed_var - The variable being evaluated
 * @returns True if var is an array, false otherwise
 */
export function is_array(mixed_var: any): boolean;

/**
 * Alias of is_binary()
 * @param vr - The variable to be checked
 * @returns True if var is binary, false otherwise
 */
export function is_binary(vr: any): boolean;

/**
 * Finds out whether a variable is a boolean
 * @param mixed_var - The variable being evaluated
 * @returns True if var is a boolean, false otherwise
 */
export function is_bool(mixed_var: any): boolean;

/**
 * Alias of is_buffer()
 * @param vr - The variable to be checked
 * @returns True if var is a buffer, false otherwise
 */
export function is_buffer(vr: any): boolean;

/**
 * Verify that the contents of a variable can be called as a function
 * @param v - The value to check
 * @param syntax_only - If set to true, the function only verifies that name might be a function or method
 * @param callable_name - Receives the "callable name"
 * @returns True if var is callable, false otherwise
 */
export function is_callable(v: any, syntax_only?: boolean, callable_name?: string): boolean;

/**
 * Alias of is_float()
 * @param mixed_var - The variable being evaluated
 * @returns True if var is a float, false otherwise
 */
export function is_double(mixed_var: any): boolean;

/**
 * Finds whether the type of a variable is float
 * @param mixed_var - The variable being evaluated
 * @returns True if var is a float, false otherwise
 */
export function is_float(mixed_var: any): boolean;

/**
 * Find whether the type of a variable is integer
 * @param mixed_var - The variable being evaluated
 * @returns True if var is an integer, false otherwise
 */
export function is_int(mixed_var: any): boolean;

/**
 * Alias of is_int()
 * @param mixed_var - The variable being evaluated
 * @returns True if var is an integer, false otherwise
 */
export function is_integer(mixed_var: any): boolean;

/**
 * Alias of is_int()
 * @param mixed_var - The variable being evaluated
 * @returns True if var is an integer, false otherwise
 */
export function is_long(mixed_var: any): boolean;

/**
 * Finds whether a variable is null
 * @param mixed_var - The variable being evaluated
 * @returns True if var is null, false otherwise
 */
export function is_null(mixed_var: any): boolean;

/**
 * Finds whether a variable is a number or a numeric string
 * @param mixed_var - The variable being evaluated
 * @returns True if var is a number or a numeric string, false otherwise
 */
export function is_numeric(mixed_var: any): boolean;

/**
 * Finds whether a variable is an object
 * @param mixed_var - The variable being evaluated
 * @returns True if var is an object, false otherwise
 */
export function is_object(mixed_var: any): boolean;

/**
 * Alias of is_float()
 * @param mixed_var - The variable being evaluated
 * @returns True if var is a float, false otherwise
 */
export function is_real(mixed_var: any): boolean;

/**
 * Finds whether a variable is a resource
 * @param handle - The variable to be evaluated
 * @returns True if var is a resource, false otherwise
 */
export function is_resource(handle: any): boolean;

/**
 * Finds whether a variable is a scalar
 * @param mixed_var - The variable being evaluated
 * @returns True if var is a scalar, false otherwise
 */
export function is_scalar(mixed_var: any): boolean;

/**
 * Find whether the type of a variable is string
 * @param mixed_var - The variable being evaluated
 * @returns True if var is a string, false otherwise
 */
export function is_string(mixed_var: any): boolean;

/**
 * Alias of is_unicode()
 * @param vr - The variable to be checked
 * @returns True if var is unicode, false otherwise
 */
export function is_unicode(vr: any): boolean;

/**
 * Determine if a variable is set and is not null
 * @param args - The variables to check
 * @returns True if all variables are set and not null, false otherwise
 */
export function isset(...args: any[]): boolean;

/**
 * Generates a storable representation of a value
 * @param mixed_value - The value to be serialized
 * @returns A string containing a byte-stream representation of value that can be stored anywhere
 */
export function serialize(mixed_value: any): string;

/**
 * Set the type of a variable
 * @param vr - The variable being converted
 * @param type - The type to convert var to
 * @returns True on success, false on failure
 */
export function settype(vr: any, type: string): boolean;

/**
 * Creates a PHP value from a stored representation
 * @param data - The serialized string
 * @returns The converted value is returned
 */
export function unserialize(data: string): any;

/**
 * Make unified diff of two strings
 * @param old_data - First string with data
 * @param new_data - Second string with data
 * @param context_lines - How many lines of context you want to include
 * @param minimal - Set this to true if you want to minimalize the diff
 * @returns String with resulting diff or false if an internal error happened
 */
export function xdiff_string_diff(old_data: string, new_data: string, context_lines?: number, minimal?: boolean): string;

/**
 * Patch a string with an unified diff
 * @param originalStr - The original string
 * @param patch - The unified diff patch string
 * @param flags - Can be either XDIFF_PATCH_NORMAL (default mode, normal patch) or XDIFF_PATCH_REVERSE (reversed patch)
 * @param error - If provided, rejected parts are stored inside this variable
 * @returns Patched string or false on error
 */
export function xdiff_string_patch(originalStr: string, patch: string, flags?: number | string, error?: string): string;
