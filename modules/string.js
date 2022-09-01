/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 *
 * @module String
 * @description Fonctions de manipulation de chaines de caracteres
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global = {}));
}(this, (function(exports) {
    'use strict';

	const addcslashes = function (str, charlist) {
		var target = '',
			chrs = [],
			i = 0,
			j = 0,
			c = '',
			next = '',
			rangeBegin = '',
			rangeEnd = '',
			chr = '',
			begin = 0,
			end = 0,
			octalLength = 0,
			postOctalPos = 0,
			cca = 0,
			escHexGrp = [],
			encoded = '',
			percentHex = /%([\dA-Fa-f]+)/g;
		  var _pad = function(n, c) {
			if ((n = n + '')
			  .length < c) {
			  return new Array(++c - n.length)
				.join('0') + n;
			}
			return n;
		  };

		  for (i = 0; i < charlist.length; i++) {
			c = charlist.charAt(i);
			next = charlist.charAt(i + 1);
			if (c === '\\' && next && (/\d/)
			  .test(next)) { // Octal
			  rangeBegin = charlist.slice(i + 1)
				.match(/^\d+/)[0];
			  octalLength = rangeBegin.length;
			  postOctalPos = i + octalLength + 1;
			  if (charlist.charAt(postOctalPos) + charlist.charAt(postOctalPos + 1) === '..') { // Octal begins range
				begin = rangeBegin.charCodeAt(0);
				if ((/\\\d/)
				  .test(charlist.charAt(postOctalPos + 2) + charlist.charAt(postOctalPos + 3))) { // Range ends with octal
				  rangeEnd = charlist.slice(postOctalPos + 3)
					.match(/^\d+/)[0];
				  i += 1; // Skip range end backslash
				} else if (charlist.charAt(postOctalPos + 2)) { // Range ends with character
				  rangeEnd = charlist.charAt(postOctalPos + 2);
				} else {
				  throw 'Range with no end point';
				}
				end = rangeEnd.charCodeAt(0);
				if (end > begin) { // Treat as a range
				  for (j = begin; j <= end; j++) {
					chrs.push(String.fromCharCode(j));
				  }
				} else { // Supposed to treat period, begin and end as individual characters only, not a range
				  chrs.push('.', rangeBegin, rangeEnd);
				}
				i += rangeEnd.length + 2; // Skip dots and range end (already skipped range end backslash if present)
			  } else { // Octal is by itself
				chr = String.fromCharCode(parseInt(rangeBegin, 8));
				chrs.push(chr);
			  }
			  i += octalLength; // Skip range begin
			} else if (next + charlist.charAt(i + 2) === '..') { // Character begins range
			  rangeBegin = c;
			  begin = rangeBegin.charCodeAt(0);
			  if ((/\\\d/)
				.test(charlist.charAt(i + 3) + charlist.charAt(i + 4))) { // Range ends with octal
				rangeEnd = charlist.slice(i + 4)
				  .match(/^\d+/)[0];
				i += 1; // Skip range end backslash
			  } else if (charlist.charAt(i + 3)) { // Range ends with character
				rangeEnd = charlist.charAt(i + 3);
			  } else {
				throw 'Range with no end point';
			  }
			  end = rangeEnd.charCodeAt(0);
			  if (end > begin) { // Treat as a range
				for (j = begin; j <= end; j++) {
				  chrs.push(String.fromCharCode(j));
				}
			  } else { // Supposed to treat period, begin and end as individual characters only, not a range
				chrs.push('.', rangeBegin, rangeEnd);
			  }
			  i += rangeEnd.length + 2; // Skip dots and range end (already skipped range end backslash if present)
			} else { // Character is by itself
			  chrs.push(c);
			}
		  }

		  for (i = 0; i < str.length; i++) {
			c = str.charAt(i);
			if (chrs.indexOf(c) !== -1) {
			  target += '\\';
			  cca = c.charCodeAt(0);
			  if (cca < 32 || cca > 126) { // Needs special escaping
				switch (c) {
				  case '\n':
					target += 'n';
					break;
				  case '\t':
					target += 't';
					break;
				  case '\u000D':
					target += 'r';
					break;
				  case '\u0007':
					target += 'a';
					break;
				  case '\v':
					target += 'v';
					break;
				  case '\b':
					target += 'b';
					break;
				  case '\f':
					target += 'f';
					break;
				  default:
					//target += _pad(cca.toString(8), 3);break; // Sufficient for UTF-16
					encoded = encodeURIComponent(c);

					// 3-length-padded UTF-8 octets
					if ((escHexGrp = percentHex.exec(encoded)) !== null) {
					  target += _pad(parseInt(escHexGrp[1], 16)
						.toString(8), 3); // already added a slash above
					}
					while ((escHexGrp = percentHex.exec(encoded)) !== null) {
					  target += '\\' + _pad(parseInt(escHexGrp[1], 16)
						.toString(8), 3);
					}
					break;
				}
			  } else { // Perform regular backslashed escaping
				target += c;
			  }
			} else { // Just add the character unescaped
			  target += c;
			}
		  }
		  return target;
	};
	exports.addcslashes = addcslashes;

	const addslashes = function (str) {
		return (str + '')
			.replace(/[\\"']/g, '\\$&')
			.replace(/\u0000/g, '\\0');
	};
	exports.addslashes = addslashes;

	const bin2hex = function (s) {
		var i, l, o = '',
			n;

		  s += '';

		  for (i = 0, l = s.length; i < l; i++) {
			n = s.charCodeAt(i)
			  .toString(16);
			o += n.length < 2 ? '0' + n : n;
		  }

		  return o;
	};
	exports.bin2hex = bin2hex;

	const chop = function (str, charlist) {
		return rtrim(str, charlist);
	};
	exports.chop = chop;

	const chr = function (codePt) {
		if (codePt > 0xFFFF) { // Create a four-byte string (length 2) since this code point is high
			//   enough for the UTF-16 encoding (JavaScript internal use), to
			//   require representation with two surrogates (reserved non-characters
			//   used for building other characters; the first is "high" and the next "low")
			codePt -= 0x10000;
			return String.fromCharCode(0xD800 + (codePt >> 10), 0xDC00 + (codePt & 0x3FF));
		  }
		  return String.fromCharCode(codePt);
	};
	exports.chr = chr;

	const chunk_split = function (body, chunklen, end) {
		chunklen = parseInt(chunklen, 10) || 76;
		  end = end || '\r\n';

		  if (chunklen < 1) {
			return false;
		  }

		  return body.match(new RegExp('.{0,' + chunklen + '}', 'g'))
			.join(end);
	};
	exports.chunk_split = chunk_split;

	const convert_cyr_string = function (str, from, to) {
		var _cyr_win1251 = [
			0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
			30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57,
			58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85,
			86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110,
			111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 46, 46, 46, 46, 46, 46, 46,
			46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 46, 154, 174,
			190, 46, 159, 189, 46, 46, 179, 191, 180, 157, 46, 46, 156, 183, 46, 46, 182, 166, 173, 46, 46, 158, 163, 152,
			164, 155, 46, 46, 46, 167, 225, 226, 247, 231, 228, 229, 246, 250, 233, 234, 235, 236, 237, 238, 239, 240, 242,
			243, 244, 245, 230, 232, 227, 254, 251, 253, 255, 249, 248, 252, 224, 241, 193, 194, 215, 199, 196, 197, 214,
			218, 201, 202, 203, 204, 205, 206, 207, 208, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217, 216,
			220, 192, 209, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
			27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
			55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
			83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108,
			109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 32, 32, 32, 32,
			32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
			32, 32, 32, 184, 186, 32, 179, 191, 32, 32, 32, 32, 32, 180, 162, 32, 32, 32, 32, 168, 170, 32, 178, 175, 32,
			32, 32, 32, 32, 165, 161, 169, 254, 224, 225, 246, 228, 229, 244, 227, 245, 232, 233, 234, 235, 236, 237, 238,
			239, 255, 240, 241, 242, 243, 230, 226, 252, 251, 231, 248, 253, 249, 247, 250, 222, 192, 193, 214, 196, 197,
			212, 195, 213, 200, 201, 202, 203, 204, 205, 206, 207, 223, 208, 209, 210, 211, 198, 194, 220, 219, 199, 216,
			221, 217, 215, 218
		  ],
			_cyr_cp866 = [
			  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
			  29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
			  56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
			  83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
			  108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 225,
			  226, 247, 231, 228, 229, 246, 250, 233, 234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 230, 232,
			  227, 254, 251, 253, 255, 249, 248, 252, 224, 241, 193, 194, 215, 199, 196, 197, 214, 218, 201, 202, 203,
			  204, 205, 206, 207, 208, 35, 35, 35, 124, 124, 124, 124, 43, 43, 124, 124, 43, 43, 43, 43, 43, 43, 45, 45,
			  124, 45, 43, 124, 124, 43, 43, 45, 45, 124, 45, 43, 45, 45, 45, 45, 43, 43, 43, 43, 43, 43, 43, 43, 35, 35,
			  124, 124, 35, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217, 216, 220, 192, 209, 179, 163, 180,
			  164, 183, 167, 190, 174, 32, 149, 158, 32, 152, 159, 148, 154, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13,
			  14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
			  41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67,
			  68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94,
			  95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116,
			  117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
			  32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 205, 186, 213, 241, 243, 201,
			  32, 245, 187, 212, 211, 200, 190, 32, 247, 198, 199, 204, 181, 240, 242, 185, 32, 244, 203, 207, 208, 202,
			  216, 32, 246, 32, 238, 160, 161, 230, 164, 165, 228, 163, 229, 168, 169, 170, 171, 172, 173, 174, 175, 239,
			  224, 225, 226, 227, 166, 162, 236, 235, 167, 232, 237, 233, 231, 234, 158, 128, 129, 150, 132, 133, 148,
			  131, 149, 136, 137, 138, 139, 140, 141, 142, 143, 159, 144, 145, 146, 147, 134, 130, 156, 155, 135, 152,
			  157, 153, 151, 154
			],
			_cyr_iso88595 = [
			  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
			  29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
			  56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
			  83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
			  108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 32, 32,
			  32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
			  32, 32, 32, 32, 179, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 225, 226, 247, 231, 228, 229,
			  246, 250, 233, 234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 230, 232, 227, 254, 251, 253, 255,
			  249, 248, 252, 224, 241, 193, 194, 215, 199, 196, 197, 214, 218, 201, 202, 203, 204, 205, 206, 207, 208,
			  210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217, 216, 220, 192, 209, 32, 163, 32, 32, 32, 32, 32,
			  32, 32, 32, 32, 32, 32, 32, 32, 32, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
			  20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46,
			  47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73,
			  74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
			  101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121,
			  122, 123, 124, 125, 126, 127, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
			  32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 241, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32,
			  32, 32, 32, 32, 32, 161, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 32, 238, 208, 209, 230, 212, 213, 228,
			  211, 229, 216, 217, 218, 219, 220, 221, 222, 223, 239, 224, 225, 226, 227, 214, 210, 236, 235, 215, 232,
			  237, 233, 231, 234, 206, 176, 177, 198, 180, 181, 196, 179, 197, 184, 185, 186, 187, 188, 189, 190, 191,
			  207, 192, 193, 194, 195, 182, 178, 204, 203, 183, 200, 205, 201, 199, 202
			],
			_cyr_mac = [
			  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28,
			  29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55,
			  56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82,
			  83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107,
			  108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 225,
			  226, 247, 231, 228, 229, 246, 250, 233, 234, 235, 236, 237, 238, 239, 240, 242, 243, 244, 245, 230, 232,
			  227, 254, 251, 253, 255, 249, 248, 252, 224, 241, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170,
			  171, 172, 173, 174, 175, 176, 177, 178, 179, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190, 191,
			  128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 138, 139, 140, 141, 142, 143, 144, 145, 146, 147, 148,
			  149, 150, 151, 152, 153, 154, 155, 156, 179, 163, 209, 193, 194, 215, 199, 196, 197, 214, 218, 201, 202,
			  203, 204, 205, 206, 207, 208, 210, 211, 212, 213, 198, 200, 195, 222, 219, 221, 223, 217, 216, 220, 192,
			  255, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27,
			  28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54,
			  55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81,
			  82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106,
			  107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127,
			  192, 193, 194, 195, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 210, 211, 212,
			  213, 214, 215, 216, 217, 218, 219, 220, 221, 222, 223, 160, 161, 162, 222, 164, 165, 166, 167, 168, 169,
			  170, 171, 172, 173, 174, 175, 176, 177, 178, 221, 180, 181, 182, 183, 184, 185, 186, 187, 188, 189, 190,
			  191, 254, 224, 225, 246, 228, 229, 244, 227, 245, 232, 233, 234, 235, 236, 237, 238, 239, 223, 240, 241,
			  242, 243, 230, 226, 252, 251, 231, 248, 253, 249, 247, 250, 158, 128, 129, 150, 132, 133, 148, 131, 149,
			  136, 137, 138, 139, 140, 141, 142, 143, 159, 144, 145, 146, 147, 134, 130, 156, 155, 135, 152, 157, 153,
			  151, 154
			];

		  var from_table = null,
			to_table = null,
			tmp, i = 0,
			retStr = '';

		  switch (from.toUpperCase()) {
			case 'W':
			  from_table = _cyr_win1251;
			  break;
			case 'A':
			case 'D':
			  from_table = _cyr_cp866;
			  break;
			case 'I':
			  from_table = _cyr_iso88595;
			  break;
			case 'M':
			  from_table = _cyr_mac;
			  break;
			case 'K':
			  break;
			default:
			  throw 'Unknown source charset: ' + from; // warning
		  }

		  switch (to.toUpperCase()) {
			case 'W':
			  to_table = _cyr_win1251;
			  break;
			case 'A':
			case 'D':
			  to_table = _cyr_cp866;
			  break;
			case 'I':
			  to_table = _cyr_iso88595;
			  break;
			case 'M':
			  to_table = _cyr_mac;
			  break;
			case 'K':
			  break;
			default:
			  throw 'Unknown destination charset: ' + to; // fix: make a warning
		  }

		  if (!str) {
			return str;
		  }

		  for (i = 0; i < str.length; i++) {
			tmp = (from_table === null) ? str.charAt(i) : String.fromCharCode(from_table[str.charAt(i)
			  .charCodeAt(0)]);
			retStr += (to_table === null) ? tmp : String.fromCharCode(to_table[tmp.charCodeAt(0) + 256]);
		  }
		  return retStr;
	};
	exports.convert_cyr_string = convert_cyr_string;

	const convert_uuencode = function (str) {
		var chr = function(c) {
		return String.fromCharCode(c);
	  };

	  if (!str || str === '') {
		return chr(0);
	  } else if (!this.is_scalar(str)) {
		return false;
	  }

	  var c = 0,
		u = 0,
		i = 0,
		a = 0;
	  var encoded = '',
		tmp1 = '',
		tmp2 = '',
		bytes = {};

	  // divide string into chunks of 45 characters
	  var chunk = function() {
		bytes = str.substr(u, 45);
		for (i in bytes) {
		  bytes[i] = bytes[i].charCodeAt(0);
		}
		if (bytes.length != 0) {
		  return bytes.length;
		} else {
		  return 0;
		}
	  };

	  while (chunk() !== 0) {
		c = chunk();
		u += 45;

		// New line encoded data starts with number of bytes encoded.
		encoded += chr(c + 32);

		// Convert each char in bytes[] to a byte
		for (i in bytes) {
		  tmp1 = bytes[i].charCodeAt(0)
			.toString(2);
		  while (tmp1.length < 8) {
			tmp1 = '0' + tmp1;
		  }
		  tmp2 += tmp1;
		}

		while (tmp2.length % 6) {
		  tmp2 = tmp2 + '0';
		}

		for (i = 0; i <= (tmp2.length / 6) - 1; i++) {
		  tmp1 = tmp2.substr(a, 6);
		  if (tmp1 == '000000') {
			encoded += chr(96);
		  } else {
			encoded += chr(parseInt(tmp1, 2) + 32);
		  }
		  a += 6;
		}
		a = 0;
		tmp2 = '';
		encoded += '\n';
	  }

	  // Add termination characters
	  encoded += chr(96) + '\n';

	  return encoded;
  	};
	exports.convert_uuencode = convert_uuencode;

	const count_chars = function (str, mode) {
		var result = {},
			resultArr = [],
			i;

		  str = ('' + str)
			.split('')
			.sort()
			.join('')
			.match(/(.)\1*/g);

		  if ((mode & 1) == 0) {
			for (i = 0; i != 256; i++) {
			  result[i] = 0;
			}
		  }

		  if (mode === 2 || mode === 4) {

			for (i = 0; i != str.length; i += 1) {
			  delete result[str[i].charCodeAt(0)];
			}
			for (i in result) {
			  result[i] = (mode === 4) ? String.fromCharCode(i) : 0;
			}

		  } else if (mode === 3) {

			for (i = 0; i != str.length; i += 1) {
			  result[i] = str[i].slice(0, 1);
			}

		  } else {

			for (i = 0; i != str.length; i += 1) {
			  result[str[i].charCodeAt(0)] = str[i].length;
			}

		  }
		  if (mode < 3) {
			return result;
		  }

		  for (i in result) {
			resultArr.push(result[i]);
		  }
		  return resultArr.join('');
	};
	exports.count_chars = count_chars;

	const crc32 = function (str) {
		str = utf8_encode(str);
	  	var table = '00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D';

	  var crc = 0;
	  var x = 0;
	  var y = 0;

	  crc = crc ^ (-1);
	  for (var i = 0, iTop = str.length; i < iTop; i++) {
		y = (crc ^ str.charCodeAt(i)) & 0xFF;
		x = '0x' + table.substr(y * 9, 8);
		crc = (crc >>> 8) ^ x;
	  }

	  return crc ^ (-1);
  	};
	exports.crc32 = crc32

	const explode = function (delimiter, string, limit) {
		if (arguments.length < 2 || typeof delimiter === 'undefined' || typeof string === 'undefined') return null;
		  if (delimiter === '' || delimiter === false || delimiter === null) return false;
		  if (typeof delimiter === 'function' || typeof delimiter === 'object' || typeof string === 'function' || typeof string ===
			'object') {
			return {
			  0: ''
			};
		  }
		  if (delimiter === true) delimiter = '1';

		  // Here we go...
		  delimiter += '';
		  string += '';

		  var s = string.split(delimiter);

		  if (typeof limit === 'undefined') return s;

		  // Support for limit
		  if (limit === 0) limit = 1;

		  // Positive limit
		  if (limit > 0) {
			if (limit >= s.length) return s;
			return s.slice(0, limit - 1)
			  .concat([s.slice(limit - 1)
				.join(delimiter)
			  ]);
		  }

		  // Negative limit
		  if (-limit >= s.length) return [];

		  s.splice(s.length + limit);
		  return s;
	};
	exports.explode = explode;

	const get_html_translation_table = function (table, quote_style) {
		var entities = {},
			hash_map = {},
			decimal;
		  var constMappingTable = {},
			constMappingQuoteStyle = {};
		  var useTable = {},
			useQuoteStyle = {};

		  // Translate arguments
		  constMappingTable[0] = 'HTML_SPECIALCHARS';
		  constMappingTable[1] = 'HTML_ENTITIES';
		  constMappingQuoteStyle[0] = 'ENT_NOQUOTES';
		  constMappingQuoteStyle[2] = 'ENT_COMPAT';
		  constMappingQuoteStyle[3] = 'ENT_QUOTES';

		  useTable = !isNaN(table) ? constMappingTable[table] : table ? table.toUpperCase() : 'HTML_SPECIALCHARS';
		  useQuoteStyle = !isNaN(quote_style) ? constMappingQuoteStyle[quote_style] : quote_style ? quote_style.toUpperCase() :
			'ENT_COMPAT';

		  if (useTable !== 'HTML_SPECIALCHARS' && useTable !== 'HTML_ENTITIES') {
			throw new Error('Table: ' + useTable + ' not supported');
			// return false;
		  }

		  entities['38'] = '&amp;';
		  if (useTable === 'HTML_ENTITIES') {
			entities['160'] = '&nbsp;';
			entities['161'] = '&iexcl;';
			entities['162'] = '&cent;';
			entities['163'] = '&pound;';
			entities['164'] = '&curren;';
			entities['165'] = '&yen;';
			entities['166'] = '&brvbar;';
			entities['167'] = '&sect;';
			entities['168'] = '&uml;';
			entities['169'] = '&copy;';
			entities['170'] = '&ordf;';
			entities['171'] = '&laquo;';
			entities['172'] = '&not;';
			entities['173'] = '&shy;';
			entities['174'] = '&reg;';
			entities['175'] = '&macr;';
			entities['176'] = '&deg;';
			entities['177'] = '&plusmn;';
			entities['178'] = '&sup2;';
			entities['179'] = '&sup3;';
			entities['180'] = '&acute;';
			entities['181'] = '&micro;';
			entities['182'] = '&para;';
			entities['183'] = '&middot;';
			entities['184'] = '&cedil;';
			entities['185'] = '&sup1;';
			entities['186'] = '&ordm;';
			entities['187'] = '&raquo;';
			entities['188'] = '&frac14;';
			entities['189'] = '&frac12;';
			entities['190'] = '&frac34;';
			entities['191'] = '&iquest;';
			entities['192'] = '&Agrave;';
			entities['193'] = '&Aacute;';
			entities['194'] = '&Acirc;';
			entities['195'] = '&Atilde;';
			entities['196'] = '&Auml;';
			entities['197'] = '&Aring;';
			entities['198'] = '&AElig;';
			entities['199'] = '&Ccedil;';
			entities['200'] = '&Egrave;';
			entities['201'] = '&Eacute;';
			entities['202'] = '&Ecirc;';
			entities['203'] = '&Euml;';
			entities['204'] = '&Igrave;';
			entities['205'] = '&Iacute;';
			entities['206'] = '&Icirc;';
			entities['207'] = '&Iuml;';
			entities['208'] = '&ETH;';
			entities['209'] = '&Ntilde;';
			entities['210'] = '&Ograve;';
			entities['211'] = '&Oacute;';
			entities['212'] = '&Ocirc;';
			entities['213'] = '&Otilde;';
			entities['214'] = '&Ouml;';
			entities['215'] = '&times;';
			entities['216'] = '&Oslash;';
			entities['217'] = '&Ugrave;';
			entities['218'] = '&Uacute;';
			entities['219'] = '&Ucirc;';
			entities['220'] = '&Uuml;';
			entities['221'] = '&Yacute;';
			entities['222'] = '&THORN;';
			entities['223'] = '&szlig;';
			entities['224'] = '&agrave;';
			entities['225'] = '&aacute;';
			entities['226'] = '&acirc;';
			entities['227'] = '&atilde;';
			entities['228'] = '&auml;';
			entities['229'] = '&aring;';
			entities['230'] = '&aelig;';
			entities['231'] = '&ccedil;';
			entities['232'] = '&egrave;';
			entities['233'] = '&eacute;';
			entities['234'] = '&ecirc;';
			entities['235'] = '&euml;';
			entities['236'] = '&igrave;';
			entities['237'] = '&iacute;';
			entities['238'] = '&icirc;';
			entities['239'] = '&iuml;';
			entities['240'] = '&eth;';
			entities['241'] = '&ntilde;';
			entities['242'] = '&ograve;';
			entities['243'] = '&oacute;';
			entities['244'] = '&ocirc;';
			entities['245'] = '&otilde;';
			entities['246'] = '&ouml;';
			entities['247'] = '&divide;';
			entities['248'] = '&oslash;';
			entities['249'] = '&ugrave;';
			entities['250'] = '&uacute;';
			entities['251'] = '&ucirc;';
			entities['252'] = '&uuml;';
			entities['253'] = '&yacute;';
			entities['254'] = '&thorn;';
			entities['255'] = '&yuml;';
		  }

		  if (useQuoteStyle !== 'ENT_NOQUOTES') {
			entities['34'] = '&quot;';
		  }
		  if (useQuoteStyle === 'ENT_QUOTES') {
			entities['39'] = '&#39;';
		  }
		  entities['60'] = '&lt;';
		  entities['62'] = '&gt;';

		  // ascii decimals to real symbols
		  for (decimal in entities) {
			if (entities.hasOwnProperty(decimal)) {
			  hash_map[String.fromCharCode(decimal)] = entities[decimal];
			}
		  }

		  return hash_map;
	};
	exports.get_html_translation_table = get_html_translation_table;

	const html_entity_decode = function (string, quote_style) {
		var hash_map = {},
			symbol = '',
			tmp_str = '',
			entity = '';
		  tmp_str = string.toString();

		  if (false === (hash_map = get_html_translation_table('HTML_ENTITIES', quote_style))) {
			return false;
		  }

		  // fix &amp; problem
		  // http://phpjs.org/functions/get_html_translation_table:416#comment_97660
		  delete(hash_map['&']);
		  hash_map['&'] = '&amp;';

		  for (symbol in hash_map) {
			entity = hash_map[symbol];
			tmp_str = tmp_str.split(entity)
			  .join(symbol);
		  }
		  tmp_str = tmp_str.split('&#039;')
			.join("'");

		  return tmp_str;
	};
	exports.html_entity_decode = html_entity_decode;

	const htmlentities = function (string, quote_style, charset, double_encode) {
		var hash_map = get_html_translation_table('HTML_ENTITIES', quote_style),
			symbol = '';
		  string = string == null ? '' : string + '';

		  if (!hash_map) {
			return false;
		  }

		  if (quote_style && quote_style === 'ENT_QUOTES') {
			hash_map["'"] = '&#039;';
		  }

		  if ( !! double_encode || double_encode == null) {
			for (symbol in hash_map) {
			  if (hash_map.hasOwnProperty(symbol)) {
				string = string.split(symbol)
				  .join(hash_map[symbol]);
			  }
			}
		  } else {
			string = string.replace(/([\s\S]*?)(&(?:#\d+|#x[\da-f]+|[a-zA-Z][\da-z]*);|$)/g, function(ignore, text, entity) {
			  for (symbol in hash_map) {
				if (hash_map.hasOwnProperty(symbol)) {
				  text = text.split(symbol)
					.join(hash_map[symbol]);
				}
			  }

			  return text + entity;
			});
		  }

		  return string;
	};
	exports.htmlentities = htmlentities;

	const htmlspecialchars = function (string, quote_style, charset, double_encode) {
		var optTemp = 0,
			i = 0,
			noquotes = false;
		  if (typeof quote_style === 'undefined' || quote_style === null) {
			quote_style = 2;
		  }
		  string = string.toString();
		  if (double_encode !== false) { // Put this first to avoid double-encoding
			string = string.replace(/&/g, '&amp;');
		  }
		  string = string.replace(/</g, '&lt;')
			.replace(/>/g, '&gt;');

		  var OPTS = {
			'ENT_NOQUOTES': 0,
			'ENT_HTML_QUOTE_SINGLE': 1,
			'ENT_HTML_QUOTE_DOUBLE': 2,
			'ENT_COMPAT': 2,
			'ENT_QUOTES': 3,
			'ENT_IGNORE': 4
		  };
		  if (quote_style === 0) {
			noquotes = true;
		  }
		  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
			quote_style = [].concat(quote_style);
			for (i = 0; i < quote_style.length; i++) {
			  // Resolve string input to bitwise e.g. 'ENT_IGNORE' becomes 4
			  if (OPTS[quote_style[i]] === 0) {
				noquotes = true;
			  } else if (OPTS[quote_style[i]]) {
				optTemp = optTemp | OPTS[quote_style[i]];
			  }
			}
			quote_style = optTemp;
		  }
		  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
			string = string.replace(/'/g, '&#039;');
		  }
		  if (!noquotes) {
			string = string.replace(/"/g, '&quot;');
		  }

		  return string;
	};
	exports.htmlspecialchars = htmlspecialchars;

	const htmlspecialchars_decode = function (string, quote_style) {
		var optTemp = 0,
			i = 0,
			noquotes = false;
		  if (typeof quote_style === 'undefined') {
			quote_style = 2;
		  }
		  string = string.toString()
			.replace(/&lt;/g, '<')
			.replace(/&gt;/g, '>');
		  var OPTS = {
			'ENT_NOQUOTES': 0,
			'ENT_HTML_QUOTE_SINGLE': 1,
			'ENT_HTML_QUOTE_DOUBLE': 2,
			'ENT_COMPAT': 2,
			'ENT_QUOTES': 3,
			'ENT_IGNORE': 4
		  };
		  if (quote_style === 0) {
			noquotes = true;
		  }
		  if (typeof quote_style !== 'number') { // Allow for a single string or an array of string flags
			quote_style = [].concat(quote_style);
			for (i = 0; i < quote_style.length; i++) {
			  // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
			  if (OPTS[quote_style[i]] === 0) {
				noquotes = true;
			  } else if (OPTS[quote_style[i]]) {
				optTemp = optTemp | OPTS[quote_style[i]];
			  }
			}
			quote_style = optTemp;
		  }
		  if (quote_style & OPTS.ENT_HTML_QUOTE_SINGLE) {
			string = string.replace(/&#0*39;/g, "'"); // PHP doesn't currently escape if more than one 0, but it should
			// string = string.replace(/&apos;|&#x0*27;/g, "'"); // This would also be useful here, but not a part of PHP
		  }
		  if (!noquotes) {
			string = string.replace(/&quot;/g, '"');
		  }
		  // Put this in last place to avoid escape being double-decoded
		  string = string.replace(/&amp;/g, '&');

		  return string;
	};
	exports.htmlspecialchars_decode = htmlspecialchars_decode;

	const implode = function (glue, pieces) {
		var i = '',
			retVal = '',
			tGlue = '';
		  if (arguments.length === 1) {
			pieces = glue;
			glue = '';
		  }
		  if (typeof pieces === 'object') {
			if (Object.prototype.toString.call(pieces) === '[object Array]') {
			  return pieces.join(glue);
			}
			for (i in pieces) {
			  retVal += tGlue + pieces[i];
			  tGlue = glue;
			}
			return retVal;
		  }
		  return pieces;
	};
	exports.implode = implode;

	const join = function (glue, pieces) {
		return implode(glue, pieces);
	};
	exports.join = join

	const lcfirst = function (str) {
		str += '';
		  var f = str.charAt(0)
			.toLowerCase();
		  return f + str.substr(1);
	};
	exports.lcfirst = lcfirst;

	const levenshtein = function (s1, s2) {
		if (s1 == s2) {
			return 0;
		  }

		  var s1_len = s1.length;
		  var s2_len = s2.length;
		  if (s1_len === 0) {
			return s2_len;
		  }
		  if (s2_len === 0) {
			return s1_len;
		  }

		  // BEGIN STATIC
		  var split = false;
		  try {
			split = !('0')[0];
		  } catch (e) {
			split = true; // Earlier IE may not support access by string index
		  }
		  // END STATIC
		  if (split) {
			s1 = s1.split('');
			s2 = s2.split('');
		  }

		  var v0 = new Array(s1_len + 1);
		  var v1 = new Array(s1_len + 1);

		  var s1_idx = 0,
			s2_idx = 0,
			cost = 0;
		  for (s1_idx = 0; s1_idx < s1_len + 1; s1_idx++) {
			v0[s1_idx] = s1_idx;
		  }
		  var char_s1 = '',
			char_s2 = '';
		  for (s2_idx = 1; s2_idx <= s2_len; s2_idx++) {
			v1[0] = s2_idx;
			char_s2 = s2[s2_idx - 1];

			for (s1_idx = 0; s1_idx < s1_len; s1_idx++) {
			  char_s1 = s1[s1_idx];
			  cost = (char_s1 == char_s2) ? 0 : 1;
			  var m_min = v0[s1_idx + 1] + 1;
			  var b = v1[s1_idx] + 1;
			  var c = v0[s1_idx] + cost;
			  if (b < m_min) {
				m_min = b;
			  }
			  if (c < m_min) {
				m_min = c;
			  }
			  v1[s1_idx + 1] = m_min;
			}
			var v_tmp = v0;
			v0 = v1;
			v1 = v_tmp;
		  }
		  return v0[s1_len];
	};
	exports.levenshtein = levenshtein;

	const ltrim = function (str, charlist) {
		charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
			.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
		  var re = new RegExp('^[' + charlist + ']+', 'g');
		  return (str + '')
			.replace(re, '');
	};
	exports.ltrim = ltrim;

	const metaphone = function (word, max_phonemes) {
		var type = typeof word;

		  if (type === 'undefined' || type === 'object' && word !== null) {
			return null; // weird!
		  }

		  // infinity and NaN values are treated as strings
		  if (type === 'number') {
			if (isNaN(word)) {
			  word = 'NAN';
			} else if (!isFinite(word)) {
			  word = 'INF';
			}
		  }

		  if (max_phonemes < 0) {
			return false;
		  }

		  max_phonemes = Math.floor(+max_phonemes) || 0;

		  // alpha depends on locale, so this var might need an update
		  // or should be turned into a regex
		  // for now assuming pure a-z
		  var alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
			vowel = 'AEIOU',
			soft = 'EIY',
			leadingNonAlpha = new RegExp('^[^' + alpha + ']+');

		  word = typeof word === 'string' ? word : '';
		  word = word.toUpperCase()
			.replace(leadingNonAlpha, '');

		  if (!word) {
			return '';
		  }

		  var is = function(p, c) {
			return c !== '' && p.indexOf(c) !== -1;
		  };

		  var i = 0,
			cc = word.charAt(0), // current char. Short name, because it's used all over the function
			nc = word.charAt(1), // next char
			nnc, // after next char
			pc, // previous char
			l = word.length,
			meta = '',
			// traditional is an internal param that could be exposed
			// for now let it be a local var
			traditional = true;

		  switch (cc) {
			case 'A':
			  meta += nc === 'E' ? nc : cc;
			  i += 1;
			  break;
			case 'G':
			case 'K':
			case 'P':
			  if (nc === 'N') {
				meta += nc;
				i += 2;
			  }
			  break;
			case 'W':
			  if (nc === 'R') {
				meta += nc;
				i += 2;
			  } else if (nc === 'H' || is(vowel, nc)) {
				meta += 'W';
				i += 2;
			  }
			  break;
			case 'X':
			  meta += 'S';
			  i += 1;
			  break;
			case 'E':
			case 'I':
			case 'O':
			case 'U':
			  meta += cc;
			  i++;
			  break;
		  }

		  for (; i < l && (max_phonemes === 0 || meta.length < max_phonemes); i += 1) {
			cc = word.charAt(i);
			nc = word.charAt(i + 1);
			pc = word.charAt(i - 1);
			nnc = word.charAt(i + 2);

			if (cc === pc && cc !== 'C') {
			  continue;
			}

			switch (cc) {
			  case 'B':
				if (pc !== 'M') {
				  meta += cc;
				}
				break;
			  case 'C':
				if (is(soft, nc)) {
				  if (nc === 'I' && nnc === 'A') {
					meta += 'X';
				  } else if (pc !== 'S') {
					meta += 'S';
				  }
				} else if (nc === 'H') {
				  meta += !traditional && (nnc === 'R' || pc === 'S') ? 'K' : 'X';
				  i += 1;
				} else {
				  meta += 'K';
				}
				break;
			  case 'D':
				if (nc === 'G' && is(soft, nnc)) {
				  meta += 'J';
				  i += 1;
				} else {
				  meta += 'T';
				}
				break;
			  case 'G':
				if (nc === 'H') {
				  if (!(is('BDH', word.charAt(i - 3)) || word.charAt(i - 4) === 'H')) {
					meta += 'F';
					i += 1;
				  }
				} else if (nc === 'N') {
				  if (is(alpha, nnc) && word.substr(i + 1, 3) !== 'NED') {
					meta += 'K';
				  }
				} else if (is(soft, nc) && pc !== 'G') {
				  meta += 'J';
				} else {
				  meta += 'K';
				}
				break;
			  case 'H':
				if (is(vowel, nc) && !is('CGPST', pc)) {
				  meta += cc;
				}
				break;
			  case 'K':
				if (pc !== 'C') {
				  meta += 'K';
				}
				break;
			  case 'P':
				meta += nc === 'H' ? 'F' : cc;
				break;
			  case 'Q':
				meta += 'K';
				break;
			  case 'S':
				if (nc === 'I' && is('AO', nnc)) {
				  meta += 'X';
				} else if (nc === 'H') {
				  meta += 'X';
				  i += 1;
				} else if (!traditional && word.substr(i + 1, 3) === 'CHW') {
				  meta += 'X';
				  i += 2;
				} else {
				  meta += 'S';
				}
				break;
			  case 'T':
				if (nc === 'I' && is('AO', nnc)) {
				  meta += 'X';
				} else if (nc === 'H') {
				  meta += '0';
				  i += 1;
				} else if (word.substr(i + 1, 2) !== 'CH') {
				  meta += 'T';
				}
				break;
			  case 'V':
				meta += 'F';
				break;
			  case 'W':
			  case 'Y':
				if (is(vowel, nc)) {
				  meta += cc;
				}
				break;
			  case 'X':
				meta += 'KS';
				break;
			  case 'Z':
				meta += 'S';
				break;
			  case 'F':
			  case 'J':
			  case 'L':
			  case 'M':
			  case 'N':
			  case 'R':
				meta += cc;
				break;
			}
		  }

		  return meta;
	};
	exports.metaphone = metaphone;

	const nl2br = function (str, is_xhtml) {
		var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br ' + '/>' : '<br>'; // Adjust comment to avoid issue on phpjs.org display

		  return (str + '')
			.replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
	};
	exports.nl2br = nl2br;

	const number_format = function (number, decimals, dec_point, thousands_sep) {
		number = (number + '')
			.replace(/[^0-9+\-Ee.]/g, '');
		  var n = !isFinite(+number) ? 0 : +number,
			prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
			sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
			dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
			s = '',
			toFixedFix = function(n, prec) {
			  var k = Math.pow(10, prec);
			  return '' + (Math.round(n * k) / k)
				.toFixed(prec);
			};
		  // Fix for IE parseFloat(0.55).toFixed(0) = 0;
		  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n))
			.split('.');
		  if (s[0].length > 3) {
			s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
		  }
		  if ((s[1] || '')
			.length < prec) {
			s[1] = s[1] || '';
			s[1] += new Array(prec - s[1].length + 1)
			  .join('0');
		  }
		  return s.join(dec);
	};
	exports.number_format = number_format;

	const ord = function (string) {
		var str = string + '',
			code = str.charCodeAt(0);
		  if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
			var hi = code;
			if (str.length === 1) {
			  return code; // This is just a high surrogate with no following low surrogate, so we return its value;
			  // we could also throw an error as it is not a complete character, but someone may want to know
			}
			var low = str.charCodeAt(1);
			return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
		  }
		  if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
			return code; // This is just a low surrogate with no preceding high surrogate, so we return its value;
			// we could also throw an error as it is not a complete character, but someone may want to know
		  }
		  return code;
	};
	exports.ord = ord;

	const parse_str = function (str, array) {
		var strArr = String(str)
			.replace(/^&/, '')
			.replace(/&$/, '')
			.split('&'),
			sal = strArr.length,
			i, j, ct, p, lastObj, obj, lastIter, undef, chr, tmp, key, value,
			postLeftBracketPos, keys, keysLen,
			fixStr = function(str) {
			  return decodeURIComponent(str.replace(/\+/g, '%20'));
			};

		  if (!array) {
			array = this.window;
		  }

		  for (i = 0; i < sal; i++) {
			tmp = strArr[i].split('=');
			key = fixStr(tmp[0]);
			value = (tmp.length < 2) ? '' : fixStr(tmp[1]);

			while (key.charAt(0) === ' ') {
			  key = key.slice(1);
			}
			if (key.indexOf('\x00') > -1) {
			  key = key.slice(0, key.indexOf('\x00'));
			}
			if (key && key.charAt(0) !== '[') {
			  keys = [];
			  postLeftBracketPos = 0;
			  for (j = 0; j < key.length; j++) {
				if (key.charAt(j) === '[' && !postLeftBracketPos) {
				  postLeftBracketPos = j + 1;
				} else if (key.charAt(j) === ']') {
				  if (postLeftBracketPos) {
					if (!keys.length) {
					  keys.push(key.slice(0, postLeftBracketPos - 1));
					}
					keys.push(key.substr(postLeftBracketPos, j - postLeftBracketPos));
					postLeftBracketPos = 0;
					if (key.charAt(j + 1) !== '[') {
					  break;
					}
				  }
				}
			  }
			  if (!keys.length) {
				keys = [key];
			  }
			  for (j = 0; j < keys[0].length; j++) {
				chr = keys[0].charAt(j);
				if (chr === ' ' || chr === '.' || chr === '[') {
				  keys[0] = keys[0].substr(0, j) + '_' + keys[0].substr(j + 1);
				}
				if (chr === '[') {
				  break;
				}
			  }

			  obj = array;
			  for (j = 0, keysLen = keys.length; j < keysLen; j++) {
				key = keys[j].replace(/^['"]/, '')
				  .replace(/['"]$/, '');
				lastIter = j !== keys.length - 1;
				lastObj = obj;
				if ((key !== '' && key !== ' ') || j === 0) {
				  if (obj[key] === undef) {
					obj[key] = {};
				  }
				  obj = obj[key];
				} else { // To insert new dimension
				  ct = -1;
				  for (p in obj) {
					if (obj.hasOwnProperty(p)) {
					  if (+p > ct && p.match(/^\d+$/g)) {
						ct = +p;
					  }
					}
				  }
				  key = ct + 1;
				}
			  }
			  lastObj[key] = value;
			}
		  }
	};
	exports.parse_str = parse_str;

	const quoted_printable_decode = function (str) {
		var RFC2045Decode1 = /=\r\n/gm,
			// Decodes all equal signs followed by two hex digits
			RFC2045Decode2IN = /=([0-9A-F]{2})/gim,
			// the RFC states against decoding lower case encodings, but following apparent PHP behavior
			// RFC2045Decode2IN = /=([0-9A-F]{2})/gm,
			RFC2045Decode2OUT = function(sMatch, sHex) {
			  return String.fromCharCode(parseInt(sHex, 16));
			};
		  return str.replace(RFC2045Decode1, '')
			.replace(RFC2045Decode2IN, RFC2045Decode2OUT);
	};
	exports.quoted_printable_decode = quoted_printable_decode;

	const quoted_printable_encode = function (str) {
		var hexChars = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'],
			RFC2045Encode1IN = / \r\n|\r\n|[^!-<>-~ ]/gm,
			RFC2045Encode1OUT = function(sMatch) {
			  // Encode space before CRLF sequence to prevent spaces from being stripped
			  // Keep hard line breaks intact; CRLF sequences
			  if (sMatch.length > 1) {
				return sMatch.replace(' ', '=20');
			  }
			  // Encode matching character
			  var chr = sMatch.charCodeAt(0);
			  return '=' + hexChars[((chr >>> 4) & 15)] + hexChars[(chr & 15)];
			};
		  // Split lines to 75 characters; the reason it's 75 and not 76 is because softline breaks are preceeded by an equal sign; which would be the 76th character.
		  // However, if the last line/string was exactly 76 characters, then a softline would not be needed. PHP currently softbreaks anyway; so this function replicates PHP.
		  RFC2045Encode2IN = /.{1,72}(?!\r\n)[^=]{0,3}/g,
		  RFC2045Encode2OUT = function(sMatch) {
			if (sMatch.substr(sMatch.length - 2) === '\r\n') {
			  return sMatch;
			}
			return sMatch + '=\r\n';
		  };
		  str = str.replace(RFC2045Encode1IN, RFC2045Encode1OUT)
			.replace(RFC2045Encode2IN, RFC2045Encode2OUT);
		  // Strip last softline break
		  return str.substr(0, str.length - 3);
	};
	exports.quoted_printable_encode = quoted_printable_encode;

	const quotemeta = function (str) {
		return (str + '')
			.replace(/([\.\\\+\*\?\[\^\]\$\(\)])/g, '\\$1');
	};
	exports.quotemeta = quotemeta;

	const rtrim = function (str, charlist) {
		charlist = !charlist ? ' \\s\u00A0' : (charlist + '')
			.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '\\$1');
		  var re = new RegExp('[' + charlist + ']+$', 'g');
		  return (str + '')
			.replace(re, '');
	};
	exports.rtrim = rtrim;

	const similar_text = function (first, second, percent) {
		if (first === null || second === null || typeof first === 'undefined' || typeof second === 'undefined') {
			return 0;
		  }

		  first += '';
		  second += '';

		  var pos1 = 0,
			pos2 = 0,
			max = 0,
			firstLength = first.length,
			secondLength = second.length,
			p, q, l, sum;

		  max = 0;

		  for (p = 0; p < firstLength; p++) {
			for (q = 0; q < secondLength; q++) {
			  for (l = 0;
				(p + l < firstLength) && (q + l < secondLength) && (first.charAt(p + l) === second.charAt(q + l)); l++)
			  ;
			  if (l > max) {
				max = l;
				pos1 = p;
				pos2 = q;
			  }
			}
		  }

		  sum = max;

		  if (sum) {
			if (pos1 && pos2) {
			  sum += this.similar_text(first.substr(0, pos1), second.substr(0, pos2));
			}

			if ((pos1 + max < firstLength) && (pos2 + max < secondLength)) {
			  sum += this.similar_text(first.substr(pos1 + max, firstLength - pos1 - max), second.substr(pos2 + max,
				secondLength - pos2 - max));
			}
		  }

		  if (!percent) {
			return sum;
		  } else {
			return (sum * 200) / (firstLength + secondLength);
		  }
	};
	exports.similar_text = similar_text;

	const soundex = function (str) {
		str = (str + '')
			.toUpperCase();
		  if (!str) {
			return '';
		  }
		  var sdx = [0, 0, 0, 0],
			m = {
			  B: 1,
			  F: 1,
			  P: 1,
			  V: 1,
			  C: 2,
			  G: 2,
			  J: 2,
			  K: 2,
			  Q: 2,
			  S: 2,
			  X: 2,
			  Z: 2,
			  D: 3,
			  T: 3,
			  L: 4,
			  M: 5,
			  N: 5,
			  R: 6
			},
			i = 0,
			j, s = 0,
			c, p;

		  while ((c = str.charAt(i++)) && s < 4) {
			if (j = m[c]) {
			  if (j !== p) {
				sdx[s++] = p = j;
			  }
			} else {
			  s += i === 1;
			  p = 0;
			}
		  }

		  sdx[0] = str.charAt(0);
		  return sdx.join('');
	};
	exports.soundex = soundex;

	const split = function (delimiter, string) {
		return explode(delimiter, string);
	};
	exports.split = split;

	const sprintf = function () {
		var regex = /%%|%(\d+\$)?([-+\'#0 ]*)(\*\d+\$|\*|\d+)?(\.(\*\d+\$|\*|\d+))?([scboxXuideEfFgG])/g;
		  var a = arguments;
		  var i = 0;
		  var format = a[i++];

		  // pad()
		  var pad = function(str, len, chr, leftJustify) {
			if (!chr) {
			  chr = ' ';
			}
			var padding = (str.length >= len) ? '' : new Array(1 + len - str.length >>> 0)
			  .join(chr);
			return leftJustify ? str + padding : padding + str;
		  };

		  // justify()
		  var justify = function(value, prefix, leftJustify, minWidth, zeroPad, customPadChar) {
			var diff = minWidth - value.length;
			if (diff > 0) {
			  if (leftJustify || !zeroPad) {
				value = pad(value, minWidth, customPadChar, leftJustify);
			  } else {
				value = value.slice(0, prefix.length) + pad('', diff, '0', true) + value.slice(prefix.length);
			  }
			}
			return value;
		  };

		  // formatBaseX()
		  var formatBaseX = function(value, base, prefix, leftJustify, minWidth, precision, zeroPad) {
			// Note: casts negative numbers to positive ones
			var number = value >>> 0;
			prefix = prefix && number && {
			  '2': '0b',
			  '8': '0',
			  '16': '0x'
			}[base] || '';
			value = prefix + pad(number.toString(base), precision || 0, '0', false);
			return justify(value, prefix, leftJustify, minWidth, zeroPad);
		  };

		  // formatString()
		  var formatString = function(value, leftJustify, minWidth, precision, zeroPad, customPadChar) {
			if (precision != null) {
			  value = value.slice(0, precision);
			}
			return justify(value, '', leftJustify, minWidth, zeroPad, customPadChar);
		  };

		  // doFormat()
		  var doFormat = function(substring, valueIndex, flags, minWidth, _, precision, type) {
			var number, prefix, method, textTransform, value;

			if (substring === '%%') {
			  return '%';
			}

			// parse flags
			var leftJustify = false;
			var positivePrefix = '';
			var zeroPad = false;
			var prefixBaseX = false;
			var customPadChar = ' ';
			var flagsl = flags.length;
			for (var j = 0; flags && j < flagsl; j++) {
			  switch (flags.charAt(j)) {
				case ' ':
				  positivePrefix = ' ';
				  break;
				case '+':
				  positivePrefix = '+';
				  break;
				case '-':
				  leftJustify = true;
				  break;
				case "'":
				  customPadChar = flags.charAt(j + 1);
				  break;
				case '0':
				  zeroPad = true;
				  customPadChar = '0';
				  break;
				case '#':
				  prefixBaseX = true;
				  break;
			  }
			}

			// parameters may be null, undefined, empty-string or real valued
			// we want to ignore null, undefined and empty-string values
			if (!minWidth) {
			  minWidth = 0;
			} else if (minWidth === '*') {
			  minWidth = +a[i++];
			} else if (minWidth.charAt(0) == '*') {
			  minWidth = +a[minWidth.slice(1, -1)];
			} else {
			  minWidth = +minWidth;
			}

			// Note: undocumented perl feature:
			if (minWidth < 0) {
			  minWidth = -minWidth;
			  leftJustify = true;
			}

			if (!isFinite(minWidth)) {
			  throw new Error('sprintf: (minimum-)width must be finite');
			}

			if (!precision) {
			  precision = 'fFeE'.indexOf(type) > -1 ? 6 : (type === 'd') ? 0 : undefined;
			} else if (precision === '*') {
			  precision = +a[i++];
			} else if (precision.charAt(0) == '*') {
			  precision = +a[precision.slice(1, -1)];
			} else {
			  precision = +precision;
			}

			// grab value using valueIndex if required?
			value = valueIndex ? a[valueIndex.slice(0, -1)] : a[i++];

			switch (type) {
			  case 's':
				return formatString(String(value), leftJustify, minWidth, precision, zeroPad, customPadChar);
			  case 'c':
				return formatString(String.fromCharCode(+value), leftJustify, minWidth, precision, zeroPad);
			  case 'b':
				return formatBaseX(value, 2, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
			  case 'o':
				return formatBaseX(value, 8, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
			  case 'x':
				return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
			  case 'X':
				return formatBaseX(value, 16, prefixBaseX, leftJustify, minWidth, precision, zeroPad)
				  .toUpperCase();
			  case 'u':
				return formatBaseX(value, 10, prefixBaseX, leftJustify, minWidth, precision, zeroPad);
			  case 'i':
			  case 'd':
				number = +value || 0;
				number = Math.round(number - number % 1); // Plain Math.round doesn't just truncate
				prefix = number < 0 ? '-' : positivePrefix;
				value = prefix + pad(String(Math.abs(number)), precision, '0', false);
				return justify(value, prefix, leftJustify, minWidth, zeroPad);
			  case 'e':
			  case 'E':
			  case 'f': // Should handle locales (as per setlocale)
			  case 'F':
			  case 'g':
			  case 'G':
				number = +value;
				prefix = number < 0 ? '-' : positivePrefix;
				method = ['toExponential', 'toFixed', 'toPrecision']['efg'.indexOf(type.toLowerCase())];
				textTransform = ['toString', 'toUpperCase']['eEfFgG'.indexOf(type) % 2];
				value = prefix + Math.abs(number)[method](precision);
				return justify(value, prefix, leftJustify, minWidth, zeroPad)[textTransform]();
			  default:
				return substring;
			}
		  };

		  return format.replace(regex, doFormat);
	};
	exports.sprintf = sprintf;

	const sscanf = function (str, format) {
		// SETUP
		  var retArr = [],
			num = 0,
			_NWS = /\S/,
			args = arguments,
			that = this,
			digit;

		  var _setExtraConversionSpecs = function(offset) {
			// Since a mismatched character sets us off track from future legitimate finds, we just scan
			// to the end for any other conversion specifications (besides a percent literal), setting them to null
			// sscanf seems to disallow all conversion specification components (of sprintf) except for type specifiers
			//var matches = format.match(/%[+-]?([ 0]|'.)?-?\d*(\.\d+)?[bcdeufFosxX]/g); // Do not allow % in last char. class
			var matches = format.slice(offset)
			  .match(/%[cdeEufgosxX]/g); // Do not allow % in last char. class;
			// b, F,G give errors in PHP, but 'g', though also disallowed, doesn't
			if (matches) {
			  var lgth = matches.length;
			  while (lgth--) {
				retArr.push(null);
			  }
			}
			return _finish();
		  };

		  var _finish = function() {
			if (args.length === 2) {
			  return retArr;
			}
			for (var i = 0; i < retArr.length; ++i) {
			  that.window[args[i + 2]] = retArr[i];
			}
			return i;
		  };

		  var _addNext = function(j, regex, cb) {
			if (assign) {
			  var remaining = str.slice(j);
			  var check = width ? remaining.substr(0, width) : remaining;
			  var match = regex.exec(check);
			  var testNull = retArr[digit !== undefined ? digit : retArr.length] = match ? (cb ? cb.apply(null, match) :
				match[0]) : null;
			  if (testNull === null) {
				throw 'No match in string';
			  }
			  return j + match[0].length;
			}
			return j;
		  };

		  if (arguments.length < 2) {
			throw 'Not enough arguments passed to sscanf';
		  }

		  // PROCESS
		  for (var i = 0, j = 0; i < format.length; i++) {

			var width = 0,
			  assign = true;

			if (format.charAt(i) === '%') {
			  if (format.charAt(i + 1) === '%') {
				if (str.charAt(j) === '%') { // a matched percent literal
				  ++i, ++j; // skip beyond duplicated percent
				  continue;
				}
				// Format indicated a percent literal, but not actually present
				return _setExtraConversionSpecs(i + 2);
			  }

			  // CHARACTER FOLLOWING PERCENT IS NOT A PERCENT

			  var prePattern = new RegExp('^(?:(\\d+)\\$)?(\\*)?(\\d*)([hlL]?)', 'g'); // We need 'g' set to get lastIndex

			  var preConvs = prePattern.exec(format.slice(i + 1));

			  var tmpDigit = digit;
			  if (tmpDigit && preConvs[1] === undefined) {
				throw 'All groups in sscanf() must be expressed as numeric if any have already been used';
			  }
			  digit = preConvs[1] ? parseInt(preConvs[1], 10) - 1 : undefined;

			  assign = !preConvs[2];
			  width = parseInt(preConvs[3], 10);
			  var sizeCode = preConvs[4];
			  i += prePattern.lastIndex;

			  // Fix: Does PHP do anything with these? Seems not to matter
			  if (sizeCode) { // This would need to be processed later
				switch (sizeCode) {
				  case 'h':
					// Treats subsequent as short int (for d,i,n) or unsigned short int (for o,u,x)
				  case 'l':
					// Treats subsequent as long int (for d,i,n), or unsigned long int (for o,u,x);
					//    or as double (for e,f,g) instead of float or wchar_t instead of char
				  case 'L':
					// Treats subsequent as long double (for e,f,g)
					break;
				  default:
					throw 'Unexpected size specifier in sscanf()!';
					break;
				}
			  }
			  // PROCESS CHARACTER
			  try {
				switch (format.charAt(i + 1)) {
				  // For detailed explanations, see http://web.archive.org/web/20031128125047/http://www.uwm.edu/cgi-bin/IMT/wwwman?topic=scanf%283%29&msection=
				  // Also http://www.mathworks.com/access/helpdesk/help/techdoc/ref/sscanf.html
				  // p, S, C arguments in C function not available
				  // DOCUMENTED UNDER SSCANF
				  case 'F':
					// Not supported in PHP sscanf; the argument is treated as a float, and
					//  presented as a floating-point number (non-locale aware)
					// sscanf doesn't support locales, so no need for two (see %f)
					break;
				  case 'g':
					// Not supported in PHP sscanf; shorter of %e and %f
					// Irrelevant to input conversion
					break;
				  case 'G':
					// Not supported in PHP sscanf; shorter of %E and %f
					// Irrelevant to input conversion
					break;
				  case 'b':
					// Not supported in PHP sscanf; the argument is treated as an integer, and presented as a binary number
					// Not supported - couldn't distinguish from other integers
					break;
				  case 'i':
					// Integer with base detection (Equivalent of 'd', but base 0 instead of 10)
					j = _addNext(j, /([+-])?(?:(?:0x([\da-fA-F]+))|(?:0([0-7]+))|(\d+))/, function(num, sign, hex,
					  oct, dec) {
					  return hex ? parseInt(num, 16) : oct ? parseInt(num, 8) : parseInt(num, 10);
					});
					break;
				  case 'n':
					// Number of characters processed so far
					retArr[digit !== undefined ? digit : retArr.length - 1] = j;
					break;
					// DOCUMENTED UNDER SPRINTF
				  case 'c':
					// Get character; suppresses skipping over whitespace! (but shouldn't be whitespace in format anyways, so no difference here)
					// Non-greedy match
					j = _addNext(j, new RegExp('.{1,' + (width || 1) + '}'));
					break;
				  case 'D':
					// sscanf documented decimal number; equivalent of 'd';
				  case 'd':
					// Optionally signed decimal integer
					j = _addNext(j, /([+-])?(?:0*)(\d+)/, function(num, sign, dec) {
					  // Ignores initial zeroes, unlike %i and parseInt()
					  var decInt = parseInt((sign || '') + dec, 10);
					  if (decInt < 0) { // PHP also won't allow less than -2147483648
						return decInt < -2147483648 ? -2147483648 : decInt; // integer overflow with negative
					  } else { // PHP also won't allow greater than -2147483647
						return decInt < 2147483647 ? decInt : 2147483647;
					  }
					});
					break;
				  case 'f':
					// Although sscanf doesn't support locales, this is used instead of '%F'; seems to be same as %e
				  case 'E':
					// These don't discriminate here as both allow exponential float of either case
				  case 'e':
					j = _addNext(j, /([+-])?(?:0*)(\d*\.?\d*(?:[eE]?\d+)?)/, function(num, sign, dec) {
					  if (dec === '.') {
						return null;
					  }
					  return parseFloat((sign || '') + dec); // Ignores initial zeroes, unlike %i and parseFloat()
					});
					break;
				  case 'u':
					// unsigned decimal integer
					// We won't deal with integer overflows due to signs
					j = _addNext(j, /([+-])?(?:0*)(\d+)/, function(num, sign, dec) {
					  // Ignores initial zeroes, unlike %i and parseInt()
					  var decInt = parseInt(dec, 10);
					  if (sign === '-') { // PHP also won't allow greater than 4294967295
						return 4294967296 - decInt; // integer overflow with negative
					  } else {
						return decInt < 4294967295 ? decInt : 4294967295;
					  }
					});
					break;
				  case 'o':
					// Octal integer // Fix: add overflows as above?
					j = _addNext(j, /([+-])?(?:0([0-7]+))/, function(num, sign, oct) {
					  return parseInt(num, 8);
					});
					break;
				  case 's':
					// Greedy match
					j = _addNext(j, /\S+/);
					break;
				  case 'X':
					// Same as 'x'?
				  case 'x':
					// Fix: add overflows as above?
					// Initial 0x not necessary here
					j = _addNext(j, /([+-])?(?:(?:0x)?([\da-fA-F]+))/, function(num, sign, hex) {
					  return parseInt(num, 16);
					});
					break;
				  case '':
					// If no character left in expression
					throw 'Missing character after percent mark in sscanf() format argument';
				  default:
					throw 'Unrecognized character after percent mark in sscanf() format argument';
				}
			  } catch (e) {
				if (e === 'No match in string') { // Allow us to exit
				  return _setExtraConversionSpecs(i + 2);
				}
			  }++i; // Calculate skipping beyond initial percent too
			} else if (format.charAt(i) !== str.charAt(j)) {
			  // Fix: Double-check i whitespace ignored in string and/or formats
			  _NWS.lastIndex = 0;
			  if ((_NWS)
				.test(str.charAt(j)) || str.charAt(j) === '') { // Whitespace doesn't need to be an exact match)
				return _setExtraConversionSpecs(i + 1);
			  } else {
				// Adjust strings when encounter non-matching whitespace, so they align in future checks above
				str = str.slice(0, j) + str.slice(j + 1); // Ok to replace with j++;?
				i--;
			  }
			} else {
			  j++;
			}
		  }

		  // POST-PROCESSING
		  return _finish();
	};
	exports.sscanf = sscanf;

	const str_getcsv = function (input, delimiter, enclosure, escape) {
		// These test cases allowing for missing delimiters are not currently supported
		  /*
			str_getcsv('"row2""cell1",row2cell2,row2cell3', null, null, '"');
			['row2"cell1', 'row2cell2', 'row2cell3']

			str_getcsv('row1cell1,"row1,cell2",row1cell3', null, null, '"');
			['row1cell1', 'row1,cell2', 'row1cell3']

			str_getcsv('"row2""cell1",row2cell2,"row2""""cell3"');
			['row2"cell1', 'row2cell2', 'row2""cell3']

			str_getcsv('row1cell1,"row1,cell2","row1"",""cell3"', null, null, '"');
			['row1cell1', 'row1,cell2', 'row1","cell3'];

			Should also test newlines within
		*/
		  var i, inpLen, output = [];
		  var backwards = function(str) { // We need to go backwards to simulate negative look-behind (don't split on
			//an escaped enclosure even if followed by the delimiter and another enclosure mark)
			return str.split('')
			  .reverse()
			  .join('');
		  };
		  var pq = function(str) { // preg_quote()
			return String(str)
			  .replace(/([\\\.\+\*\?\[\^\]\$\(\)\{\}\=\!<\>\|\:])/g, '\\$1');
		  };

		  delimiter = delimiter || ',';
		  enclosure = enclosure || '"';
		  escape = escape || '\\';
		  var pqEnc = pq(enclosure);
		  var pqEsc = pq(escape);

		  input = input.replace(new RegExp('^\\s*' + pqEnc), '')
			.replace(new RegExp(pqEnc + '\\s*$'), '');

		  // PHP behavior may differ by including whitespace even outside of the enclosure
		  input = backwards(input)
			.split(new RegExp(pqEnc + '\\s*' + pq(delimiter) + '\\s*' + pqEnc + '(?!' + pqEsc + ')',
			  'g'))
			.reverse();

		  for (i = 0, inpLen = input.length; i < inpLen; i++) {
			output.push(backwards(input[i])
			  .replace(new RegExp(pqEsc + pqEnc, 'g'), enclosure));
		  }

		  return output;
	};
	exports.str_getcsv = str_getcsv;

	const str_ireplace = function (search, replace, subject) {
		var i, k = '';
		  var searchl = 0;
		  var reg;

		  var escapeRegex = function(s) {
			return s.replace(/([\\\^\$*+\[\]?{}.=!:(|)])/g, '\\$1');
		  };

		  search += '';
		  searchl = search.length;
		  if (Object.prototype.toString.call(replace) !== '[object Array]') {
			replace = [replace];
			if (Object.prototype.toString.call(search) === '[object Array]') {
			  // If search is an array and replace is a string,
			  // then this replacement string is used for every value of search
			  while (searchl > replace.length) {
				replace[replace.length] = replace[0];
			  }
			}
		  }

		  if (Object.prototype.toString.call(search) !== '[object Array]') {
			search = [search];
		  }
		  while (search.length > replace.length) {
			// If replace has fewer values than search,
			// then an empty string is used for the rest of replacement values
			replace[replace.length] = '';
		  }

		  if (Object.prototype.toString.call(subject) === '[object Array]') {
			// If subject is an array, then the search and replace is performed
			// with every entry of subject , and the return value is an array as well.
			for (k in subject) {
			  if (subject.hasOwnProperty(k)) {
				subject[k] = str_ireplace(search, replace, subject[k]);
			  }
			}
			return subject;
		  }

		  searchl = search.length;
		  for (i = 0; i < searchl; i++) {
			reg = new RegExp(escapeRegex(search[i]), 'gi');
			subject = subject.replace(reg, replace[i]);
		  }

		  return subject;
	};
	exports.str_ireplace = str_ireplace;

	const str_pad = function (input, pad_length, pad_string, pad_type) {
		var half = '',
			pad_to_go;

		  var str_pad_repeater = function(s, len) {
			var collect = '',
			  i;

			while (collect.length < len) {
			  collect += s;
			}
			collect = collect.substr(0, len);

			return collect;
		  };

		  input += '';
		  pad_string = pad_string !== undefined ? pad_string : ' ';

		  if (pad_type !== 'STR_PAD_LEFT' && pad_type !== 'STR_PAD_RIGHT' && pad_type !== 'STR_PAD_BOTH') {
			pad_type = 'STR_PAD_RIGHT';
		  }
		  if ((pad_to_go = pad_length - input.length) > 0) {
			if (pad_type === 'STR_PAD_LEFT') {
			  input = str_pad_repeater(pad_string, pad_to_go) + input;
			} else if (pad_type === 'STR_PAD_RIGHT') {
			  input = input + str_pad_repeater(pad_string, pad_to_go);
			} else if (pad_type === 'STR_PAD_BOTH') {
			  half = str_pad_repeater(pad_string, Math.ceil(pad_to_go / 2));
			  input = half + input + half;
			  input = input.substr(0, pad_length);
			}
		  }

		  return input;
	};
	exports.str_pad = str_pad;

	const str_repeat = function (input, multiplier) {
		var y = '';
		  while (true) {
			if (multiplier & 1) {
			  y += input;
			}
			multiplier >>= 1;
			if (multiplier) {
			  input += input;
			} else {
			  break;
			}
		  }
		  return y;
	};
	exports.str_repeat = str_repeat;

	const str_replace = function (search, replace, subject, count) {
		var i = 0,
			j = 0,
			temp = '',
			repl = '',
			sl = 0,
			fl = 0,
			f = [].concat(search),
			r = [].concat(replace),
			s = subject,
			ra = Object.prototype.toString.call(r) === '[object Array]',
			sa = Object.prototype.toString.call(s) === '[object Array]';
		  s = [].concat(s);
		  if (count) {
			this.window[count] = 0;
		  }

		  for (i = 0, sl = s.length; i < sl; i++) {
			if (s[i] === '') {
			  continue;
			}
			for (j = 0, fl = f.length; j < fl; j++) {
			  temp = s[i] + '';
			  repl = ra ? (r[j] !== undefined ? r[j] : '') : r[0];
			  s[i] = (temp)
				.split(f[j])
				.join(repl);
			  if (count && s[i] !== temp) {
				this.window[count] += (temp.length - s[i].length) / f[j].length;
			  }
			}
		  }
		  return sa ? s : s[0];
	};
	exports.str_replace = str_replace;

	const str_rot13 = function (str) {
		return (str + '')
			.replace(/[a-z]/gi, function(s) {
			  return String.fromCharCode(s.charCodeAt(0) + (s.toLowerCase() < 'n' ? 13 : -13));
			});
	};
	exports.str_rot13 = str_rot13;

	const str_shuffle = function (str) {
		if (arguments.length === 0) {
			throw 'Wrong parameter count for str_shuffle()';
		  }

		  if (str == null) {
			return '';
		  }

		  str += '';

		  var newStr = '',
			rand, i = str.length;

		  while (i) {
			rand = Math.floor(Math.random() * i);
			newStr += str.charAt(rand);
			str = str.substring(0, rand) + str.substr(rand + 1);
			i--;
		  }

		  return newStr;
	};
	exports.str_shuffle = str_shuffle;

	const str_split = function (string, split_length) {
		if (split_length === null) {
			split_length = 1;
		  }
		  if (string === null || split_length < 1) {
			return false;
		  }
		  string += '';
		  var chunks = [],
			pos = 0,
			len = string.length;
		  while (pos < len) {
			chunks.push(string.slice(pos, pos += split_length));
		  }

		  return chunks;
	};
	exports.str_split = str_split;

	const strcasecmp = function (f_string1, f_string2) {
		var string1 = (f_string1 + '')
			.toLowerCase();
		  var string2 = (f_string2 + '')
			.toLowerCase();

		  if (string1 > string2) {
			return 1;
		  } else if (string1 == string2) {
			return 0;
		  }

		  return -1;
	};
	exports.strcasecmp = strcasecmp;

	const strchr = function (haystack, needle, bool) {
		return strstr(haystack, needle, bool);
	};
	exports.strctr = strchr;

	const strcmp = function (str1, str2) {
		return ((str1 == str2) ? 0 : ((str1 > str2) ? 1 : -1));
	};
	exports.strcmp = strcmp;

	const strcspn = function (str, mask, start, length) {
		start = start ? start : 0;
		  var count = (length && ((start + length) < str.length)) ? start + length : str.length;
		  strct: for (var i = start, lgth = 0; i < count; i++) {
			for (var j = 0; j < mask.length; j++) {
			  if (str.charAt(i)
				.indexOf(mask[j]) !== -1) {
				continue strct;
			  }
			}++lgth;
		  }

		  return lgth;
	};
	exports.strcspn = strcspn;

	const strip_tags = function (input, allowed) {
		allowed = (((allowed || '') + '')
			.toLowerCase()
			.match(/<[a-z][a-z0-9]*>/g) || [])
			.join(''); // making sure the allowed arg is a string containing only tags in lowercase (<a><b><c>)
		  var tags = /<\/?([a-z][a-z0-9]*)\b[^>]*>/gi,
			commentsAndPhpTags = /<!--[\s\S]*?-->|<\?(?:php)?[\s\S]*?\?>/gi;
		  return input.replace(commentsAndPhpTags, '')
			.replace(tags, function($0, $1) {
			  return allowed.indexOf('<' + $1.toLowerCase() + '>') > -1 ? $0 : '';
			});
	};
	exports.strip_tags = strip_tags;

	const stripos = function (f_haystack, f_needle, f_offset) {
		var haystack = (f_haystack + '')
			.toLowerCase();
		  var needle = (f_needle + '')
			.toLowerCase();
		  var index = 0;

		  if ((index = haystack.indexOf(needle, f_offset)) !== -1) {
			return index;
		  }
		  return false;
	};
	exports.stripos = stripos;

	const stripslashes = function (str) {
		return (str + '')
			.replace(/\\(.?)/g, function(s, n1) {
			  switch (n1) {
				case '\\':
				  return '\\';
				case '0':
				  return '\u0000';
				case '':
				  return '';
				default:
				  return n1;
			  }
			});
	};
	exports.stripslashes = stripslashes;

	const stristr = function (haystack, needle, bool) {
		var pos = 0;

		  haystack += '';
		  pos = haystack.toLowerCase()
			.indexOf((needle + '')
			  .toLowerCase());
		  if (pos == -1) {
			return false;
		  } else {
			if (bool) {
			  return haystack.substr(0, pos);
			} else {
			  return haystack.slice(pos);
			}
		  }
	};
	exports.stristr = stristr;

	const strlen = function (string) {
		var str = string + '';
		  var i = 0,
			chr = '',
			lgth = 0;

		  if (!exports.php_in_js || !exports.php_in_js.ini || !exports.php_in_js.ini['unicode.semantics'] || exports.php_in_js.ini[
			'unicode.semantics'].local_value.toLowerCase() !== 'on') {
			return string.length;
		  }

		  var getWholeChar = function(str, i) {
			var code = str.charCodeAt(i);
			var next = '',
			  prev = '';
			if (0xD800 <= code && code <= 0xDBFF) { // High surrogate (could change last hex to 0xDB7F to treat high private surrogates as single characters)
			  if (str.length <= (i + 1)) {
				throw 'High surrogate without following low surrogate';
			  }
			  next = str.charCodeAt(i + 1);
			  if (0xDC00 > next || next > 0xDFFF) {
				throw 'High surrogate without following low surrogate';
			  }
			  return str.charAt(i) + str.charAt(i + 1);
			} else if (0xDC00 <= code && code <= 0xDFFF) { // Low surrogate
			  if (i === 0) {
				throw 'Low surrogate without preceding high surrogate';
			  }
			  prev = str.charCodeAt(i - 1);
			  if (0xD800 > prev || prev > 0xDBFF) { //(could change last hex to 0xDB7F to treat high private surrogates as single characters)
				throw 'Low surrogate without preceding high surrogate';
			  }
			  return false; // We can pass over low surrogates now as the second component in a pair which we have already processed
			}
			return str.charAt(i);
		  };

		  for (i = 0, lgth = 0; i < str.length; i++) {
			if ((chr = getWholeChar(str, i)) === false) {
			  continue;
			} // Adapt this line at the top of any loop, passing in the whole string and the current iteration and returning a variable to represent the individual character; purpose is to treat the first part of a surrogate pair as the whole character and then ignore the second part
			lgth++;
		  }
		  return lgth;
	};
	exports.strlen = strlen;

	const strnatcasecmp = function (str1, str2) {
		var a = (str1 + '')
			.toLowerCase();
		  var b = (str2 + '')
			.toLowerCase();

		  var isWhitespaceChar = function(a) {
			return a.charCodeAt(0) <= 32;
		  };

		  var isDigitChar = function(a) {
			var charCode = a.charCodeAt(0);
			return (charCode >= 48 && charCode <= 57);
		  };

		  var compareRight = function(a, b) {
			var bias = 0;
			var ia = 0;
			var ib = 0;

			var ca;
			var cb;

			// The longest run of digits wins.  That aside, the greatest
			// value wins, but we can't know that it will until we've scanned
			// both numbers to know that they have the same magnitude, so we
			// remember it in BIAS.
			for (var cnt = 0; true; ia++, ib++) {
			  ca = a.charAt(ia);
			  cb = b.charAt(ib);

			  if (!isDigitChar(ca) && !isDigitChar(cb)) {
				return bias;
			  } else if (!isDigitChar(ca)) {
				return -1;
			  } else if (!isDigitChar(cb)) {
				return 1;
			  } else if (ca < cb) {
				if (bias === 0) {
				  bias = -1;
				}
			  } else if (ca > cb) {
				if (bias === 0) {
				  bias = 1;
				}
			  } else if (ca === '0' && cb === '0') {
				return bias;
			  }
			}
		  };

		  var ia = 0,
			ib = 0;
		  var nza = 0,
			nzb = 0;
		  var ca, cb;
		  var result;

		  while (true) {
			// only count the number of zeroes leading the last number compared
			nza = nzb = 0;

			ca = a.charAt(ia);
			cb = b.charAt(ib);

			// skip over leading spaces or zeros
			while (isWhitespaceChar(ca) || ca === '0') {
			  if (ca === '0') {
				nza++;
			  } else {
				// only count consecutive zeroes
				nza = 0;
			  }

			  ca = a.charAt(++ia);
			}

			while (isWhitespaceChar(cb) || cb === '0') {
			  if (cb === '0') {
				nzb++;
			  } else {
				// only count consecutive zeroes
				nzb = 0;
			  }

			  cb = b.charAt(++ib);
			}

			// process run of digits
			if (isDigitChar(ca) && isDigitChar(cb)) {
			  if ((result = compareRight(a.substring(ia), b.substring(ib))) !== 0) {
				return result;
			  }
			}

			if (ca === '0' && cb === '0') {
			  // The strings compare the same.  Perhaps the caller
			  // will want to call strcmp to break the tie.
			  return nza - nzb;
			}

			if (ca < cb) {
			  return -1;
			} else if (ca > cb) {
			  return +1;
			}

			// prevent possible infinite loop
			if (ia >= a.length && ib >= b.length) return 0;

			++ia;
			++ib;
		  }
	};
	exports.strnatcasecmp = strnatcasecmp;

	const strncasecmp = function (argStr1, argStr2, len) {
		var diff, i = 0;
		  var str1 = (argStr1 + '')
			.toLowerCase()
			.substr(0, len);
		  var str2 = (argStr2 + '')
			.toLowerCase()
			.substr(0, len);

		  if (str1.length !== str2.length) {
			if (str1.length < str2.length) {
			  len = str1.length;
			  if (str2.substr(0, str1.length) == str1) {
				return str1.length - str2.length; // return the difference of chars
			  }
			} else {
			  len = str2.length;
			  // str1 is longer than str2
			  if (str1.substr(0, str2.length) == str2) {
				return str1.length - str2.length; // return the difference of chars
			  }
			}
		  } else {
			// Avoids trying to get a char that does not exist
			len = str1.length;
		  }

		  for (diff = 0, i = 0; i < len; i++) {
			diff = str1.charCodeAt(i) - str2.charCodeAt(i);
			if (diff !== 0) {
			  return diff;
			}
		  }

		  return 0;
	};
	exports.strncasecmp = strncasecmp;

	const strnatcmp = function (f_string1, f_string2, f_version) {
		var i = 0;

		  if (f_version == undefined) {
			f_version = false;
		  }

		  var __strnatcmp_split = function(f_string) {
			var result = [];
			var buffer = '';
			var chr = '';
			var i = 0,
			  f_stringl = 0;

			var text = true;

			f_stringl = f_string.length;
			for (i = 0; i < f_stringl; i++) {
			  chr = f_string.substring(i, i + 1);
			  if (chr.match(/\d/)) {
				if (text) {
				  if (buffer.length > 0) {
					result[result.length] = buffer;
					buffer = '';
				  }

				  text = false;
				}
				buffer += chr;
			  } else if ((text == false) && (chr === '.') && (i < (f_string.length - 1)) && (f_string.substring(i + 1, i +
				  2)
				.match(/\d/))) {
				result[result.length] = buffer;
				buffer = '';
			  } else {
				if (text == false) {
				  if (buffer.length > 0) {
					result[result.length] = parseInt(buffer, 10);
					buffer = '';
				  }
				  text = true;
				}
				buffer += chr;
			  }
			}

			if (buffer.length > 0) {
			  if (text) {
				result[result.length] = buffer;
			  } else {
				result[result.length] = parseInt(buffer, 10);
			  }
			}

			return result;
		  };

		  var array1 = __strnatcmp_split(f_string1 + '');
		  var array2 = __strnatcmp_split(f_string2 + '');

		  var len = array1.length;
		  var text = true;

		  var result = -1;
		  var r = 0;

		  if (len > array2.length) {
			len = array2.length;
			result = 1;
		  }

		  for (i = 0; i < len; i++) {
			if (isNaN(array1[i])) {
			  if (isNaN(array2[i])) {
				text = true;

				if ((r = strcmp(array1[i], array2[i])) != 0) {
				  return r;
				}
			  } else if (text) {
				return 1;
			  } else {
				return -1;
			  }
			} else if (isNaN(array2[i])) {
			  if (text) {
				return -1;
			  } else {
				return 1;
			  }
			} else {
			  if (text || f_version) {
				if ((r = (array1[i] - array2[i])) != 0) {
				  return r;
				}
			  } else {
				if ((r = strcmp(array1[i].toString(), array2[i].toString())) != 0) {
				  return r;
				}
			  }

			  text = false;
			}
		  }

		  return result;
	};
	exports.strnatcmp = strnatcmp;

	const strncmp = function (str1, str2, lgth) {
		var s1 = (str1 + '')
			.substr(0, lgth);
		  var s2 = (str2 + '')
			.substr(0, lgth);

		  return ((s1 == s2) ? 0 : ((s1 > s2) ? 1 : -1));
	};
	exports.strncmp = strncmp;

	const strpbrk = function (haystack, char_list) {
		for (var i = 0, len = haystack.length; i < len; ++i) {
			if (char_list.indexOf(haystack.charAt(i)) >= 0) {
			  return haystack.slice(i);
			}
		  }
		  return false;
	};
	exports.strpbrk = strpbrk;

	const strpos = function (haystack, needle, offset) {
		var i = (haystack + '')
			.indexOf(needle, (offset || 0));
		  return i === -1 ? false : i;
	};
	exports.strpos = strpos;

	const strrchr = function (haystack, needle) {
		var pos = 0;

		  if (typeof needle !== 'string') {
			needle = String.fromCharCode(parseInt(needle, 10));
		  }
		  needle = needle.charAt(0);
		  pos = haystack.lastIndexOf(needle);
		  if (pos === -1) {
			return false;
		  }

		  return haystack.substr(pos);
	};
	exports.strrchr = strrchr;

	const strrev = function (string) {
		string = string + '';

		  // Performance will be enhanced with the next two lines of code commented
		  //      out if you don't care about combining characters
		  // Keep Unicode combining characters together with the character preceding
		  //      them and which they are modifying (as in PHP 6)
		  // See http://unicode.org/reports/tr44/#Property_Table (Me+Mn)
		  // We also add the low surrogate range at the beginning here so it will be
		  //      maintained with its preceding high surrogate
		  var grapheme_extend =
			/(.)([\uDC00-\uDFFF\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065E\u0670\u06D6-\u06DC\u06DE-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0901-\u0903\u093C\u093E-\u094D\u0951-\u0954\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F90-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1C24-\u1C37\u1DC0-\u1DE6\u1DFE\u1DFF\u20D0-\u20F0\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA926-\uA92D\uA947-\uA953\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uFB1E\uFE00-\uFE0F\uFE20-\uFE26]+)/g;
		  string = string.replace(grapheme_extend, '$2$1'); // Temporarily reverse
		  return string.split('')
			.reverse()
			.join('');
	};
	exports.strrev = strrev;

	const strripos = function (haystack, needle, offset) {
		haystack = (haystack + '')
			.toLowerCase();
		  needle = (needle + '')
			.toLowerCase();

		  var i = -1;
		  if (offset) {
			i = (haystack + '')
			  .slice(offset)
			  .lastIndexOf(needle); // strrpos' offset indicates starting point of range till end,
			// while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
			if (i !== -1) {
			  i += offset;
			}
		  } else {
			i = (haystack + '')
			  .lastIndexOf(needle);
		  }
		  return i >= 0 ? i : false;
	};
	exports.strripos = strripos;

	const strrpos = function (haystack, needle, offset) {
		var i = -1;
		  if (offset) {
			i = (haystack + '')
			  .slice(offset)
			  .lastIndexOf(needle); // strrpos' offset indicates starting point of range till end,
			// while lastIndexOf's optional 2nd argument indicates ending point of range from the beginning
			if (i !== -1) {
			  i += offset;
			}
		  } else {
			i = (haystack + '')
			  .lastIndexOf(needle);
		  }
		  return i >= 0 ? i : false;
	};
	exports.strrpos = strrpos;

	const strspn = function (str1, str2, start, lgth) {
		var found;
		  var stri;
		  var strj;
		  var j = 0;
		  var i = 0;

		  start = start ? (start < 0 ? (str1.length + start) : start) : 0;
		  lgth = lgth ? ((lgth < 0) ? (str1.length + lgth - start) : lgth) : str1.length - start;
		  str1 = str1.substr(start, lgth);

		  for (i = 0; i < str1.length; i++) {
			found = 0;
			stri = str1.substring(i, i + 1);
			for (j = 0; j <= str2.length; j++) {
			  strj = str2.substring(j, j + 1);
			  if (stri == strj) {
				found = 1;
				break;
			  }
			}
			if (found != 1) {
			  return i;
			}
		  }

		  return i;
	};
	exports.strspn = strspn;

	const strstr = function (haystack, needle, bool) {
		var pos = 0;

		  haystack += '';
		  pos = haystack.indexOf(needle);
		  if (pos == -1) {
			return false;
		  } else {
			if (bool) {
			  return haystack.substr(0, pos);
			} else {
			  return haystack.slice(pos);
			}
		  }
	};
	exports.strstr = strstr;

	const strtok = function (str, tokens) {
		exports.php_in_js = exports.php_in_js || {};
		  // END REDUNDANT
		  if (tokens === undefined) {
			tokens = str;
			str = exports.php_in_js.strtokleftOver;
		  }
		  if (str.length === 0) {
			return false;
		  }
		  if (tokens.indexOf(str.charAt(0)) !== -1) {
			return this.strtok(str.substr(1), tokens);
		  }
		  for (var i = 0; i < str.length; i++) {
			if (tokens.indexOf(str.charAt(i)) !== -1) {
			  break;
			}
		  }
		  exports.php_in_js.strtokleftOver = str.substr(i + 1);
		  return str.substring(0, i);
	};
	exports.strtok = strtok;

	const strtolower = function (str) {
		return (str + '')
			.toLowerCase();
	};
	exports.strtolower = strtolower;

	const strtoupper = function (str) {
		return (str + '')
			.toUpperCase();
	};
	exports.strtoupper = strtoupper;

	const substr = function (str, start, len) {
		var i = 0,
			allBMP = true,
			es = 0,
			el = 0,
			se = 0,
			ret = '';
		  str += '';
		  var end = str.length;

		  // BEGIN REDUNDANT
		  exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.ini = exports.php_in_js.ini || {};
		  // END REDUNDANT
		  switch ((exports.php_in_js.ini['unicode.semantics'] && exports.php_in_js.ini['unicode.semantics'].local_value.toLowerCase())) {
			case 'on':
			  // Full-blown Unicode including non-Basic-Multilingual-Plane characters
			  // strlen()
			  for (i = 0; i < str.length; i++) {
				if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
				  allBMP = false;
				  break;
				}
			  }

			  if (!allBMP) {
				if (start < 0) {
				  for (i = end - 1, es = (start += end); i >= es; i--) {
					if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
					  start--;
					  es--;
					}
				  }
				} else {
				  var surrogatePairs = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
				  while ((surrogatePairs.exec(str)) != null) {
					var li = surrogatePairs.lastIndex;
					if (li - 2 < start) {
					  start++;
					} else {
					  break;
					}
				  }
				}

				if (start >= end || start < 0) {
				  return false;
				}
				if (len < 0) {
				  for (i = end - 1, el = (end += len); i >= el; i--) {
					if (/[\uDC00-\uDFFF]/.test(str.charAt(i)) && /[\uD800-\uDBFF]/.test(str.charAt(i - 1))) {
					  end--;
					  el--;
					}
				  }
				  if (start > end) {
					return false;
				  }
				  return str.slice(start, end);
				} else {
				  se = start + len;
				  for (i = start; i < se; i++) {
					ret += str.charAt(i);
					if (/[\uD800-\uDBFF]/.test(str.charAt(i)) && /[\uDC00-\uDFFF]/.test(str.charAt(i + 1))) {
					  se++; // Go one further, since one of the "characters" is part of a surrogate pair
					}
				  }
				  return ret;
				}
				break;
			  }
			  // Fall-through
			case 'off':
			  // assumes there are no non-BMP characters;
			  //    if there may be such characters, then it is best to turn it on (critical in true XHTML/XML)
			default:
			  if (start < 0) {
				start += end;
			  }
			  end = typeof len === 'undefined' ? end : (len < 0 ? len + end : len + start);
			  // PHP returns false if start does not fall within the string.
			  // PHP returns false if the calculated end comes before the calculated start.
			  // PHP returns an empty string if start and end are the same.
			  // Otherwise, PHP returns the portion of the string from start to end.
			  return start >= str.length || start < 0 || start > end ? !1 : str.slice(start, end);
		  }
		  return undefined; // Please Netbeans
	};
	exports.substr = substr;

	const substr_compare = function (main_str, str, offset, length, case_insensitivity) {
		if (!offset && offset !== 0) {
			throw 'Missing offset for substr_compare()';
		  }

		  if (offset < 0) {
			offset = main_str.length + offset;
		  }

		  if (length && length > (main_str.length - offset)) {
			return false;
		  }
		  length = length || main_str.length - offset;

		  main_str = main_str.substr(offset, length);
		  str = str.substr(0, length); // Should only compare up to the desired length
		  if (case_insensitivity) { // Works as strcasecmp
			main_str = (main_str + '')
			  .toLowerCase();
			str = (str + '')
			  .toLowerCase();
			if (main_str == str) {
			  return 0;
			}
			return (main_str > str) ? 1 : -1;
		  }
		  // Works as strcmp
		  return ((main_str == str) ? 0 : ((main_str > str) ? 1 : -1));
	};
	exports.substr_compare = substr_compare;

	const substr_count = function (haystack, needle, offset, length) {
		var cnt = 0;

		  haystack += '';
		  needle += '';
		  if (isNaN(offset)) {
			offset = 0;
		  }
		  if (isNaN(length)) {
			length = 0;
		  }
		  if (needle.length == 0) {
			return false;
		  }
		  offset--;

		  while ((offset = haystack.indexOf(needle, offset + 1)) != -1) {
			if (length > 0 && (offset + needle.length) > length) {
			  return false;
			}
			cnt++;
		  }

		  return cnt;
	};
	exports.substr_count = substr_count;

	const substr_replace = function (str, replace, start, length) {
		if (start < 0) { // start position in str
			start = start + str.length;
		  }
		  length = length !== undefined ? length : str.length;
		  if (length < 0) {
			length = length + str.length - start;
		  }

		  return str.slice(0, start) + replace.substr(0, length) + replace.slice(length) + str.slice(start + length);
	};
	exports.substr_replace = substr_replace

	const trim = function (str, charlist) {
		var whitespace, l = 0,
			i = 0;
		  str += '';

		  if (!charlist) {
			// default list
			whitespace =
			  ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000';
		  } else {
			// preg_quote custom list
			charlist += '';
			whitespace = charlist.replace(/([\[\]\(\)\.\?\/\*\{\}\+\$\^\:])/g, '$1');
		  }

		  l = str.length;
		  for (i = 0; i < l; i++) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
			  str = str.substring(i);
			  break;
			}
		  }

		  l = str.length;
		  for (i = l - 1; i >= 0; i--) {
			if (whitespace.indexOf(str.charAt(i)) === -1) {
			  str = str.substring(0, i + 1);
			  break;
			}
		  }

		  return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
	};
	exports.trim = trim;

	const ucfirst = function (str) {
		str += '';
		  var f = str.charAt(0)
			.toUpperCase();
		  return f + str.substr(1);
	};
	exports.ucfirst = ucfirst;

	const ucwords = function (str) {
		return (str + '')
			.replace(/^([a-z\u00E0-\u00FC])|\s+([a-z\u00E0-\u00FC])/g, function($1) {
			  return $1.toUpperCase();
			});
	};
	exports.ucwords = ucwords;

	const utf8_decode = function (str_data) {
		var tmp_arr = [],
			i = 0,
			ac = 0,
			c1 = 0,
			c2 = 0,
			c3 = 0,
			c4 = 0;

		  str_data += '';

		  while (i < str_data.length) {
			c1 = str_data.charCodeAt(i);
			if (c1 <= 191) {
			  tmp_arr[ac++] = String.fromCharCode(c1);
			  i++;
			} else if (c1 <= 223) {
			  c2 = str_data.charCodeAt(i + 1);
			  tmp_arr[ac++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
			  i += 2;
			} else if (c1 <= 239) {
			  // http://en.wikipedia.org/wiki/UTF-8#Codepage_layout
			  c2 = str_data.charCodeAt(i + 1);
			  c3 = str_data.charCodeAt(i + 2);
			  tmp_arr[ac++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
			  i += 3;
			} else {
			  c2 = str_data.charCodeAt(i + 1);
			  c3 = str_data.charCodeAt(i + 2);
			  c4 = str_data.charCodeAt(i + 3);
			  c1 = ((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63);
			  c1 -= 0x10000;
			  tmp_arr[ac++] = String.fromCharCode(0xD800 | ((c1 >> 10) & 0x3FF));
			  tmp_arr[ac++] = String.fromCharCode(0xDC00 | (c1 & 0x3FF));
			  i += 4;
			}
		  }

		  return tmp_arr.join('');
	};
	exports.utf8_decode = utf8_decode;

	const utf8_encode = function (argString) {
		if (argString === null || typeof argString === 'undefined') {
			return '';
		  }

		  var string = (argString + ''); // .replace(/\r\n/g, "\n").replace(/\r/g, "\n");
		  var utftext = '',
			start, end, stringl = 0;

		  start = end = 0;
		  stringl = string.length;
		  for (var n = 0; n < stringl; n++) {
			var c1 = string.charCodeAt(n);
			var enc = null;

			if (c1 < 128) {
			  end++;
			} else if (c1 > 127 && c1 < 2048) {
			  enc = String.fromCharCode(
				(c1 >> 6) | 192, (c1 & 63) | 128
			  );
			} else if ((c1 & 0xF800) != 0xD800) {
			  enc = String.fromCharCode(
				(c1 >> 12) | 224, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
			  );
			} else { // surrogate pairs
			  if ((c1 & 0xFC00) != 0xD800) {
				throw new RangeError('Unmatched trail surrogate at ' + n);
			  }
			  var c2 = string.charCodeAt(++n);
			  if ((c2 & 0xFC00) != 0xDC00) {
				throw new RangeError('Unmatched lead surrogate at ' + (n - 1));
			  }
			  c1 = ((c1 & 0x3FF) << 10) + (c2 & 0x3FF) + 0x10000;
			  enc = String.fromCharCode(
				(c1 >> 18) | 240, ((c1 >> 12) & 63) | 128, ((c1 >> 6) & 63) | 128, (c1 & 63) | 128
			  );
			}
			if (enc !== null) {
			  if (end > start) {
				utftext += string.slice(start, end);
			  }
			  utftext += enc;
			  start = end = n + 1;
			}
		  }

		  if (end > start) {
			utftext += string.slice(start, stringl);
		  }

		  return utftext;
	};
	exports.utf8_encode = utf8_encode;

	const wordwrap = function (str, int_width, str_break, cut) {
		var m = ((arguments.length >= 2) ? arguments[1] : 75);
		  var b = ((arguments.length >= 3) ? arguments[2] : '\n');
		  var c = ((arguments.length >= 4) ? arguments[3] : false);

		  var i, j, l, s, r;

		  str += '';

		  if (m < 1) {
			return str;
		  }

		  for (i = -1, l = (r = str.split(/\r\n|\n|\r/))
			.length; ++i < l; r[i] += s) {
			for (s = r[i], r[i] = ''; s.length > m; r[i] += s.slice(0, j) + ((s = s.slice(j))
			  .length ? b : '')) {
			  j = c == 2 || (j = s.slice(0, m + 1)
				.match(/\S*(\s)?$/))[1] ? m : j.input.length - j[0].length || c == 1 && m || j.input.length + (j = s.slice(
				  m)
				.match(/^\S*/))[0].length;
			}
		  }

		  return r.join('\n');
	};
	exports.wordwrap = wordwrap;

})))
