/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 *
 * @module Net
 * @description Fonctions de manipulation d'adresse internet
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global = {}));
}(this, (function(exports) {
    'use strict';

	const inet_ntop = function (a) {
		var i = 0,
			m = '',
			c = [];
		  a += '';
		  if (a.length === 4) { // IPv4
			return [
			  a.charCodeAt(0), a.charCodeAt(1), a.charCodeAt(2), a.charCodeAt(3)].join('.');
		  } else if (a.length === 16) { // IPv6
			for (i = 0; i < 16; i++) {
			  c.push(((a.charCodeAt(i++) << 8) + a.charCodeAt(i))
				.toString(16));
			}
			return c.join(':')
			  .replace(/((^|:)0(?=:|$))+:?/g, function(t) {
				m = (t.length > m.length) ? t : m;
				return t;
			  })
			  .replace(m || ' ', '::');
		  } else { // Invalid length
			return false;
		  }
	};
	exports.inet_ntop = inet_ntop;

	const inet_pton = function (a) {
		var r, m, x, i, j, f = String.fromCharCode;
		  m = a.match(/^(?:\d{1,3}(?:\.|$)){4}/); // IPv4
		  if (m) {
			m = m[0].split('.');
			m = f(m[0]) + f(m[1]) + f(m[2]) + f(m[3]);
			// Return if 4 bytes, otherwise false.
			return m.length === 4 ? m : false;
		  }
		  r = /^((?:[\da-f]{1,4}(?::|)){0,8})(::)?((?:[\da-f]{1,4}(?::|)){0,8})$/;
		  m = a.match(r); // IPv6
		  if (m) {
			// Translate each hexadecimal value.
			for (j = 1; j < 4; j++) {
			  // Indice 2 is :: and if no length, continue.
			  if (j === 2 || m[j].length === 0) {
				continue;
			  }
			  m[j] = m[j].split(':');
			  for (i = 0; i < m[j].length; i++) {
				m[j][i] = parseInt(m[j][i], 16);
				// Would be NaN if it was blank, return false.
				if (isNaN(m[j][i])) {
				  return false; // Invalid IP.
				}
				m[j][i] = f(m[j][i] >> 8) + f(m[j][i] & 0xFF);
			  }
			  m[j] = m[j].join('');
			}
			x = m[1].length + m[3].length;
			if (x === 16) {
			  return m[1] + m[3];
			} else if (x < 16 && m[2].length > 0) {
			  return m[1] + (new Array(16 - x + 1))
				.join('\x00') + m[3];
			}
		  }
		  return false; // Invalid IP.
	};
	exports.inet_pton = inet_pton;

	const ip2long = function (IP) {
		var i = 0;
		  // PHP allows decimal, octal, and hexadecimal IP components.
		  // PHP allows between 1 (e.g. 127) to 4 (e.g 127.0.0.1) components.
		  IP = IP.match(
			/^([1-9]\d*|0[0-7]*|0x[\da-f]+)(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?(?:\.([1-9]\d*|0[0-7]*|0x[\da-f]+))?$/i
		  ); // Verify IP format.
		  if (!IP) {
			return false; // Invalid format.
		  }
		  // Reuse IP variable for component counter.
		  IP[0] = 0;
		  for (i = 1; i < 5; i += 1) {
			IP[0] += !! ((IP[i] || '')
			  .length);
			IP[i] = parseInt(IP[i]) || 0;
		  }
		  // Continue to use IP for overflow values.
		  // PHP does not allow any component to overflow.
		  IP.push(256, 256, 256, 256);
		  // Recalculate overflow of last component supplied to make up for missing components.
		  IP[4 + IP[0]] *= Math.pow(256, 4 - IP[0]);
		  if (IP[1] >= IP[5] || IP[2] >= IP[6] || IP[3] >= IP[7] || IP[4] >= IP[8]) {
			return false;
		  }
		  return IP[1] * (IP[0] === 1 || 16777216) + IP[2] * (IP[0] <= 2 || 65536) + IP[3] * (IP[0] <= 3 || 256) + IP[4] * 1;
	};
	exports.ip2long = ip2long;

	const long2ip = function (ip) {
		if (!isFinite(ip))
			return false;

		  return [ip >>> 24, ip >>> 16 & 0xFF, ip >>> 8 & 0xFF, ip & 0xFF].join('.');
	};
	exports.long2ip = long2ip;

	const setcookie = function (name, value, expires, path, domain, secure) {
		return setrawcookie(name, encodeURIComponent(value), expires, path, domain, secure);
	};
	exports.setcookie = setcookie;

	const setrawcookie = function (name, value, expires, path, domain, secure) {
		if (typeof expires === 'string' && (/^\d+$/)
			.test(expires)) {
			expires = parseInt(expires, 10);
		  }

		  if (expires instanceof Date) {
			expires = expires.toGMTString();
		  } else if (typeof expires === 'number') {
			expires = (new Date(expires * 1e3))
			  .toGMTString();
		  }

		  var r = [name + '=' + value],
			s = {},
			i = '';
		  s = {
			expires: expires,
			path: path,
			domain: domain
		  };
		  for (i in s) {
			if (s.hasOwnProperty(i)) { // Exclude items on Object.prototype
			  s[i] && r.push(i + '=' + s[i]);
			}
		  }

		  return secure && r.push('secure'), this.window.document.cookie = r.join(';'), true;
	};
	exports.setrawcookie = setrawcookie;

})))
