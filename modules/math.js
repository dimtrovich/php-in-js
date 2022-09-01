/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 *
 * @module Math
 * @description Fonctions mathematiques
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global = {}));
}(this, (function(exports) {
    'use strict';

	const abs = function (mixed_number) {
		return Math.abs(mixed_number) || 0;
	};
	exports.abs = abs;

	const acos = function (arg) {
		return Math.acos(arg);
	};
	exports.acos = acos;

	const acosh = function (arg) {
		return Math.log(arg + Math.sqrt(arg * arg - 1));
	};
	exports.acosh = acosh;

	const asin = function (arg) {
		return Math.asin(arg);
	};
	exports.asin = asin;

	const asinh = function (arg) {
		return Math.log(arg + Math.sqrt(arg * arg + 1));
	};
	exports.asinh = asinh;

	const atan = function (arg) {
		return Math.atan(arg);
	};
	exports.atan = atan;

	const atan2 = function (y, x) {
		return Math.atan2(y, x);
	};
	exports.atan2 = atan2;

	const atanh = function (arg) {
		return 0.5 * Math.log((1 + arg) / (1 - arg));
	};
	exports.atanh = atanh;

	const base_convert = function (number, frombase, tobase) {
		return parseInt(number + '', frombase | 0)
			.toString(tobase | 0);
	};
	exports.base_convert = base_convert;

	const bindec = function (binary_string) {
		binary_string = (binary_string + '')
			.replace(/[^01]/gi, '');
		  return parseInt(binary_string, 2);
	};
	exports.bindec = bindec;

	const ceil = function (value) {
		return Math.ceil(value);
	};
	exports.ceil = ceil;

	const cos = function (arg) {
		return Math.cos(arg);
	};
	exports.cos = cos;

	const cosh = function (arg) {
		return (Math.exp(arg) + Math.exp(-arg)) / 2;
	};
	exports.cosh = cosh;

	const decbin = function (number) {
		if (number < 0) {
			number = 0xFFFFFFFF + number + 1;
		  }
		  return parseInt(number, 10)
			.toString(2);
	};
	exports.decbin = decbin;

	const dechex = function (number) {
		if (number < 0) {
			number = 0xFFFFFFFF + number + 1;
		  }
		  return parseInt(number, 10)
			.toString(16);
	};
	exports.dechex = dechex;

	const decoct = function (number) {
		if (number < 0) {
			number = 0xFFFFFFFF + number + 1;
		  }
		  return parseInt(number, 10)
			.toString(8);
	};
	exports.decoct = decoct;

	const deg2rad = function (angle) {
		return angle * .017453292519943295; // (angle / 180) * Math.PI;
	};
	exports.deg2rad = deg2rad;

	const exp = function (arg) {
		return Math.exp(arg);
	};
	exports.exp = exp;

	const expm1 = function (x) {
		var ret = 0,
			n = 50; // degree of precision
		  var factorial = function factorial(n) {
			if ((n === 0) || (n === 1)) {
			  return 1;
			} else {
			  var result = (n * factorial(n - 1));
			  return result;
			}
		  };
		  for (var i = 1; i < n; i++) {
			ret += Math.pow(x, i) / factorial(i);
		  }
		  return ret;
	};
	exports.expm1 = expm1;

	const floor = function (value) {
		return Math.floor(value);
	};
	exports.floor = floor;

	const fmod = function (x, y) {
		var tmp, tmp2, p = 0,
			pY = 0,
			l = 0.0,
			l2 = 0.0;

		  tmp = x.toExponential()
			.match(/^.\.?(.*)e(.+)$/);
		  p = parseInt(tmp[2], 10) - (tmp[1] + '')
			.length;
		  tmp = y.toExponential()
			.match(/^.\.?(.*)e(.+)$/);
		  pY = parseInt(tmp[2], 10) - (tmp[1] + '')
			.length;

		  if (pY > p) {
			p = pY;
		  }

		  tmp2 = (x % y);

		  if (p < -100 || p > 20) {
			// toFixed will give an out of bound error so we fix it like this:
			l = Math.round(Math.log(tmp2) / Math.log(10));
			l2 = Math.pow(10, l);

			return (tmp2 / l2)
			  .toFixed(l - p) * l2;
		  } else {
			return parseFloat(tmp2.toFixed(-p));
		  }
	};
	exports.fmod = fmod;

	const getrandmax = function () {
		return 2147483647;
	};
	exports.getrandmax = getrandmax;

	const hexdec = function (hex_string) {
		hex_string = (hex_string + '')
			.replace(/[^a-f0-9]/gi, '');
		  return parseInt(hex_string, 16);
	};
	exports.hexdec = hexdec;

	const hypot = function (x, y) {
		return Math.sqrt(x * x + y * y) || 0;
	};
	exports.hypot = hypot;

	const is_finite = function (val) {
		var warningType = '';

		  if (val === Infinity || val === -Infinity) {
			return false;
		  }

		  //Some warnings for maximum PHP compatibility
		  if (typeof val === 'object') {
			warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
		  } else if (typeof val === 'string' && !val.match(/^[\+\-]?\d/)) {
			//simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
			warningType = 'string';
		  }
		  if (warningType) {
			throw new Error('Warning: is_finite() expects parameter 1 to be double, ' + warningType + ' given');
		  }

		  return true;
	};
	exports.is_finite = is_finite;

	const is_infinite = function (val) {
		var warningType = '';

		  if (val === Infinity || val === -Infinity) {
			return true;
		  }

		  //Some warnings for maximum PHP compatibility
		  if (typeof val === 'object') {
			warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
		  } else if (typeof val === 'string' && !val.match(/^[\+\-]?\d/)) {
			//simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
			warningType = 'string';
		  }
		  if (warningType) {
			throw new Error('Warning: is_infinite() expects parameter 1 to be double, ' + warningType + ' given');
		  }

		  return false;
	};
	exports.is_infinite = is_infinite;

	const is_nan = function (val) {
		var warningType = '';

		  if (typeof val === 'number' && isNaN(val)) {
			return true;
		  }

		  //Some errors for maximum PHP compatibility
		  if (typeof val === 'object') {
			warningType = (Object.prototype.toString.call(val) === '[object Array]' ? 'array' : 'object');
		  } else if (typeof val === 'string' && !val.match(/^[\+\-]?\d/)) {
			//simulate PHP's behaviour: '-9a' doesn't give a warning, but 'a9' does.
			warningType = 'string';
		  }
		  if (warningType) {
			throw new Error('Warning: is_nan() expects parameter 1 to be double, ' + warningType + ' given');
		  }

		  return false;
	};
	exports.is_nan = is_nan;

	const lcg_value = function () {
		return Math.random();
	};
	exports.lcg_value = lcg_value;

	const log = function (arg, base) {
		return (typeof base === 'undefined') ?
			Math.log(arg) :
			Math.log(arg) / Math.log(base);
	};
	exports.log = log;

	const log10 = function (arg) {
		return Math.log(arg) / 2.302585092994046; // Math.LN10
	};
	exports.log10 = log10;

	const log1p = function (x) {
		var ret = 0,
			n = 50; // degree of precision
		  if (x <= -1) {
			return '-INF'; // JavaScript style would be to return Number.NEGATIVE_INFINITY
		  }
		  if (x < 0 || x > 1) {
			return Math.log(1 + x);
		  }
		  for (var i = 1; i < n; i++) {
			if ((i % 2) === 0) {
			  ret -= Math.pow(x, i) / i;
			} else {
			  ret += Math.pow(x, i) / i;
			}
		  }
		  return ret;
	};
	exports.log1p = log1p;

	const max = function () {
		var ar, retVal, i = 0,
			n = 0,
			argv = arguments,
			argc = argv.length,
			_obj2Array = function(obj) {
			  if (Object.prototype.toString.call(obj) === '[object Array]') {
				return obj;
			  } else {
				var ar = [];
				for (var i in obj) {
				  if (obj.hasOwnProperty(i)) {
					ar.push(obj[i]);
				  }
				}
				return ar;
			  }
			}; //function _obj2Array
		  _compare = function(current, next) {
			var i = 0,
			  n = 0,
			  tmp = 0,
			  nl = 0,
			  cl = 0;

			if (current === next) {
			  return 0;
			} else if (typeof current === 'object') {
			  if (typeof next === 'object') {
				current = _obj2Array(current);
				next = _obj2Array(next);
				cl = current.length;
				nl = next.length;
				if (nl > cl) {
				  return 1;
				} else if (nl < cl) {
				  return -1;
				}
				for (i = 0, n = cl; i < n; ++i) {
				  tmp = _compare(current[i], next[i]);
				  if (tmp == 1) {
					return 1;
				  } else if (tmp == -1) {
					return -1;
				  }
				}
				return 0;
			  }
			  return -1;
			} else if (typeof next === 'object') {
			  return 1;
			} else if (isNaN(next) && !isNaN(current)) {
			  if (current == 0) {
				return 0;
			  }
			  return (current < 0 ? 1 : -1);
			} else if (isNaN(current) && !isNaN(next)) {
			  if (next == 0) {
				return 0;
			  }
			  return (next > 0 ? 1 : -1);
			}

			if (next == current) {
			  return 0;
			}
			return (next > current ? 1 : -1);
		  }; //function _compare
		  if (argc === 0) {
			throw new Error('At least one value should be passed to max()');
		  } else if (argc === 1) {
			if (typeof argv[0] === 'object') {
			  ar = _obj2Array(argv[0]);
			} else {
			  throw new Error('Wrong parameter count for max()');
			}
			if (ar.length === 0) {
			  throw new Error('Array must contain at least one element for max()');
			}
		  } else {
			ar = argv;
		  }

		  retVal = ar[0];
		  for (i = 1, n = ar.length; i < n; ++i) {
			if (_compare(retVal, ar[i]) == 1) {
			  retVal = ar[i];
			}
		  }

		  return retVal;
	};
	exports.max = max;

	const min = function () {
		var ar, retVal, i = 0,
			n = 0,
			argv = arguments,
			argc = argv.length,
			_obj2Array = function(obj) {
			  if (Object.prototype.toString.call(obj) === '[object Array]') {
				return obj;
			  }
			  var ar = [];
			  for (var i in obj) {
				if (obj.hasOwnProperty(i)) {
				  ar.push(obj[i]);
				}
			  }
			  return ar;
			}; //function _obj2Array
		  _compare = function(current, next) {
			var i = 0,
			  n = 0,
			  tmp = 0,
			  nl = 0,
			  cl = 0;

			if (current === next) {
			  return 0;
			} else if (typeof current === 'object') {
			  if (typeof next === 'object') {
				current = _obj2Array(current);
				next = _obj2Array(next);
				cl = current.length;
				nl = next.length;
				if (nl > cl) {
				  return 1;
				} else if (nl < cl) {
				  return -1;
				}
				for (i = 0, n = cl; i < n; ++i) {
				  tmp = _compare(current[i], next[i]);
				  if (tmp == 1) {
					return 1;
				  } else if (tmp == -1) {
					return -1;
				  }
				}
				return 0;
			  }
			  return -1;
			} else if (typeof next === 'object') {
			  return 1;
			} else if (isNaN(next) && !isNaN(current)) {
			  if (current == 0) {
				return 0;
			  }
			  return (current < 0 ? 1 : -1);
			} else if (isNaN(current) && !isNaN(next)) {
			  if (next == 0) {
				return 0;
			  }
			  return (next > 0 ? 1 : -1);
			}

			if (next == current) {
			  return 0;
			}
			return (next > current ? 1 : -1);
		  }; //function _compare
		  if (argc === 0) {
			throw new Error('At least one value should be passed to min()');
		  } else if (argc === 1) {
			if (typeof argv[0] === 'object') {
			  ar = _obj2Array(argv[0]);
			} else {
			  throw new Error('Wrong parameter count for min()');
			}
			if (ar.length === 0) {
			  throw new Error('Array must contain at least one element for min()');
			}
		  } else {
			ar = argv;
		  }

		  retVal = ar[0];
		  for (i = 1, n = ar.length; i < n; ++i) {
			if (_compare(retVal, ar[i]) == -1) {
			  retVal = ar[i];
			}
		  }

		  return retVal;
	};
	exports.min = min;

	const mt_getrandmax = function () {
		return 2147483647;
	};
	exports.mt_getrandmax = mt_getrandmax;

	const mt_rand = function (min, max) {
		var argc = arguments.length;
		  if (argc === 0) {
			min = 0;
			max = 2147483647;
		  } else if (argc === 1) {
			throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
		  } else {
			min = parseInt(min, 10);
			max = parseInt(max, 10);
		  }
		  return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	exports.mt_rand = mt_rand;

	const octdec = function (oct_string) {
		oct_string = (oct_string + '')
			.replace(/[^0-7]/gi, '');
		  return parseInt(oct_string, 8);
	};
	exports.octdec = octdec

	const pi = function () {
		return 3.141592653589793; // Math.PI
	};
	exports.pi = pi;

	const pow = function (base, exp) {
		return Math.pow(base, exp);
	};
	exports.pow = pow;

	const rad2deg = function (angle) {
		return angle * 57.29577951308232; // angle / Math.PI * 180
	};
	exports.rad2deg = rad2deg;

	const rand = function (min, max) {
		var argc = arguments.length;
		  if (argc === 0) {
			min = 0;
			max = 2147483647;
		  } else if (argc === 1) {
			throw new Error('Warning: rand() expects exactly 2 parameters, 1 given');
		  }
		  return Math.floor(Math.random() * (max - min + 1)) + min;
	};
	exports.rand = rand;

	const round = function (value, precision, mode) {
		var m, f, isHalf, sgn; // helper variables
		  precision |= 0; // making sure precision is integer
		  m = Math.pow(10, precision);
		  value *= m;
		  sgn = (value > 0) | -(value < 0); // sign of the number
		  isHalf = value % 1 === 0.5 * sgn;
		  f = Math.floor(value);

		  if (isHalf) {
			switch (mode) {
			  case 'PHP_ROUND_HALF_DOWN':
				value = f + (sgn < 0); // rounds .5 toward zero
				break;
			  case 'PHP_ROUND_HALF_EVEN':
				value = f + (f % 2 * sgn); // rouds .5 towards the next even integer
				break;
			  case 'PHP_ROUND_HALF_ODD':
				value = f + !(f % 2); // rounds .5 towards the next odd integer
				break;
			  default:
				value = f + (sgn > 0); // rounds .5 away from zero
			}
		  }

		  return (isHalf ? value : Math.round(value)) / m;
	};
	exports.round = round;

	const sin = function (arg) {
		return Math.sin(arg);
	};
	exports.sin = sin;

	const sinh = function (arg) {
		return (Math.exp(arg) - Math.exp(-arg)) / 2;
	};
	exports.sinh = sinh;

	const sqrt = function (arg) {
		return Math.sqrt(arg);
	};
	exports.sqrt = sqrt;

	const tan = function (arg) {
		return Math.tan(arg);
	};
	exports.tan = tan

	const tanh = function (arg) {
		return (Math.exp(arg) - Math.exp(-arg)) / (Math.exp(arg) + Math.exp(-arg));
	};
	exports.tanh = tanh;

	const pack = function (format) {
		var formatPointer = 0,
			argumentPointer = 1,
			result = '',
			argument = '',
			i = 0,
			r = [],
			instruction, quantifier, word, precisionBits, exponentBits, extraNullCount;

		  // vars used by float encoding
		  var bias, minExp, maxExp, minUnnormExp, status, exp, len, bin, signal, n, intPart, floatPart, lastBit, rounded, j,
			k, tmpResult;

		  while (formatPointer < format.length) {
			instruction = format.charAt(formatPointer);
			quantifier = '';
			formatPointer++;
			while ((formatPointer < format.length) && (format.charAt(formatPointer)
			  .match(/[\d\*]/) !== null)) {
			  quantifier += format.charAt(formatPointer);
			  formatPointer++;
			}
			if (quantifier === '') {
			  quantifier = '1';
			}

			// Now pack variables: 'quantifier' times 'instruction'
			switch (instruction) {
			  case 'a':
				// NUL-padded string
			  case 'A':
				// SPACE-padded string
				if (typeof arguments[argumentPointer] === 'undefined') {
				  throw new Error('Warning:  pack() Type ' + instruction + ': not enough arguments');
				} else {
				  argument = String(arguments[argumentPointer]);
				}
				if (quantifier === '*') {
				  quantifier = argument.length;
				}
				for (i = 0; i < quantifier; i++) {
				  if (typeof argument[i] === 'undefined') {
					if (instruction === 'a') {
					  result += String.fromCharCode(0);
					} else {
					  result += ' ';
					}
				  } else {
					result += argument[i];
				  }
				}
				argumentPointer++;
				break;
			  case 'h':
				// Hex string, low nibble first
			  case 'H':
				// Hex string, high nibble first
				if (typeof arguments[argumentPointer] === 'undefined') {
				  throw new Error('Warning: pack() Type ' + instruction + ': not enough arguments');
				} else {
				  argument = arguments[argumentPointer];
				}
				if (quantifier === '*') {
				  quantifier = argument.length;
				}
				if (quantifier > argument.length) {
				  throw new Error('Warning: pack() Type ' + instruction + ': not enough characters in string');
				}

				for (i = 0; i < quantifier; i += 2) {
				  // Always get per 2 bytes...
				  word = argument[i];
				  if (((i + 1) >= quantifier) || typeof argument[i + 1] === 'undefined') {
					word += '0';
				  } else {
					word += argument[i + 1];
				  }
				  // The fastest way to reverse?
				  if (instruction === 'h') {
					word = word[1] + word[0];
				  }
				  result += String.fromCharCode(parseInt(word, 16));
				}
				argumentPointer++;
				break;

			  case 'c':
				// signed char
			  case 'C':
				// unsigned char
				// c and C is the same in pack
				if (quantifier === '*') {
				  quantifier = arguments.length - argumentPointer;
				}
				if (quantifier > (arguments.length - argumentPointer)) {
				  throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
				}

				for (i = 0; i < quantifier; i++) {
				  result += String.fromCharCode(arguments[argumentPointer]);
				  argumentPointer++;
				}
				break;

			  case 's':
				// signed short (always 16 bit, machine byte order)
			  case 'S':
				// unsigned short (always 16 bit, machine byte order)
			  case 'v':
				// s and S is the same in pack
				if (quantifier === '*') {
				  quantifier = arguments.length - argumentPointer;
				}
				if (quantifier > (arguments.length - argumentPointer)) {
				  throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
				}

				for (i = 0; i < quantifier; i++) {
				  result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
				  result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
				  argumentPointer++;
				}
				break;

			  case 'n':
				// unsigned short (always 16 bit, big endian byte order)
				if (quantifier === '*') {
				  quantifier = arguments.length - argumentPointer;
				}
				if (quantifier > (arguments.length - argumentPointer)) {
				  throw new Error('Warning: pack() Type ' + instruction + ': too few arguments');
				}

				for (i = 0; i < quantifier; i++) {
				  result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
				  argumentPointer++;
				}
				break;

			  case 'i':
				// signed integer (machine dependent size and byte order)
			  case 'I':
				// unsigned integer (machine dependent size and byte order)
			  case 'l':
				// signed long (always 32 bit, machine byte order)
			  case 'L':
				// unsigned long (always 32 bit, machine byte order)
			  case 'V':
				// unsigned long (always 32 bit, little endian byte order)
				if (quantifier === '*') {
				  quantifier = arguments.length - argumentPointer;
				}
				if (quantifier > (arguments.length - argumentPointer)) {
				  throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
				}

				for (i = 0; i < quantifier; i++) {
				  result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
				  result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
				  result += String.fromCharCode(arguments[argumentPointer] >> 16 & 0xFF);
				  result += String.fromCharCode(arguments[argumentPointer] >> 24 & 0xFF);
				  argumentPointer++;
				}

				break;
			  case 'N':
				// unsigned long (always 32 bit, big endian byte order)
				if (quantifier === '*') {
				  quantifier = arguments.length - argumentPointer;
				}
				if (quantifier > (arguments.length - argumentPointer)) {
				  throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
				}

				for (i = 0; i < quantifier; i++) {
				  result += String.fromCharCode(arguments[argumentPointer] >> 24 & 0xFF);
				  result += String.fromCharCode(arguments[argumentPointer] >> 16 & 0xFF);
				  result += String.fromCharCode(arguments[argumentPointer] >> 8 & 0xFF);
				  result += String.fromCharCode(arguments[argumentPointer] & 0xFF);
				  argumentPointer++;
				}
				break;

			  case 'f':
				// float (machine dependent size and representation)
			  case 'd':
				// double (machine dependent size and representation)
				// version original by IEEE754
				precisionBits = 23;
				exponentBits = 8;
				if (instruction === 'd') {
				  precisionBits = 52;
				  exponentBits = 11;
				}

				if (quantifier === '*') {
				  quantifier = arguments.length - argumentPointer;
				}
				if (quantifier > (arguments.length - argumentPointer)) {
				  throw new Error('Warning:  pack() Type ' + instruction + ': too few arguments');
				}
				for (i = 0; i < quantifier; i++) {
				  argument = arguments[argumentPointer];
				  bias = Math.pow(2, exponentBits - 1) - 1;
				  minExp = -bias + 1;
				  maxExp = bias;
				  minUnnormExp = minExp - precisionBits;
				  status = isNaN(n = parseFloat(argument)) || n === -Infinity || n === +Infinity ? n : 0;
				  exp = 0;
				  len = 2 * bias + 1 + precisionBits + 3;
				  bin = new Array(len);
				  signal = (n = status !== 0 ? 0 : n) < 0;
				  n = Math.abs(n);
				  intPart = Math.floor(n);
				  floatPart = n - intPart;

				  for (k = len; k;) {
					bin[--k] = 0;
				  }
				  for (k = bias + 2; intPart && k;) {
					bin[--k] = intPart % 2;
					intPart = Math.floor(intPart / 2);
				  }
				  for (k = bias + 1; floatPart > 0 && k; --floatPart) {
					(bin[++k] = ((floatPart *= 2) >= 1) - 0);
				  }
				  for (k = -1; ++k < len && !bin[k];) {}

				  if (bin[(lastBit = precisionBits - 1 + (k = (exp = bias + 1 - k) >= minExp && exp <= maxExp ? k + 1 :
					bias + 1 - (exp = minExp - 1))) + 1]) {
					if (!(rounded = bin[lastBit])) {
					  for (j = lastBit + 2; !rounded && j < len; rounded = bin[j++]) {}
					}
					for (j = lastBit + 1; rounded && --j >= 0;
					  (bin[j] = !bin[j] - 0) && (rounded = 0)) {}
				  }

				  for (k = k - 2 < 0 ? -1 : k - 3; ++k < len && !bin[k];) {}

				  if ((exp = bias + 1 - k) >= minExp && exp <= maxExp) {
					++k;
				  } else {
					if (exp < minExp) {
					  if (exp !== bias + 1 - len && exp < minUnnormExp) { /*"encodeFloat::float underflow" */ }
					  k = bias + 1 - (exp = minExp - 1);
					}
				  }

				  if (intPart || status !== 0) {
					exp = maxExp + 1;
					k = bias + 2;
					if (status === -Infinity) {
					  signal = 1;
					} else if (isNaN(status)) {
					  bin[k] = 1;
					}
				  }

				  n = Math.abs(exp + bias);
				  tmpResult = '';

				  for (j = exponentBits + 1; --j;) {
					tmpResult = (n % 2) + tmpResult;
					n = n >>= 1;
				  }

				  n = 0;
				  j = 0;
				  k = (tmpResult = (signal ? '1' : '0') + tmpResult + bin.slice(k, k + precisionBits)
					.join(''))
					.length;
				  r = [];

				  for (; k;) {
					n += (1 << j) * tmpResult.charAt(--k);
					if (j === 7) {
					  r[r.length] = String.fromCharCode(n);
					  n = 0;
					}
					j = (j + 1) % 8;
				  }

				  r[r.length] = n ? String.fromCharCode(n) : '';
				  result += r.join('');
				  argumentPointer++;
				}
				break;

			  case 'x':
				// NUL byte
				if (quantifier === '*') {
				  throw new Error('Warning: pack(): Type x: \'*\' ignored');
				}
				for (i = 0; i < quantifier; i++) {
				  result += String.fromCharCode(0);
				}
				break;

			  case 'X':
				// Back up one byte
				if (quantifier === '*') {
				  throw new Error('Warning: pack(): Type X: \'*\' ignored');
				}
				for (i = 0; i < quantifier; i++) {
				  if (result.length === 0) {
					throw new Error('Warning: pack(): Type X:' + ' outside of string');
				  } else {
					result = result.substring(0, result.length - 1);
				  }
				}
				break;

			  case '@':
				// NUL-fill to absolute position
				if (quantifier === '*') {
				  throw new Error('Warning: pack(): Type X: \'*\' ignored');
				}
				if (quantifier > result.length) {
				  extraNullCount = quantifier - result.length;
				  for (i = 0; i < extraNullCount; i++) {
					result += String.fromCharCode(0);
				  }
				}
				if (quantifier < result.length) {
				  result = result.substring(0, quantifier);
				}
				break;

			  default:
				throw new Error('Warning:  pack() Type ' + instruction + ': unknown format code');
			}
		  }
		  if (argumentPointer < arguments.length) {
			throw new Error('Warning: pack(): ' + (arguments.length - argumentPointer) + ' arguments unused');
		  }

		  return result;
	};
	exports.pack = pack

	const uniqid = function (prefix, more_entropy) {
		if (typeof prefix === 'undefined') {
			prefix = '';
		  }

		  var retId;
		  var formatSeed = function(seed, reqWidth) {
			seed = parseInt(seed, 10)
			  .toString(16); // to hex str
			if (reqWidth < seed.length) { // so long we split
			  return seed.slice(seed.length - reqWidth);
			}
			if (reqWidth > seed.length) { // so short we pad
			  return Array(1 + (reqWidth - seed.length))
				.join('0') + seed;
			}
			return seed;
		  };

		  // BEGIN REDUNDANT
		  if (!exports.php_in_js) {
			exports.php_in_js = {};
		  }
		  // END REDUNDANT
		  if (!exports.php_in_js.uniqidSeed) { // init seed with big random int
			exports.php_in_js.uniqidSeed = Math.floor(Math.random() * 0x75bcd15);
		  }
		  exports.php_in_js.uniqidSeed++;

		  retId = prefix; // start with prefix, add current milliseconds hex string
		  retId += formatSeed(parseInt(new Date()
			.getTime() / 1000, 10), 8);
		  retId += formatSeed(exports.php_in_js.uniqidSeed, 5); // add seed hex string
		  if (more_entropy) {
			// for more entropy we add a float lower to 10
			retId += (Math.random() * 10)
			  .toFixed(8)
			  .toString();
		  }

		  return retId;
	};
	exports.uniqid = uniqid;

})))
