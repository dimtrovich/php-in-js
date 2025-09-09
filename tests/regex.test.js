const regex = require('../modules/regex.js')

describe('Regex Module', () => {
	test('preg_quote escapes regex characters', () => {
		expect(regex.preg_quote('$40 for a g3/400')).toBe('\\$40 for a g3/400');
	});

	test('preg_grep filters array with regex', () => {
		const input = ['apple', 'banana', 'cherry', 'date'];
		const result = regex.preg_grep('/^a/', input);
		expect(result).toEqual(['apple']);
	});
});
