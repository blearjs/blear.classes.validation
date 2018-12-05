/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-29 15:44
 * @update 2018-10-29 15:44
 */


'use strict';

var typeis = require('blear.utils.typeis');
var object = require('blear.utils.object');

/**
 * 判断是否为空
 * @param value
 * @returns {boolean}
 */
module.exports = function (value) {
    if (value === undefined || value === null) {
        return true;
    }

    if (typeis.Array(value) || typeis.String(value)) {
        return value.length === 0;
    }

    if (typeis.Object(value)) {
        return object.keys(value).length === 0;
    }

    return false;
};


