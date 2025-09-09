const array = require('../modules/array.js')

describe('Array Module', () => {
  	test('array() creates empty array', () => {
		const result = array.array();
		expect(result).toEqual([]);
	});

	test('array_change_key_case changes case', () => {
		const input = { Name: 'John', Age: 30 };
		const result = array.array_change_key_case(input, 'CASE_LOWER');
		expect(result).toEqual({ name: 'John', age: 30 });
	});

	test('array_chunk splits array', () => {
		const input = [1, 2, 3, 4, 5];
		const result = array.array_chunk(input, 2);
		expect(result).toEqual([[1, 2], [3, 4], [5]]);
	});

	test('array_combine combines arrays', () => {
		const keys = ['name', 'age'];
		const values = ['John', 30];
		const result = array.array_combine(keys, values);
		expect(result).toEqual({ name: 'John', age: 30 });
	});

	test('array_count_values counts occurrences', () => {
		const input = ['apple', 'orange', 'apple', 'banana'];
		const result = array.array_count_values(input);
		expect(result).toEqual({ apple: 2, orange: 1, banana: 1 });
	});

	test('array_diff finds differences', () => {
		const arr1 = [1, 2, 3, 4];
		const arr2 = [3, 4, 5, 6];
		const result = array.array_diff(arr1, arr2);
		expect(result).toEqual([1, 2]);
	});

	test('array_filter filters elements', () => {
		const input = [1, 2, 3, 4, 5];
		const result = array.array_filter(input, (x) => x % 2 === 0);
		expect(result).toEqual([2, 4]);
	});

	test('array_flip exchanges keys and values', () => {
		const input = { a: 1, b: 2, c: 3 };
		const result = array.array_flip(input);
		expect(result).toEqual({ 1: 'a', 2: 'b', 3: 'c' });
	});

	test('array_keys returns keys', () => {
		const input = { name: 'John', age: 30, city: 'Paris' };
		const result = array.array_keys(input);
		expect(result).toEqual(['name', 'age', 'city']);
	});

	test('array_map applies callback', () => {
		const input = [1, 2, 3];
		const result = array.array_map((x) => x * 2, input);
		expect(result).toEqual([2, 4, 6]);
	});

	test('array_merge merges arrays', () => {
		const arr1 = [1, 2];
		const arr2 = [3, 4];
		const result = array.array_merge(arr1, arr2);
		expect(result).toEqual([1, 2, 3, 4]);
	});

	test('array_pop removes last element', () => {
		const input = [1, 2, 3];
		const result = array.array_pop(input);
		expect(result).toBe(3);
		expect(input).toEqual([1, 2]);
	});

	test('array_push adds elements', () => {
		const input = [1, 2];
		const result = array.array_push(input, 3, 4);
		expect(result).toBe(4);
		expect(input).toEqual([1, 2, 3, 4]);
	});

	test('array_sum calculates sum', () => {
		const input = [1, 2, 3, 4];
		const result = array.array_sum(input);
		expect(result).toBe(10);
	});

	test('array_unique removes duplicates', () => {
		const input = [1, 2, 2, 3, 3, 3];
		const result = array.array_unique(input);
		expect(result).toEqual([1, 2, 3]);
	});

	test('in_array checks existence', () => {
		const input = [1, 2, 3, 4];
		const result = array.in_array(3, input);
		expect(result).toBe(true);
	});

	test('count returns array length', () => {
		const input = [1, 2, 3, 4, 5];
		const result = array.count(input);
		expect(result).toBe(5);
	});
});
