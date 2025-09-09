const crypto = require('../modules/crypto.js')

describe('Crypto Module', () => {
	test('md5 generates correct hash', () => {
		const result = crypto.md5('hello');
		expect(result).toBe('5d41402abc4b2a76b9719d911017c592');
	});

	test('sha1 generates correct hash', () => {
		const result = crypto.sha1('hello');
		expect(result).toBe('aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d');
	});

	test('md5 with empty string', () => {
		const result = crypto.md5('');
		expect(result).toBe('d41d8cd98f00b204e9800998ecf8427e');
	});

	test('sha1 with empty string', () => {
		const result = crypto.sha1('');
		expect(result).toBe('da39a3ee5e6b4b0d3255bfef95601890afd80709');
	});
});
