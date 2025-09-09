const math = require('../modules/math.js')


describe('Math Module', () => {
	test('abs returns absolute value', () => {
		expect(math.abs(-5)).toBe(5);
		expect(math.abs(5)).toBe(5);
	});

	test('ceil rounds up', () => {
		expect(math.ceil(4.3)).toBe(5);
		expect(math.ceil(9.999)).toBe(10);
	});

	test('floor rounds down', () => {
		expect(math.floor(4.7)).toBe(4);
		expect(math.floor(9.999)).toBe(9);
	});

	test('round rounds numbers', () => {
		expect(math.round(4.5)).toBe(5);
		expect(math.round(4.4)).toBe(4);
	});

	test('max returns maximum value', () => {
		expect(math.max(1, 2, 3, 4, 5)).toBe(5);
		expect(math.max(-1, -5, -10)).toBe(-1);
	});

	test('min returns minimum value', () => {
		expect(math.min(1, 2, 3, 4, 5)).toBe(1);
		expect(math.min(-1, -5, -10)).toBe(-10);
	});

	test('pow calculates power', () => {
		expect(math.pow(2, 3)).toBe(8);
		expect(math.pow(5, 2)).toBe(25);
	});

	test('sqrt calculates square root', () => {
		expect(math.sqrt(16)).toBe(4);
		expect(math.sqrt(9)).toBe(3);
	});

	test('rand generates random number', () => {
		const result = math.rand(1, 10);
		expect(result).toBeGreaterThanOrEqual(1);
		expect(result).toBeLessThanOrEqual(10);
	});

	test('pi returns PI constant', () => {
		expect(math.pi()).toBeCloseTo(3.14159, 5);
	});

	test('base_convert converts bases', () => {
		expect(math.base_convert('A', 16, 10)).toBe('10');
		expect(math.base_convert('1010', 2, 10)).toBe('10');
	});
});
