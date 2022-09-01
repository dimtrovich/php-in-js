/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 *
 * @module Url
 * @description Fonctions de manipulation d'URL
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global = {}));
}(this, (function(exports) {
    'use strict';

	const base64_decode = function (data) {
		var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			dec = '',
			tmp_arr = [];

		  if (!data) {
			return data;
		  }

		  data += '';

		  do { // unpack four hexets into three octets using index points in b64
			h1 = b64.indexOf(data.charAt(i++));
			h2 = b64.indexOf(data.charAt(i++));
			h3 = b64.indexOf(data.charAt(i++));
			h4 = b64.indexOf(data.charAt(i++));

			bits = h1 << 18 | h2 << 12 | h3 << 6 | h4;

			o1 = bits >> 16 & 0xff;
			o2 = bits >> 8 & 0xff;
			o3 = bits & 0xff;

			if (h3 == 64) {
			  tmp_arr[ac++] = String.fromCharCode(o1);
			} else if (h4 == 64) {
			  tmp_arr[ac++] = String.fromCharCode(o1, o2);
			} else {
			  tmp_arr[ac++] = String.fromCharCode(o1, o2, o3);
			}
		  } while (i < data.length);

		  dec = tmp_arr.join('');

		  return decodeURIComponent(escape(dec.replace(/\0+$/, '')));
	};
	exports.base64_decode = base64_decode;

	const base64_encode = function (data) {
		var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
		  var o1, o2, o3, h1, h2, h3, h4, bits, i = 0,
			ac = 0,
			enc = '',
			tmp_arr = [];

		  if (!data) {
			return data;
		  }

		  data = unescape(encodeURIComponent(data))

		  do { // pack three octets into four hexets
			o1 = data.charCodeAt(i++);
			o2 = data.charCodeAt(i++);
			o3 = data.charCodeAt(i++);

			bits = o1 << 16 | o2 << 8 | o3;

			h1 = bits >> 18 & 0x3f;
			h2 = bits >> 12 & 0x3f;
			h3 = bits >> 6 & 0x3f;
			h4 = bits & 0x3f;

			// use hexets to index into b64, and append result to encoded string
			tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
		  } while (i < data.length);

		  enc = tmp_arr.join('');

		  var r = data.length % 3;

		  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
	};
	exports.base64_encode = base64_encode;

	const parse_url = function (str, component) {
		var query, key = ['source', 'scheme', 'authority', 'userInfo', 'user', 'pass', 'host', 'port',
			  'relative', 'path', 'directory', 'file', 'query', 'fragment'
			],
			ini = (exports.php_in_js && exports.php_in_js.ini) || {},
			mode = (ini['phpjs.parse_url.mode'] &&
			  ini['phpjs.parse_url.mode'].local_value) || 'php',
			parser = {
			  php: /^(?:([^:\/?#]+):)?(?:\/\/()(?:(?:()(?:([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?()(?:(()(?:(?:[^?#\/]*\/)*)()(?:[^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			  strict: /^(?:([^:\/?#]+):)?(?:\/\/((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?))?((((?:[^?#\/]*\/)*)([^?#]*))(?:\?([^#]*))?(?:#(.*))?)/,
			  loose: /^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/\/?)?((?:(([^:@]*):?([^:@]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/ // Added one optional slash to post-scheme to catch file:/// (should restrict this)
			};

		  var m = parser[mode].exec(str),
			uri = {},
			i = 14;
		  while (i--) {
			if (m[i]) {
			  uri[key[i]] = m[i];
			}
		  }

		  if (component) {
			return uri[component.replace('PHP_URL_', '')
			  .toLowerCase()];
		  }
		  if (mode !== 'php') {
			var name = (ini['phpjs.parse_url.queryKey'] &&
			  ini['phpjs.parse_url.queryKey'].local_value) || 'queryKey';
			parser = /(?:^|&)([^&=]*)=?([^&]*)/g;
			uri[name] = {};
			query = uri[key[12]] || '';
			query.replace(parser, function($0, $1, $2) {
			  if ($1) {
				uri[name][$1] = $2;
			  }
			});
		  }
		  delete uri.source;
		  return uri;
	};
	exports.parse_url = parse_url;

	const rawurldecode = function (str) {
		return decodeURIComponent((str + '')
			.replace(/%(?![\da-f]{2})/gi, function() {
			  // PHP tolerates poorly formed escape sequences
			  return '%25';
			}));
	};
	exports.rawurldecode = rawurldecode;

	const rawurlencode = function (str) {
		str = (str + '')
			.toString();

		  // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
		  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
		  return encodeURIComponent(str)
			.replace(/!/g, '%21')
			.replace(/'/g, '%27')
			.replace(/\(/g, '%28')
			.
		  replace(/\)/g, '%29')
			.replace(/\*/g, '%2A');
	};
	exports.rawurlencode = rawurlencode;

	const urldecode = function (str) {
		return decodeURIComponent((str + '')
			.replace(/%(?![\da-f]{2})/gi, function() {
			  // PHP tolerates poorly formed escape sequences
			  return '%25';
			})
			.replace(/\+/g, '%20'));
	};
	exports.urldecode = urldecode;

	const urlencode = function (str) {
		str = (str + '')
			.toString();

		  // Tilde should be allowed unescaped in future versions of PHP (as reflected below), but if you want to reflect current
		  // PHP behavior, you would need to add ".replace(/~/g, '%7E');" to the following.
		  return encodeURIComponent(str)
			.replace(/!/g, '%21')
			.replace(/'/g, '%27')
			.replace(/\(/g, '%28')
			.
		  replace(/\)/g, '%29')
			.replace(/\*/g, '%2A')
			.replace(/%20/g, '+');
	};
	exports.urlencode = urlencode;

	const get_headers = function (url, format) {
		var req = window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();

	  if (!req) {
		throw new Error('XMLHttpRequest not supported');
	  }
	  var tmp, headers, pair, i, j = 0;ß;
	  req.open('HEAD', url, false);
	  req.send(null);

	  if (req.readyState < 3) {
		return false;
	  }

	  	var array_filter = function (arr, func) {
			var retObj = {}, k;

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

	  tmp = req.getAllResponseHeaders();
	  tmp = tmp.split('\n');
	  tmp = array_filter(tmp, function(value) {
		return value.substring(1) !== '';
	  });
	  headers = format ? {} : [];

	  for (var i in tmp) {
		if (format) {
		  pair = tmp[i].split(':');
		  headers[pair.splice(0, 1)] = pair.join(':')
			.substring(1);
		} else {
		  headers[j++] = tmp[i];
		}
	  }

	  return headers;
  	};
	exports.get_headers = get_headers;

  	const http_build_query = function (formdata, numeric_prefix, arg_separator) {
	var value, key, tmp = [];

	  var _http_build_query_helper = function(key, val, arg_separator) {
		var k, tmp = [];
		if (val === true) {
		  val = '1';
		} else if (val === false) {
		  val = '0';
		}
		if (val != null) {
		  if (typeof val === 'object') {
			for (k in val) {
			  if (val[k] != null) {
				tmp.push(_http_build_query_helper(key + '[' + k + ']', val[k], arg_separator));
			  }
			}
			return tmp.join(arg_separator);
		  } else if (typeof val !== 'function') {
			return urlencode(key) + '=' + urlencode(val);
		  } else {
			throw new Error('There was an error processing for http_build_query().');
		  }
		} else {
		  return '';
		}
	  };

	  if (!arg_separator) {
		arg_separator = '&';
	  }
	  for (key in formdata) {
		value = formdata[key];
		if (numeric_prefix && !isNaN(key)) {
		  key = String(numeric_prefix) + key;
		}
		var query = _http_build_query_helper(key, value, arg_separator);
		if (query !== '') {
		  tmp.push(query);
		}
	  }

	  return tmp.join(arg_separator);
  	};
	exports.http_build_query = http_build_query

})))
