const net = require('../modules/net.js')

describe('Net Module', () => {
	test('ip2long converts IP to long', () => {
		expect(net.ip2long('192.168.1.1')).toBe(3232235777);
	});

	test('long2ip converts long to IP', () => {
		expect(net.long2ip(3232235777)).toBe('192.168.1.1');
	});

	test('inet_pton converts IP to packed format', () => {
		const result = net.inet_pton('192.168.1.1');
		expect(typeof result).toBe('string');
	});

	test('inet_ntop converts packed format to IP', () => {
		const packed = net.inet_pton('192.168.1.1');
		const result = net.inet_ntop(packed);
		expect(result).toBe('192.168.1.1');
	});
});
