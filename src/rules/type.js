/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-29 15:43
 * @update 2018-10-29 15:43
 */


'use strict';

var validator = require('blear.utils.validator');
var typeis = require('blear.utils.typeis');

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

    switch (context.limit) {
        case 'string':
            return typeis.String(value) ? '' : englishAlias(alias, 2) + '必须是字符串格式';

        case 'number':
            return typeis.Number(value) ? '' : englishAlias(alias, 2) + '必须是数值格式';

        case 'boolean':
            return typeis.Boolean(value) ? '' : englishAlias(alias, 2) + '必须是布尔值格式';

        case 'array':
            return typeis.Array(value) ? '' : englishAlias(alias, 2) + '必须是数组格式';

        case 'object':
            return typeis.Object(value) ? '' : englishAlias(alias, 2) + '必须是对象格式';

        case 'function':
            return typeis.Function(value) ? '' : englishAlias(alias, 2) + '必须是函数格式';

        case 'mobile':
            return validator.isMobile(value) ? '' : '手机号码不合法';

        case 'email':
            return validator.isEmail(value) ? '' : '邮箱地址不合法';

        case 'numerical':
            return validator.isNumerical(value) ? '' : englishAlias(alias, 2) + '数值不合法';

        case 'digital':
            return validator.isDigital(value) ? '' : englishAlias(alias, 2) + '必须是数字';

        case 'integer':
            return validator.isInteger(value) ? '' : englishAlias(alias, 2) + '必须是整数';

        case 'url':
        case 'http':
            return validator.isHTTP(value) ? null : '网络地址不合法';

        case 'idNo':
            return validator.isIdNo(value) ? null : '身份证号码不合法';
    }
};



