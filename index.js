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
     * @param {String} string 
     * @param {Integer} size 
     * @param {*} value 
     * @return {String} 
     */
    const str_pad = (string, size, value) => {
        for (let i = 0; i < size; i++) {
            string += value;
        }

        return string;
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
        return str.split('').reverse().join('')
    }
    exports.strrev = strrev

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

    const range = (start, end) => {
        let temp_arr = []

        for (let i = start; i <= end; i++) {
            temp_arr.push(i)
        }

        return temp_arr
    }
    exports.range = range

})))