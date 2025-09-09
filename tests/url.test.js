const url = require('../modules/url.js')

describe('URL Module', () => {
	test('urlencode encodes strings', () => {
		expect(url.urlencode('hello world')).toBe('hello+world');
		expect(url.urlencode('name=John Doe')).toBe('name%3DJohn+Doe');
	});

	test('urldecode decodes strings', () => {
		expect(url.urldecode('hello+world')).toBe('hello world');
		expect(url.urldecode('name%3DJohn+Doe')).toBe('name=John Doe');
	});

	test('base64_encode encodes to base64', () => {
		expect(url.base64_encode('hello')).toBe('aGVsbG8=');
	});

	test('base64_decode decodes from base64', () => {
		expect(url.base64_decode('aGVsbG8=')).toBe('hello');
	});

	test('parse_url parses URLs', () => {
		const uri = 'https://example.com:8080/path?query=string#fragment';
		const result = url.parse_url(uri);
		expect(result).toEqual({
			scheme: 'https',
			host: 'example.com',
			port: '8080',
			path: '/path',
			query: 'query=string',
			fragment: 'fragment'
		});
	});

	test('http_build_query builds query string', () => {
		const data = { name: 'John', age: 30, city: 'Paris' };
		const result = url.http_build_query(data);
		expect(result).toBe('name=John&age=30&city=Paris');
	});
});
