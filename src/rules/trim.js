/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-29 15:43
 * @update 2018-10-29 15:43
 */


'use strict';

var typeis = require('blear.utils.typeis');

/**
 * 剔除两端空白
 * @param value
 * @returns {string}
 */
module.exports = function (value) {
    this.value = typeis.String(value) ? value.trim() : value;
};


