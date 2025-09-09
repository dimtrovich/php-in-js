const string = require('../modules/string.js')


describe('String Module', () => {
	test('strlen returns string length', () => {
		expect(string.strlen('hello')).toBe(5);
		expect(string.strlen('')).toBe(0);
	});

	test('strtoupper converts to uppercase', () => {
		expect(string.strtoupper('hello')).toBe('HELLO');
	});

	test('strtolower converts to lowercase', () => {
		expect(string.strtolower('HELLO')).toBe('hello');
	});

	test('substr returns substring', () => {
		expect(string.substr('hello world', 0, 5)).toBe('hello');
		expect(string.substr('hello world', 6)).toBe('world');
	});

	test('str_replace replaces text', () => {
		expect(string.str_replace('world', 'PHP', 'hello world')).toBe('hello PHP');
	});

	test('explode splits string', () => {
		expect(string.explode(' ', 'hello world')).toEqual(['hello', 'world']);
	});

	test('implode joins array', () => {
		expect(string.implode(', ', ['apple', 'banana', 'orange'])).toBe('apple, banana, orange');
	});

	test('trim removes whitespace', () => {
		expect(string.trim('  hello  ')).toBe('hello');
	});

	test('ucfirst capitalizes first letter', () => {
		expect(string.ucfirst('hello')).toBe('Hello');
	});

	test('ucwords capitalizes words', () => {
		expect(string.ucwords('hello world')).toBe('Hello World');
	});

	test('strpos finds position', () => {
		expect(string.strpos('hello world', 'world')).toBe(6);
	});

	test('addslashes adds slashes', () => {
		expect(string.addslashes("O'Reilly")).toBe("O\\'Reilly");
	});

	test('stripslashes removes slashes', () => {
		expect(string.stripslashes("O\\'Reilly")).toBe("O'Reilly");
	});

	test('htmlspecialchars encodes HTML', () => {
		expect(string.htmlspecialchars('<script>alert("xss")</script>'))
		.toBe('&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;');
	});
});
