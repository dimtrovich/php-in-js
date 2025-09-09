const functions = require('../modules/functions.js')

describe('Functions Module', () => {
  	test('call_user_func calls function', () => {
		const result = functions.call_user_func((a, b) => a + b, 2, 3);
		expect(result).toBe(5);
  	});

  	test('call_user_func_array calls function with array', () => {
    	const result = functions.call_user_func_array(
      		(a, b, c) => a + b + c,
      		[1, 2, 3]
    	);
    	expect(result).toBe(6);
  	});

  	test('function_exists checks function availability', () => {
    	expect(functions.function_exists('call_user_func')).toBe(true);
    	expect(functions.function_exists('nonexistent_function')).toBe(false);
  	});
});
