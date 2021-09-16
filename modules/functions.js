/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 *
 * @module Functions
 * @description Fonctions de manipulation de functions et callback
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global = {}));
}(this, (function(exports) {
    'use strict';

	const call_user_func = function (cb) {
		var func;

		  if (typeof cb === 'string') {
			func = (typeof this[cb] === 'function') ? this[cb] : func = (new Function(null, 'return ' + cb))();
		  } else if (Object.prototype.toString.call(cb) === '[object Array]') {
			func = (typeof cb[0] === 'string') ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]];
		  } else if (typeof cb === 'function') {
			func = cb;
		  }

		  if (typeof func !== 'function') {
			throw new Error(func + ' is not a valid function');
		  }

		  var parameters = Array.prototype.slice.call(arguments, 1);
		  return (typeof cb[0] === 'string') ? func.apply(eval(cb[0]), parameters) : (typeof cb[0] !== 'object') ? func.apply(
			null, parameters) : func.apply(cb[0], parameters);
	};
	exports.call_user_func = call_user_func

	const call_user_func_array = function (cb, parameters) {
		var func;

		  if (typeof cb === 'string') {
			func = (typeof this[cb] === 'function') ? this[cb] : func = (new Function(null, 'return ' + cb))();
		  } else if (Object.prototype.toString.call(cb) === '[object Array]') {
			func = (typeof cb[0] === 'string') ? eval(cb[0] + "['" + cb[1] + "']") : func = cb[0][cb[1]];
		  } else if (typeof cb === 'function') {
			func = cb;
		  }

		  if (typeof func !== 'function') {
			throw new Error(func + ' is not a valid function');
		  }

		  return (typeof cb[0] === 'string') ? func.apply(eval(cb[0]), parameters) : (typeof cb[0] !== 'object') ? func.apply(
			null, parameters) : func.apply(cb[0], parameters);
	};
	exports.call_user_func_array = call_user_func_array;

	const create_function = function (args, code) {
		try {
			return Function.apply(null, args.split(',')
			  .concat(code));
		  } catch (e) {
			return false;
		  }
	};
	exports.create_function = create_function;

	const function_exists = function (func_name) {
		if (typeof func_name === 'string') {
			func_name = this.window[func_name];
		  }
		  return typeof func_name === 'function';
	};
	exports.function_exists = function_exists;

	const get_defined_functions = function () {
		var i = '',
			arr = [],
			already = {};

		  for (i in this.window) {
			try {
			  if (typeof this.window[i] === 'function') {
				if (!already[i]) {
				  already[i] = 1;
				  arr.push(i);
				}
			  } else if (typeof this.window[i] === 'object') {
				for (var j in this.window[i]) {
				  if (typeof this.window[j] === 'function' && this.window[j] && !already[j]) {
					already[j] = 1;
					arr.push(j);
				  }
				}
			  }
			} catch (e) {
			  // Some objects in Firefox throw exceptions when their properties are accessed (e.g., sessionStorage)
			}
		  }

		  return arr;
	};
	exports.get_defined_functions = get_defined_functions;

})))
