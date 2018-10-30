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
 * pattern
 * @param value
 * @returns {string | undefined}
 */
module.exports = function (value) {
    var context = this;

    if (isEmpty(value)) {
        return;
    }

    if (!context.limit.test(value)) {
        return englishAlias(context.alias, 2) + '不合法';
    }
};


