const json = require('../modules/json.js')

describe('JSON Module', () => {
	test('json_encode encodes objects', () => {
		const data = { name: 'John', age: 30, city: 'Paris' };
		const result = json.json_encode(data);
		expect(result).toBe('{"name":"John","age":30,"city":"Paris"}');
	});

	test('json_encode encodes arrays', () => {
		const data = ['apple', 'banana', 'orange'];
		const result = json.json_encode(data);
		expect(result).toBe('["apple","banana","orange"]');
	});

	test.skip('json_decode decodes JSON', () => {
		const json = '{"name":"John","age":30,"city":"Paris"}';
		const result = json.json_decode(json);
		expect(result).toEqual({ name: 'John', age: 30, city: 'Paris' });
	});

	test.skip('json_decode decodes arrays', () => {
		const json = '["apple","banana","orange"]';
		const result = json.json_decode(json);
		expect(result).toEqual(['apple', 'banana', 'orange']);
	});

	test('json_last_error returns no error', () => {
		json.json_decode('{"valid": "json"}');
		expect(json.json_last_error()).toBe(0);
	});
});
