/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-29 15:43
 * @update 2018-10-29 15:43
 */


'use strict';

var validator = require('blear.utils.validator');
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
        string: '字符串',
        number: '数值',
        boolean: '布尔值',
        array: '数组',
        object: '对象',
        'function': '函数',
        mobile: '手机号',
        email: '邮箱',
        numerical: '有效数值',
        digital: '数字',
        integer: '整数',
        url: '网络地址',
        http: '网络地址',
        idNo: '身份证'
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

            case 'mobile':
                if (validator.isMobile(value)) {
                    matched = true;
                }
                break;

            case 'email':
                if (validator.isEmail(value)) {
                    matched = true;
                }
                break;

            case 'numerical':
                if (validator.isNumerical(value)) {
                    matched = true;
                }
                break;

            case 'digital':
                if (validator.isDigital(value)) {
                    matched = true;
                }
                break;

            case 'integer':
                if (validator.isInteger(value)) {
                    matched = true;
                }
                break;

            case 'url':
            case 'http':
                if (validator.isHTTP(value)) {
                    matched = true;
                }
                break;

            case 'idNo':
                if (validator.isIdNo(value)) {
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
    }).join('或') + '格式';
};



