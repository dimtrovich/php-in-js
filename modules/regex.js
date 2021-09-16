/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 *
 * @module Regex
 * @description Fonctions de manipulation d'expressions regulieres
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global = {}));
}(this, (function(exports) {
    'use strict';

	const preg_grep = function (pattern, input, flags) {
		var p = '';
		  var retObj = {};
		  var invert = (flags === 1 || flags === 'PREG_GREP_INVERT'); // Todo: put flags as number and do bitwise checks (at least if other flags allowable); see pathinfo()

		  if (typeof pattern === 'string') {
			pattern = eval(pattern);
		  }

		  if (invert) {
			for (p in input) {
			  if ((input[p] + '')
				.search(pattern) === -1) {
				retObj[p] = input[p];
			  }
			}
		  } else {
			for (p in input) {
			  if ((input[p] + '')
				.search(pattern) !== -1) {
				retObj[p] = input[p];
			  }
			}
		  }

		  return retObj;
	};
	exports.preg_grep = preg_grep;

	const preg_quote = function (str, delimiter) {
		return String(str)
			.replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
	};
	exports.preg_quote = preg_quote;

})))
