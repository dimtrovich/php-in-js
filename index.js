/*!
 * PHP In JS v1.0.0 (https://github.com/Dimtrov/php-in-js)
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


    /**
     * 
     * @param {*} el
     * @return {Boolean} 
     */
    const is_string = (el) => {
        return typeof el === 'string'
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
        return Array.isArray(el)
    }
    exports.is_string = is_array

    const is_object = (el) => {
        return typeof el === 'object'
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

})))