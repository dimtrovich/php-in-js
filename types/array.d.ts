/**
 * Interface representing a PHP-like array with chainable methods
 */
interface PHPJS_Array {
    /**
     * Changes the case of all keys in an array
     * @param cs - 'CASE_LOWER' or 'CASE_UPPER' (default: 'CASE_LOWER')
     * @returns New PHPJS_Array instance with modified keys
     */
    change_key_case(cs?: 'CASE_LOWER' | 'CASE_UPPER'): PHPJS_Array;

    /**
     * Exchanges all keys with their associated values in an array
     * @returns New PHPJS_Array instance with flipped keys/values
     */
    flip(): PHPJS_Array;

    /**
     * Applies a user function to every member of an array
     * @param funcname - Callback function
     * @param userdata - Additional data to pass to the callback
     * @returns This PHPJS_Array instance
     */
    walk(funcname: string | Function | [any, string], userdata?: any): PHPJS_Array;

    /**
     * Returns all the keys of an array
     * @param search_value - If specified, returns only keys for this value
     * @param argStrict - Determines if strict comparison (===) should be used
     * @returns Array of keys
     */
    keys(search_value?: any, argStrict?: boolean): any[];

    /**
     * Returns all the values of an array
     * @returns Array of values
     */
    values(): any[];

    /**
     * Searches the array for a given value and returns the corresponding key
     * @param needle - The value to search for
     * @param argStrict - Determines if strict comparison (===) should be used
     * @returns Key of the found value or false
     */
    search(needle: any, argStrict?: boolean): string | number | boolean;

    /**
     * Calculates the sum of values in an array
     * @returns Sum of numeric values
     */
    sum(): number;

    /**
     * Iterates over each element in the array (alias for forEach)
     * @param handler - Callback function
     */
    foreach(handler: (value: any, key?: string | number) => void): PHPJS_Array;

    /**
     * Assigns variables as if they were an array
     * @param args - Variables to assign
     * @returns This PHPJS_Array instance
     */
    list(...args: any[]): PHPJS_Array;

    /**
     * Iterates over each element in the array
     * @param handler - Callback function (value, key, array)
     */
    forEach(handler: (value: any, key: string | number, array: PHPJS_Array) => void): PHPJS_Array;

    /**
     * Converts the array to a JavaScript object
     * @returns JavaScript object
     */
    $object(): { [key: string]: any };

    /**
     * Converts the array to object chain (for chaining)
     * @returns Array of objects
     */
    $objectChain(): any[];
}

/**
 * Input type accepted for array functions
 */
export type ArrayInput = any[] | { [key: string]: any } | PHPJS_Array;

/**
 * Creates a new array
 * @returns New empty array
 */
export function array(): any[];

/**
 * Changes the case of all keys in an array
 * @param array - Input array
 * @param cs - Case type ('CASE_LOWER' or 'CASE_UPPER')
 * @returns Array with modified keys
 */
export function array_change_key_case(array: any, cs?: 'CASE_LOWER' | 'CASE_UPPER'): any;

/**
 * Splits an array into chunks
 * @param input - Input array
 * @param size - Size of each chunk
 * @param preserve_keys - Whether to preserve original keys
 * @returns Array of arrays
 */
export function array_chunk(input: any, size: number, preserve_keys?: boolean): any[];

/**
 * Creates an array by using one array for keys and another for its values
 * @param keys - Array of keys
 * @param values - Array of values
 * @returns Combined associative array
 */
export function array_combine(keys: any[], values: any[]): any;

/**
 * Counts all the values of an array
 * @param array - Input array
 * @returns Associative array with values as keys and their frequency as values
 */
export function array_count_values(array: any): any;

/**
 * Computes the difference of arrays
 * @param arr1 - First array
 * @param arrays - Additional arrays to compare
 * @returns Array containing entries from arr1 that are not present in other arrays
 */
export function array_diff(arr1: any, ...arrays: any[]): any;

/**
 * Computes the difference of arrays with additional index check
 * @param arr1 - First array
 * @param arrays - Additional arrays to compare
 * @returns Array containing entries from arr1 that are not present in other arrays
 */
export function array_diff_assoc(arr1: any, ...arrays: any[]): any;

/**
 * Computes the difference of arrays using keys for comparison
 * @param arr1 - First array
 * @param arrays - Additional arrays to compare
 * @returns Array containing entries from arr1 whose keys are not present in other arrays
 */
