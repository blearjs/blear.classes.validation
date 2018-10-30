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
 * max
 * @param value
 * @returns {string | undefined}
 */
module.exports = function (value) {
    var context = this;

    if (isEmpty(value)) {
        return;
    }

    var equalName = context.limit;
    if (value !== context.data[equalName]) {
        return englishAlias(context.alias, 2) + '必须与' +
            englishAlias(context.aliases[equalName], 3) + '相同';
    }
};


