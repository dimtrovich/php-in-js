/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 *
 * @module Output
 * @description Fonctions de sorties
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global = {}));
}(this, (function(exports) {
    'use strict';

	const echo = function () {
		var isNode = typeof module !== 'undefined' && module.exports && typeof global !== "undefined" && {}.toString.call(global) == '[object global]';
		  if (isNode) {
			var args = Array.prototype.slice.call(arguments);
			return console.log(args.join(' '));
		  }

		  var arg = '',
			argc = arguments.length,
			argv = arguments,
			i = 0,
			holder, win = window,
			d = win.document,
			ns_xhtml = 'http://www.w3.org/1999/xhtml',
			ns_xul = 'http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul'; // If we're in a XUL context
		  var stringToDOM = function(str, parent, ns, container) {
			var extraNSs = '';
			if (ns === ns_xul) {
			  extraNSs = ' xmlns:html="' + ns_xhtml + '"';
			}
			var stringContainer = '<' + container + ' xmlns="' + ns + '"' + extraNSs + '>' + str + '</' + container + '>';
			var dils = win.DOMImplementationLS,
			  dp = win.DOMParser,
			  ax = win.ActiveXObject;
			if (dils && dils.createLSInput && dils.createLSParser) {
			  // Follows the DOM 3 Load and Save standard, but not
			  // implemented in browsers at present; HTML5 is to standardize on innerHTML, but not for XML (though
			  // possibly will also standardize with DOMParser); in the meantime, to ensure fullest browser support, could
			  // attach http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.js (see http://svn2.assembla.com/svn/brettz9/DOMToString/DOM3.xhtml for a simple test file)
			  var lsInput = dils.createLSInput();
			  // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
			  lsInput.stringData = stringContainer;
			  var lsParser = dils.createLSParser(1, null); // synchronous, no schema type
			  return lsParser.parse(lsInput)
				.firstChild;
			} else if (dp) {
			  // If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
			  try {
				var fc = new dp()
				  .parseFromString(stringContainer, 'text/xml');
				if (fc && fc.documentElement && fc.documentElement.localName !== 'parsererror' && fc.documentElement.namespaceURI !==
				  'http://www.mozilla.org/newlayout/xml/parsererror.xml') {
				  return fc.documentElement.firstChild;
				}
				// If there's a parsing error, we just continue on
			  } catch (e) {
				// If there's a parsing error, we just continue on
			  }
			} else if (ax) { // We don't bother with a holder in Explorer as it doesn't support namespaces
			  var axo = new ax('MSXML2.DOMDocument');
			  axo.loadXML(str);
			  return axo.documentElement;
			}
			/*else if (win.XMLHttpRequest) { // Supposed to work in older Safari
			  var req = new win.XMLHttpRequest;
			  req.open('GET', 'data:application/xml;charset=utf-8,'+encodeURIComponent(str), false);
			  if (req.overrideMimeType) {
				req.overrideMimeType('application/xml');
			  }
			  req.send(null);
			  return req.responseXML;
			}*/
			// Document fragment did not work with innerHTML, so we create a temporary element holder
			// If we're in XHTML, we'll try to allow the XHTML namespace to be available by default
			//if (d.createElementNS && (d.contentType && d.contentType !== 'text/html')) { // Don't create namespaced elements if we're being served as HTML (currently only Mozilla supports this detection in true XHTML-supporting browsers, but Safari and Opera should work with the above DOMParser anyways, and IE doesn't support createElementNS anyways)
			if (d.createElementNS && // Browser supports the method
			  ((// We know it's not HTML4 or less, if the tag is not HTML (even if the root namespace is null)
			(d.documentElement.namespaceURI || // We can use if the document is using a namespace
				d.documentElement.nodeName.toLowerCase() !== 'html' || d.contentType && d.contentType !== 'text/html')) // We know it's not regular HTML4 or less if this is Mozilla (only browser supporting the attribute) and the content type is something other than text/html; other HTML5 roots (like svg) still have a namespace
			  )) { // Don't create namespaced elements if we're being served as HTML (currently only Mozilla supports this detection in true XHTML-supporting browsers, but Safari and Opera should work with the above DOMParser anyways, and IE doesn't support createElementNS anyways); last test is for the sake of being in a pure XML document
			  holder = d.createElementNS(ns, container);
			} else {
			  holder = d.createElement(container); // Document fragment did not work with innerHTML
			}
			holder.innerHTML = str;
			while (holder.firstChild) {
			  parent.appendChild(holder.firstChild);
			}
			return false;
			// throw 'Your browser does not support DOM parsing as required by echo()';
		  };

		  var ieFix = function(node) {
			if (node.nodeType === 1) {
			  var newNode = d.createElement(node.nodeName);
			  var i, len;
			  if (node.attributes && node.attributes.length > 0) {
				for (i = 0, len = node.attributes.length; i < len; i++) {
				  newNode.setAttribute(node.attributes[i].nodeName, node.getAttribute(node.attributes[i].nodeName));
				}
			  }
			  if (node.childNodes && node.childNodes.length > 0) {
				for (i = 0, len = node.childNodes.length; i < len; i++) {
				  newNode.appendChild(ieFix(node.childNodes[i]));
				}
			  }
			  return newNode;
			} else {
			  return d.createTextNode(node.nodeValue);
			}
		  };

		  var replacer = function(s, m1, m2) {
			// We assume for now that embedded variables do not have dollar sign; to add a dollar sign, you currently must use {$$var} (We might change this, however.)
			// Doesn't cover all cases yet: see http://php.net/manual/en/language.types.string.php#language.types.string.syntax.double
			if (m1 !== '\\') {
			  return m1 + eval(m2);
			} else {
			  return s;
			}
		  };

		  exports.php_in_js = exports.php_in_js || {};
		  var phpjs = exports.php_in_js,
			ini = phpjs.ini,
			obs = phpjs.obs;
		  for (i = 0; i < argc; i++) {
			arg = argv[i];
			if (ini && ini['phpjs.echo_embedded_vars']) {
			  arg = arg.replace(/(.?)\{?\$(\w*?\}|\w*)/g, replacer);
			}

			if (!phpjs.flushing && obs && obs.length) { // If flushing we output, but otherwise presence of a buffer means caching output
			  obs[obs.length - 1].buffer += arg;
			  continue;
			}

			if (d.appendChild) {
			  if (d.body) {
				if (win.navigator.appName === 'Microsoft Internet Explorer') { // We unfortunately cannot use feature detection, since this is an IE bug with cloneNode nodes being appended
				  d.body.appendChild(stringToDOM(ieFix(arg)));
				} else {
				  var unappendedLeft = stringToDOM(arg, d.body, ns_xhtml, 'div')
					.cloneNode(true); // We will not actually append the div tag (just using for providing XHTML namespace by default)
				  if (unappendedLeft) {
					d.body.appendChild(unappendedLeft);
				  }
				}
			  } else {
				d.documentElement.appendChild(stringToDOM(arg, d.documentElement, ns_xul, 'description')); // We will not actually append the description tag (just using for providing XUL namespace by default)
			  }
			} else if (d.write) {
			  d.write(arg);
			}
			/* else { // This could recurse if we ever add print!
			  print(arg);
			}*/
		  }
	};
	exports.echo = echo;

	const print_r = function (array, return_val) {
	var output = '',
		pad_char = ' ',
		pad_val = 4,
		d = window.document,
		getFuncName = function(fn) {
		  var name = (/\W*function\s+([\w\$]+)\s*\(/)
			.exec(fn);
		  if (!name) {
			return '(Anonymous)';
		  }
		  return name[1];
		};
	  repeat_char = function(len, pad_char) {
		var str = '';
		for (var i = 0; i < len; i++) {
		  str += pad_char;
		}
		return str;
	  };
	  formatArray = function(obj, cur_depth, pad_val, pad_char) {
		if (cur_depth > 0) {
		  cur_depth++;
		}

		var base_pad = repeat_char(pad_val * cur_depth, pad_char);
		var thick_pad = repeat_char(pad_val * (cur_depth + 1), pad_char);
		var str = '';

		if (typeof obj === 'object' && obj !== null && obj.constructor && getFuncName(obj.constructor) !==
		  'PHPJS_Resource') {
		  str += 'Array\n' + base_pad + '(\n';
		  for (var key in obj) {
			if (Object.prototype.toString.call(obj[key]) === '[object Array]') {
			  str += thick_pad + '[' + key + '] => ' + formatArray(obj[key], cur_depth + 1, pad_val, pad_char);
			} else {
			  str += thick_pad + '[' + key + '] => ' + obj[key] + '\n';
			}
		  }
		  str += base_pad + ')\n';
		} else if (obj === null || obj === undefined) {
		  str = '';
		} else { // for our "resource" class
		  str = obj.toString();
		}

		return str;
	  };

	  output = formatArray(array, 0, pad_val, pad_char);

	  if (return_val !== true) {
		if (d.body) {
		  echo(output);
		} else {
		  try {
			d = XULDocument; // We're in XUL, so appending as plain text won't work; trigger an error out of XUL
			echo('<pre xmlns="http://www.w3.org/1999/xhtml" style="white-space:pre;">' + output + '</pre>');
		  } catch (e) {
			echo(output); // Outputting as plain text may work in some plain XML
		  }
		}
		return true;
	  }
	  return output;
  	};
	exports.print_r = print_r;

  	const var_dump = function () {
	var output = '',
		pad_char = ' ',
		pad_val = 4,
		lgth = 0,
		i = 0;

	  var _getFuncName = function(fn) {
		var name = (/\W*function\s+([\w\$]+)\s*\(/)
		  .exec(fn);
		if (!name) {
		  return '(Anonymous)';
		}
		return name[1];
	  };

	  var _repeat_char = function(len, pad_char) {
		var str = '';
		for (var i = 0; i < len; i++) {
		  str += pad_char;
		}
		return str;
	  };
	  var _getInnerVal = function(val, thick_pad) {
		var ret = '';
		if (val === null) {
		  ret = 'NULL';
		} else if (typeof val === 'boolean') {
		  ret = 'bool(' + val + ')';
		} else if (typeof val === 'string') {
		  ret = 'string(' + val.length + ') "' + val + '"';
		} else if (typeof val === 'number') {
		  if (parseFloat(val) == parseInt(val, 10)) {
			ret = 'int(' + val + ')';
		  } else {
			ret = 'float(' + val + ')';
		  }
		}
		// The remaining are not PHP behavior because these values only exist in this exact form in JavaScript
		else if (typeof val === 'undefined') {
		  ret = 'undefined';
		} else if (typeof val === 'function') {
		  var funcLines = val.toString()
			.split('\n');
		  ret = '';
		  for (var i = 0, fll = funcLines.length; i < fll; i++) {
			ret += (i !== 0 ? '\n' + thick_pad : '') + funcLines[i];
		  }
		} else if (val instanceof Date) {
		  ret = 'Date(' + val + ')';
		} else if (val instanceof RegExp) {
		  ret = 'RegExp(' + val + ')';
		} else if (val.nodeName) { // Different than PHP's DOMElement
		  switch (val.nodeType) {
			case 1:
			  if (typeof val.namespaceURI === 'undefined' || val.namespaceURI === 'http://www.w3.org/1999/xhtml') { // Undefined namespace could be plain XML, but namespaceURI not widely supported
				ret = 'HTMLElement("' + val.nodeName + '")';
			  } else {
				ret = 'XML Element("' + val.nodeName + '")';
			  }
			  break;
			case 2:
			  ret = 'ATTRIBUTE_NODE(' + val.nodeName + ')';
			  break;
			case 3:
			  ret = 'TEXT_NODE(' + val.nodeValue + ')';
			  break;
			case 4:
			  ret = 'CDATA_SECTION_NODE(' + val.nodeValue + ')';
			  break;
			case 5:
			  ret = 'ENTITY_REFERENCE_NODE';
			  break;
			case 6:
			  ret = 'ENTITY_NODE';
			  break;
			case 7:
			  ret = 'PROCESSING_INSTRUCTION_NODE(' + val.nodeName + ':' + val.nodeValue + ')';
			  break;
			case 8:
			  ret = 'COMMENT_NODE(' + val.nodeValue + ')';
			  break;
			case 9:
			  ret = 'DOCUMENT_NODE';
			  break;
			case 10:
			  ret = 'DOCUMENT_TYPE_NODE';
			  break;
			case 11:
			  ret = 'DOCUMENT_FRAGMENT_NODE';
			  break;
			case 12:
			  ret = 'NOTATION_NODE';
			  break;
		  }
		}
		return ret;
	  };

	  var _formatArray = function(obj, cur_depth, pad_val, pad_char) {
		var someProp = '';
		if (cur_depth > 0) {
		  cur_depth++;
		}

		var base_pad = _repeat_char(pad_val * (cur_depth - 1), pad_char);
		var thick_pad = _repeat_char(pad_val * (cur_depth + 1), pad_char);
		var str = '';
		var val = '';

		if (typeof obj === 'object' && obj !== null) {
		  if (obj.constructor && _getFuncName(obj.constructor) === 'PHPJS_Resource') {
			return obj.var_dump();
		  }
		  lgth = 0;
		  for (someProp in obj) {
			lgth++;
		  }
		  str += 'array(' + lgth + ') {\n';
		  for (var key in obj) {
			var objVal = obj[key];
			if (typeof objVal === 'object' && objVal !== null && !(objVal instanceof Date) && !(objVal instanceof RegExp) && !
			  objVal.nodeName) {
			  str += thick_pad + '[' + key + '] =>\n' + thick_pad + _formatArray(objVal, cur_depth + 1, pad_val,
				pad_char);
			} else {
			  val = _getInnerVal(objVal, thick_pad);
			  str += thick_pad + '[' + key + '] =>\n' + thick_pad + val + '\n';
			}
		  }
		  str += base_pad + '}\n';
		} else {
		  str = _getInnerVal(obj, thick_pad);
		}
		return str;
	  };

	  output = _formatArray(arguments[0], 0, pad_val, pad_char);
	  for (i = 1; i < arguments.length; i++) {
		output += '\n' + _formatArray(arguments[i], 0, pad_val, pad_char);
	  }

	  echo(output);
  	};
	exports.var_dump = var_dump;

  	const var_export = function (mixed_expression, bool_return) {
	var retstr = '',
		iret = '',
		value,
		cnt = 0,
		x = [],
		i = 0,
		funcParts = [],
		// We use the last argument (not part of PHP) to pass in
		// our indentation level
		idtLevel = arguments[2] || 2,
		innerIndent = '',
		outerIndent = '',
		getFuncName = function(fn) {
		  var name = (/\W*function\s+([\w\$]+)\s*\(/)
			.exec(fn);
		  if (!name) {
			return '(Anonymous)';
		  }
		  return name[1];
		};
	  _makeIndent = function(idtLevel) {
		return (new Array(idtLevel + 1))
		  .join(' ');
	  };
	  __getType = function(inp) {
		var i = 0,
		  match, types, cons, type = typeof inp;
		if (type === 'object' && (inp && inp.constructor) &&
		  getFuncName(inp.constructor) === 'PHPJS_Resource') {
		  return 'resource';
		}
		if (type === 'function') {
		  return 'function';
		}
		if (type === 'object' && !inp) {
		  return 'null'; // Should this be just null?
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
		  for (i = 0; i < types.length; i++) {
			if (cons === types[i]) {
			  type = types[i];
			  break;
			}
		  }
		}
		return type;
	  };
	  type = __getType(mixed_expression);

	  if (type === null) {
		retstr = 'NULL';
	  } else if (type === 'array' || type === 'object') {
		outerIndent = _makeIndent(idtLevel - 2);
		innerIndent = _makeIndent(idtLevel);
		for (i in mixed_expression) {
		  value = var_export(mixed_expression[i], 1, idtLevel + 2);
		  value = typeof value === 'string' ? value.replace(/</g, '&lt;')
			.
		  replace(/>/g, '&gt;') : value;
		  x[cnt++] = innerIndent + i + ' => ' +
			(__getType(mixed_expression[i]) === 'array' ?
			'\n' : '') + value;
		}
		iret = x.join(',\n');
		retstr = outerIndent + 'array (\n' + iret + '\n' + outerIndent + ')';
	  } else if (type === 'function') {
		funcParts = mixed_expression.toString()
		  .
		match(/function .*?\((.*?)\) \{([\s\S]*)\}/);

		// For lambda functions, var_export() outputs such as the following:
		// '\000lambda_1'. Since it will probably not be a common use to
		// expect this (unhelpful) form, we'll use another PHP-exportable
		// construct, create_function() (though dollar signs must be on the
		// variables in JavaScript); if using instead in JavaScript and you
		// are using the namespaced version, note that create_function() will
		// not be available as a global
		retstr = "create_function ('" + funcParts[1] + "', '" +
		  funcParts[2].replace(new RegExp("'", 'g'), "\\'") + "')";
	  } else if (type === 'resource') {
		retstr = 'NULL'; // Resources treated as null for var_export
	  } else {
		retstr = typeof mixed_expression !== 'string' ? mixed_expression :
		  "'" + mixed_expression.replace(/(["'])/g, '\\$1')
		  .
		replace(/\0/g, '\\0') + "'";
	  }

	  if (!bool_return) {
		echo(retstr);
		return null;
	  }

	  return retstr;
  	};
  	exports.var_export = var_export;

})))
