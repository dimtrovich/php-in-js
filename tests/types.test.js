const types = require('../modules/types.js')

describe('Types Module', () => {
	test('is_array checks for arrays', () => {
		expect(types.is_array([1, 2, 3])).toBe(true);
		// expect(types.is_array({})).toBe(false);
		// expect(types.is_array('string')).toBe(false);
	});

	test('is_string checks for strings', () => {
		expect(types.is_string('hello')).toBe(true);
		expect(types.is_string(123)).toBe(false);
		expect(types.is_string([])).toBe(false);
	});

	test('is_int checks for integers', () => {
		expect(types.is_int(123)).toBe(true);
		expect(types.is_int(123.45)).toBe(false);
		expect(types.is_int('123')).toBe(false);
	});

	test('is_bool checks for booleans', () => {
		expect(types.is_bool(true)).toBe(true);
		expect(types.is_bool(false)).toBe(true);
		expect(types.is_bool(0)).toBe(false);
	});

	test('is_null checks for null', () => {
		expect(types.is_null(null)).toBe(true);
		expect(types.is_null(undefined)).toBe(false);
		expect(types.is_null(0)).toBe(false);
	});

	test('isset checks if variable is set', () => {
		let undefinedVar;
		expect(types.isset('defined')).toBe(true);
		expect(types.isset(undefinedVar)).toBe(false);
		expect(types.isset(null)).toBe(false);
	});

	test('empty checks if variable is empty', () => {
		expect(types.empty('')).toBe(true);
		expect(types.empty([])).toBe(true);
		expect(types.empty(null)).toBe(true);
		expect(types.empty('hello')).toBe(false);
		expect(types.empty([1, 2, 3])).toBe(false);
	});

	test('intval converts to integer', () => {
		expect(types.intval('123')).toBe(123);
		expect(types.intval('123.45')).toBe(123);
		expect(types.intval('abc')).toBe(0);
	});

	test('floatval converts to float', () => {
		expect(types.floatval('123.45')).toBe(123.45);
		expect(types.floatval('123')).toBe(123);
	});

	test('gettype returns type string', () => {
		expect(types.gettype([1, 2, 3])).toBe('array');
		expect(types.gettype('hello')).toBe('string');
		expect(types.gettype(123)).toBe('integer');
		expect(types.gettype(true)).toBe('boolean');
		expect(types.gettype(null)).toBe('null');
	});
});
