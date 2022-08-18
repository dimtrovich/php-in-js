/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 */

import array from './modules/array.js';

import crypto from './modules/crypto.js';
import datetime from './modules/datetime.js';
import fs from './modules/fs.js';
import functions from './modules/functions.js';
import json from './modules/json.js';
import math from './modules/math.js';
import net from './modules/net.js';
import output from './modules/output.js';
import regex from './modules/regex.js';
import string from './modules/string.js';
import types from './modules/types.js';
import url from './modules/url.js';

const modules = {
	array,
	crypto,
	datetime,
	fs,
	functions,
	json,
	math,
	net,
	output,
	regex,
	string,
	types,
	url
};
let pij = {};

for (const key in modules) {
	for (const func in modules[key]) {
		pij[func] = modules[key][func];
	}
}

export default pij;
