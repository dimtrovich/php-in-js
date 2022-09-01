/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 *
 * @module Fs
 * @description Fonctions de manipulation de fichiers et dossiers
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global = {}));
}(this, (function(exports) {
    'use strict';

	const escapeshellarg = function (arg) {
		var ret = '';

		  ret = arg.replace(/[^\\]'/g, function(m, i, s) {
			return m.slice(0, 1) + '\\\'';
		  });

		  return "'" + ret + "'";
	};
	exports.escapeshellarg = escapeshellarg

	const basename = function (path, suffix) {
		var b = path;
		  var lastChar = b.charAt(b.length - 1);

		  if (lastChar === '/' || lastChar === '\\') {
			b = b.slice(0, -1);
		  }

		  b = b.replace(/^.*[\/\\]/g, '');

		  if (typeof suffix === 'string' && b.substr(b.length - suffix.length) == suffix) {
			b = b.substr(0, b.length - suffix.length);
		  }

		  return b;
	};
	exports.basename = basename

	const dirname = function (path) {
		return path.replace(/\\/g, '/')
			.replace(/\/[^\/]*\/?$/, '');
	};
	exports.dirname = dirname

	const file_get_contents = function (url, flags, context, offset, maxLen) {
		var tmp, headers = [],
			newTmp = [],
			k = 0,
			i = 0,
			href = '',
			pathPos = -1,
			flagNames = 0,
			content = null,
			http_stream = false;
		  var func = function(value) {
			return value.substring(1) !== '';
		  };

		  // BEGIN REDUNDANT
		  exports.php_in_js = exports.php_in_js || {};
		  exports.php_in_js.ini = exports.php_in_js.ini || {};
		  // END REDUNDANT
		  var ini = exports.php_in_js.ini;
		  context = context || exports.php_in_js.default_streams_context || null;

		  if (!flags) {
			flags = 0;
		  }
		  var OPTS = {
			FILE_USE_INCLUDE_PATH: 1,
			FILE_TEXT: 32,
			FILE_BINARY: 64
		  };
		  if (typeof flags === 'number') { // Allow for a single string or an array of string flags
			flagNames = flags;
		  } else {
			flags = [].concat(flags);
			for (i = 0; i < flags.length; i++) {
			  if (OPTS[flags[i]]) {
				flagNames = flagNames | OPTS[flags[i]];
			  }
			}
		  }

		  if (flagNames & OPTS.FILE_BINARY && (flagNames & OPTS.FILE_TEXT)) { // These flags shouldn't be together
			throw 'You cannot pass both FILE_BINARY and FILE_TEXT to file_get_contents()';
		  }

		  if ((flagNames & OPTS.FILE_USE_INCLUDE_PATH) && ini.include_path && ini.include_path.local_value) {
			var slash = ini.include_path.local_value.indexOf('/') !== -1 ? '/' : '\\';
			url = ini.include_path.local_value + slash + url;
		  } else if (!/^(https?|file):/.test(url)) { // Allow references within or below the same directory (should fix to allow other relative references or root reference; could make dependent on parse_url())
			href = this.window.location.href;
			pathPos = url.indexOf('/') === 0 ? href.indexOf('/', 8) - 1 : href.lastIndexOf('/');
			url = href.slice(0, pathPos + 1) + url;
		  }

		  var http_options;
		  if (context) {
			http_options = context.stream_options && context.stream_options.http;
			http_stream = !! http_options;
		  }

		  if (!context || http_stream) {
			var req = this.window.ActiveXObject ? new ActiveXObject('Microsoft.XMLHTTP') : new XMLHttpRequest();
			if (!req) {
			  throw new Error('XMLHttpRequest not supported');
			}

			var method = http_stream ? http_options.method : 'GET';
			var async = !! (context && context.stream_params && context.stream_params['phpjs.async']);

			if (ini['phpjs.ajaxBypassCache'] && ini['phpjs.ajaxBypassCache'].local_value) {
			  url += (url.match(/\?/) == null ? '?' : '&') + (new Date())
				.getTime(); // Give optional means of forcing bypass of cache
			}

			req.open(method, url, async);
			if (async) {
			  var notification = context.stream_params.notification;
			  if (typeof notification === 'function') {
				// Fix: make work with req.addEventListener if available: https://developer.mozilla.org/En/Using_XMLHttpRequest
				if (0 && req.addEventListener) { // Unimplemented so don't allow to get here
				  /*
				  req.addEventListener('progress', updateProgress, false);
				  req.addEventListener('load', transferComplete, false);
				  req.addEventListener('error', transferFailed, false);
				  req.addEventListener('abort', transferCanceled, false);
				  */
				} else {
				  req.onreadystatechange = function(aEvt) { // aEvt has stopPropagation(), preventDefault(); see https://developer.mozilla.org/en/NsIDOMEvent
					// Other XMLHttpRequest properties: multipart, responseXML, status, statusText, upload, withCredentials
					/*
		  PHP Constants:
		  STREAM_NOTIFY_RESOLVE   1       A remote address required for this stream has been resolved, or the resolution failed. See severity  for an indication of which happened.
		  STREAM_NOTIFY_CONNECT   2     A connection with an external resource has been established.
		  STREAM_NOTIFY_AUTH_REQUIRED 3     Additional authorization is required to access the specified resource. Typical issued with severity level of STREAM_NOTIFY_SEVERITY_ERR.
		  STREAM_NOTIFY_MIME_TYPE_IS  4     The mime-type of resource has been identified, refer to message for a description of the discovered type.
		  STREAM_NOTIFY_FILE_SIZE_IS  5     The size of the resource has been discovered.
		  STREAM_NOTIFY_REDIRECTED    6     The external resource has redirected the stream to an alternate location. Refer to message .
		  STREAM_NOTIFY_PROGRESS  7     Indicates current progress of the stream transfer in bytes_transferred and possibly bytes_max as well.
		  STREAM_NOTIFY_COMPLETED 8     There is no more data available on the stream.
		  STREAM_NOTIFY_FAILURE   9     A generic error occurred on the stream, consult message and message_code for details.
		  STREAM_NOTIFY_AUTH_RESULT   10     Authorization has been completed (with or without success).

		  STREAM_NOTIFY_SEVERITY_INFO 0     Normal, non-error related, notification.
		  STREAM_NOTIFY_SEVERITY_WARN 1     Non critical error condition. Processing may continue.
		  STREAM_NOTIFY_SEVERITY_ERR  2     A critical error occurred. Processing cannot continue.
		  */
					var objContext = {
					  responseText: req.responseText,
					  responseXML: req.responseXML,
					  status: req.status,
					  statusText: req.statusText,
					  readyState: req.readyState,
					  evt: aEvt
					}; // properties are not available in PHP, but offered on notification via 'this' for convenience
					// notification args: notification_code, severity, message, message_code, bytes_transferred, bytes_max (all int's except string 'message')
					// Need to add message, etc.
					var bytes_transferred;
					switch (req.readyState) {
					  case 0:
						//     UNINITIALIZED     open() has not been called yet.
						notification.call(objContext, 0, 0, '', 0, 0, 0);
						break;
					  case 1:
						//     LOADING     send() has not been called yet.
						notification.call(objContext, 0, 0, '', 0, 0, 0);
						break;
					  case 2:
						//     LOADED     send() has been called, and headers and status are available.
						notification.call(objContext, 0, 0, '', 0, 0, 0);
						break;
					  case 3:
						//     INTERACTIVE     Downloading; responseText holds partial data.
						bytes_transferred = req.responseText.length * 2; // One character is two bytes
						notification.call(objContext, 7, 0, '', 0, bytes_transferred, 0);
						break;
					  case 4:
						//     COMPLETED     The operation is complete.
						if (req.status >= 200 && req.status < 400) {
						  bytes_transferred = req.responseText.length * 2; // One character is two bytes
						  notification.call(objContext, 8, 0, '', req.status, bytes_transferred, 0);
						} else if (req.status === 403) { // Fix: These two are finished except for message
						  notification.call(objContext, 10, 2, '', req.status, 0, 0);
						} else { // Errors
						  notification.call(objContext, 9, 2, '', req.status, 0, 0);
						}
						break;
					  default:
						throw 'Unrecognized ready state for file_get_contents()';
					}
				  };
				}
			  }
			}

			if (http_stream) {
			  var sendHeaders = http_options.header && http_options.header.split(/\r?\n/);
			  var userAgentSent = false;
			  for (i = 0; i < sendHeaders.length; i++) {
				var sendHeader = sendHeaders[i];
				var breakPos = sendHeader.search(/:\s*/);
				var sendHeaderName = sendHeader.substring(0, breakPos);
				req.setRequestHeader(sendHeaderName, sendHeader.substring(breakPos + 1));
				if (sendHeaderName === 'User-Agent') {
				  userAgentSent = true;
				}
			  }
			  if (!userAgentSent) {
				var user_agent = http_options.user_agent || (ini.user_agent && ini.user_agent.local_value);
				if (user_agent) {
				  req.setRequestHeader('User-Agent', user_agent);
				}
			  }
			  content = http_options.content || null;
			  /*
			  // Presently unimplemented HTTP context options
			  var request_fulluri = http_options.request_fulluri || false; // When set to TRUE, the entire URI will be used when constructing the request. (i.e. GET http://www.example.com/path/to/file.html HTTP/1.0). While this is a non-standard request format, some proxy servers require it.
			  var max_redirects = http_options.max_redirects || 20; // The max number of redirects to follow. Value 1 or less means that no redirects are followed.
			  var protocol_version = http_options.protocol_version || 1.0; // HTTP protocol version
			  var timeout = http_options.timeout || (ini.default_socket_timeout && ini.default_socket_timeout.local_value); // Read timeout in seconds, specified by a float
			  var ignore_errors = http_options.ignore_errors || false; // Fetch the content even on failure status codes.
			  */
			}

			if (flagNames & OPTS.FILE_TEXT) { // Overrides how encoding is treated (regardless of what is returned from the server)
			  var content_type = 'text/html';
			  if (http_options && http_options['phpjs.override']) { // Fix: Could allow for non-HTTP as well
				content_type = http_options['phpjs.override']; // We use this, e.g., in gettext-related functions if character set
				//   overridden earlier by bind_textdomain_codeset()
			  } else {
				var encoding = (ini['unicode.stream_encoding'] && ini['unicode.stream_encoding'].local_value) ||
				  'UTF-8';
				if (http_options && http_options.header && (/^content-type:/im)
				  .test(http_options.header)) { // We'll assume a content-type expects its own specified encoding if present
				  content_type = http_options.header.match(/^content-type:\s*(.*)$/im)[1]; // We let any header encoding stand
				}
				if (!(/;\s*charset=/)
				  .test(content_type)) { // If no encoding
				  content_type += '; charset=' + encoding;
				}
			  }
			  req.overrideMimeType(content_type);
			}
			// Default is FILE_BINARY, but for binary, we apparently deviate from PHP in requiring the flag, since many if not
			//     most people will also want a way to have it be auto-converted into native JavaScript text instead
			else if (flagNames & OPTS.FILE_BINARY) { // Trick at https://developer.mozilla.org/En/Using_XMLHttpRequest to get binary
			  req.overrideMimeType('text/plain; charset=x-user-defined');
			  // Getting an individual byte then requires:
			  // responseText.charCodeAt(x) & 0xFF; // throw away high-order byte (f7) where x is 0 to responseText.length-1 (see notes in our substr())
			}

			try {
			  if (http_options && http_options['phpjs.sendAsBinary']) { // For content sent in a POST or PUT request (use with file_put_contents()?)
				req.sendAsBinary(content); // In Firefox, only available FF3+
			  } else {
				req.send(content);
			  }
			} catch (e) {
			  // catches exception reported in issue #66
			  return false;
			}

			tmp = req.getAllResponseHeaders();
			if (tmp) {
			  tmp = tmp.split('\n');
			  for (k = 0; k < tmp.length; k++) {
				if (func(tmp[k])) {
				  newTmp.push(tmp[k]);
				}
			  }
			  tmp = newTmp;
			  for (i = 0; i < tmp.length; i++) {
				headers[i] = tmp[i];
			  }
			  this.$http_response_header = headers; // see http://php.net/manual/en/reserved.variables.httpresponseheader.php
			}

			if (offset || maxLen) {
			  if (maxLen) {
				return req.responseText.substr(offset || 0, maxLen);
			  }
			  return req.responseText.substr(offset);
			}
			return req.responseText;
		  }
		  return false;
	};
	exports.file_get_contents = file_get_contents

	const pathinfo = function (path, options) {
		var opt = '',
			optName = '',
			optTemp = 0,
			tmp_arr = {},
			cnt = 0,
			i = 0;
		  var have_basename = false,
			have_extension = false,
			have_filename = false;

		  // Input defaulting & sanitation
		  if (!path) {
			return false;
		  }
		  if (!options) {
			options = 'PATHINFO_ALL';
		  }

		  // Initialize binary arguments. Both the string & integer (constant) input is
		  // allowed
		  var OPTS = {
			'PATHINFO_DIRNAME': 1,
			'PATHINFO_BASENAME': 2,
			'PATHINFO_EXTENSION': 4,
			'PATHINFO_FILENAME': 8,
			'PATHINFO_ALL': 0
		  };
		  // PATHINFO_ALL sums up all previously defined PATHINFOs (could just pre-calculate)
		  for (optName in OPTS) {
			OPTS.PATHINFO_ALL = OPTS.PATHINFO_ALL | OPTS[optName];
		  }
		  if (typeof options !== 'number') { // Allow for a single string or an array of string flags
			options = [].concat(options);
			for (i = 0; i < options.length; i++) {
			  // Resolve string input to bitwise e.g. 'PATHINFO_EXTENSION' becomes 4
			  if (OPTS[options[i]]) {
				optTemp = optTemp | OPTS[options[i]];
			  }
			}
			options = optTemp;
		  }

		  // Internal Functions
		  var __getExt = function(path) {
			var str = path + '';
			var dotP = str.lastIndexOf('.') + 1;
			return !dotP ? false : dotP !== str.length ? str.substr(dotP) : '';
		  };

		  // Gather path infos
		  if (options & OPTS.PATHINFO_DIRNAME) {
			var dirName = path.replace(/\\/g, '/')
			  .replace(/\/[^\/]*\/?$/, ''); // dirname
			tmp_arr.dirname = dirName === path ? '.' : dirName;
		  }

		  if (options & OPTS.PATHINFO_BASENAME) {
			if (false === have_basename) {
			  have_basename = basename(path);
			}
			tmp_arr.basename = have_basename;
		  }

		  if (options & OPTS.PATHINFO_EXTENSION) {
			if (false === have_basename) {
			  have_basename = basename(path);
			}
			if (false === have_extension) {
			  have_extension = __getExt(have_basename);
			}
			if (false !== have_extension) {
			  tmp_arr.extension = have_extension;
			}
		  }

		  if (options & OPTS.PATHINFO_FILENAME) {
			if (false === have_basename) {
			  have_basename = basename(path);
			}
			if (false === have_extension) {
			  have_extension = __getExt(have_basename);
			}
			if (false === have_filename) {
			  have_filename = have_basename.slice(0, have_basename.length - (have_extension ? have_extension.length + 1 :
				have_extension === false ? 0 : 1));
			}

			tmp_arr.filename = have_filename;
		  }

		  // If array contains only 1 element: return string
		  cnt = 0;
		  for (opt in tmp_arr) {
			cnt++;
		  }
		  if (cnt == 1) {
			return tmp_arr[opt];
		  }

		  // Return full-blown array
		  return tmp_arr;
	}
	exports.pathinfo = pathinfo

	const realpath = function (path) {
		var p = 0,
			arr = []; /* Save the root, if not given */
		  var r = this.window.location.href; /* Avoid input failures */
		  path = (path + '')
			.replace('\\', '/'); /* Check if there's a port in path (like 'http://') */
		  if (path.indexOf('://') !== -1) {
			p = 1;
		  } /* Ok, there's not a port in path, so let's take the root */
		  if (!p) {
			path = r.substring(0, r.lastIndexOf('/') + 1) + path;
		  } /* Explode the given path into it's parts */
		  arr = path.split('/'); /* The path is an array now */
		  path = []; /* Foreach part make a check */
		  for (var k in arr) { /* This is'nt really interesting */
			if (arr[k] == '.') {
			  continue;
			} /* This reduces the realpath */
			if (arr[k] == '..') {
			  /* But only if there more than 3 parts in the path-array.
			   * The first three parts are for the uri */
			  if (path.length > 3) {
				path.pop();
			  }
			} /* This adds parts to the realpath */
			else {
			  /* But only if the part is not empty or the uri
			   * (the first three parts ar needed) was not
			   * saved */
			  if ((path.length < 2) || (arr[k] !== '')) {
				path.push(arr[k]);
			  }
			}
		  } /* Returns the absloute path as a string */
		  return path.join('/');
	};
	exports.realpath = realpath

})))