export function array_diff_key(arr1: any, ...arrays: any[]): any;

/**
 * Computes the difference of arrays with additional index check using a callback function
 * @param arr1 - First array
 * @param arrays - Additional arrays to compare
 * @returns Array containing entries from arr1 that are not present in other arrays
 */
export function array_diff_uassoc(arr1: any, ...arrays: any[]): any;

/**
 * Computes the difference of arrays by using a callback function for data comparison
 * @param arr1 - First array
 * @param arrays - Additional arrays to compare
 * @returns Array containing entries from arr1 that are not present in other arrays
 */
export function array_udiff(arr1: any, ...arrays: any[]): any;

/**
 * Fills an array with values
 * @param start_index - First index of the returned array
 * @param num - Number of elements to insert
 * @param mixed_val - Value to use for filling
 * @returns Filled array
 */
export function array_fill(start_index: number, num: number, mixed_val: any): any;

/**
 * Fills an array with values, specifying keys
 * @param keys - Array of keys
 * @param value - Value to use for filling
 * @returns Filled associative array
 */
export function array_fill_keys(keys: any[], value: any): any;

/**
 * Filters elements of an array using a callback function
 * @param arr - Input array
 * @param func - Filter callback function
 * @returns Filtered array
 */
export function array_filter(arr: any, func?: (value: any) => boolean): any;

/**
 * Exchanges all keys with their associated values in an array
 * @param trans - Input array
 * @returns Array with flipped keys/values
 */
export function array_flip(trans: any): any;

/**
 * Computes the intersection of arrays
 * @param arr1 - First array
 * @param arrays - Additional arrays
 * @returns Array containing entries from arr1 that are present in all other arrays
 */
export function array_intersect(arr1: any, ...arrays: any[]): any;

/**
 * Computes the intersection of arrays with additional index check
 * @param arr1 - First array
 * @param arrays - Additional arrays
 * @returns Array containing entries from arr1 that are present in all other arrays
 */
export function array_intersect_assoc(arr1: any, ...arrays: any[]): any;

/**
 * Computes the intersection of arrays using keys for comparison
 * @param arr1 - First array
 * @param arrays - Additional arrays
 * @returns Array containing entries from arr1 whose keys are present in all other arrays
 */
export function array_intersect_key(arr1: any, ...arrays: any[]): any;

/**
 * Computes the intersection of arrays with additional index check using a callback function
 * @param arr1 - First array
 * @param arrays - Additional arrays
 * @returns Array containing entries from arr1 that are present in all other arrays
 */
export function array_intersect_uassoc(arr1: any, ...arrays: any[]): any;

/**
 * Computes the intersection of arrays using a callback function on the keys for comparison
 * @param arr1 - First array
 * @param arrays - Additional arrays
 * @returns Array containing entries from arr1 whose keys are present in all other arrays
 */
export function array_intersect_ukey(arr1: any, ...arrays: any[]): any;

/**
 * Checks if the given key or index exists in the array
 * @param key - Key to check for
 * @param search - Array to search in
 * @returns True if key exists, false otherwise
 */
export function array_key_exists(key: string, search: any): boolean;

/**
 * Return all the keys or a subset of the keys of an array
 * @param input - Input array
 * @param search_value - If specified, return only keys for this value
 * @param argStrict - Determines if strict comparison (===) should be used
 * @returns Array of keys
 */
export function array_keys(input: any, search_value?: any, argStrict?: boolean): string[];

/**
 * Applies the callback to the elements of the given arrays
 * @param callback - Callback function to apply
 * @param arrays - Arrays to process
 * @returns Array containing the elements of the input arrays after applying the callback
 */
export function array_map(callback: Function, ...arrays: any[]): any[];

/**
 * Merges one or more arrays
 * @param arrays - Arrays to merge
 * @returns Merged array
 */
export function array_merge(...arrays: any[]): any;

/**
 * Recursively merges one or more arrays
 * @param arr1 - First array
 * @param arr2 - Second array
 * @returns Recursively merged array
 */
export function array_merge_recursive(arr1: any, arr2: any): any;

/**
 * Sorts multiple or multi-dimensional arrays
 * @param arr - Array to sort
 * @returns True on success, false on failure
 */
export function array_multisort(arr: any): boolean;

/**
 * Pad array to the specified length with a value
 * @param input - Input array
 * @param pad_size - New size of the array
 * @param pad_value - Value to pad with
 * @returns Padded array
 */
