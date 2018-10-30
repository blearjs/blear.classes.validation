/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-29 15:43
 * @update 2018-10-29 15:43
 */


'use strict';

var validator = require('blear.utils.validator');

var isEmpty = require('../utils/is-empty');

/**
 * 必填
 * @param value
 * @returns {string}
 */
module.exports = function (value) {
    var context = this;

    if (isEmpty(value)) {
        return '';
    }

    switch (context.limit) {
        case 'mobile':
            return validator.isMobile(value) ? '' : '手机号码不合法';

        case 'email':
            return validator.isEmail(value) ? '' : '邮箱地址不合法';

        case 'numerical':
            return validator.isNumerical(value) ? '' : context.alias + '数值不合法';

        case 'digital':
            return validator.isDigital(value) ? '' : context.alias + '必须是数字';

        case 'integer':
            return validator.isInteger(value) ? '' : context.alias + '必须是整数';

        case 'url':
        case 'http':
            return validator.isHTTP(value) ? null : '网络地址不合法';

        case 'idNo':
            return validator.isIdNo(value) ? null : '身份证号码不合法';
    }
};



