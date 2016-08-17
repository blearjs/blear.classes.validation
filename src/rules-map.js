/**
 * 验证规则
 * @author ydr.me
 * @create 2016-08-17 14:59
 */


'use strict';

var validator = require('blear.utils.validator');

exports.required = function (value, next) {
    var item = this;

    if (value.length === 0 && item.limit !== false) {
        return next(item.message || item.alias + '不能为空');
    }

    next();
};

exports.type = function (value, next) {
    var item = this;

    switch (item.limit) {
        case 'mobile':
            return next(validator.isMobile(value) ? '手机号码不合法' : null);

        case 'email':
            return next(validator.isEmail(value) ? '邮箱地址不合法' : null);

        case 'number':
            return next(validator.isNumber(value) ? item.alias + '数值不合法' : null);

        case 'integer':
            return next(validator.isInteger(value) ? item.alias + '必须为整数' : null);

        case 'url':
        case 'http':
            return next(validator.isHTTP(value) ? '网络地址不合法' : null);

        default:
            next();
    }
};

exports.min = function (value, next) {
    var item = this;

    if (value < item.limit) {
        return next(item.message || item.alias + '不能小于' + item.limit);
    }

    next();
};

exports.max = function (value, next) {
    var item = this;

    if (value > item.limit) {
        return next(item.message || item.alias + '不能大于' + item.limit);
    }

    next();
};

exports.minLength = function (value, next) {
    var item = this;

    if (value.length < item.limit) {
        return next(item.message || item.alias + '长度不能小于' + item.limit);
    }

    next();
};

exports.maxLength = function (value, next) {
    var item = this;

    if (value.length > item.limit) {
        return next(item.message || item.alias + '长度不能大于' + item.limit);
    }

    next();
};


