/*!
 * PHP In JS v0.1 (https://github.com/DimitriSitchet/php-in-js)
 * Copyright 2021 Dimtrov Lab's | Dimitri Sitchet Tomkeu
 * Licensed under MIT (https://opensource.org/licences/mit)
 */
(function(global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
        typeof define === 'function' && define.amd ? define(['exports'], factory) :
        (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global = {}));
}(this, (function(exports) {
    'use strict';

    /**
     * ========================================================
     * ------------------ FONCTIONS GLOBALES ------------------
     * ========================================================
     */


    /**
     *
     * @param {*} el
     * @return {Boolean}
     */
    const empty = (el) => {
        if (typeof el === 'undefined' || el === null) {
            return true
        }
        if (is_string(el) && el === '') {
            return true
        }
        if (is_array(el) && !el.length) {
            return true
        }
        if (is_object(el) && el.constructor === Object && !Object.keys(el).length) {
            return true
        }
        return false
    }
    exports.empty = empty

    /**
     *
     * @param {*} el
     * @return {Boolean}
     */
    const is_callable = (el) => {
        return typeof el === 'function'
    }
    exports.is_callable = is_callable

    /**
     *
     * @param {*} el
     * @return {Boolean}
     */
    const is_bool = (el) => {
        if (el === true || el === false || typeof el === 'boolean') {
            return true
        }
        if (toString.call(el) === '[object Boolean]') {
            return true
        }
        if (typeof el === 'object' && el !== null && typeof el.valueOf() === 'boolean') {
            return true
        }
        return false
    }
    exports.is_bool = is_bool

    /**
     *
     * @param {String} prefix
     * @param {Boolean} random
     * @return {String}
     */
    const uniqid = (prefix, random) => {
        if (empty(prefix) || !is_string(prefix)) {
            prefix = ''
        }
        if (empty(random) || !is_bool(random)) {
            random = false
        }
        const sec = Date.now() * 1000 + Math.random() * 1000,
            id = sec.toString(16).replace(/\./g, "").padEnd(14, "0")

        return prefix + id + (!random ? '' : '.' + Math.trunc(Math.random() * 100000000))
    }
    exports.uniqid = uniqid


    /**
     * ========================================================
     * ------------- MANIPULATION DES DATES/HEURES -------------
     * ========================================================
     */


    /**
     *
     * @param {String} format
     * @param {Integer} timestamp
     * @return {String}
     *
     * @credit https://raw.githubusercontent.com/locutusjs/locutus/master/src/php/datetime/date.js
     */
    const date = (format, timestamp) => {
        //   example 1: date('H:m:s \\m \\i\\s \\m\\o\\n\\t\\h', 1062402400)
        //   returns 1: '07:09:40 m is month'
        //   example 2: date('F j, Y, g:i a', 1062462400)
        //   returns 2: 'September 2, 2003, 12:26 am'
        //   example 3: date('Y W o', 1062462400)
        //   returns 3: '2003 36 2003'
        //   example 4: var $x = date('Y m d', (new Date()).getTime() / 1000)
        //   example 4: $x = $x + ''
        //   example 4: var $result = $x.length // 2009 01 09
        //   returns 4: 10
        //   example 5: date('W', 1104534000)
        //   returns 5: '52'
        //   example 6: date('B t', 1104534000)
        //   returns 6: '999 31'
        //   example 7: date('W U', 1293750000.82); // 2010-12-31
        //   returns 7: '52 1293750000'
        //   example 8: date('W', 1293836400); // 2011-01-01
        //   returns 8: '52'
        //   example 9: date('W Y-m-d', 1293974054); // 2011-01-02
        //   returns 9: '52 2011-01-02'
        //        test: skip-1 skip-2 skip-5

        let jsdate, f
            // Keep this here (works, but for code commented-out below for file size reasons)
            // var tal= [];
        const txtWords = [
                'Sun', 'Mon', 'Tues', 'Wednes', 'Thurs', 'Fri', 'Satur',
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ]
            // trailing backslash -> (dropped)
            // a backslash followed by any character (including backslash) -> the character
            // empty string -> empty string
        const formatChr = /\\?(.?)/gi
        const formatChrCb = function(t, s) {
            return f[t] ? f[t]() : s
        }
        const _pad = function(n, c) {
            n = String(n)
            while (n.length < c) {
                n = '0' + n
            }
            return n
        }
        f = {
            // Day
            d: function() {
                // Day of month w/leading 0; 01..31
                return _pad(f.j(), 2)
            },
            D: function() {
                // Shorthand day name; Mon...Sun
                return f.l()
                    .slice(0, 3)
            },
            j: function() {
                // Day of month; 1..31
                return jsdate.getDate()
            },
            l: function() {
                // Full day name; Monday...Sunday
                return txtWords[f.w()] + 'day'
            },
            N: function() {
                // ISO-8601 day of week; 1[Mon]..7[Sun]
                return f.w() || 7
            },
            S: function() {
                // Ordinal suffix for day of month; st, nd, rd, th
                const j = f.j()
                let i = j % 10
                if (i <= 3 && parseInt((j % 100) / 10, 10) === 1) {
                    i = 0
                }
                return ['st', 'nd', 'rd'][i - 1] || 'th'
            },
            w: function() {
                // Day of week; 0[Sun]..6[Sat]
                return jsdate.getDay()
            },
            z: function() {
                // Day of year; 0..365
                const a = new Date(f.Y(), f.n() - 1, f.j())
                const b = new Date(f.Y(), 0, 1)
                return Math.round((a - b) / 864e5)
            },

            // Week
            W: function() {
                // ISO-8601 week number
                const a = new Date(f.Y(), f.n() - 1, f.j() - f.N() + 3)
                const b = new Date(a.getFullYear(), 0, 4)
                return _pad(1 + Math.round((a - b) / 864e5 / 7), 2)
            },

            // Month
            F: function() {
                // Full month name; January...December
                return txtWords[6 + f.n()]
            },
            m: function() {
                // Month w/leading 0; 01...12
                return _pad(f.n(), 2)
            },
            M: function() {
                // Shorthand month name; Jan...Dec
                return f.F()
                    .slice(0, 3)
            },
            n: function() {
                // Month; 1...12
                return jsdate.getMonth() + 1
            },
            t: function() {
                // Days in month; 28...31
                return (new Date(f.Y(), f.n(), 0))
                    .getDate()
            },

            // Year
            L: function() {
                // Is leap year?; 0 or 1
                const j = f.Y()
                return j % 4 === 0 & j % 100 !== 0 | j % 400 === 0
            },
            o: function() {
                // ISO-8601 year
                const n = f.n()
                const W = f.W()
                const Y = f.Y()
                return Y + (n === 12 && W < 9 ? 1 : n === 1 && W > 9 ? -1 : 0)
            },
            Y: function() {
                // Full year; e.g. 1980...2010
                return jsdate.getFullYear()
            },
            y: function() {
                // Last two digits of year; 00...99
                return f.Y()
                    .toString()
                    .slice(-2)
            },

            // Time
            a: function() {
                // am or pm
                return jsdate.getHours() > 11 ? 'pm' : 'am'
            },
            A: function() {
                // AM or PM
                return f.a()
                    .toUpperCase()
            },
            B: function() {
                // Swatch Internet time; 000..999
                const H = jsdate.getUTCHours() * 36e2
                    // Hours
                const i = jsdate.getUTCMinutes() * 60
                    // Minutes
                    // Seconds
                const s = jsdate.getUTCSeconds()
                return _pad(Math.floor((H + i + s + 36e2) / 86.4) % 1e3, 3)
            },
            g: function() {
                // 12-Hours; 1..12
                return f.G() % 12 || 12
            },
            G: function() {
                // 24-Hours; 0..23
                return jsdate.getHours()
            },
            h: function() {
                // 12-Hours w/leading 0; 01..12
                return _pad(f.g(), 2)
            },
            H: function() {
                // 24-Hours w/leading 0; 00..23
                return _pad(f.G(), 2)
            },
            i: function() {
                // Minutes w/leading 0; 00..59
                return _pad(jsdate.getMinutes(), 2)
            },
            s: function() {
                return _pad(jsdate.getSeconds(), 2)
            },
            u: function() {
                return _pad(jsdate.getMilliseconds() * 1000, 6)
            },

            // Timezone
            e: function() {
                throw new Error('Not supported (see source code of date() for timezone on how to add support)')
            },
            I: function() {
                // DST observed?; 0 or 1
                // Compares Jan 1 minus Jan 1 UTC to Jul 1 minus Jul 1 UTC.
                // If they are not equal, then DST is observed.
                const a = new Date(f.Y(), 0)
                    // Jan 1
                const c = Date.UTC(f.Y(), 0)
                    // Jan 1 UTC
                const b = new Date(f.Y(), 6)
                    // Jul 1
                    // Jul 1 UTC
                const d = Date.UTC(f.Y(), 6)
                return ((a - c) !== (b - d)) ? 1 : 0
            },
            O: function() {
                const tzo = jsdate.getTimezoneOffset()
                const a = Math.abs(tzo)
                return (tzo > 0 ? '-' : '+') + _pad(Math.floor(a / 60) * 100 + a % 60, 4)
            },
            P: function() {
                const O = f.O()
                return (O.substr(0, 3) + ':' + O.substr(3, 2))
            },
            T: function() {
                return 'UTC'
            },
            Z: function() {
                return -jsdate.getTimezoneOffset() * 60
            },

            // Full Date/Time
            c: function() {
                return 'Y-m-d\\TH:i:sP'.replace(formatChr, formatChrCb)
            },
            r: function() {
                return 'D, d M Y H:i:s O'.replace(formatChr, formatChrCb)
            },
            U: function() {
                return jsdate / 1000 | 0
            }
        }

        const _date = function(format, timestamp) {
            jsdate = (timestamp === undefined ? new Date() // Not provided
                :
                (timestamp instanceof Date) ? new Date(timestamp) // JS Date()
                :
                new Date(timestamp * 1000) // UNIX timestamp (auto-convert to int)
            )
            return format.replace(formatChr, formatChrCb)
        }

        return _date(format, timestamp)
    }
    exports.date = date

    /**
     *
     * @return {Integer}
     */
    const time = () => {
        return Math.floor(new Date().getTime() / 1000)
    }
    exports.time = time


    /**
     * ========================================================
     * --------- MANIPULATION DE CHAINES DE CARACTERES --------
     * ========================================================
     */


    const chunk_split = (str, length, end) => {
        let temp_string = ''

        for (let i = 0, size = str.length; i < size; i++) {
            temp_string += str[i]
            if ((i + 1) % length == 0) {
                temp_string += end;
            }
        }

        return temp_string;
    }
    exports.chunk_split = chunk_split

    /**
     *
     * @param {*} el
     * @return {Boolean}
     */
    const is_string = (el) => {
        return typeof el === 'string' || el instanceof String
    }
    exports.is_string = is_string

    /**
     *
     * @param {String} str
     * @return {String}
     */
    const lcfirst = (str) => {
        if (is_string(str)) {
            return str[0].toLowerCase() + str.substr(1, str.length)
        }
        return str
    }
    exports.lcfirst = lcfirst

    /**
     *
     * @param {String} str
     * @return {String}
     */
    const lcwords = (str) => {
        if (is_string(str)) {
            let arr = str.split(' ')
            for (let i = 0, size = arr.length; i < size; i++) {
                arr[i] = lcfirst(arr[i])
            }
            return arr.join(' ')
        }
        return str
    }
    exports.lcwords = lcwords

    /**
     *
     * @param {String} str1
     * @param {String} str2
     * @return {Integer}
     */
    const similar_text = (str1, str2) => {
        let seen = {},
            similar_count = 0;

        for (let i = 0, size = str1.length; i < size; i++) {
            if ((str2.indexOf(str1[i]) !== -1 && !(str1[i] in seen)) || str1[i] == ' ') {
                similar_count++
                if (str[i] != '') {
                    seen[str1[i]] = true
                }
            }
        }

        return similar_count
    }
    exports.similar_text = similar_text

    /**
     *
     * @param {String} str
     * @param {Integer} size
     * @param {*} value
     * @return {String}
     */
    const str_pad = (str, size, value) => {
        if (is_string(str)) {
            for (let i = 0; i < size; i++) {
                str += value;
            }
        }
        return str;
    }
    exports.str_pad = str_pad

    /**
     *
     * @param {String} str
     * @return {Integer|null}
     */
    const strlen = (str) => {
        if (is_string(str)) {
            return str.split('').length
        }
        return null
    }
    exports.strlen = strlen

    /**
     *
     * @param {String} str
     * @return {String}
     */
    const strrev = (str) => {
        if (is_string(str)) {
            /*
             * Ancienne version, mais ne marche pas avec les caracteres unicode
             * return str.split('').reverse().join('')
             */

            /**
             * @credit https://github.com/mathiasbynens/esrever
             */
            str = str.replace(/(<%= allExceptCombiningMarks %>)(<%= combiningMarks %>+)/g, ($0, $1, $2) => {
                return strrev($2) + $1;
            }).replace(/([\uD800-\uDBFF])([\uDC00-\uDFFF])/g, '$2$1')

            let result = [],
                index = str.length;

            while (index--) {
                result.push(str.charAt(index));
            }

            return result.join('');
        }
        return str
    }
    exports.strrev = strrev

    /**
     *
     * @param {String} str
     * @return {String}
     */
    const strtolower = (str) => {
        if (is_string(str)) {
            return str.toLowerCase()
        }
        return str
    }
    exports.strtolower = strtolower

    /**
     *
     * @param {String} str
     * @return {String}
     */
    const strtoupper = (str) => {
        if (is_string(str)) {
            return str.toUpperCase()
        }
        return str
    }
    exports.strtoupper = strtoupper

    /**
     *
     * @param {String} str
     * @return {String}
     */
    const ucfirst = (str) => {
        if (is_string(str)) {
            return str[0].toUpperCase() + str.substr(1, str.length)
        }
        return str
    }
    exports.ucfirst = ucfirst

    /**
     *
     * @param {String} str
     * @return {String}
     */
    const ucwords = (str) => {
        if (is_string(str)) {
            let arr = str.split(' ')
            for (let i = 0, size = arr.length; i < size; i++) {
                arr[i] = ucfirst(arr[i])
            }
            return arr.join(' ')
        }
        return str
    }
    exports.ucwords = ucwords


    /**
     * ========================================================
     * ---------------- MANIPULATION DE NOMBRES ----------------
     * ========================================================
     */

    /**
     *
     * @param {*} el
     * @return {Boolean}
     */
    const is_int = (el) => {
        return !isNaN(parseInt(el)) && isFinite(el)
    }
    exports.is_int = is_int

    /**
     *
     * @param {*} el
     * @return {Boolean}
     */
    const is_number = (el) => {
        return !isNaN(parseFloat(el)) && isFinite(el)
    }
    exports.is_number = is_number

    /**
     *
     * @param {Number} min
     * @param {Number} max
     * @return {Integer}
     */
    const rand = (min, max) => {
        const argc = arguments.length
        if (argc === 0) {
            min = 0
            max = 2147483647
        } else if (argc === 1) {
            throw new Error('Warning: rand() expects exactly 2 parameters, 1 given')
        }
        return Math.floor(Math.random() * (max - min + 1)) + min
    }
    exports.rand = rand


    /**
     * ========================================================
     * --------------- MANIPULATION DE TABLEAUX ---------------
     * ========================================================
     */

    /**
     *
     * @param {Array} arr
     * @param {Integer} count
     * @return {Array}
     */
    const array_chunk = (arr, count) => {
        let temp_arr = []

        for (let i = 0, size = arr.length; i < size;) {
            let chunk_arr = []
            for (let j = 0; j < count; j++) {
                if (!arr[i]) {
                    break
                }
                chunk_arr.push(arr[i])
                i++;
            }
            temp_arr.push(chunk_arr)
        }

        return temp_arr
    }
    exports.array_chunk = array_chunk

    /**
     *
     * @param  {...Array} arrays
     * @returns
     */
    const array_collapse = (...arrays) => {
        let collapse_arr = []

        for (let i = 0, size = arrays.length; i < size; i++) {
            for (let j = 0, taille = arrays[i].length; j < taille; j++) {
                collapse_arr.push(arrays[i][j])
            }
        }

        return collapse_arr
    }
    exports.array_collapse = array_collapse

    /**
     *
     * @param {Array} arr1
     * @param {Array} arr2
     * @return {Array}
     */
    const array_diff = (arr1, arr2) => {
        let temp_arr = []
        for (let i = 0, size = arr1.length; i < size; i++) {
            if (arr2.indexOf(arr1[i]) == -1) {
                temp_arr.push(arr1[i])
            }
        }

        return temp_arr
    }
    exports.array_diff = array_diff

    /**
     *
     * @param {Array} arr1
     * @param {Array} arr2
     * @return {Array}
     */
    const array_intersect = (arr1, arr2) => {
        let temp_arr = []
        for (let i = 0, size = arr1.length; i < size; i++) {
            if (arr2.indexOf(arr1[i]) != -1) {
                temp_arr.push(arr1[i])
            }
        }

        return temp_arr
    }
    exports.array_intersect = array_intersect

    /**
     *
     * @param {Array} arr
     * @param {Callable} func
     * @return {Array}
     */
    const array_map = (arr, func) => {
        let temp_arr = []

        if (typeof func !== "function") {
            throw "Second parameter should be a function"
        }
        for (let i = 0, size = arr.length; i < size; i++) {
            temp_arr.push(func(arr[i]))
        }

        return temp_arr
    }
    exports.array_map = array_map

    /**
     *
     * @param {...Array}
     * @return {Array}
     */
    const array_merge = (...arrays) => {
        let args = Array.prototype.slice.call(arguments),
            tab = []

        for (let i = 0, size = arrays.length; i < size; i++) {
            if (is_array(arrays[i])) {
                tab = [...tab, ...arrays[i]]
            }
        }

        return tab
    }
    exports.array_merge = array_merge

    /**
     *
     * @param {Array} arr
     * @param {Integer} size
     * @param {*} value
     * @return {Array}
     */
    const array_pad = (arr, size, value) => {
        if (!is_array(arr)) {
            return arr
        }
        for (let i = 0; i < size; i++) {
            arr.push(value)
        }
        return arr
    }
    exports.array_pad = array_pad

    /**
     *
     * @param {Array} arr
     * @return {Array}
     */
    const array_pop = (arr) => {
        let elt = null
        if (is_array(arr)) {
            elt = arr.pop()
        }

        return elt ? [elt, arr] : [arr]
    }
    exports.array_pop = array_pop

    /**
     *
     * @param {Array} arr
     * @param {*} val
     * @return {Array}
     */
    const array_push = (arr, val) => {
        let args = Array.prototype.slice.call(arguments);
        arr = args.shift()

        if (is_array(arr)) {
            arr.push(...args)
        }
        return arr
    }
    exports.array_push = array_push

    /**
     * @param {Array} array
     * @param {Number} num
     * @return
     */
    const array_rand = (array, num) => {
        let keys = Object.keys(array)
        if (typeof num === 'undefined' || num === null) {
            num = 1
        } else {
            num = +num
        }
        if (isNaN(num) || num < 1 || num > keys.length) {
            return null
        }

        keys = array_suffle(keys)

        return num === 1 ? keys[0] : keys.slice(0, num)
    }
    exports.array_rand = array_rand

    /**
     *
     * @param {Array} arr
     * @param {Callable} func
     * @return {Array}
     */
    const array_reject = (arr, func) => {
        let temp_arr = []
        if (typeof func !== "function") {
            throw "Second parameter should be a function"
        }

        for (let i = 0, size = arr.length; i < size; i++) {
            if (func(arr[i])) {
                temp_arr.push(arr[i])
            }
        }

        return temp_arr;
    }
    exports.array_reject = array_reject

    /**
     *
     * @param {Array} arr
     * @return {Array}
     */
    const array_shift = (arr) => {
        let elt = null
        if (is_array(arr)) {
            elt = arr.shift()
        }

        return elt ? [elt, arr] : [arr]
    }
    exports.array_shift = array_shift

    const array_slice = (arr, offst, lgth, preserveKeys) => {
        let key = ''
        if (Object.prototype.toString.call(arr) !== '[object Array]' || (preserveKeys && offst !== 0)) {
            // Assoc. array as input or if required as output
            let lgt = 0
            const newAssoc = {}
            for (key in arr) {
                lgt += 1
                newAssoc[key] = arr[key]
            }
            arr = newAssoc
            offst = (offst < 0) ? lgt + offst : offst
            lgth = lgth === undefined ? lgt : (lgth < 0) ? lgt + lgth - offst : lgth
            const assoc = {}
            let start = false
            let it = -1
            let arrlgth = 0
            let noPkIdx = 0
            for (key in arr) {
                ++it
                if (arrlgth >= lgth) {
                    break
                }
                if (it === offst) {
                    start = true
                }
                if (!start) {
                    continue
                }
                ++arrlgth
                if (is_int(key) && !preserveKeys) {
                    assoc[noPkIdx++] = arr[key]
                }
                else {
                    assoc[key] = arr[key]
                }
            }
            // Make as array-like object (though length will not be dynamic)
            // assoc.length = arrlgth;
            return assoc
        }
        if (lgth === undefined) {
            return arr.slice(offst)
        }
        else if (lgth >= 0) {
            return arr.slice(offst, offst + lgth)
        }
        else {
            return arr.slice(offst, lgth)
        }
    }
    exports.array_slice = array_slice

    /**
     *
     * @param {Array} arr
     * @param {Integer} count
     * @return {Array}
     */
    const array_split = (arr, count) => {
        let temp_arr = [],
            arr_length = arr.length,
            chunk = Math.floor(arr_length / count)

        for (let i = 0, size = arr.length; i < size;) {
            let chunk_arr = []

            if (temp_arr.length == (count - 1)) {
                chunk = chunk + (arr_length - i)
            }

            for (let j = 0; j < chunk; j++) {
                if (!arr[i]) {
                    break
                }
                chunk_arr.push(arr[i])
                i++
            }

            temp_arr.push(chunk_arr)
        }

        return temp_arr
    }
    exports.array_split = array_split

    /**
     *
     * @param {Array} arr
     * @return {Array}
     */
    const array_suffle = (arr) => {
        if (is_array(arr)) {
            for (let i = arr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1)),
                    tmp = arr[i]

                arr[i] = arr[j];
                arr[j] = tmp;
            }
        }
        return arr
    }
    exports.array_suffle = array_suffle

    /**
     *
     * @param {Array} arr
     * @param {Integer} count
     * @return {Array}
     */
    const array_take = (arr, count) => {
        let temp_arr = []

        if (count < 0) {
            count = Math.abs(count)
            for (let size = arr.length, i = (size - count); i < size; i++) {
                temp_arr.push(arr[i])
            }
        } else {
            for (let i = 0; i < count; i++) {
                temp_arr.push(arr[i])
            }
        }

        return temp_arr
    }
    exports.array_take = array_take

    /**
     *
     * @param {Array} arr
     * @return {Array}
     */
    const array_unique = (arr) => {
        let seen = {},
            ret_arr = [],
            key,
            i;

        function keyify(obj) {
            let ret = '',
                j;

            if (Object.prototype.toString.call(obj) === "[object Object]" || Object.prototype.toString.call(obj) === "[object Array]") {
                for (j in obj) {
                    ret += "~" + j + "^" + keyify(obj[j]) + "%"
                }
                return ret
            }
            return obj
        }

        for (i = 0; i < arr.length; i++) {
            key = keyify(arr[i])
            if (!(key in seen)) {
                ret_arr.push(arr[i])
                seen[key] = true
            }
        }

        return ret_arr
    }
    exports.array_unique = array_unique

    /**
     *
     * @param {Array} arr
     * @param {*} val
     * @return {Array}
     */
    const array_unshift = (arr, val) => {
        let args = Array.prototype.slice.call(arguments);
        arr = args.shift()

        if (is_array(arr)) {
            arr.unshift(...args)
        }
        return arr
    }
    exports.array_unshift = array_unshift

    /**
     *
     * @param {Array} arr
     * @return {Integer|null}
     */
    const count = (arr) => {
        if (is_array(arr)) {
            return arr.length
        }
        return null
    }
    exports.count = count

    /**
     *
     * @param {String} delimiter
     * @param {String} str
     * @return {Array}
     */
    const explode = (delimiter, str) => {
        if (is_string(str)) {
            return str.split(delimiter)
        }
        return []
    }
    exports.explode = explode

    /**
     *
     * @param {String} delimiter
     * @param {Array} arr
     * @return {String}
     */
    const implode = (delimiter, arr) => {
        if (is_array(arr)) {
            return arr.join(delimiter)
        }
        return ''
    }
    exports.implode = implode

    /**
     *
     * @param {*} el
     * @param {Array} arr
     * @return {Boolean}
     */
    const in_array = (el, arr) => {
        if (is_array(arr)) {
            return arr.indexOf(el) !== -1
        }
        return false
    }
    exports.in_array = in_array

    /**
     *
     * @param {*} el
     * @return {Boolean}
     */
    const is_array = (el) => {
        return Array.isArray(el) || el instanceof Array
    }
    exports.is_array = is_array

    const is_object = (el) => {
        return typeof el === 'object' || el instanceof Object
    }
    exports.is_object = is_object

    /**
     *
     * @param {*} data
     * @return {String}
     */
    const json_encode = (data) => {
        return JSON.stringify(data)
    }
    exports.json_encode = json_encode

    /**
     *
     * @param {String} str
     * @return {Object}
     */
    const json_decode = (str) => {
        if (is_string(str)) {
            return JSON.parse(str)
        }
        return str
    }
    exports.json_decode = json_decode

    /**
     * Creates an array containing a range of values.
     *
     * @param   {Number|String} low The starting value for the range.
     * @param   {Number|String} high The ending value for the range.
     * @param   {Number} [step] If provided, <code>step</code> will be the increment between values in the range.
     *          If not provided, <code>step</code> defaults to 1. <code>step</code> will be converted to a positive number.
     * @return  {Array} Returns an array of values between <code>low</code> and <code>high</code>.
     *                  If <code>low</code> is greater than <code>high</code>, the range will be
     *                  from <code>high</code> to <code>low</code>. The range will include the values
     *                  represented by <code>low</code> and <code>high</code>.
     * @credit https://gist.github.com/mzabriskie/6513968
     */
    const range = (low, high, step) => {
        let range = [],
            start, end,
            charCode = false,
            reverse = false

        // If no step was provided default to 1
        step = isNaN(parseInt(step, 10)) ? 1 : Math.abs(step);

        // If either low or high is a number, then both low and high must be numbers
        if (!isNaN(parseInt(low, 10)) && isNaN(parseInt(high, 10))) {
            high = 0
        } else if (!isNaN(parseInt(high, 10)) && isNaN(parseInt(low, 10))) {
            low = 0
        }

        // If both low and high are numbers then create a numeric range
        if (!isNaN(parseInt(low, 10)) && !isNaN(parseInt(high, 10))) {
            low = parseInt(low, 10)
            high = parseInt(high, 10)
        }
        // If both low and high are strings then create a character range
        else if (typeof low === 'string' && typeof high === 'string') {
            low = low.charCodeAt(0)
            high = high.charCodeAt(0)
            charCode = true
        }

        // If low and high range values were able to be parsed, create the range
        if (typeof low === 'number' && typeof high === 'number') {
            // Range will need to be reversed if low is greater than high
            reverse = low > high

            // Calculate the start and end points of the range
            start = Math.min(low, high)
            end = Math.max(low, high)

            // Verify that step is within the bounds of the range
            if (end - start > 0 && step > end - start) {
                throw new Error('step exceeds the specified range')
            }

            // Generate the range
            for (let i = start; i <= end; i += step) {
                range[range.length] = charCode ? String.fromCharCode(i) : i
            }

            // Reverse the range if needed
            if (reverse) {
                range.reverse()
            }
        }

        // Return the range
        return range;
    }
    exports.range = range


    /**
     * ========================================================
     * --------------- EXPRESSIONS REGULIERES -----------------
     * ========================================================
     */

    /**
     *
     * @param {*} regex
     * @param {String} str
     * @return {Boolean}
     */
    const preg_match = (regex, str) => { // eslint-disable-line camelcase
        //   original by: Muhammad Humayun (https://github.com/ronypt)
        return (new RegExp(regex).test(str))
    }
    exports.preg_match = preg_match

    /**
     *
     * @param {*} pattern
     * @param {String} replacement
     * @param {String} string
     * @return {String}
     */
    const preg_replace = (pattern, replacement, string) => { // eslint-disable-line camelcase
        //   original by: rony2k6 (https://github.com/rony2k6)

        let _flag = pattern.substr(pattern.lastIndexOf(pattern[0]) + 1)
        _flag = (_flag !== '') ? _flag : 'g'

        const _pattern = pattern.substr(1, pattern.lastIndexOf(pattern[0]) - 1),
            regex = new RegExp(_pattern, _flag),
            result = string.replace(regex, replacement)

        return result
    }
    exports.preg_replace = preg_replace

})))
