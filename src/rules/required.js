/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-29 15:43
 * @update 2018-10-29 15:43
 */


'use strict';

var isEmpty = require('../utils/is-empty');

/**
 * 必填
 * @param value
 * @returns {string}
 */
module.exports = function (value) {
    var context = this;
    return context.limit && isEmpty(value) ? context.alias + '不能为空' : '';
};


