/**
 * Call the callback given by the first parameter
 * @param cb - The callback to call
 * @param args - Parameters to pass to the callback
 * @returns The return value of the callback
 */
export function call_user_func(cb: string | Function | [any, string], ...args: any[]): any;

/**
 * Call a callback with an array of parameters
 * @param cb - The callback to call
 * @param parameters - Parameters to pass to the callback as an array
 * @returns The return value of the callback
 */
export function call_user_func_array(cb: string | Function | [any, string], parameters: any[]): any;

/**
 * Create an anonymous (lambda-style) function
 * @param args - The function arguments
 * @param code - The function code
 * @returns The created function or false on error
 */
export function create_function(args: string, code: string): Function | boolean;

/**
 * Return true if the given function has been defined
 * @param func_name - The function name
 * @returns True if function exists, false otherwise
 */
export function function_exists(func_name: string | Function): boolean;

/**
 * Returns an array of all defined functions
 * @returns Array of all defined functions
 */
export function get_defined_functions(): string[];
