/*!
 * PHP In JS v1.0 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 */

const array = require('./modules/array.js');
const crypto = require('./modules/crypto.js');
const datetime = require('./modules/datetime.js');
const fs = require('./modules/fs.js');
const functions = require('./modules/functions.js');
const json = require('./modules/json.js');
const math = require('./modules/math.js');
const net = require('./modules/net.js');
const output = require('./modules/output.js');
const regex = require('./modules/regex.js');
const string = require('./modules/string.js');
const types = require('./modules/types.js');
const url = require('./modules/url.js');

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

module.exports = pij;
