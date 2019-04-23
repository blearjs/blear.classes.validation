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
 * 格式
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
        mobile: '手机号格式',
        email: '邮箱格式',
        numerical: '有效数值格式',
        digital: '数字格式',
        integer: '整数格式',
        url: '网络地址格式',
        http: '网络地址格式',
        idNo: '身份证格式'
    };

    var matched = false;
    array.each(limits, function (index, limit) {
        switch (limit) {
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
    }).join('或');
};



