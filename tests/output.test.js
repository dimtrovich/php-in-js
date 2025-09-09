const output = require('../modules/output.js')

describe.skip('Output Module', () => {
// on skip car l'objet window.document est dispo uniquement dans le browser or on execute les test dans un environement node

	test('echo outputs to console', () => {
		const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
		output.echo('hello', 'world');
		expect(consoleSpy).toHaveBeenCalledWith('hello', 'world');
		consoleSpy.mockRestore();
	});

	test('print_r returns formatted string', () => {
		const data = { name: 'John', age: 30 };
		const result = output.print_r(data, true);
		expect(typeof result).toBe('string');
		expect(result).toContain('name');
		expect(result).toContain('John');
	});

	test('var_dump returns void', () => {
		const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
		const result = output.var_dump('test');
		expect(result).toBeUndefined();
		consoleSpy.mockRestore();
	});
});
