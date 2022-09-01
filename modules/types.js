/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 *
 * @module Types
 * @description Fonctions de verification de types de données
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global = {}));
}(this, (function(exports) {
    'use strict';

	const empty = function (mixed_var) {
		var undef, key, i, len;
	  	var emptyValues = [undef, null, false, 0, '', '0'];

	  	for (i = 0, len = emptyValues.length; i < len; i++) {
			if (mixed_var === emptyValues[i]) {
				return true;
			}
	  	}

	  	if (typeof mixed_var === 'object') {
			for (key in mixed_var) {
				// TODO: should we check for own properties only?
				//if (mixed_var.hasOwnProperty(key)) {
					return false;
				//}
			}
			return true;
	  	}

	  	return false;
  	};
	exports.empty = empty

  	const floatval = function (mixed_var) {
		return (parseFloat(mixed_var) || 0);
  	};
	exports.floatval = floatval;

	const doubleval = function (mixed_var) {
		return floatval(mixed_var);
	};
	exports.doubleval = doubleval

	const gettype = function (mixed_var) {
		var s = typeof mixed_var,
			name;
		  var getFuncName = function(fn) {
			var name = (/\W*function\s+([\w\$]+)\s*\(/)
			  .exec(fn);
			if (!name) {
			  return '(Anonymous)';
			}
			return name[1];
		  };
		  if (s === 'object') {
			if (mixed_var !== null) { // From: http://javascript.crockford.com/remedial.html
			  if (typeof mixed_var.length === 'number' && !(mixed_var.propertyIsEnumerable('length')) && typeof mixed_var
				.splice === 'function') {
				s = 'array';
			  } else if (mixed_var.constructor && getFuncName(mixed_var.constructor)) {
				name = getFuncName(mixed_var.constructor);
				if (name === 'Date') {
				  s = 'date'; // not in PHP
				} else if (name === 'RegExp') {
				  s = 'regexp'; // not in PHP
				} else if (name === 'PHPJS_Resource') { // Check against our own resource constructor
				  s = 'resource';
				}
			  }
			} else {
			  s = 'null';
			}
		  } else if (s === 'number') {
			s = is_float(mixed_var) ? 'double' : 'integer';
		  }
		  return s;
	};
	exports.gettype = gettype

  	const intval = function (mixed_var, base) {
	var tmp;

	  var type = typeof mixed_var;

	  if (type === 'boolean') {
		return +mixed_var;
	  } else if (type === 'string') {
		tmp = parseInt(mixed_var, base || 10);
		return (isNaN(tmp) || !isFinite(tmp)) ? 0 : tmp;
	  } else if (type === 'number' && isFinite(mixed_var)) {
		return mixed_var | 0;
	  } else {
		return 0;
	  }
  	};
	exports.intval = intval;

  	const is_array = function (mixed_var) {
		var ini,
			_getFuncName = function(fn) {
		  		var name = (/\W*function\s+([\w\$]+)\s*\(/).exec(fn);
				if (!name) {
					return '(Anonymous)';
				}
				return name[1];
			},
	  		_isArray = function(mixed_var) {
				// return Object.prototype.toString.call(mixed_var) === '[object Array]';
				// The above works, but let's do the even more stringent approach: (since Object.prototype.toString could be overridden)
				// Null, Not an object, no length property so couldn't be an Array (or String)
				if (!mixed_var || typeof mixed_var !== 'object' || typeof mixed_var.length !== 'number') {
					return false;
				}
				var len = mixed_var.length;
				mixed_var[mixed_var.length] = 'bogus';
				// The only way I can think of to get around this (or where there would be trouble) would be to have an object defined
				// with a custom "length" getter which changed behavior on each call (or a setter to mess up the following below) or a custom
				// setter for numeric properties, but even that would need to listen for specific indexes; but there should be no false negatives
				// and such a false positive would need to rely on later JavaScript innovations like __defineSetter__
				if (len !== mixed_var.length) { // We know it's an array since length auto-changed with the addition of a
					// numeric property at its length end, so safely get rid of our bogus element
					mixed_var.length -= 1;
					return true;
				}
				// Get rid of the property we added onto a non-array object; only possible
				// side-effect is if the user adds back the property later, it will iterate
				// this property in the older order placement in IE (an order which should not
				// be depended on anyways)
				delete mixed_var[mixed_var.length];
				return false;
	  		};

			if (!mixed_var || typeof mixed_var !== 'object') {
				return false;
			}

			// BEGIN REDUNDANT
					exports.php_in_js = exports.php_in_js || {};
			exports.php_in_js.ini = exports.php_in_js.ini || {};
			// END REDUNDANT

	  		ini = exports.php_in_js.ini['phpjs.objectsAsArrays'];

	  		return _isArray(mixed_var) ||
				// Allow returning true unless user has called
				// ini_set('phpjs.objectsAsArrays', 0) to disallow objects as arrays
				((!ini || ( // if it's not set to 0 and it's not 'off', check for objects as arrays
				(parseInt(ini.local_value, 10) !== 0 && (!ini.local_value.toLowerCase || ini.local_value.toLowerCase() !==
					'off')))) && (
				(Object.prototype.toString.call(mixed_var) === '[object Object]' && _getFuncName(mixed_var.constructor) ===
				'Object') // Most likely a literal and intended as assoc. array
				));
  		};
		exports.is_array = is_array;

  	const is_binary = function (vr) {
	return typeof vr === 'string'; // If it is a string of any kind, it could be binary
  	};
	exports.is_binary = is_binary;

  	const is_bool = function (mixed_var) {
	return (mixed_var === true || mixed_var === false); // Faster (in FF) than type checking
  	};
	exports.is_bool = is_bool;

  	const is_buffer = function (vr) {
	return typeof vr === 'string';
  	};
	exports.is_buffer = is_buffer;

  	const is_callable = function (v, syntax_only, callable_name) {
	var name = '',
		obj = {},
		method = '';
	  var getFuncName = function(fn) {
		var name = (/\W*function\s+([\w\$]+)\s*\(/)
		  .exec(fn);
		if (!name) {
		  return '(Anonymous)';
		}
		return name[1];
	  };
	  if (typeof v === 'string') {
		obj = this.window;
		method = v;
		name = v;
	  } else if (typeof v === 'function') {
		return true;
	  } else if (Object.prototype.toString.call(v) === '[object Array]' &&
		v.length === 2 && typeof v[0] === 'object' && typeof v[1] === 'string') {
		obj = v[0];
		method = v[1];
		name = (obj.constructor && getFuncName(obj.constructor)) + '::' + method;
	  } else {
		return false;
	  }
	  if (syntax_only || typeof obj[method] === 'function') {
		if (callable_name) {
		  this.window[callable_name] = name;
		}
		return true;
	  }
	  return false;
  	};
	exports.is_callable = is_callable;

	const is_double = function (mixed_var) {
		return is_float(mixed_var);
  	};
	exports.is_double = is_double;

	const is_float = function (mixed_var) {
	return +mixed_var === mixed_var && (!isFinite(mixed_var) || !! (mixed_var % 1));
  	};
	exports.is_float = is_float;

  	const is_int = function (mixed_var) {
	return mixed_var === +mixed_var && isFinite(mixed_var) && !(mixed_var % 1);
  	};
	exports.is_int = is_int;

	const is_integer = function (mixed_var) {
		return is_int(mixed_var);
  	};
	exports.is_integer = is_integer;

	const is_long = function (mixed_var) {
		return is_float(mixed_var);
  	};
	exports.is_long = is_long;

  	const is_null = function (mixed_var) {
	return (mixed_var === null);
  	};
	exports.is_null = is_null;

  	const is_numeric = function (mixed_var) {
	var whitespace =
		" \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000";
	  return (typeof mixed_var === 'number' || (typeof mixed_var === 'string' && whitespace.indexOf(mixed_var.slice(-1)) === -
		1)) && mixed_var !== '' && !isNaN(mixed_var);
  	};
	exports.is_numeric = is_numeric;

  	const is_object = function (mixed_var) {
	if (Object.prototype.toString.call(mixed_var) === '[object Array]') {
		return false;
	  }
	  return mixed_var !== null && typeof mixed_var === 'object';
  	};
	exports.is_object = is_object;

	const is_real = function (mixed_var) {
		return is_float(mixed_var);
  	};
	exports.is_real = is_real;

  	const is_resource = function (handle) {
		var getFuncName = function(fn) {
			var name = (/\W*function\s+([\w\$]+)\s*\(/)
			.exec(fn);
			if (!name) {
			return '(Anonymous)';
			}
			return name[1];
		};
	  return !(!handle || typeof handle !== 'object' || !handle.constructor || getFuncName(handle.constructor) !==
		'PHPJS_Resource');
  	};
	exports.is_resource = is_resource;

  	const is_scalar = function (mixed_var) {
	return (/boolean|number|string/)
		.test(typeof mixed_var);
  	};
	exports.is_scalar = is_scalar;

  	const is_string = function (mixed_var) {
	return (typeof mixed_var === 'string');
  	};
	exports.is_string = is_string;

  	const is_unicode = function (vr) {
	if (typeof vr !== 'string') {
		return false;
	  }

	  // If surrogates occur outside of high-low pairs, then this is not Unicode
	  var arr = [],
		any = '([\s\S])',
		highSurrogate = '[\uD800-\uDBFF]',
		lowSurrogate = '[\uDC00-\uDFFF]',
		highSurrogateBeforeAny = new RegExp(highSurrogate + any, 'g'),
		lowSurrogateAfterAny = new RegExp(any + lowSurrogate, 'g'),
		singleLowSurrogate = new RegExp('^' + lowSurrogate + '$'),
		singleHighSurrogate = new RegExp('^' + highSurrogate + '$');

	  while ((arr = highSurrogateBeforeAny.exec(vr)) !== null) {
		if (!arr[1] || !arr[1].match(singleLowSurrogate)) { // If high not followed by low surrogate
		  return false;
		}
	  }
	  while ((arr = lowSurrogateAfterAny.exec(vr)) !== null) {
		if (!arr[1] || !arr[1].match(singleHighSurrogate)) { // If low not preceded by high surrogate
		  return false;
		}
	  }
	  return true;
  	};
	exports.is_unicode = is_unicode;

  	const isset = function () {
	var a = arguments,
		l = a.length,
		i = 0,
		undef;

	  if (l === 0) {
		throw new Error('Empty isset');
	  }

	  while (i !== l) {
		if (a[i] === undef || a[i] === null) {
		  return false;
		}
		i++;
	  }
	  return true;
  	};
	exports.isset = isset;

  	const serialize = function (mixed_value) {
	var val, key, okey,
		ktype = '',
		vals = '',
		count = 0,
		_utf8Size = function(str) {
		  var size = 0,
			i = 0,
			l = str.length,
			code = '';
		  for (i = 0; i < l; i++) {
			code = str.charCodeAt(i);
			if (code < 0x0080) {
			  size += 1;
			} else if (code < 0x0800) {
			  size += 2;
			} else {
			  size += 3;
			}
		  }
		  return size;
		};
	  _getType = function(inp) {
		var match, key, cons, types, type = typeof inp;

		if (type === 'object' && !inp) {
		  return 'null';
		}
		if (type === 'object') {
		  if (!inp.constructor) {
			return 'object';
		  }
		  cons = inp.constructor.toString();
		  match = cons.match(/(\w+)\(/);
		  if (match) {
			cons = match[1].toLowerCase();
		  }
		  types = ['boolean', 'number', 'string', 'array'];
		  for (key in types) {
			if (cons == types[key]) {
			  type = types[key];
			  break;
			}
		  }
		}
		return type;
	  };
	  type = _getType(mixed_value);

	  switch (type) {
		case 'function':
		  val = '';
		  break;
		case 'boolean':
		  val = 'b:' + (mixed_value ? '1' : '0');
		  break;
		case 'number':
		  val = (Math.round(mixed_value) == mixed_value ? 'i' : 'd') + ':' + mixed_value;
		  break;
		case 'string':
		  val = 's:' + _utf8Size(mixed_value) + ':"' + mixed_value + '"';
		  break;
		case 'array':
		case 'object':
		  val = 'a';
		  /*
			if (type === 'object') {
			  var objname = mixed_value.constructor.toString().match(/(\w+)\(\)/);
			  if (objname == undefined) {
				return;
			  }
			  objname[1] = this.serialize(objname[1]);
			  val = 'O' + objname[1].substring(1, objname[1].length - 1);
			}
			*/

		  for (key in mixed_value) {
			if (mixed_value.hasOwnProperty(key)) {
			  ktype = _getType(mixed_value[key]);
			  if (ktype === 'function') {
				continue;
			  }

			  okey = (key.match(/^[0-9]+$/) ? parseInt(key, 10) : key);
			  vals += this.serialize(okey) + this.serialize(mixed_value[key]);
			  count++;
			}
		  }
		  val += ':' + count + ':{' + vals + '}';
		  break;
		case 'undefined':
		  // Fall-through
		default:
		  // if the JS object has a property which contains a null value, the string cannot be unserialized by PHP
		  val = 'N';
		  break;
	  }
	  if (type !== 'object' && type !== 'array') {
		val += ';';
	  }
	  return val;
  	};
	exports.serialize = serialize;

  	const settype = function (vr, type) {
	var is_array = function(arr) {
		return typeof arr === 'object' && typeof arr.length === 'number' && !(arr.propertyIsEnumerable('length')) &&
		  typeof arr.splice === 'function';
	  };
	  var v, mtch, i, obj;
	  v = this[vr] ? this[vr] : vr;

	  try {
		switch (type) {
		  case 'boolean':
			if (is_array(v) && v.length === 0) {
			  this[vr] = false;
			} else if (v === '0') {
			  this[vr] = false;
			} else if (typeof v === 'object' && !is_array(v)) {
			  var lgth = false;
			  for (i in v) {
				lgth = true;
			  }
			  this[vr] = lgth;
			} else {
			  this[vr] = !! v;
			}
			break;
		  case 'integer':
			if (typeof v === 'number') {
			  this[vr] = parseInt(v, 10);
			} else if (typeof v === 'string') {
			  mtch = v.match(/^([+\-]?)(\d+)/);
			  if (!mtch) {
				this[vr] = 0;
			  } else {
				this[vr] = parseInt(v, 10);
			  }
			} else if (v === true) {
			  this[vr] = 1;
			} else if (v === false || v === null) {
			  this[vr] = 0;
			} else if (is_array(v) && v.length === 0) {
			  this[vr] = 0;
			} else if (typeof v === 'object') {
			  this[vr] = 1;
			}

			break;
		  case 'float':
			if (typeof v === 'string') {
			  mtch = v.match(/^([+\-]?)(\d+(\.\d+)?|\.\d+)([eE][+\-]?\d+)?/);
			  if (!mtch) {
				this[vr] = 0;
			  } else {
				this[vr] = parseFloat(v, 10);
			  }
			} else if (v === true) {
			  this[vr] = 1;
			} else if (v === false || v === null) {
			  this[vr] = 0;
			} else if (is_array(v) && v.length === 0) {
			  this[vr] = 0;
			} else if (typeof v === 'object') {
			  this[vr] = 1;
			}
			break;
		  case 'string':
			if (v === null || v === false) {
			  this[vr] = '';
			} else if (is_array(v)) {
			  this[vr] = 'Array';
			} else if (typeof v === 'object') {
			  this[vr] = 'Object';
			} else if (v === true) {
			  this[vr] = '1';
			} else {
			  this[vr] += '';
			} // numbers (and functions?)
			break;
		  case 'array':
			if (v === null) {
			  this[vr] = [];
			} else if (typeof v !== 'object') {
			  this[vr] = [v];
			}
			break;
		  case 'object':
			if (v === null) {
			  this[vr] = {};
			} else if (is_array(v)) {
			  for (i = 0, obj = {}; i < v.length; i++) {
				obj[i] = v;
			  }
			  this[vr] = obj;
			} else if (typeof v !== 'object') {
			  this[vr] = {
				scalar: v
			  };
			}
			break;
		  case 'null':
			delete this[vr];
			break;
		}
		return true;
	  } catch (e) {
		return false;
	  }
  	};
	exports.settype = settype;

  	const unserialize = function (data) {
	var that = this,
		utf8Overhead = function(chr) {
		  // http://phpjs.org/functions/unserialize:571#comment_95906
		  var code = chr.charCodeAt(0);
		  if (code < 0x0080) {
			return 0;
		  }
		  if (code < 0x0800) {
			return 1;
		  }
		  return 2;
		};
	  error = function(type, msg, filename, line) {
		throw new that.window[type](msg, filename, line);
	  };
	  read_until = function(data, offset, stopchr) {
		var i = 2,
		  buf = [],
		  chr = data.slice(offset, offset + 1);

		while (chr != stopchr) {
		  if ((i + offset) > data.length) {
			error('Error', 'Invalid');
		  }
		  buf.push(chr);
		  chr = data.slice(offset + (i - 1), offset + i);
		  i += 1;
		}
		return [buf.length, buf.join('')];
	  };
	  read_chrs = function(data, offset, length) {
		var i, chr, buf;

		buf = [];
		for (i = 0; i < length; i++) {
		  chr = data.slice(offset + (i - 1), offset + i);
		  buf.push(chr);
		  length -= utf8Overhead(chr);
		}
		return [buf.length, buf.join('')];
	  };
	  _unserialize = function(data, offset) {
		var dtype, dataoffset, keyandchrs, keys, contig,
		  length, array, readdata, readData, ccount,
		  stringlength, i, key, kprops, kchrs, vprops,
		  vchrs, value, chrs = 0,
		  typeconvert = function(x) {
			return x;
		  };

		if (!offset) {
		  offset = 0;
		}
		dtype = (data.slice(offset, offset + 1))
		  .toLowerCase();

		dataoffset = offset + 2;

		switch (dtype) {
		  case 'i':
			typeconvert = function(x) {
			  return parseInt(x, 10);
			};
			readData = read_until(data, dataoffset, ';');
			chrs = readData[0];
			readdata = readData[1];
			dataoffset += chrs + 1;
			break;
		  case 'b':
			typeconvert = function(x) {
			  return parseInt(x, 10) !== 0;
			};
			readData = read_until(data, dataoffset, ';');
			chrs = readData[0];
			readdata = readData[1];
			dataoffset += chrs + 1;
			break;
		  case 'd':
			typeconvert = function(x) {
			  return parseFloat(x);
			};
			readData = read_until(data, dataoffset, ';');
			chrs = readData[0];
			readdata = readData[1];
			dataoffset += chrs + 1;
			break;
		  case 'n':
			readdata = null;
			break;
		  case 's':
			ccount = read_until(data, dataoffset, ':');
			chrs = ccount[0];
			stringlength = ccount[1];
			dataoffset += chrs + 2;

			readData = read_chrs(data, dataoffset + 1, parseInt(stringlength, 10));
			chrs = readData[0];
			readdata = readData[1];
			dataoffset += chrs + 2;
			if (chrs != parseInt(stringlength, 10) && chrs != readdata.length) {
			  error('SyntaxError', 'String length mismatch');
			}
			break;
		  case 'a':
			readdata = {};

			keyandchrs = read_until(data, dataoffset, ':');
			chrs = keyandchrs[0];
			keys = keyandchrs[1];
			dataoffset += chrs + 2;

			length = parseInt(keys, 10);
			contig = true;

			for (i = 0; i < length; i++) {
			  kprops = _unserialize(data, dataoffset);
			  kchrs = kprops[1];
			  key = kprops[2];
			  dataoffset += kchrs;

			  vprops = _unserialize(data, dataoffset);
			  vchrs = vprops[1];
			  value = vprops[2];
			  dataoffset += vchrs;

			  if (key !== i)
				contig = false;

			  readdata[key] = value;
			}

			if (contig) {
			  array = new Array(length);
			  for (i = 0; i < length; i++)
				array[i] = readdata[i];
			  readdata = array;
			}

			dataoffset += 1;
			break;
		  default:
			error('SyntaxError', 'Unknown / Unhandled data type(s): ' + dtype);
			break;
		}
		return [dtype, dataoffset - offset, typeconvert(readdata)];
	  };

	  return _unserialize((data + ''), 0)[2];
  	};
	exports.unserialize = unserialize;

	const xdiff_string_diff = function (old_data, new_data, context_lines, minimal) {
	// (This code was done by Imgen Tata; I have only reformatted for use in php.js)

	  // See http://en.wikipedia.org/wiki/Diff#Unified_format
	  var i = 0,
		j = 0,
		k = 0,
		ori_hunk_start, new_hunk_start, ori_hunk_end, new_hunk_end, ori_hunk_line_no, new_hunk_line_no, ori_hunk_size,
		new_hunk_size,
		// Potential configuration
		MAX_CONTEXT_LINES = Number.POSITIVE_INFINITY,
		MIN_CONTEXT_LINES = 0,
		DEFAULT_CONTEXT_LINES = 3,
		//
		HEADER_PREFIX = '@@ ',
		HEADER_SUFFIX = ' @@',
		ORIGINAL_INDICATOR = '-',
		NEW_INDICATOR = '+',
		RANGE_SEPARATOR = ',',
		CONTEXT_INDICATOR = ' ',
		DELETION_INDICATOR = '-',
		ADDITION_INDICATOR = '+',
		ori_lines, new_lines, NEW_LINE = '\n',
		/**
		 * Trims string
		 */
		trim = function(text) {
		  if (typeof text !== 'string') {
			throw new Error('String parameter required');
		  }

		  return text.replace(/(^\s*)|(\s*$)/g, '');
		},
		/**
		 * Verifies type of arguments
		 */
		verify_type = function(type) {
		  var args = arguments,
			args_len = arguments.length,
			basic_types = ['number', 'boolean', 'string', 'function', 'object', 'undefined'],
			basic_type, i, j, type_of_type = typeof type;
		  if (type_of_type !== 'string' && type_of_type !== 'function') {
			throw new Error('Bad type parameter');
		  }

		  if (args_len < 2) {
			throw new Error('Too few arguments');
		  }

		  if (type_of_type === 'string') {
			type = trim(type);

			if (type === '') {
			  throw new Error('Bad type parameter');
			}

			for (j = 0; j < basic_types.length; j++) {
			  basic_type = basic_types[j];

			  if (basic_type == type) {
				for (i = 1; i < args_len; i++) {
				  if (typeof args[i] !== type) {
					throw new Error('Bad type');
				  }
				}

				return;
			  }
			}

			throw new Error('Bad type parameter');
		  }

		  // Not basic type. we need to use instanceof operator
		  for (i = 1; i < args_len; i++) {
			if (!(args[i] instanceof type)) {
			  throw new Error('Bad type');
			}
		  }
		},
		/**
		 * Checks if the specified array contains an element with specified value
		 */
		has_value = function(array, value) {
		  var i;
		  verify_type(Array, array);

		  for (i = 0; i < array.length; i++) {
			if (array[i] === value) {
			  return true;
			}
		  }

		  return false;
		},
		/**
		 * Checks the type of arguments
		 * @param {String | Function} type Specifies the desired type
		 * @return {Boolean} Return true if all arguments after the type argument are of specified type. Else false
		 */
		are_type_of = function(type) {
		  var args = arguments,
			args_len = arguments.length,
			basic_types = ['number', 'boolean', 'string', 'function', 'object', 'undefined'],
			basic_type, i, j, type_of_type = typeof type;
		  if (type_of_type !== 'string' && type_of_type !== 'function') {
			throw new Error('Bad type parameter');
		  }

		  if (args_len < 2) {
			throw new Error('Too few arguments');
		  }

		  if (type_of_type === 'string') {
			type = trim(type);

			if (type === '') {
			  return false;
			}

			for (j = 0; j < basic_types.length; j++) {
			  basic_type = basic_types[j];

			  if (basic_type == type) {
				for (i = 1; i < args_len; i++) {
				  if (typeof args[i] != type) {
					return false;
				  }
				}

				return true;
			  }
			}

			throw new Error('Bad type parameter');
		  }

		  // Not basic type. we need to use instanceof operator
		  for (i = 1; i < args_len; i++) {
			if (!(args[i] instanceof type)) {
			  return false;
			}
		  }

		  return true;
		},
		/*
		 * Initialize and return an array with specified size and initial value
		 */
		get_initialized_array = function(array_size, init_value) {
		  var array = [],
			i;
		  verify_type('number', array_size);

		  for (i = 0; i < array_size; i++) {
			array.push(init_value);
		  }

		  return array;
		},
		/**
		 * Splits text into lines and return as a string array
		 */
		split_into_lines = function(text) {
		  verify_type('string', text);

		  if (text === '') {
			return [];
		  }
		  return text.split('\n');
		},
		is_empty_array = function(obj) {
		  return are_type_of(Array, obj) && obj.length === 0;
		},
		/**
		 * Finds longest common sequence between two sequences
		 * @see {@link http://wordaligned.org/articles/longest-common-subsequence}
		 */
		find_longest_common_sequence = function(seq1, seq2, seq1_is_in_lcs, seq2_is_in_lcs) {
		  if (!are_type_of(Array, seq1, seq2)) {
			throw new Error('Array parameters are required');
		  }

		  // Deal with edge case
		  if (is_empty_array(seq1) || is_empty_array(seq2)) {
			return [];
		  }

		  // Function to calculate lcs lengths
		  var lcs_lens = function(xs, ys) {
			var i, j, prev,
			  curr = get_initialized_array(ys.length + 1, 0);

			for (i = 0; i < xs.length; i++) {
			  prev = curr.slice(0);
			  for (j = 0; j < ys.length; j++) {
				if (xs[i] === ys[j]) {
				  curr[j + 1] = prev[j] + 1;
				} else {
				  curr[j + 1] = Math.max(curr[j], prev[j + 1]);
				}
			  }
			}

			return curr;
		  },
			// Function to find lcs and fill in the array to indicate the optimal longest common sequence
			find_lcs = function(xs, xidx, xs_is_in, ys) {
			  var i, xb, xe, ll_b, ll_e, pivot, max, yb, ye,
				nx = xs.length,
				ny = ys.length;

			  if (nx === 0) {
				return [];
			  }
			  if (nx === 1) {
				if (has_value(ys, xs[0])) {
				  xs_is_in[xidx] = true;
				  return [xs[0]];
				}
				return [];
			  }
			  i = Math.floor(nx / 2);
			  xb = xs.slice(0, i);
			  xe = xs.slice(i);
			  ll_b = lcs_lens(xb, ys);
			  ll_e = lcs_lens(xe.slice(0)
				.reverse(), ys.slice(0)
				.reverse());

			  pivot = 0;
			  max = 0;
			  for (j = 0; j <= ny; j++) {
				if (ll_b[j] + ll_e[ny - j] > max) {
				  pivot = j;
				  max = ll_b[j] + ll_e[ny - j];
				}
			  }
			  yb = ys.slice(0, pivot);
			  ye = ys.slice(pivot);
			  return find_lcs(xb, xidx, xs_is_in, yb)
				.concat(find_lcs(xe, xidx + i, xs_is_in, ye));
			};

		  // Fill in seq1_is_in_lcs to find the optimal longest common subsequence of first sequence
		  find_lcs(seq1, 0, seq1_is_in_lcs, seq2);
		  // Fill in seq2_is_in_lcs to find the optimal longest common subsequence of second sequence and return the result
		  return find_lcs(seq2, 0, seq2_is_in_lcs, seq1);
		};

	  // First, check the parameters
	  if (are_type_of('string', old_data, new_data) === false) {
		return false;
	  }

	  if (old_data == new_data) {
		return '';
	  }

	  if (typeof context_lines !== 'number' || context_lines > MAX_CONTEXT_LINES || context_lines < MIN_CONTEXT_LINES) {
		context_lines = DEFAULT_CONTEXT_LINES;
	  }

	  ori_lines = split_into_lines(old_data);
	  new_lines = split_into_lines(new_data);
	  var ori_len = ori_lines.length,
		new_len = new_lines.length,
		ori_is_in_lcs = get_initialized_array(ori_len, false),
		new_is_in_lcs = get_initialized_array(new_len, false),
		lcs_len = find_longest_common_sequence(ori_lines, new_lines, ori_is_in_lcs, new_is_in_lcs)
		  .length,
		unidiff = '';

	  if (lcs_len === 0) { // No common sequence
		unidiff = HEADER_PREFIX + ORIGINAL_INDICATOR + (ori_len > 0 ? '1' : '0') + RANGE_SEPARATOR + ori_len + ' ' +
		  NEW_INDICATOR + (new_len > 0 ? '1' : '0') + RANGE_SEPARATOR + new_len + HEADER_SUFFIX;

		for (i = 0; i < ori_len; i++) {
		  unidiff += NEW_LINE + DELETION_INDICATOR + ori_lines[i];
		}

		for (j = 0; j < new_len; j++) {
		  unidiff += NEW_LINE + ADDITION_INDICATOR + new_lines[j];
		}

		return unidiff;
	  }

	  var leading_context = [],
		trailing_context = [],
		actual_leading_context = [],
		actual_trailing_context = [],

		// Regularize leading context by the context_lines parameter
		regularize_leading_context = function(context) {
		  if (context.length === 0 || context_lines === 0) {
			return [];
		  }

		  var context_start_pos = Math.max(context.length - context_lines, 0);

		  return context.slice(context_start_pos);
		},

		// Regularize trailing context by the context_lines parameter
		regularize_trailing_context = function(context) {
		  if (context.length === 0 || context_lines === 0) {
			return [];
		  }

		  return context.slice(0, Math.min(context_lines, context.length));
		};

	  // Skip common lines in the beginning
	  while (i < ori_len && ori_is_in_lcs[i] === true && new_is_in_lcs[i] === true) {
		leading_context.push(ori_lines[i]);
		i++;
	  }

	  j = i;
	  k = i; // The index in the longest common sequence
	  ori_hunk_start = i;
	  new_hunk_start = j;
	  ori_hunk_end = i;
	  new_hunk_end = j;

	  while (i < ori_len || j < new_len) {
		while (i < ori_len && ori_is_in_lcs[i] === false) {
		  i++;
		}
		ori_hunk_end = i;

		while (j < new_len && new_is_in_lcs[j] === false) {
		  j++;
		}
		new_hunk_end = j;

		// Find the trailing context
		trailing_context = [];
		while (i < ori_len && ori_is_in_lcs[i] === true && j < new_len && new_is_in_lcs[j] === true) {
		  trailing_context.push(ori_lines[i]);
		  k++;
		  i++;
		  j++;
		}

		if (k >= lcs_len || // No more in longest common lines
		  trailing_context.length >= 2 * context_lines) { // Context break found
		  if (trailing_context.length < 2 * context_lines) { // It must be last block of common lines but not a context break
			trailing_context = [];

			// Force break out
			i = ori_len;
			j = new_len;

			// Update hunk ends to force output to the end
			ori_hunk_end = ori_len;
			new_hunk_end = new_len;
		  }

		  // Output the diff hunk

		  // Trim the leading and trailing context block
		  actual_leading_context = regularize_leading_context(leading_context);
		  actual_trailing_context = regularize_trailing_context(trailing_context);

		  ori_hunk_start -= actual_leading_context.length;
		  new_hunk_start -= actual_leading_context.length;
		  ori_hunk_end += actual_trailing_context.length;
		  new_hunk_end += actual_trailing_context.length;

		  ori_hunk_line_no = ori_hunk_start + 1;
		  new_hunk_line_no = new_hunk_start + 1;
		  ori_hunk_size = ori_hunk_end - ori_hunk_start;
		  new_hunk_size = new_hunk_end - new_hunk_start;

		  // Build header
		  unidiff += HEADER_PREFIX + ORIGINAL_INDICATOR + ori_hunk_line_no + RANGE_SEPARATOR + ori_hunk_size + ' ' +
			NEW_INDICATOR + new_hunk_line_no + RANGE_SEPARATOR + new_hunk_size + HEADER_SUFFIX + NEW_LINE;

		  // Build the diff hunk content
		  while (ori_hunk_start < ori_hunk_end || new_hunk_start < new_hunk_end) {
			if (ori_hunk_start < ori_hunk_end && ori_is_in_lcs[ori_hunk_start] === true && new_is_in_lcs[
			  new_hunk_start] === true) { // The context line
			  unidiff += CONTEXT_INDICATOR + ori_lines[ori_hunk_start] + NEW_LINE;
			  ori_hunk_start++;
			  new_hunk_start++;
			} else if (ori_hunk_start < ori_hunk_end && ori_is_in_lcs[ori_hunk_start] === false) { // The deletion line
			  unidiff += DELETION_INDICATOR + ori_lines[ori_hunk_start] + NEW_LINE;
			  ori_hunk_start++;
			} else if (new_hunk_start < new_hunk_end && new_is_in_lcs[new_hunk_start] === false) { // The additional line
			  unidiff += ADDITION_INDICATOR + new_lines[new_hunk_start] + NEW_LINE;
			  new_hunk_start++;
			}
		  }

		  // Update hunk position and leading context
		  ori_hunk_start = i;
		  new_hunk_start = j;
		  leading_context = trailing_context;
		}
	  }

	  // Trim the trailing new line if it exists
	  if (unidiff.length > 0 && unidiff.charAt(unidiff.length) === NEW_LINE) {
		unidiff = unidiff.slice(0, -1);
	  }

	  return unidiff;
  	};
	exports.xdiff_string_diff = xdiff_string_diff;

	const xdiff_string_patch = function (originalStr, patch, flags, error) {
	// First two functions were adapted from Steven Levithan, also under an MIT license
	  // Adapted from XRegExp 1.5.0
	  // (c) 2007-2010 Steven Levithan
	  // MIT License
	  // <http://xregexp.com>
	  var getNativeFlags = function(regex) {
		return (regex.global ? 'g' : '') + (regex.ignoreCase ? 'i' : '') + (regex.multiline ? 'm' : '') + (regex.extended ?
		  'x' : '') + // Proposed for ES4; included in AS3
		(regex.sticky ? 'y' : '');
	  },
		cbSplit = function(string, sep /* separator */ ) {
		  // If separator `s` is not a regex, use the native `split`
		  if (!(sep instanceof RegExp)) { // Had problems to get it to work here using prototype test
			return String.prototype.split.apply(string, arguments);
		  }
		  var str = String(string),
			output = [],
			lastLastIndex = 0,
			match, lastLength, limit = Infinity,

			// This is required if not `s.global`, and it avoids needing to set `s.lastIndex` to zero
			// and restore it to its original value when we're done using the regex
			x = sep._xregexp,
			s = new RegExp(sep.source, getNativeFlags(sep) + 'g'); // Brett paring down
		  if (x) {
			s._xregexp = {
			  source: x.source,
			  captureNames: x.captureNames ? x.captureNames.slice(0) : null
			};
		  }

		  while ((match = s.exec(str))) { // Run the altered `exec` (required for `lastIndex` fix, etc.)
			if (s.lastIndex > lastLastIndex) {
			  output.push(str.slice(lastLastIndex, match.index));

			  if (match.length > 1 && match.index < str.length) {
				Array.prototype.push.apply(output, match.slice(1));
			  }

			  lastLength = match[0].length;
			  lastLastIndex = s.lastIndex;

			  if (output.length >= limit) {
				break;
			  }
			}

			if (s.lastIndex === match.index) {
			  s.lastIndex++;
			}
		  }

		  if (lastLastIndex === str.length) {
			if (!s.test('') || lastLength) {
			  output.push('');
			}
		  } else {
			output.push(str.slice(lastLastIndex));
		  }

		  return output.length > limit ? output.slice(0, limit) : output;
		},
		i = 0,
		ll = 0,
		ranges = [],
		lastLinePos = 0,
		firstChar = '',
		rangeExp = /^@@\s+-(\d+),(\d+)\s+\+(\d+),(\d+)\s+@@$/,
		lineBreaks = /\r?\n/,
		lines = cbSplit(patch.replace(/(\r?\n)+$/, ''), lineBreaks),
		origLines = cbSplit(originalStr, lineBreaks),
		newStrArr = [],
		linePos = 0,
		errors = '',
		// Both string & integer (constant) input is allowed
		optTemp = 0,
		OPTS = { // Unsure of actual PHP values, so better to rely on string
		  'XDIFF_PATCH_NORMAL': 1,
		  'XDIFF_PATCH_REVERSE': 2,
		  'XDIFF_PATCH_IGNORESPACE': 4
		};

	  // Input defaulting & sanitation
	  if (typeof originalStr !== 'string' || !patch) {
		return false;
	  }
	  if (!flags) {
		flags = 'XDIFF_PATCH_NORMAL';
	  }

	  if (typeof flags !== 'number') { // Allow for a single string or an array of string flags
		flags = [].concat(flags);
		for (i = 0; i < flags.length; i++) {
		  // Resolve string input to bitwise e.g. 'XDIFF_PATCH_NORMAL' becomes 1
		  if (OPTS[flags[i]]) {
			optTemp = optTemp | OPTS[flags[i]];
		  }
		}
		flags = optTemp;
	  }

	  if (flags & OPTS.XDIFF_PATCH_NORMAL) {
		for (i = 0, ll = lines.length; i < ll; i++) {
		  ranges = lines[i].match(rangeExp);
		  if (ranges) {
			lastLinePos = linePos;
			linePos = ranges[1] - 1;
			while (lastLinePos < linePos) {
			  newStrArr[newStrArr.length] = origLines[lastLinePos++];
			}
			while (lines[++i] && (rangeExp.exec(lines[i])) === null) {
			  firstChar = lines[i].charAt(0);
			  switch (firstChar) {
				case '-':
				  ++linePos; // Skip including that line
				  break;
				case '+':
				  newStrArr[newStrArr.length] = lines[i].slice(1);
				  break;
				case ' ':
				  newStrArr[newStrArr.length] = origLines[linePos++];
				  break;
				default:
				  throw 'Unrecognized initial character in unidiff line'; // Reconcile with returning errrors arg?
			  }
			}
			if (lines[i]) {
			  i--;
			}
		  }
		}
		while (linePos > 0 && linePos < origLines.length) {
		  newStrArr[newStrArr.length] = origLines[linePos++];
		}
	  } else if (flags & OPTS.XDIFF_PATCH_REVERSE) { // Only differs from above by a few lines
		for (i = 0, ll = lines.length; i < ll; i++) {
		  ranges = lines[i].match(rangeExp);
		  if (ranges) {
			lastLinePos = linePos;
			linePos = ranges[3] - 1;
			while (lastLinePos < linePos) {
			  newStrArr[newStrArr.length] = origLines[lastLinePos++];
			}
			while (lines[++i] && (rangeExp.exec(lines[i])) === null) {
			  firstChar = lines[i].charAt(0);
			  switch (firstChar) {
				case '-':
				  newStrArr[newStrArr.length] = lines[i].slice(1);
				  break;
				case '+':
				  ++linePos; // Skip including that line
				  break;
				case ' ':
				  newStrArr[newStrArr.length] = origLines[linePos++];
				  break;
				default:
				  throw 'Unrecognized initial character in unidiff line'; // Reconcile with returning errrors arg?
			  }
			}
			if (lines[i]) {
			  i--;
			}
		  }
		}
		while (linePos > 0 && linePos < origLines.length) {
		  newStrArr[newStrArr.length] = origLines[linePos++];
		}
	  }
	  if (typeof error === 'string') {
		this.window[error] = errors;
	  }
	  return newStrArr.join('\n');
  	};
	exports.xdiff_string_patch = xdiff_string_patch;

})))