export function array_pad(input: any[], pad_size: number, pad_value: any): any[];

/**
 * Pops the element off the end of array
 * @param inputArr - Input array
 * @returns Popped element
 */
export function array_pop(inputArr: any): any;

/**
 * Calculates the product of values in an array
 * @param input - Input array
 * @returns Product of values
 */
export function array_product(input: any[]): number;

/**
 * Pushes one or more elements onto the end of array
 * @param inputArr - Input array
 * @param values - Values to push
 * @returns New length of the array
 */
export function array_push(inputArr: any, ...values: any[]): number;

/**
 * Picks one or more random keys out of an array
 * @param input - Input array
 * @param num_req - Number of entries to return
 * @returns Random key(s)
 */
export function array_rand(input: any[], num_req?: number): string | number[];

/**
 * Iteratively reduces the array to a single value using a callback function
 * @param a_input - Input array
 * @param callback - Callback function
 * @returns Result of the reduction
 */
export function array_reduce(a_input: any[], callback: Function): number;

/**
 * Replaces elements from passed arrays into the first array
 * @param arr - Base array
 * @param replacements - Replacement arrays
 * @returns Resulting array
 */
export function array_replace(arr: any, ...replacements: any[]): any;

/**
 * Replaces elements from passed arrays into the first array recursively
 * @param arr - Base array
 * @param replacements - Replacement arrays
 * @returns Resulting array
 */
export function array_replace_recursive(arr: any, ...replacements: any[]): any;

/**
 * Returns an array with elements in reverse order
 * @param array - Input array
 * @param preserve_keys - Whether to preserve original keys
 * @returns Reversed array
 */
export function array_reverse(array: any, preserve_keys?: boolean): any;

/**
 * Searches the array for a given value and returns the corresponding key
 * @param needle - The value to search for
 * @param haystack - The array to search in
 * @param argStrict - Determines if strict comparison (===) should be used
 * @returns Key of the found value or false
 */
export function array_search(needle: any, haystack: any, argStrict?: boolean): string | boolean;

/**
 * Shifts an element off the beginning of array
 * @param inputArr - Input array
 * @returns Shifted element
 */
export function array_shift(inputArr: any): any;

/**
 * Extracts a slice of the array
 * @param arr - Input array
 * @param offst - Starting index
 * @param lgth - Length of the slice
 * @param preserve_keys - Whether to preserve original keys
 * @returns Array slice
 */
export function array_slice(arr: any, offst: number, lgth?: number, preserve_keys?: boolean): any;

/**
 * Removes a portion of the array and replaces it with something else
 * @param arr - Input array
 * @param offst - Starting index
 * @param lgth - Length of the portion to remove
 * @param replacement - Replacement elements
 * @returns Modified array
 */
export function array_splice(arr: any, offst: number, lgth?: number, replacement?: any): any;

/**
 * Calculates the sum of values in an array
 * @param array - Input array
 * @returns Sum of values
 */
export function array_sum(array: any): number;

/**
 * Computes the difference of arrays by using a callback function for data comparison
 * @param arr1 - First array
 * @param arrays - Additional arrays to compare
 * @returns Array containing entries from arr1 that are not present in other arrays
 */
export function array_udiff(arr1: any, ...arrays: any[]): any;

/**
 * Computes the difference of arrays with additional index check using a callback function
 * @param arr1 - First array
 * @param arrays - Additional arrays to compare
 * @returns Array containing entries from arr1 that are not present in other arrays
 */
export function array_udiff_assoc(arr1: any, ...arrays: any[]): any;

/**
 * Computes the difference of arrays with additional index check using callbacks for index and data comparison
 * @param arr1 - First array
 * @param arrays - Additional arrays to compare
 * @returns Array containing entries from arr1 that are not present in other arrays
 */
export function array_udiff_uassoc(arr1: any, ...arrays: any[]): any;

/**
 * Computes the intersection of arrays using a callback function for data comparison
 * @param arr1 - First array
 * @param arrays - Additional arrays
 * @returns Array containing entries from arr1 that are present in all other arrays
 */
export function array_uintersect(arr1: any, ...arrays: any[]): any;

/**
 * Computes the intersection of arrays with additional index check using a callback function
 * @param arr1 - First array
 * @param arrays - Additional arrays
 * @returns Array containing entries from arr1 that are present in all other arrays
 */
export function array_uintersect_assoc(arr1: any, ...arrays: any[]): any;

