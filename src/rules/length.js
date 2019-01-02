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
 * max-length
 * @param value
 * @returns {string | undefined}
 */
module.exports = function (value) {
    var context = this;

    if (isEmpty(value)) {
        return;
    }

    if (value.length !== context.limit) {
        return englishAlias(context.alias, 2) + '必须是 ' + context.limit + ' 个长度';
    }
};


