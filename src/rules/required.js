/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-29 15:43
 * @update 2018-10-29 15:43
 */


'use strict';

var englishAlias = require('../utils/english-alias');
var isEmpty = require('../utils/is-empty');

/**
 * 必填
 * @param value
 * @returns {string}
 */
module.exports = function (value) {
    var context = this;

    if (context.limit && isEmpty(value)) {
        return englishAlias(context.alias, 2) + '不能为空';
    }
};


