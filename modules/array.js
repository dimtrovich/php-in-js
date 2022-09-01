/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 *
 * @module Array
 * @description Fonctions de manipulation de tableaux
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global = {}));
}(this, (function(exports) {
    'use strict';

	const array = function () {
		try {
			exports.php_in_js = exports.php_in_js || {};
		  } catch (e) {
			exports.php_in_js = {};
		  }

		  var arrInst, e, __, that = this,
			PHPJS_Array = function PHPJS_Array() {};
		  mainArgs = arguments, p = exports.php_in_js,
		  _indexOf = function(value, from, strict) {
			var i = from || 0,
			  nonstrict = !strict,
			  length = this.length;
			while (i < length) {
			  if (this[i] === value || (nonstrict && this[i] == value)) {
				return i;
			  }
			  i++;
			}
			return -1;
		  };
		  // BEGIN REDUNDANT
		  if (!p.Relator) {
			p.Relator = (function() { // Used this functional class for giving privacy to the class we are creating
			  // Code adapted from http://www.devpro.it/code/192.html
			  // Relator explained at http://webreflection.blogspot.com/2008/07/javascript-relator-object-aka.html
			  // Its use as privacy technique described at http://webreflection.blogspot.com/2008/10/new-relator-object-plus-unshared.html
			  // 1) At top of closure, put: var __ = Relator.$();
			  // 2) In constructor, put: var _ = __.constructor(this);
			  // 3) At top of each prototype method, put: var _ = __.method(this);
			  // 4) Use like:  _.privateVar = 5;
			  function _indexOf(value) {
				var i = 0,
				  length = this.length;
				while (i < length) {
				  if (this[i] === value) {
					return i;
				  }
				  i++;
				}
				return -1;
			  }

			  function Relator() {
				var Stack = [],
				  Array = [];
				if (!Stack.indexOf) {
				  Stack.indexOf = _indexOf;
				}
				return {
				  // create a new relator
				  $: function() {
					return Relator();
				  },
				  constructor: function(that) {
					var i = Stack.indexOf(that);~
					i ? Array[i] : Array[Stack.push(that) - 1] = {};
					this.method(that)
					  .that = that;
					return this.method(that);
				  },
				  method: function(that) {
					return Array[Stack.indexOf(that)];
				  }
				};
			  }
			  return Relator();
			}());
		  }
		  // END REDUNDANT

		  if (p && p.ini && p.ini['phpjs.return_phpjs_arrays'].local_value.toLowerCase() === 'on') {
			if (!p.PHPJS_Array) {
			  // We keep this Relator outside the class in case adding prototype methods below
			  // Prototype methods added elsewhere can also use this ArrayRelator to share these "pseudo-global mostly-private" variables
			  __ = p.ArrayRelator = p.ArrayRelator || p.Relator.$();
			  // We could instead allow arguments of {key:XX, value:YY} but even more cumbersome to write
			  p.PHPJS_Array = function PHPJS_Array() {
				var _ = __.constructor(this),
				  args = arguments,
				  i = 0,
				  argl, p;
				args = (args.length === 1 && args[0] && typeof args[0] === 'object' &&
				  args[0].length && !args[0].propertyIsEnumerable('length')) ? args[0] : args; // If first and only arg is an array, use that (Don't depend on this)
				if (!_.objectChain) {
				  _.objectChain = args;
				  _.object = {};
				  _.keys = [];
				  _.values = [];
				}
				for (argl = args.length; i < argl; i++) {
				  for (p in args[i]) {
					// Allow for access by key; use of private members to store sequence allows these to be iterated via for...in (but for read-only use, with hasOwnProperty or function filtering to avoid prototype methods, and per ES, potentially out of order)
					this[p] = _.object[p] = args[i][p];
					// Allow for easier access by prototype methods
					_.keys[_.keys.length] = p;
					_.values[_.values.length] = args[i][p];
					break;
				  }
				}
			  };
			  e = p.PHPJS_Array.prototype;
			  e.change_key_case = function(cs) {
				var _ = __.method(this),
				  oldkey, newkey, i = 0,
				  kl = _.keys.length,
				  case_fn = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';
				while (i < kl) {
				  oldkey = _.keys[i];
				  newkey = _.keys[i] = _.keys[i][case_fn]();
				  if (oldkey !== newkey) {
					this[oldkey] = _.object[oldkey] = _.objectChain[i][oldkey] = null; // Break reference before deleting
					delete this[oldkey];
					delete _.object[oldkey];
					delete _.objectChain[i][oldkey];
					this[newkey] = _.object[newkey] = _.objectChain[i][newkey] = _.values[i]; // Fix: should we make a deep copy?
				  }
				  i++;
				}
				return this;
			  };
			  e.flip = function() {
				var _ = __.method(this),
				  i = 0,
				  kl = _.keys.length;
				while (i < kl) {
				  oldkey = _.keys[i];
				  newkey = _.values[i];
				  if (oldkey !== newkey) {
					this[oldkey] = _.object[oldkey] = _.objectChain[i][oldkey] = null; // Break reference before deleting
					delete this[oldkey];
					delete _.object[oldkey];
					delete _.objectChain[i][oldkey];
					this[newkey] = _.object[newkey] = _.objectChain[i][newkey] = oldkey;
					_.keys[i] = newkey;
				  }
				  i++;
				}
				return this;
			  };
			  e.walk = function(funcname, userdata) {
				var _ = __.method(this),
				  obj, func, ini, i = 0,
				  kl = 0;

				try {
				  if (typeof funcname === 'function') {
					for (i = 0, kl = _.keys.length; i < kl; i++) {
					  if (arguments.length > 1) {
						funcname(_.values[i], _.keys[i], userdata);
					  } else {
						funcname(_.values[i], _.keys[i]);
					  }
					}
				  } else if (typeof funcname === 'string') {
					exports.php_in_js = exports.php_in_js || {};
					exports.php_in_js.ini = exports.php_in_js.ini || {};
					ini = exports.php_in_js.ini['phpjs.no-eval'];
					if (ini && (
					  parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value
						.toLowerCase() !== 'off')
					)) {
					  if (arguments.length > 1) {
						for (i = 0, kl = _.keys.length; i < kl; i++) {
						  this.window[funcname](_.values[i], _.keys[i], userdata);
						}
					  } else {
						for (i = 0, kl = _.keys.length; i < kl; i++) {
						  this.window[funcname](_.values[i], _.keys[i]);
						}
					  }
					} else {
					  if (arguments.length > 1) {
						for (i = 0, kl = _.keys.length; i < kl; i++) {
						  eval(funcname + '(_.values[i], _.keys[i], userdata)');
						}
					  } else {
						for (i = 0, kl = _.keys.length; i < kl; i++) {
						  eval(funcname + '(_.values[i], _.keys[i])');
						}
					  }
					}
				  } else if (funcname && typeof funcname === 'object' && funcname.length === 2) {
					obj = funcname[0];
					func = funcname[1];
					if (arguments.length > 1) {
					  for (i = 0, kl = _.keys.length; i < kl; i++) {
						obj[func](_.values[i], _.keys[i], userdata);
					  }
					} else {
					  for (i = 0, kl = _.keys.length; i < kl; i++) {
						obj[func](_.values[i], _.keys[i]);
					  }
					}
				  } else {
					return false;
				  }
				} catch (e) {
				  return false;
				}

				return this;
			  };
			  // Here we'll return actual arrays since most logical and practical for these functions to do this
			  e.keys = function(search_value, argStrict) {
				var _ = __.method(this),
				  pos,
				  search = typeof search_value !== 'undefined',
				  tmp_arr = [],
				  strict = !! argStrict;
				if (!search) {
				  return _.keys;
				}
				while ((pos = _indexOf(_.values, pos, strict)) !== -1) {
				  tmp_arr[tmp_arr.length] = _.keys[pos];
				}
				return tmp_arr;
			  };
			  e.values = function() {
				var _ = __.method(this);
				return _.values;
			  };
			  // Return non-object, non-array values, since most sensible
			  e.search = function(needle, argStrict) {
				var _ = __.method(this),
				  strict = !! argStrict,
				  haystack = _.values,
				  i, vl, val, flags;
				if (typeof needle === 'object' && needle.exec) { // Duck-type for RegExp
				  if (!strict) { // Let's consider case sensitive searches as strict
					flags = 'i' + (needle.global ? 'g' : '') +
					  (needle.multiline ? 'm' : '') +
					  (needle.sticky ? 'y' : ''); // sticky is FF only
					needle = new RegExp(needle.source, flags);
				  }
				  for (i = 0, vl = haystack.length; i < vl; i++) {
					val = haystack[i];
					if (needle.test(val)) {
					  return _.keys[i];
					}
				  }
				  return false;
				}
				for (i = 0, vl = haystack.length; i < vl; i++) {
				  val = haystack[i];
				  if ((strict && val === needle) || (!strict && val == needle)) {
					return _.keys[i];
				  }
				}
				return false;
			  };
			  e.sum = function() {
				var _ = __.method(this),
				  sum = 0,
				  i = 0,
				  kl = _.keys.length;
				while (i < kl) {
				  if (!isNaN(parseFloat(_.values[i]))) {
					sum += parseFloat(_.values[i]);
				  }
				  i++;
				}
				return sum;
			  };
			  // Experimental functions
			  e.foreach = function(handler) {
				var _ = __.method(this),
				  i = 0,
				  kl = _.keys.length;
				while (i < kl) {
				  if (handler.length === 1) {
					handler(_.values[i]); // only pass the value
				  } else {
					handler(_.keys[i], _.values[i]);
				  }
				  i++;
				}
				return this;
			  };
			  e.list = function() {
				var key, _ = __.method(this),
				  i = 0,
				  argl = arguments.length;
				while (i < argl) {
				  key = _.keys[i];
				  if (key && key.length === parseInt(key, 10)
					.toString()
					.length && // Key represents an int
					parseInt(key, 10) < argl) { // Key does not exceed arguments
					that.window[arguments[key]] = _.values[key];
				  }
				  i++;
				}
				return this;
			  };
			  // Parallel functionality and naming of built-in JavaScript array methods
			  e.forEach = function(handler) {
				var _ = __.method(this),
				  i = 0,
				  kl = _.keys.length;
				while (i < kl) {
				  handler(_.values[i], _.keys[i], this);
				  i++;
				}
				return this;
			  };
			  // Our own custom convenience functions
			  e.$object = function() {
				var _ = __.method(this);
				return _.object;
			  };
			  e.$objectChain = function() {
				var _ = __.method(this);
				return _.objectChain;
			  };
			}
			PHPJS_Array.prototype = p.PHPJS_Array.prototype;
			arrInst = new PHPJS_Array();
			p.PHPJS_Array.apply(arrInst, mainArgs);
			return arrInst;
		  }
		  return Array.prototype.slice.call(mainArgs);
	};
	exports.array = array

	const array_change_key_case = function (array, cs) {
		var case_fn, key, tmp_ar = {};

		  if (Object.prototype.toString.call(array) === '[object Array]') {
			return array;
		  }
		  if (array && typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
			return array.change_key_case(cs);
		  }
		  if (array && typeof array === 'object') {
			case_fn = (!cs || cs === 'CASE_LOWER') ? 'toLowerCase' : 'toUpperCase';
			for (key in array) {
			  tmp_ar[key[case_fn]()] = array[key];
			}
			return tmp_ar;
		  }

		  return false;
	};
	exports.array_change_key_case = array_change_key_case

	const array_chunk = function (input, size, preserve_keys) {
		var x, p = '',
			i = 0,
			c = -1,
			l = input.length || 0,
			n = [];

		  if (size < 1) {
			return null;
		  }

		  if (Object.prototype.toString.call(input) === '[object Array]') {
			if (preserve_keys) {
			  while (i < l) {
				(x = i % size) ? n[c][i] = input[i] : n[++c] = {}, n[c][i] = input[i];
				i++;
			  }
			} else {
			  while (i < l) {
				(x = i % size) ? n[c][x] = input[i] : n[++c] = [input[i]];
				i++;
			  }
			}
		  } else {
			if (preserve_keys) {
			  for (p in input) {
				if (input.hasOwnProperty(p)) {
				  (x = i % size) ? n[c][p] = input[p] : n[++c] = {}, n[c][p] = input[p];
				  i++;
				}
			  }
			} else {
			  for (p in input) {
				if (input.hasOwnProperty(p)) {
				  (x = i % size) ? n[c][x] = input[p] : n[++c] = [input[p]];
				  i++;
				}
			  }
			}
		  }
		  return n;
	};
	exports.array_chunk = array_chunk

	const array_combine = function (keys, values) {
		var new_array = {},
			keycount = keys && keys.length,
			i = 0;

		  // input sanitation
		  if (typeof keys !== 'object' || typeof values !== 'object' || // Only accept arrays or array-like objects
			typeof keycount !== 'number' || typeof values.length !== 'number' || !keycount) { // Require arrays to have a count
			return false;
		  }

		  // number of elements does not match
		  if (keycount != values.length) {
			return false;
		  }

		  for (i = 0; i < keycount; i++) {
			new_array[keys[i]] = values[i];
		  }

		  return new_array;
	};
	exports.array_combine = array_combine

	const array_count_values = function (array) {
		var tmp_arr = {},
			key = '',
			t = '';

		  var __getType = function(obj) {
			// Objects are php associative arrays.
			var t = typeof obj;
			t = t.toLowerCase();
			if (t === 'object') {
			  t = 'array';
			}
			return t;
		  };

		  var __countValue = function(value) {
			switch (typeof value) {
			  case 'number':
				if (Math.floor(value) !== value) {
				  return;
				}
				// Fall-through
			  case 'string':
				if (value in this && this.hasOwnProperty(value)) {
				  ++this[value];
				} else {
				  this[value] = 1;
				}
			}
		  };

		  t = __getType(array);
		  if (t === 'array') {
			for (key in array) {
			  if (array.hasOwnProperty(key)) {
				__countValue.call(tmp_arr, array[key]);
			  }
			}
		  }

		  return tmp_arr;
	};
	exports.array_count_values = array_count_values

	const array_diff = function (arr1) {
		var retArr = {},
			argl = arguments.length,
			k1 = '',
			i = 1,
			k = '',
			arr = {};

		  arr1keys: for (k1 in arr1) {
			for (i = 1; i < argl; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (arr[k] === arr1[k1]) {
				  // If it reaches here, it was found in at least one array, so try next value
				  continue arr1keys;
				}
			  }
			  retArr[k1] = arr1[k1];
			}
		  }

		  return retArr;
	};
	exports.array_diff = array_diff

	const array_diff_assoc = function (arr1) {
		var retArr = {},
			argl = arguments.length,
			k1 = '',
			i = 1,
			k = '',
			arr = {};

		  arr1keys: for (k1 in arr1) {
			for (i = 1; i < argl; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (arr[k] === arr1[k1] && k === k1) {
				  // If it reaches here, it was found in at least one array, so try next value
				  continue arr1keys;
				}
			  }
			  retArr[k1] = arr1[k1];
			}
		  }

		  return retArr;
	};
	exports.array_diff_assoc = array_diff_assoc

	const array_diff_key = function (arr1) {
		var argl = arguments.length,
			retArr = {},
			k1 = '',
			i = 1,
			k = '',
			arr = {};

		  arr1keys: for (k1 in arr1) {
			for (i = 1; i < argl; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (k === k1) {
				  // If it reaches here, it was found in at least one array, so try next value
				  continue arr1keys;
				}
			  }
			  retArr[k1] = arr1[k1];
			}
		  }

		  return retArr;
	};
	exports.array_diff_key = array_diff_key

	const array_diff_uassoc = function (arr1) {
		var retArr = {},
			arglm1 = arguments.length - 1,
			cb = arguments[arglm1],
			arr = {},
			i = 1,
			k1 = '',
			k = '';
		  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
			cb[0]][cb[1]] : cb;

		  arr1keys: for (k1 in arr1) {
			for (i = 1; i < arglm1; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
				  // If it reaches here, it was found in at least one array, so try next value
				  continue arr1keys;
				}
			  }
			  retArr[k1] = arr1[k1];
			}
		  }

		  return retArr;
	};
	exports.array_diff_uassoc = array_diff_uassoc

	const array_diff_ukey = function (arr1) {
		var retArr = {},
			arglm1 = arguments.length - 1,
			cb = arguments[arglm1],
			arr = {},
			i = 1,
			k1 = '',
			k = '';

		  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
			cb[0]][cb[1]] : cb;

		  arr1keys: for (k1 in arr1) {
			for (i = 1; i < arglm1; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (cb(k, k1) === 0) {
				  // If it reaches here, it was found in at least one array, so try next value
				  continue arr1keys;
				}
			  }
			  retArr[k1] = arr1[k1];
			}
		  }

		  return retArr;
	};
	exports.array_udiff = array_diff_ukey

	const array_fill = function (start_index, num, mixed_val) {
		var key, tmp_arr = {};

		  if (!isNaN(start_index) && !isNaN(num)) {
			for (key = 0; key < num; key++) {
			  tmp_arr[(key + start_index)] = mixed_val;
			}
		  }

		  return tmp_arr;
	};
	exports.array_fill = array_fill

	const array_fill_keys = function (keys, value) {
	var retObj = {},
		key = '';

		for (key in keys) {
		retObj[keys[key]] = value;
		}

		return retObj;
	};
	exports.array_fill_keys = array_fill_keys

	const array_filter = function (arr, func) {
		var retObj = {},
			k;

		func = func || function(v) {
			return v;
		};

		// Fix: Issue #73
		if (Object.prototype.toString.call(arr) === '[object Array]') {
			retObj = [];
		}

		for (k in arr) {
			if (func(arr[k])) {
				retObj[k] = arr[k];
			}
		}

		return retObj;
	};
	exports.array_filter = array_filter

	const array_flip = function (trans) {
		var key, tmp_ar = {};

		  // Duck-type check for our own array()-created PHPJS_Array
		  if (trans && typeof trans === 'object' && trans.change_key_case) {
			return trans.flip();
		  }

		  for (key in trans) {
			if (!trans.hasOwnProperty(key)) {
			  continue;
			}
			tmp_ar[trans[key]] = key;
		  }

		  return tmp_ar;
	};
	exports.array_flip = array_flip;

	const array_intersect = function (arr1) {
	var retArr = {},
		argl = arguments.length,
		arglm1 = argl - 1,
		k1 = '',
		arr = {},
		i = 0,
		k = '';

		arr1keys: for (k1 in arr1) {
		arrs: for (i = 1; i < argl; i++) {
			arr = arguments[i];
			for (k in arr) {
			if (arr[k] === arr1[k1]) {
				if (i === arglm1) {
				retArr[k1] = arr1[k1];
				}
				// If the innermost loop always leads at least once to an equal value, continue the loop until done
				continue arrs;
			}
			}
			// If it reaches here, it wasn't found in at least one array, so try next value
			continue arr1keys;
		}
		}

		return retArr;
	};
	exports.array_intersect = array_intersect

	const array_intersect_assoc = function (arr1) {
		var retArr = {},
			argl = arguments.length,
			arglm1 = argl - 1,
			k1 = '',
			arr = {},
			i = 0,
			k = '';

		  arr1keys: for (k1 in arr1) {
			arrs: for (i = 1; i < argl; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (arr[k] === arr1[k1] && k === k1) {
				  if (i === arglm1) {
					retArr[k1] = arr1[k1];
				  }
				  // If the innermost loop always leads at least once to an equal value, continue the loop until done
				  continue arrs;
				}
			  }
			  // If it reaches here, it wasn't found in at least one array, so try next value
			  continue arr1keys;
			}
		  }

		  return retArr;
	};
	exports.array_intersect_assoc = array_intersect_assoc

	const array_intersect_key = function (arr1) {
		var retArr = {},
			argl = arguments.length,
			arglm1 = argl - 1,
			k1 = '',
			arr = {},
			i = 0,
			k = '';

		  arr1keys: for (k1 in arr1) {
			arrs: for (i = 1; i < argl; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (k === k1) {
				  if (i === arglm1) {
					retArr[k1] = arr1[k1];
				  }
				  // If the innermost loop always leads at least once to an equal value, continue the loop until done
				  continue arrs;
				}
			  }
			  // If it reaches here, it wasn't found in at least one array, so try next value
			  continue arr1keys;
			}
		  }

		  return retArr;
	};
	exports.array_intersect_key = array_intersect_key

	const array_intersect_uassoc = function (arr1) {
		var retArr = {},
			arglm1 = arguments.length - 1,
			arglm2 = arglm1 - 1,
			cb = arguments[arglm1],
			k1 = '',
			i = 1,
			arr = {},
			k = '';

		  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
			cb[0]][cb[1]] : cb;

		  arr1keys: for (k1 in arr1) {
			arrs: for (i = 1; i < arglm1; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (arr[k] === arr1[k1] && cb(k, k1) === 0) {
				  if (i === arglm2) {
					retArr[k1] = arr1[k1];
				  }
				  // If the innermost loop always leads at least once to an equal value, continue the loop until done
				  continue arrs;
				}
			  }
			  // If it reaches here, it wasn't found in at least one array, so try next value
			  continue arr1keys;
			}
		  }

		  return retArr;
	};
	exports.array_intersect_uassoc = array_intersect_uassoc

	const array_intersect_ukey = function (arr1) {
		var retArr = {},
			arglm1 = arguments.length - 1,
			arglm2 = arglm1 - 1,
			cb = arguments[arglm1],
			k1 = '',
			i = 1,
			arr = {},
			k = '';

		  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
			cb[0]][cb[1]] : cb;

		  arr1keys: for (k1 in arr1) {
			arrs: for (i = 1; i < arglm1; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (cb(k, k1) === 0) {
				  if (i === arglm2) {
					retArr[k1] = arr1[k1];
				  }
				  // If the innermost loop always leads at least once to an equal value, continue the loop until done
				  continue arrs;
				}
			  }
			  // If it reaches here, it wasn't found in at least one array, so try next value
			  continue arr1keys;
			}
		  }

		  return retArr;
	};
	exports.array_intersect_ukey = array_intersect_ukey;

	const array_key_exists = function (key, search) {
		if (!search || (search.constructor !== Array && search.constructor !== Object)) {
			return false;
		  }

		  return key in search;
	};
	exports.array_key_exists = array_key_exists;

	const array_keys = function (input, search_value, argStrict) {
		var search = typeof search_value !== 'undefined',
			tmp_arr = [],
			strict = !! argStrict,
			include = true,
			key = '';

		  if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
			return input.keys(search_value, argStrict);
		  }

		  for (key in input) {
			if (input.hasOwnProperty(key)) {
			  include = true;
			  if (search) {
				if (strict && input[key] !== search_value) {
				  include = false;
				} else if (input[key] != search_value) {
				  include = false;
				}
			  }

			  if (include) {
				tmp_arr[tmp_arr.length] = key;
			  }
			}
		  }

		  return tmp_arr;
	};
	exports.array_keys = array_keys;

	const array_map = function (callback) {
		var argc = arguments.length,
			argv = arguments,
			glbl = this.window,
			obj = null,
			cb = callback,
			j = argv[1].length,
			i = 0,
			k = 1,
			m = 0,
			tmp = [],
			tmp_ar = [];

		  while (i < j) {
			while (k < argc) {
			  tmp[m++] = argv[k++][i];
			}

			m = 0;
			k = 1;

			if (callback) {
			  if (typeof callback === 'string') {
				cb = glbl[callback];
			  } else if (typeof callback === 'object' && callback.length) {
				obj = typeof callback[0] === 'string' ? glbl[callback[0]] : callback[0];
				if (typeof obj === 'undefined') {
				  throw 'Object not found: ' + callback[0];
				}
				cb = typeof callback[1] === 'string' ? obj[callback[1]] : callback[1];
			  }
			  tmp_ar[i++] = cb.apply(obj, tmp);
			} else {
			  tmp_ar[i++] = tmp;
			}

			tmp = [];
		  }

		  return tmp_ar;
	};
	exports.array_map = array_map;

	const array_merge = function () {
		var args = Array.prototype.slice.call(arguments),
			argl = args.length,
			arg,
			retObj = {},
			k = '',
			argil = 0,
			j = 0,
			i = 0,
			ct = 0,
			toStr = Object.prototype.toString,
			retArr = true;

		  for (i = 0; i < argl; i++) {
			if (toStr.call(args[i]) !== '[object Array]') {
			  retArr = false;
			  break;
			}
		  }

		  if (retArr) {
			retArr = [];
			for (i = 0; i < argl; i++) {
			  retArr = retArr.concat(args[i]);
			}
			return retArr;
		  }

		  for (i = 0, ct = 0; i < argl; i++) {
			arg = args[i];
			if (toStr.call(arg) === '[object Array]') {
			  for (j = 0, argil = arg.length; j < argil; j++) {
				retObj[ct++] = arg[j];
			  }
			} else {
			  for (k in arg) {
				if (arg.hasOwnProperty(k)) {
				  if (parseInt(k, 10) + '' === k) {
					retObj[ct++] = arg[k];
				  } else {
					retObj[k] = arg[k];
				  }
				}
			  }
			}
		  }
		  return retObj;
	};
	exports.array_merge = array_merge;

	const array_merge_recursive = function (arr1, arr2) {
		var idx = '';

		  if (arr1 && Object.prototype.toString.call(arr1) === '[object Array]' &&
			arr2 && Object.prototype.toString.call(arr2) === '[object Array]') {
			for (idx in arr2) {
			  arr1.push(arr2[idx]);
			}
		  } else if ((arr1 && (arr1 instanceof Object)) && (arr2 && (arr2 instanceof Object))) {
			for (idx in arr2) {
			  if (idx in arr1) {
				if (typeof arr1[idx] === 'object' && typeof arr2 === 'object') {
				  arr1[idx] = this.array_merge(arr1[idx], arr2[idx]);
				} else {
				  arr1[idx] = arr2[idx];
				}
			  } else {
				arr1[idx] = arr2[idx];
			  }
			}
		  }

		  return arr1;
	};
	exports.array_merge_recursive = array_merge_recursive;

	const array_multisort = function (arr) {
		var g, i, j, k, l, sal, vkey, elIndex, lastSorts, tmpArray, zlast;

		  var sortFlag = [0];
		  var thingsToSort = [];
		  var nLastSort = [];
		  var lastSort = [];
		  var args = arguments; // possibly redundant

		  var flags = {
			'SORT_REGULAR': 16,
			'SORT_NUMERIC': 17,
			'SORT_STRING': 18,
			'SORT_ASC': 32,
			'SORT_DESC': 40
		  };

		  var sortDuplicator = function(a, b) {
			return nLastSort.shift();
		  };

		  var sortFunctions = [
			[

			  function(a, b) {
				lastSort.push(a > b ? 1 : (a < b ? -1 : 0));
				return a > b ? 1 : (a < b ? -1 : 0);
			  },
			  function(a, b) {
				lastSort.push(b > a ? 1 : (b < a ? -1 : 0));
				return b > a ? 1 : (b < a ? -1 : 0);
			  }
			],
			[

			  function(a, b) {
				lastSort.push(a - b);
				return a - b;
			  },
			  function(a, b) {
				lastSort.push(b - a);
				return b - a;
			  }
			],
			[

			  function(a, b) {
				lastSort.push((a + '') > (b + '') ? 1 : ((a + '') < (b + '') ? -1 : 0));
				return (a + '') > (b + '') ? 1 : ((a + '') < (b + '') ? -1 : 0);
			  },
			  function(a, b) {
				lastSort.push((b + '') > (a + '') ? 1 : ((b + '') < (a + '') ? -1 : 0));
				return (b + '') > (a + '') ? 1 : ((b + '') < (a + '') ? -1 : 0);
			  }
			]
		  ];

		  var sortArrs = [
			[]
		  ];

		  var sortKeys = [
			[]
		  ];

		  // Store first argument into sortArrs and sortKeys if an Object.
		  // First Argument should be either a Javascript Array or an Object, otherwise function would return FALSE like in PHP
		  if (Object.prototype.toString.call(arr) === '[object Array]') {
			sortArrs[0] = arr;
		  } else if (arr && typeof arr === 'object') {
			for (i in arr) {
			  if (arr.hasOwnProperty(i)) {
				sortKeys[0].push(i);
				sortArrs[0].push(arr[i]);
			  }
			}
		  } else {
			return false;
		  }

		  // arrMainLength: Holds the length of the first array. All other arrays must be of equal length, otherwise function would return FALSE like in PHP
		  //
		  // sortComponents: Holds 2 indexes per every section of the array that can be sorted. As this is the start, the whole array can be sorted.
		  var arrMainLength = sortArrs[0].length;
		  var sortComponents = [0, arrMainLength];

		  // Loop through all other arguments, checking lengths and sort flags of arrays and adding them to the above variables.
		  var argl = arguments.length;
		  for (j = 1; j < argl; j++) {
			if (Object.prototype.toString.call(arguments[j]) === '[object Array]') {
			  sortArrs[j] = arguments[j];
			  sortFlag[j] = 0;
			  if (arguments[j].length !== arrMainLength) {
				return false;
			  }
			} else if (arguments[j] && typeof arguments[j] === 'object') {
			  sortKeys[j] = [];
			  sortArrs[j] = [];
			  sortFlag[j] = 0;
			  for (i in arguments[j]) {
				if (arguments[j].hasOwnProperty(i)) {
				  sortKeys[j].push(i);
				  sortArrs[j].push(arguments[j][i]);
				}
			  }
			  if (sortArrs[j].length !== arrMainLength) {
				return false;
			  }
			} else if (typeof arguments[j] === 'string') {
			  var lFlag = sortFlag.pop();
			  // Keep extra parentheses around latter flags check to avoid minimization leading to CDATA closer
			  if (typeof flags[arguments[j]] === 'undefined' || ((((flags[arguments[j]]) >>> 4) & (lFlag >>> 4)) > 0)) {
				return false;
			  }
			  sortFlag.push(lFlag + flags[arguments[j]]);
			} else {
			  return false;
			}
		  }

		  for (i = 0; i !== arrMainLength; i++) {
			thingsToSort.push(true);
		  }

		  // Sort all the arrays....
		  for (i in sortArrs) {
			if (sortArrs.hasOwnProperty(i)) {
			  lastSorts = [];
			  tmpArray = [];
			  elIndex = 0;
			  nLastSort = [];
			  lastSort = [];

			  // If there are no sortComponents, then no more sorting is neeeded. Copy the array back to the argument.
			  if (sortComponents.length === 0) {
				if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
				  args[i] = sortArrs[i];
				} else {
				  for (k in arguments[i]) {
					if (arguments[i].hasOwnProperty(k)) {
					  delete arguments[i][k];
					}
				  }
				  sal = sortArrs[i].length;
				  for (j = 0, vkey = 0; j < sal; j++) {
					vkey = sortKeys[i][j];
					args[i][vkey] = sortArrs[i][j];
				  }
				}
				delete sortArrs[i];
				delete sortKeys[i];
				continue;
			  }

			  // Sort function for sorting. Either sorts asc or desc, regular/string or numeric.
			  var sFunction = sortFunctions[(sortFlag[i] & 3)][((sortFlag[i] & 8) > 0) ? 1 : 0];

			  // Sort current array.
			  for (l = 0; l !== sortComponents.length; l += 2) {
				tmpArray = sortArrs[i].slice(sortComponents[l], sortComponents[l + 1] + 1);
				tmpArray.sort(sFunction);
				lastSorts[l] = [].concat(lastSort); // Is there a better way to copy an array in Javascript?
				elIndex = sortComponents[l];
				for (g in tmpArray) {
				  if (tmpArray.hasOwnProperty(g)) {
					sortArrs[i][elIndex] = tmpArray[g];
					elIndex++;
				  }
				}
			  }

			  // Duplicate the sorting of the current array on future arrays.
			  sFunction = sortDuplicator;
			  for (j in sortArrs) {
				if (sortArrs.hasOwnProperty(j)) {
				  if (sortArrs[j] === sortArrs[i]) {
					continue;
				  }
				  for (l = 0; l !== sortComponents.length; l += 2) {
					tmpArray = sortArrs[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
					nLastSort = [].concat(lastSorts[l]); // alert(l + ':' + nLastSort);
					tmpArray.sort(sFunction);
					elIndex = sortComponents[l];
					for (g in tmpArray) {
					  if (tmpArray.hasOwnProperty(g)) {
						sortArrs[j][elIndex] = tmpArray[g];
						elIndex++;
					  }
					}
				  }
				}
			  }

			  // Duplicate the sorting of the current array on array keys
			  for (j in sortKeys) {
				if (sortKeys.hasOwnProperty(j)) {
				  for (l = 0; l !== sortComponents.length; l += 2) {
					tmpArray = sortKeys[j].slice(sortComponents[l], sortComponents[l + 1] + 1);
					nLastSort = [].concat(lastSorts[l]);
					tmpArray.sort(sFunction);
					elIndex = sortComponents[l];
					for (g in tmpArray) {
					  if (tmpArray.hasOwnProperty(g)) {
						sortKeys[j][elIndex] = tmpArray[g];
						elIndex++;
					  }
					}
				  }
				}
			  }

			  // Generate the next sortComponents
			  zlast = null;
			  sortComponents = [];
			  for (j in sortArrs[i]) {
				if (sortArrs[i].hasOwnProperty(j)) {
				  if (!thingsToSort[j]) {
					if ((sortComponents.length & 1)) {
					  sortComponents.push(j - 1);
					}
					zlast = null;
					continue;
				  }
				  if (!(sortComponents.length & 1)) {
					if (zlast !== null) {
					  if (sortArrs[i][j] === zlast) {
						sortComponents.push(j - 1);
					  } else {
						thingsToSort[j] = false;
					  }
					}
					zlast = sortArrs[i][j];
				  } else {
					if (sortArrs[i][j] !== zlast) {
					  sortComponents.push(j - 1);
					  zlast = sortArrs[i][j];
					}
				  }
				}
			  }

			  if (sortComponents.length & 1) {
				sortComponents.push(j);
			  }
			  if (Object.prototype.toString.call(arguments[i]) === '[object Array]') {
				args[i] = sortArrs[i];
			  } else {
				for (j in arguments[i]) {
				  if (arguments[i].hasOwnProperty(j)) {
					delete arguments[i][j];
				  }
				}

				sal = sortArrs[i].length;
				for (j = 0, vkey = 0; j < sal; j++) {
				  vkey = sortKeys[i][j];
				  args[i][vkey] = sortArrs[i][j];
				}

			  }
			  delete sortArrs[i];
			  delete sortKeys[i];
			}
		  }
		  return true;
	};
	exports.array_multisort = array_multisort;

	const array_pad = function (input, pad_size, pad_value) {
		var pad = [],
			newArray = [],
			newLength,
			diff = 0,
			i = 0;

		  if (Object.prototype.toString.call(input) === '[object Array]' && !isNaN(pad_size)) {
			newLength = ((pad_size < 0) ? (pad_size * -1) : pad_size);
			diff = newLength - input.length;

			if (diff > 0) {
			  for (i = 0; i < diff; i++) {
				newArray[i] = pad_value;
			  }
			  pad = ((pad_size < 0) ? newArray.concat(input) : input.concat(newArray));
			} else {
			  pad = input;
			}
		  }

		  return pad;
	};
	exports.array_pad = array_pad;

	const array_pop = function (inputArr) {
		var key = '',
			lastKey = '';

		  if (inputArr.hasOwnProperty('length')) {
			// Indexed
			if (!inputArr.length) {
			  // Done popping, are we?
			  return null;
			}
			return inputArr.pop();
		  } else {
			// Associative
			for (key in inputArr) {
			  if (inputArr.hasOwnProperty(key)) {
				lastKey = key;
			  }
			}
			if (lastKey) {
			  var tmp = inputArr[lastKey];
			  delete(inputArr[lastKey]);
			  return tmp;
			} else {
			  return null;
			}
		  }
	};
	exports.array_pop = array_pop;

	const array_product = function (input) {
		var idx = 0,
			product = 1,
			il = 0;

		  if (Object.prototype.toString.call(input) !== '[object Array]') {
			return null;
		  }

		  il = input.length;
		  while (idx < il) {
			product *= (!isNaN(input[idx]) ? input[idx] : 0);
			idx++;
		  }
		  return product;
	};
	exports.array_product = array_product;

	const array_push = function (inputArr) {
		var i = 0,
			pr = '',
			argv = arguments,
			argc = argv.length,
			allDigits = /^\d$/,
			size = 0,
			highestIdx = 0,
			len = 0;
		  if (inputArr.hasOwnProperty('length')) {
			for (i = 1; i < argc; i++) {
			  inputArr[inputArr.length] = argv[i];
			}
			return inputArr.length;
		  }

		  // Associative (object)
		  for (pr in inputArr) {
			if (inputArr.hasOwnProperty(pr)) {
			  ++len;
			  if (pr.search(allDigits) !== -1) {
				size = parseInt(pr, 10);
				highestIdx = size > highestIdx ? size : highestIdx;
			  }
			}
		  }
		  for (i = 1; i < argc; i++) {
			inputArr[++highestIdx] = argv[i];
		  }
		  return len + i - 1;
	};
	exports.array_push = array_push;

	const array_rand = function (input, num_req) {
		var indexes = [];
		  var ticks = num_req || 1;
		  var checkDuplicate = function(input, value) {
			var exist = false,
			  index = 0,
			  il = input.length;
			while (index < il) {
			  if (input[index] === value) {
				exist = true;
				break;
			  }
			  index++;
			}
			return exist;
		  };

		  if (Object.prototype.toString.call(input) === '[object Array]' && ticks <= input.length) {
			while (true) {
			  var rand = Math.floor((Math.random() * input.length));
			  if (indexes.length === ticks) {
				break;
			  }
			  if (!checkDuplicate(indexes, rand)) {
				indexes.push(rand);
			  }
			}
		  } else {
			indexes = null;
		  }

		  return ((ticks == 1) ? indexes.join() : indexes);
	};
	exports.array_rand = array_rand;

	const array_reduce = function (a_input, callback) {
		var lon = a_input.length;
		  var res = 0,
			i = 0;
		  var tmp = [];

		  for (i = 0; i < lon; i += 2) {
			tmp[0] = a_input[i];
			if (a_input[(i + 1)]) {
			  tmp[1] = a_input[(i + 1)];
			} else {
			  tmp[1] = 0;
			}
			res += callback.apply(null, tmp);
			tmp = [];
		  }

		  return res;
	};
	exports.array_reduce = array_reduce;

	const array_replace = function (arr) {
		var retObj = {},
			i = 0,
			p = '',
			argl = arguments.length;

		  if (argl < 2) {
			throw new Error('There should be at least 2 arguments passed to array_replace()');
		  }

		  // Although docs state that the arguments are passed in by reference, it seems they are not altered, but rather the copy that is returned (just guessing), so we make a copy here, instead of acting on arr itself
		  for (p in arr) {
			retObj[p] = arr[p];
		  }

		  for (i = 1; i < argl; i++) {
			for (p in arguments[i]) {
			  retObj[p] = arguments[i][p];
			}
		  }
		  return retObj;
	};
	exports.array_replace = array_replace;

	const array_replace_recursive = function (arr) {
		var retObj = {},
			i = 0,
			p = '',
			argl = arguments.length;

		  if (argl < 2) {
			throw new Error('There should be at least 2 arguments passed to array_replace_recursive()');
		  }

		  // Although docs state that the arguments are passed in by reference, it seems they are not altered, but rather the copy that is returned (just guessing), so we make a copy here, instead of acting on arr itself
		  for (p in arr) {
			retObj[p] = arr[p];
		  }

		  for (i = 1; i < argl; i++) {
			for (p in arguments[i]) {
			  if (retObj[p] && typeof retObj[p] === 'object') {
				retObj[p] = this.array_replace_recursive(retObj[p], arguments[i][p]);
			  } else {
				retObj[p] = arguments[i][p];
			  }
			}
		  }
		  return retObj;
	};
	exports.array_replace_recursive = array_replace_recursive;

	const array_reverse = function (array, preserve_keys) {
		var isArray = Object.prototype.toString.call(array) === '[object Array]',
			tmp_arr = preserve_keys ? {} : [],
			key;

		  if (isArray && !preserve_keys) {
			return array.slice(0)
			  .reverse();
		  }

		  if (preserve_keys) {
			var keys = [];
			for (key in array) {
			  // if (array.hasOwnProperty(key)) {
			  keys.push(key);
			  // }
			}

			var i = keys.length;
			while (i--) {
			  key = keys[i];
			  // FIXME: don't rely on browsers keeping keys in insertion order
			  // it's implementation specific
			  // eg. the result will differ from expected in Google Chrome
			  tmp_arr[key] = array[key];
			}
		  } else {
			for (key in array) {
			  // if (array.hasOwnProperty(key)) {
			  tmp_arr.unshift(array[key]);
			  // }
			}
		  }

		  return tmp_arr;
	};
	exports.array_reverse = array_reverse

	const array_search = function (needle, haystack, argStrict) {
		var strict = !! argStrict,
			key = '';

		  if (haystack && typeof haystack === 'object' && haystack.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
			return haystack.search(needle, argStrict);
		  }
		  if (typeof needle === 'object' && needle.exec) { // Duck-type for RegExp
			if (!strict) { // Let's consider case sensitive searches as strict
			  var flags = 'i' + (needle.global ? 'g' : '') +
				(needle.multiline ? 'm' : '') +
				(needle.sticky ? 'y' : ''); // sticky is FF only
			  needle = new RegExp(needle.source, flags);
			}
			for (key in haystack) {
			  if (needle.test(haystack[key])) {
				return key;
			  }
			}
			return false;
		  }

		  for (key in haystack) {
			if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
			  return key;
			}
		  }

		  return false;
	};
	exports.array_search = array_search;

	const array_shift = function (inputArr) {
		var props = false,
			shift = undefined,
			pr = '',
			allDigits = /^\d$/,
			int_ct = -1,
			_checkToUpIndices = function(arr, ct, key) {
			  // Deal with situation, e.g., if encounter index 4 and try to set it to 0, but 0 exists later in loop (need to
			  // increment all subsequent (skipping current key, since we need its value below) until find unused)
			  if (arr[ct] !== undefined) {
				var tmp = ct;
				ct += 1;
				if (ct === key) {
				  ct += 1;
				}
				ct = _checkToUpIndices(arr, ct, key);
				arr[ct] = arr[tmp];
				delete arr[tmp];
			  }
			  return ct;
			};

		  if (inputArr.length === 0) {
			return null;
		  }
		  if (inputArr.length > 0) {
			return inputArr.shift();
		  }
	};
	exports.array_shift = array_shift;

	const array_slice = function (arr, offst, lgth, preserve_keys) {
		/*
		  if ('callee' in arr && 'length' in arr) {
			arr = Array.prototype.slice.call(arr);
		  }
		  */

		  var key = '';

		  if (Object.prototype.toString.call(arr) !== '[object Array]' ||
			(preserve_keys && offst !== 0)) { // Assoc. array as input or if required as output
			var lgt = 0,
			  newAssoc = {};
			for (key in arr) {
			  //if (key !== 'length') {
			  lgt += 1;
			  newAssoc[key] = arr[key];
			  //}
			}
			arr = newAssoc;

			offst = (offst < 0) ? lgt + offst : offst;
			lgth = lgth === undefined ? lgt : (lgth < 0) ? lgt + lgth - offst : lgth;

			var assoc = {};
			var start = false,
			  it = -1,
			  arrlgth = 0,
			  no_pk_idx = 0;
			for (key in arr) {
			  ++it;
			  if (arrlgth >= lgth) {
				break;
			  }
			  if (it == offst) {
				start = true;
			  }
			  if (!start) {
				continue;
			  }++arrlgth;
			  if (this.is_int(key) && !preserve_keys) {
				assoc[no_pk_idx++] = arr[key];
			  } else {
				assoc[key] = arr[key];
			  }
			}
			//assoc.length = arrlgth; // Make as array-like object (though length will not be dynamic)
			return assoc;
		  }

		  if (lgth === undefined) {
			return arr.slice(offst);
		  } else if (lgth >= 0) {
			return arr.slice(offst, offst + lgth);
		  } else {
			return arr.slice(offst, lgth);
		  }
	};
	exports.array_slice = array_slice;

	const array_splice = function (arr, offst, lgth, replacement) {
		var _checkToUpIndices = function(arr, ct, key) {
			// Deal with situation, e.g., if encounter index 4 and try to set it to 0, but 0 exists later in loop (need to
			// increment all subsequent (skipping current key, since we need its value below) until find unused)
			if (arr[ct] !== undefined) {
			  var tmp = ct;
			  ct += 1;
			  if (ct === key) {
				ct += 1;
			  }
			  ct = _checkToUpIndices(arr, ct, key);
			  arr[ct] = arr[tmp];
			  delete arr[tmp];
			}
			return ct;
		  };

		  if (replacement && typeof replacement !== 'object') {
			replacement = [replacement];
		  }
		  if (lgth === undefined) {
			lgth = offst >= 0 ? arr.length - offst : -offst;
		  } else if (lgth < 0) {
			lgth = (offst >= 0 ? arr.length - offst : -offst) + lgth;
		  }

		  if (Object.prototype.toString.call(arr) !== '[object Array]') {
			/*if (arr.length !== undefined) { // Deal with array-like objects as input
			delete arr.length;
			}*/
			var lgt = 0,
			  ct = -1,
			  rmvd = [],
			  rmvdObj = {},
			  repl_ct = -1,
			  int_ct = -1;
			var returnArr = true,
			  rmvd_ct = 0,
			  rmvd_lgth = 0,
			  key = '';
			// rmvdObj.length = 0;
			for (key in arr) { // Can do arr.__count__ in some browsers
			  lgt += 1;
			}
			offst = (offst >= 0) ? offst : lgt + offst;
			for (key in arr) {
			  ct += 1;
			  if (ct < offst) {
				if (this.is_int(key)) {
				  int_ct += 1;
				  if (parseInt(key, 10) === int_ct) { // Key is already numbered ok, so don't need to change key for value
					continue;
				  }
				  _checkToUpIndices(arr, int_ct, key); // Deal with situation, e.g.,
				  // if encounter index 4 and try to set it to 0, but 0 exists later in loop
				  arr[int_ct] = arr[key];
				  delete arr[key];
				}
				continue;
			  }
			  if (returnArr && this.is_int(key)) {
				rmvd.push(arr[key]);
				rmvdObj[rmvd_ct++] = arr[key]; // PHP starts over here too
			  } else {
				rmvdObj[key] = arr[key];
				returnArr = false;
			  }
			  rmvd_lgth += 1;
			  // rmvdObj.length += 1;
			  if (replacement && replacement[++repl_ct]) {
				arr[key] = replacement[repl_ct];
			  } else {
				delete arr[key];
			  }
			}
			// arr.length = lgt - rmvd_lgth + (replacement ? replacement.length : 0); // Make (back) into an array-like object
			return returnArr ? rmvd : rmvdObj;
		  }

		  if (replacement) {
			replacement.unshift(offst, lgth);
			return Array.prototype.splice.apply(arr, replacement);
		  }
		  return arr.splice(offst, lgth);
	};
	exports.array_splice = array_splice;

	const array_sum = function (array) {
		var key, sum = 0;

		  if (array && typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
			return array.sum.apply(array, Array.prototype.slice.call(arguments, 0));
		  }

		  // input sanitation
		  if (typeof array !== 'object') {
			return null;
		  }

		  for (key in array) {
			if (!isNaN(parseFloat(array[key]))) {
			  sum += parseFloat(array[key]);
			}
		  }

		  return sum;
	};
	exports.array_sum = array_sum;

	const array_udiff = function (arr1) {
		var retArr = {},
			arglm1 = arguments.length - 1,
			cb = arguments[arglm1],
			arr = '',
			i = 1,
			k1 = '',
			k = '';
		  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
			cb[0]][cb[1]] : cb;

		  arr1keys: for (k1 in arr1) {
			for (i = 1; i < arglm1; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (cb(arr[k], arr1[k1]) === 0) {
				  // If it reaches here, it was found in at least one array, so try next value
				  continue arr1keys;
				}
			  }
			  retArr[k1] = arr1[k1];
			}
		  }

		  return retArr;
	};
	exports.array_udiff = array_udiff;

	const array_udiff_assoc = function (arr1) {
		var retArr = {},
			arglm1 = arguments.length - 1,
			cb = arguments[arglm1],
			arr = {},
			i = 1,
			k1 = '',
			k = '';
		  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
			cb[0]][cb[1]] : cb;

		  arr1keys: for (k1 in arr1) {
			for (i = 1; i < arglm1; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (cb(arr[k], arr1[k1]) === 0 && k === k1) {
				  // If it reaches here, it was found in at least one array, so try next value
				  continue arr1keys;
				}
			  }
			  retArr[k1] = arr1[k1];
			}
		  }

		  return retArr;
	};
	exports.array_udiff_assoc = array_udiff_assoc;

	const array_udiff_uassoc = function (arr1) {
		var retArr = {},
			arglm1 = arguments.length - 1,
			arglm2 = arglm1 - 1,
			cb = arguments[arglm1],
			cb0 = arguments[arglm2],
			k1 = '',
			i = 1,
			k = '',
			arr = {};

		  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
			cb[0]][cb[1]] : cb;
		  cb0 = (typeof cb0 === 'string') ? this.window[cb0] : (Object.prototype.toString.call(cb0) === '[object Array]') ?
			this.window[cb0[0]][cb0[1]] : cb0;

		  arr1keys: for (k1 in arr1) {
			for (i = 1; i < arglm2; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
				  // If it reaches here, it was found in at least one array, so try next value
				  continue arr1keys;
				}
			  }
			  retArr[k1] = arr1[k1];
			}
		  }

		  return retArr;
	};
	exports.array_udiff_uassoc = array_udiff_uassoc;

	const array_uintersect = function (arr1) {
		var retArr = {},
			arglm1 = arguments.length - 1,
			arglm2 = arglm1 - 1,
			cb = arguments[arglm1],
			k1 = '',
			i = 1,
			arr = {},
			k = '';

		  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
			cb[0]][cb[1]] : cb;

		  arr1keys: for (k1 in arr1) {
			arrs: for (i = 1; i < arglm1; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (cb(arr[k], arr1[k1]) === 0) {
				  if (i === arglm2) {
					retArr[k1] = arr1[k1];
				  }
				  // If the innermost loop always leads at least once to an equal value, continue the loop until done
				  continue arrs;
				}
			  }
			  // If it reaches here, it wasn't found in at least one array, so try next value
			  continue arr1keys;
			}
		  }

		  return retArr;
	};
	exports.array_uintersect = array_uintersect;

	const array_uintersect_assoc = function (arr1) {
		var retArr = {},
			arglm1 = arguments.length - 1,
			arglm2 = arglm1 - 2,
			cb = arguments[arglm1],
			k1 = '',
			i = 1,
			arr = {},
			k = '';

		  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
			cb[0]][cb[1]] : cb;

		  arr1keys: for (k1 in arr1) {
			arrs: for (i = 1; i < arglm1; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (k === k1 && cb(arr[k], arr1[k1]) === 0) {
				  if (i === arglm2) {
					retArr[k1] = arr1[k1];
				  }
				  // If the innermost loop always leads at least once to an equal value, continue the loop until done
				  continue arrs;
				}
			  }
			  // If it reaches here, it wasn't found in at least one array, so try next value
			  continue arr1keys;
			}
		  }

		  return retArr;
	};
	exports.array_uintersect_assoc = array_uintersect_assoc;

	const array_uintersect_uassoc = function (arr1) {
		var retArr = {},
			arglm1 = arguments.length - 1,
			arglm2 = arglm1 - 1,
			cb = arguments[arglm1],
			cb0 = arguments[arglm2],
			k1 = '',
			i = 1,
			k = '',
			arr = {};

		  cb = (typeof cb === 'string') ? this.window[cb] : (Object.prototype.toString.call(cb) === '[object Array]') ? this.window[
			cb[0]][cb[1]] : cb;
		  cb0 = (typeof cb0 === 'string') ? this.window[cb0] : (Object.prototype.toString.call(cb0) === '[object Array]') ?
			this.window[cb0[0]][cb0[1]] : cb0;

		  arr1keys: for (k1 in arr1) {
			arrs: for (i = 1; i < arglm2; i++) {
			  arr = arguments[i];
			  for (k in arr) {
				if (cb0(arr[k], arr1[k1]) === 0 && cb(k, k1) === 0) {
				  if (i === arguments.length - 3) {
					retArr[k1] = arr1[k1];
				  }
				  continue arrs; // If the innermost loop always leads at least once to an equal value, continue the loop until done
				}
			  }
			  continue arr1keys; // If it reaches here, it wasn't found in at least one array, so try next value
			}
		  }

		  return retArr;
	};
	exports.array_uintersect_uassoc = array_uintersect_uassoc;

	const array_unique = function (inputArr) {
		var key = '',
			tmp_arr2 = {},
			val = '';

		  var __array_search = function(needle, haystack) {
			var fkey = '';
			for (fkey in haystack) {
			  if (haystack.hasOwnProperty(fkey)) {
				if ((haystack[fkey] + '') === (needle + '')) {
				  return fkey;
				}
			  }
			}
			return false;
		  };

		  for (key in inputArr) {
			if (inputArr.hasOwnProperty(key)) {
			  val = inputArr[key];
			  if (false === __array_search(val, tmp_arr2)) {
				tmp_arr2[key] = val;
			  }
			}
		  }

		  return tmp_arr2;
	};
	exports.array_unique = array_unique;

	const array_unshift = function (array) {
		var i = arguments.length;

		  while (--i !== 0) {
			arguments[0].unshift(arguments[i]);
		  }

		  return arguments[0].length;
	};
	exports.array_unshift = array_unshift;

	const array_values = function (input) {
		var tmp_arr = [],
			key = '';

		  if (input && typeof input === 'object' && input.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
			return input.values();
		  }

		  for (key in input) {
			tmp_arr[tmp_arr.length] = input[key];
		  }

		  return tmp_arr;
	};
	exports.array_values = array_values;

	const array_walk = function (array, funcname, userdata) {
		var key, value, ini;

		  if (!array || typeof array !== 'object') {
			return false;
		  }
		  if (typeof array === 'object' && array.change_key_case) { // Duck-type check for our own array()-created PHPJS_Array
			if (arguments.length > 2) {
			  return array.walk(funcname, userdata);
			} else {
			  return array.walk(funcname);
			}
		  }

		  try {
			if (typeof funcname === 'function') {
			  for (key in array) {
				if (arguments.length > 2) {
				  funcname(array[key], key, userdata);
				} else {
				  funcname(array[key], key);
				}
			  }
			} else if (typeof funcname === 'string') {
			  exports.php_in_js = exports.php_in_js || {};
			  exports.php_in_js.ini = exports.php_in_js.ini || {};
			  ini = exports.php_in_js.ini['phpjs.no-eval'];
			  if (ini && (
				parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !==
				  'off')
			  )) {
				if (arguments.length > 2) {
				  for (key in array) {
					this.window[funcname](array[key], key, userdata);
				  }
				} else {
				  for (key in array) {
					this.window[funcname](array[key], key);
				  }
				}
			  } else {
				if (arguments.length > 2) {
				  for (key in array) {
					eval(funcname + '(array[key], key, userdata)');
				  }
				} else {
				  for (key in array) {
					eval(funcname + '(array[key], key)');
				  }
				}
			  }
			} else if (funcname && typeof funcname === 'object' && funcname.length === 2) {
			  var obj = funcname[0],
				func = funcname[1];
			  if (arguments.length > 2) {
				for (key in array) {
				  obj[func](array[key], key, userdata);
				}
			  } else {
				for (key in array) {
				  obj[func](array[key], key);
				}
			  }
			} else {
			  return false;
			}
		  } catch (e) {
			return false;
		  }

		  return true;
	};
	exports.array_walk = array_walk;

	const array_walk_recursive = function (array, funcname, userdata) {
		var key;

		  if (typeof array !== 'object') {
			return false;
		  }

		  for (key in array) {
			if (typeof array[key] === 'object') {
			  return this.array_walk_recursive(array[key], funcname, userdata);
			}

			if (typeof userdata !== 'undefined') {
			  eval(funcname + '( array [key] , key , userdata  )');
			} else {
			  eval(funcname + '(  userdata ) ');
			}
		  }

		  return true;
	};
	exports.array_walk_recursive = array_walk_recursive;

	const compact = function () {
		var matrix = {},
			that = this;

		  var process = function(value) {
			var i = 0,
			  l = value.length,
			  key_value = '';
			for (i = 0; i < l; i++) {
			  key_value = value[i];
			  if (Object.prototype.toString.call(key_value) === '[object Array]') {
				process(key_value);
			  } else {
				if (typeof that.window[key_value] !== 'undefined') {
				  matrix[key_value] = that.window[key_value];
				}
			  }
			}
			return true;
		  };

		  process(arguments);
		  return matrix;
	};
	exports.compact = compact;

	const count = function (mixed_var, mode) {
		var key, cnt = 0;

		  if (mixed_var === null || typeof mixed_var === 'undefined') {
			return 0;
		  } else if (mixed_var.constructor !== Array && mixed_var.constructor !== Object) {
			return 1;
		  }

		  if (mode === 'COUNT_RECURSIVE') {
			mode = 1;
		  }
		  if (mode != 1) {
			mode = 0;
		  }

		  for (key in mixed_var) {
			if (mixed_var.hasOwnProperty(key)) {
			  cnt++;
			  if (mode == 1 && mixed_var[key] && (mixed_var[key].constructor === Array || mixed_var[key].constructor ===
				Object)) {
				cnt += this.count(mixed_var[key], 1);
			  }
			}
		  }

		  return cnt;
	};
	exports.count = count;

	const current = function (arr) {
		exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.pointers = exports.php_in_js.pointers || [];
		  var indexOf = function(value) {
			for (var i = 0, length = this.length; i < length; i++) {
			  if (this[i] === value) {
				return i;
			  }
			}
			return -1;
		  };
		  // END REDUNDANT
		  var pointers = exports.php_in_js.pointers;
		  if (!pointers.indexOf) {
			pointers.indexOf = indexOf;
		  }
		  if (pointers.indexOf(arr) === -1) {
			pointers.push(arr, 0);
		  }
		  var arrpos = pointers.indexOf(arr);
		  var cursor = pointers[arrpos + 1];
		  if (Object.prototype.toString.call(arr) === '[object Array]') {
			return arr[cursor] || false;
		  }
		  var ct = 0;
		  for (var k in arr) {
			if (ct === cursor) {
			  return arr[k];
			}
			ct++;
		  }
		  return false; // Empty
	};
	exports.current = current;

	const each = function (arr) {
		exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.pointers = exports.php_in_js.pointers || [];
		  var indexOf = function(value) {
			for (var i = 0, length = this.length; i < length; i++) {
			  if (this[i] === value) {
				return i;
			  }
			}
			return -1;
		  };
		  // END REDUNDANT
		  var pointers = exports.php_in_js.pointers;
		  if (!pointers.indexOf) {
			pointers.indexOf = indexOf;
		  }
		  if (pointers.indexOf(arr) === -1) {
			pointers.push(arr, 0);
		  }
		  var arrpos = pointers.indexOf(arr);
		  var cursor = pointers[arrpos + 1];
		  var pos = 0;

		  if (Object.prototype.toString.call(arr) !== '[object Array]') {
			var ct = 0;
			for (var k in arr) {
			  if (ct === cursor) {
				pointers[arrpos + 1] += 1;
				if (each.returnArrayOnly) {
				  return [k, arr[k]];
				} else {
				  return {
					1: arr[k],
					value: arr[k],
					0: k,
					key: k
				  };
				}
			  }
			  ct++;
			}
			return false; // Empty
		  }
		  if (arr.length === 0 || cursor === arr.length) {
			return false;
		  }
		  pos = cursor;
		  pointers[arrpos + 1] += 1;
		  if (each.returnArrayOnly) {
			return [pos, arr[pos]];
		  } else {
			return {
			  1: arr[pos],
			  value: arr[pos],
			  0: pos,
			  key: pos
			};
		  }
	};
	exports.each = each;

	const end = function (arr) {
		exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.pointers = exports.php_in_js.pointers || [];
		  var indexOf = function(value) {
			for (var i = 0, length = this.length; i < length; i++) {
			  if (this[i] === value) {
				return i;
			  }
			}
			return -1;
		  };
		  // END REDUNDANT
		  var pointers = exports.php_in_js.pointers;
		  if (!pointers.indexOf) {
			pointers.indexOf = indexOf;
		  }
		  if (pointers.indexOf(arr) === -1) {
			pointers.push(arr, 0);
		  }
		  var arrpos = pointers.indexOf(arr);
		  if (Object.prototype.toString.call(arr) !== '[object Array]') {
			var ct = 0;
			var val;
			for (var k in arr) {
			  ct++;
			  val = arr[k];
			}
			if (ct === 0) {
			  return false; // Empty
			}
			pointers[arrpos + 1] = ct - 1;
			return val;
		  }
		  if (arr.length === 0) {
			return false;
		  }
		  pointers[arrpos + 1] = arr.length - 1;
		  return arr[pointers[arrpos + 1]];
	};
	exports.end = end;

	const in_array = function (needle, haystack, argStrict) {
		var key = '',
			strict = !! argStrict;

		  //we prevent the double check (strict && arr[key] === ndl) || (!strict && arr[key] == ndl)
		  //in just one for, in order to improve the performance
		  //deciding wich type of comparation will do before walk array
		  if (strict) {
			for (key in haystack) {
			  if (haystack[key] === needle) {
				return true;
			  }
			}
		  } else {
			for (key in haystack) {
			  if (haystack[key] == needle) {
				return true;
			  }
			}
		  }

		  return false;
	};
	exports.in_array = in_array;

	const key = function (arr) {
		exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.pointers = exports.php_in_js.pointers || [];
		  var indexOf = function(value) {
			for (var i = 0, length = this.length; i < length; i++) {
			  if (this[i] === value) {
				return i;
			  }
			}
			return -1;
		  };
		  // END REDUNDANT
		  var pointers = exports.php_in_js.pointers;
		  if (!pointers.indexOf) {
			pointers.indexOf = indexOf;
		  }

		  if (pointers.indexOf(arr) === -1) {
			pointers.push(arr, 0);
		  }
		  var cursor = pointers[pointers.indexOf(arr) + 1];
		  if (Object.prototype.toString.call(arr) !== '[object Array]') {
			var ct = 0;
			for (var k in arr) {
			  if (ct === cursor) {
				return k;
			  }
			  ct++;
			}
			return false; // Empty
		  }
		  if (arr.length === 0) {
			return false;
		  }
		  return cursor;
	};
	exports.key = key;

	const next = function (arr) {
		exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.pointers = exports.php_in_js.pointers || [];
		  var indexOf = function(value) {
			for (var i = 0, length = this.length; i < length; i++) {
			  if (this[i] === value) {
				return i;
			  }
			}
			return -1;
		  };
		  // END REDUNDANT
		  var pointers = exports.php_in_js.pointers;
		  if (!pointers.indexOf) {
			pointers.indexOf = indexOf;
		  }
		  if (pointers.indexOf(arr) === -1) {
			pointers.push(arr, 0);
		  }
		  var arrpos = pointers.indexOf(arr);
		  var cursor = pointers[arrpos + 1];
		  if (Object.prototype.toString.call(arr) !== '[object Array]') {
			var ct = 0;
			for (var k in arr) {
			  if (ct === cursor + 1) {
				pointers[arrpos + 1] += 1;
				return arr[k];
			  }
			  ct++;
			}
			return false; // End
		  }
		  if (arr.length === 0 || cursor === (arr.length - 1)) {
			return false;
		  }
		  pointers[arrpos + 1] += 1;
		  return arr[pointers[arrpos + 1]];
	};
	exports.next = next;

	const pos = function (arr) {
		return current(arr);
	};
	exports.pos = pos;

	const prev = function (arr) {
	exports.php_in_js = exports.php_in_js || {};
		exports.php_in_js.pointers = exports.php_in_js.pointers || [];
		var indexOf = function(value) {
		for (var i = 0, length = this.length; i < length; i++) {
			if (this[i] === value) {
			return i;
			}
		}
		return -1;
		};
		// END REDUNDANT
		var pointers = exports.php_in_js.pointers;
		if (!pointers.indexOf) {
		pointers.indexOf = indexOf;
		}
		var arrpos = pointers.indexOf(arr);
		var cursor = pointers[arrpos + 1];
		if (pointers.indexOf(arr) === -1 || cursor === 0) {
		return false;
		}
		if (Object.prototype.toString.call(arr) !== '[object Array]') {
		var ct = 0;
		for (var k in arr) {
			if (ct === cursor - 1) {
			pointers[arrpos + 1] -= 1;
			return arr[k];
			}
			ct++;
		}
		// Shouldn't reach here
		}
		if (arr.length === 0) {
		return false;
		}
		pointers[arrpos + 1] -= 1;
		return arr[pointers[arrpos + 1]];
	};
	exports.prev = prev;

	const range = function (low, high, step) {
		var matrix = [];
		  var inival, endval, plus;
		  var walker = step || 1;
		  var chars = false;

		  if (!isNaN(low) && !isNaN(high)) {
			inival = low;
			endval = high;
		  } else if (isNaN(low) && isNaN(high)) {
			chars = true;
			inival = low.charCodeAt(0);
			endval = high.charCodeAt(0);
		  } else {
			inival = (isNaN(low) ? 0 : low);
			endval = (isNaN(high) ? 0 : high);
		  }

		  plus = ((inival > endval) ? false : true);
		  if (plus) {
			while (inival <= endval) {
			  matrix.push(((chars) ? String.fromCharCode(inival) : inival));
			  inival += walker;
			}
		  } else {
			while (inival >= endval) {
			  matrix.push(((chars) ? String.fromCharCode(inival) : inival));
			  inival -= walker;
			}
		  }

		  return matrix;
	};
	exports.range = range;

	const reset = function (arr) {
		exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.pointers = exports.php_in_js.pointers || [];
		  var indexOf = function(value) {
			for (var i = 0, length = this.length; i < length; i++) {
			  if (this[i] === value) {
				return i;
			  }
			}
			return -1;
		  };
		  // END REDUNDANT
		  var pointers = exports.php_in_js.pointers;
		  if (!pointers.indexOf) {
			pointers.indexOf = indexOf;
		  }
		  if (pointers.indexOf(arr) === -1) {
			pointers.push(arr, 0);
		  }
		  var arrpos = pointers.indexOf(arr);
		  if (Object.prototype.toString.call(arr) !== '[object Array]') {
			for (var k in arr) {
			  if (pointers.indexOf(arr) === -1) {
				pointers.push(arr, 0);
			  } else {
				pointers[arrpos + 1] = 0;
			  }
			  return arr[k];
			}
			return false; // Empty
		  }
		  if (arr.length === 0) {
			return false;
		  }
		  pointers[arrpos + 1] = 0;
		  return arr[pointers[arrpos + 1]];
	};
	exports.reset = reset;

	const shuffle = function (inputArr) {
		var valArr = [],
			k = '',
			i = 0,
			strictForIn = false,
			populateArr = [];

		  for (k in inputArr) { // Get key and value arrays
			if (inputArr.hasOwnProperty(k)) {
			  valArr.push(inputArr[k]);
			  if (strictForIn) {
				delete inputArr[k];
			  }
			}
		  }
		  valArr.sort(function() {
			return 0.5 - Math.random();
		  });

		  // BEGIN REDUNDANT
		  exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.ini = exports.php_in_js.ini || {};
		  // END REDUNDANT
		  strictForIn = exports.php_in_js.ini['phpjs.strictForIn'] && exports.php_in_js.ini['phpjs.strictForIn'].local_value && exports.php_in_js
			.ini['phpjs.strictForIn'].local_value !== 'off';
		  populateArr = strictForIn ? inputArr : populateArr;

		  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
			populateArr[i] = valArr[i];
		  }

		  return strictForIn || populateArr;
	};
	exports.shuffle = shuffle;

	const sizeof = function (mixed_var, mode) {
		return count(mixed_var, mode);
	};
	exports.sizeof = sizeof;

	const uasort = function (inputArr, sorter) {
		var valArr = [],
			tempKeyVal, tempValue, ret, k = '',
			i = 0,
			strictForIn = false,
			populateArr = {};

		  if (typeof sorter === 'string') {
			sorter = this[sorter];
		  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
			sorter = this[sorter[0]][sorter[1]];
		  }

		  // BEGIN REDUNDANT
		  exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.ini = exports.php_in_js.ini || {};
		  // END REDUNDANT
		  strictForIn = exports.php_in_js.ini['phpjs.strictForIn'] && exports.php_in_js.ini['phpjs.strictForIn'].local_value && exports.php_in_js
			.ini['phpjs.strictForIn'].local_value !== 'off';
		  populateArr = strictForIn ? inputArr : populateArr;

		  for (k in inputArr) { // Get key and value arrays
			if (inputArr.hasOwnProperty(k)) {
			  valArr.push([k, inputArr[k]]);
			  if (strictForIn) {
				delete inputArr[k];
			  }
			}
		  }
		  valArr.sort(function(a, b) {
			return sorter(a[1], b[1]);
		  });

		  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
			populateArr[valArr[i][0]] = valArr[i][1];
		  }

		  return strictForIn || populateArr;
	};
	exports.uasort = uasort;

	const uksort = function (inputArr, sorter) {
		var tmp_arr = {},
			keys = [],
			i = 0,
			k = '',
			strictForIn = false,
			populateArr = {};

		  if (typeof sorter === 'string') {
			sorter = this.window[sorter];
		  }

		  // Make a list of key names
		  for (k in inputArr) {
			if (inputArr.hasOwnProperty(k)) {
			  keys.push(k);
			}
		  }

		  // Sort key names
		  try {
			if (sorter) {
			  keys.sort(sorter);
			} else {
			  keys.sort();
			}
		  } catch (e) {
			return false;
		  }

		  // BEGIN REDUNDANT
		  exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.ini = exports.php_in_js.ini || {};
		  // END REDUNDANT
		  strictForIn = exports.php_in_js.ini['phpjs.strictForIn'] && exports.php_in_js.ini['phpjs.strictForIn'].local_value && exports.php_in_js
			.ini['phpjs.strictForIn'].local_value !== 'off';
		  populateArr = strictForIn ? inputArr : populateArr;

		  // Rebuild array with sorted key names
		  for (i = 0; i < keys.length; i++) {
			k = keys[i];
			tmp_arr[k] = inputArr[k];
			if (strictForIn) {
			  delete inputArr[k];
			}
		  }
		  for (i in tmp_arr) {
			if (tmp_arr.hasOwnProperty(i)) {
			  populateArr[i] = tmp_arr[i];
			}
		  }
		  return strictForIn || populateArr;
	};
	exports.uksort = uksort;

	const usort = function (inputArr, sorter) {
		var valArr = [],
			k = '',
			i = 0,
			strictForIn = false,
			populateArr = {};

		  if (typeof sorter === 'string') {
			sorter = this[sorter];
		  } else if (Object.prototype.toString.call(sorter) === '[object Array]') {
			sorter = this[sorter[0]][sorter[1]];
		  }

		  // BEGIN REDUNDANT
		  exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.ini = exports.php_in_js.ini || {};
		  // END REDUNDANT
		  strictForIn = exports.php_in_js.ini['phpjs.strictForIn'] && exports.php_in_js.ini['phpjs.strictForIn'].local_value && exports.php_in_js
			.ini['phpjs.strictForIn'].local_value !== 'off';
		  populateArr = strictForIn ? inputArr : populateArr;

		  for (k in inputArr) { // Get key and value arrays
			if (inputArr.hasOwnProperty(k)) {
			  valArr.push(inputArr[k]);
			  if (strictForIn) {
				delete inputArr[k];
			  }
			}
		  }
		  try {
			valArr.sort(sorter);
		  } catch (e) {
			return false;
		  }
		  for (i = 0; i < valArr.length; i++) { // Repopulate the old array
			populateArr[i] = valArr[i];
		  }

		  return strictForIn || populateArr;
	};
	exports.usort = usort;

})))
