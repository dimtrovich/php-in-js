const fs = require('../modules/fs.js')

describe('FS Module', () => {
	test('basename returns filename', () => {
		expect(fs.basename('/path/to/file.txt')).toBe('file.txt');
		expect(fs.basename('/path/to/file.txt', '.txt')).toBe('file');
	});

	test('dirname returns directory path', () => {
		expect(fs.dirname('/path/to/file.txt')).toBe('/path/to');
	});

	test('pathinfo returns path information', () => {
		const result1 = fs.pathinfo('/path/to/file.txt');
		expect(result1).toEqual({
			dirname: '/path/to',
			basename: 'file.txt',
			extension: 'txt',
			filename: 'file'
		});

		const result2 = fs.pathinfo('/path/to/file.txt', 'PATHINFO_EXTENSION');
		expect(result2).toEqual('txt');
	});
});
