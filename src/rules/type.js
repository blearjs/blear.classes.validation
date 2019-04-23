/**
 * 类型
 * @author ydr.me
 * @create 2018-10-29 15:43
 * @update 2018-10-29 15:43
 */


'use strict';

// var validator = require('blear.utils.validator');
var typeis = require('blear.utils.typeis');
var array = require('blear.utils.array');

var englishAlias = require('../utils/english-alias');
var isEmpty = require('../utils/is-empty');

/**
 * 必填
 * @param value
 * @returns {string | undefined}
 */
module.exports = function (value) {
    var context = this;

    if (isEmpty(value)) {
        return;
    }

    var alias = context.alias;
    var limit = context.limit;
    var limits = typeis.Array(limit) ? limit : [limit];
    var limitMap = {
        string: '字符串类型',
        number: '数值类型',
        boolean: '布尔值类型',
        array: '数组类型',
        object: '对象类型',
        'function': '函数类型'
    };

    var matched = false;
    array.each(limits, function (index, limit) {
        switch (limit) {
            case 'string':
                if (typeis.String(value)) {
                    matched = true;
                }
                break;

            case 'number':
                if (typeis.Number(value)) {
                    matched = true;
                }
                break;

            case 'boolean':
                if (typeis.Boolean(value)) {
                    matched = true;
                }
                break;

            case 'array':
                if (typeis.Array(value)) {
                    matched = true;
                }
                break;

            case 'object':
                if (typeis.Object(value)) {
                    matched = true;
                }
                break;

            case 'function':
                if (typeis.Function(value)) {
                    matched = true;
                }
                break;

            default:
                matched = true;
                break;
        }

        if (matched) {
            return false;
        }
    });

    if (matched === true) {
        return;
    }

    return englishAlias(alias, 2) + '必须是' + array.map(limits, function (limit) {
        return limitMap[limit];
    }).join('或');
};



