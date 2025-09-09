const datetime = require('../modules/datetime.js')

describe('Datetime Module', () => {
	test('checkdate validates dates', () => {
		expect(datetime.checkdate(2, 29, 2020)).toBe(true); // Leap year
		expect(datetime.checkdate(2, 29, 2021)).toBe(false); // Not leap year
		expect(datetime.checkdate(13, 1, 2023)).toBe(false); // Invalid month
	});

	test('date formats correctly', () => {
		const timestamp = 1672531200; // January 1, 2023
		const result = datetime.date('Y-m-d', timestamp);
		expect(result).toBe('2023-01-01');
	});

	test('time returns current timestamp', () => {
		const now = Math.floor(Date.now() / 1000);
		const result = datetime.time();
		expect(result).toBeCloseTo(now, -1); // Within 10 seconds
	});

	test('strtotime parses dates', () => {
		const result = datetime.strtotime('2023-01-01');
		expect(result).toBe(1672527600);
	});

	test('mktime creates timestamp', () => {
		const result = datetime.mktime(12, 0, 0, 1, 1, 2023);
		expect(result).toBe(1672570800);
	});
});
