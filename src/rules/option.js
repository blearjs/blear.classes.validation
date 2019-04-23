/**
 * 选项
 * @author ydr.me
 * @create 2019年04月23日19:40:22
 * @update 2019年04月23日19:40:24
 */


'use strict';

var typeis = require('blear.utils.typeis');
var array = require('blear.utils.array');

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

    var options = context.limit;
    var values = typeis.Array(value) ? value : [value];
    var unmatched = false;

    array.each(values, function (index, value) {
        var found = false;
        array.each(options, function (index, option) {
            if (option === value) {
                found = true;
                return false;
            }
        });

        if (!found) {
            unmatched = true;
            return false;
        }
    });

    if (unmatched) {
        return englishAlias(context.alias, 2) + '必须是“' + options.join('、') + '”中的一个';
    }
};