/**
 * Computes the intersection of arrays with additional index check using callbacks for index and data comparison
 * @param arr1 - First array
 * @param arrays - Additional arrays
 * @returns Array containing entries from arr1 that are present in all other arrays
 */
export function array_uintersect_uassoc(arr1: any, ...arrays: any[]): any;

/**
 * Removes duplicate values from an array
 * @param inputArr - Input array
 * @returns Array with duplicate values removed
 */
export function array_unique(inputArr: any): any;

/**
 * Prepends one or more elements to the beginning of an array
 * @param array - Input array
 * @param values - Values to prepend
 * @returns New length of the array
 */
export function array_unshift(array: any[], ...values: any[]): number;

/**
 * Return all the values of an array
 * @param input - Input array
 * @returns Array of values
 */
export function array_values(input: any): any[];

/**
 * Apply a user function to every member of an array
 * @param array - Input array
 * @param funcname - Callback function
 * @param userdata - Additional data to pass to the callback
 * @returns True on success, false on failure
 */
export function array_walk(array: any, funcname: Function | string | any[], userdata?: any): boolean;

/**
 * Apply a user function recursively to every member of an array
 * @param array - Input array
 * @param funcname - Callback function
 * @param userdata - Additional data to pass to the callback
 * @returns True on success, false on failure
 */
export function array_walk_recursive(array: any, funcname: Function | string, userdata?: any): boolean;

/**
 * Create array containing variables and their values
 * @param vars - Variable names
 * @returns Associative array of variables and their values
 */
export function compact(...vars: string[]): any;

/**
 * Count all elements in an array or Countable object
 * @param mixed_var - Array or Countable object
 * @param mode - Count mode
 * @returns Number of elements
 */
export function count(mixed_var: any, mode?: string): number;

/**
 * Return the current element in an array
 * @param arr - Input array
 * @returns Current element
 */
export function current(arr: any): any;

/**
 * Return the current key and value pair from an array and advance the array cursor
 * @param arr - Input array
 * @returns Array containing the key and value of the current element
 */
export function each(arr: any): any;

/**
 * Set the internal pointer of an array to its last element
 * @param arr - Input array
 * @returns Last element value
 */
export function end(arr: any): any;

/**
 * Checks if a value exists in an array
 * @param needle - The value to search for
 * @param haystack - The array to search in
 * @param argStrict - Determines if strict comparison (===) should be used
 * @returns True if value exists, false otherwise
 */
export function in_array(needle: any, haystack: any, argStrict?: boolean): boolean;

/**
 * Fetch a key from an array
 * @param arr - Input array
 * @returns Current key
 */
export function key(arr: any): string | boolean;

/**
 * Advance the internal array pointer of an array
 * @param arr - Input array
 * @returns Next element value
 */
export function next(arr: any): any;

/**
 * Alias of current()
 * @param arr - Input array
 * @returns Current element
 */
export function pos(arr: any): any;

/**
 * Rewind the internal array pointer
 * @param arr - Input array
 * @returns Previous element value
 */
export function prev(arr: any): any;

/**
 * Create an array containing a range of elements
 * @param low - Low value
 * @param high - High value
 * @param step - Step value
 * @returns Array of values from low to high
 */
export function range(low: number | string, high: number | string, step?: number): any[];

/**
 * Set the internal pointer of an array to its first element
 * @param arr - Input array
 * @returns First element value
 */
export function reset(arr: any): any;

/**
 * Shuffle an array
 * @param inputArr - Input array
 * @returns Shuffled array
 */
export function shuffle(inputArr: any): any;

/**
 * Alias of count()
 * @param mixed_var - Array or Countable object
 * @param mode - Count mode
 * @returns Number of elements
 */
export function sizeof(mixed_var: any, mode?: string): number;

/**
 * Sort an array with a user-defined comparison function and maintain index association
 * @param inputArr - Input array
 * @param sorter - Comparison function
 * @returns Sorted array
 */
export function uasort(inputArr: any, sorter: Function): any;

/**
 * Sort an array by keys using a user-defined comparison function
 * @param inputArr - Input array
 * @param sorter - Comparison function
 * @returns Sorted array
 */
export function uksort(inputArr: any, sorter: Function): any;

/**
 * Sort an array by values using a user-defined comparison function
 * @param inputArr - Input array
 * @param sorter - Comparison function
 * @returns Sorted array
 */
export function usort(inputArr: any, sorter: Function): any;
