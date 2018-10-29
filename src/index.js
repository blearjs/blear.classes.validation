/**
 * 数据验证
 * @author ydr.me
 * @create 2016-08-17 10:40
 */


'use strict';


var Events = require('blear.classes.events');
var object = require('blear.utils.object');
var plan = require('blear.utils.plan');
var typeis = require('blear.utils.typeis');
var fun = require('blear.utils.function');
var access = require('blear.utils.access');

var defaults = {
    /**
     * 是否跳过非法验证继续后面的验证
     * true：出错继续验证后面的数据（可能会有多个错误结果）
     * false：出错就不再继续验证（最多只可能一个错误结果）
     * @type Boolean
     */
    skipInvalid: false
};
var staticRules = {};
var Validation = Events.extend({
    className: 'Validation',

    /**
     * 实例化
     * @param [options]
     */
    constructor: function (options) {
        var the = this;

        the[_options] = object.assign({}, defaults, options);
        the[_fields] = [];
        the[_aliases] = {};
        the[_instanceRules] = object.assign({}, staticRules);
    },

    /**
     * 定义验证字段
     * @todo 嵌套验证
     * @param name
     * @param alias
     * @returns {Validation}
     */
    field: function (name, alias) {
        var the = this;

        if (the[_currentField]) {
            the[_fields].push(the[_currentField]);
        }

        the[_currentField] = the[_buildField](name, alias);
        return the;
    },

    /**
     * 设置字段是否有效
     * @param useful
     * @returns {Validation}
     */
    useful: function (useful) {
        var the = this;
        the[_currentField].useful = typeis.Function(useful) ? useful : function () {
            return Boolean(useful);
        };
        return the;
    },

    /**
     * 自定义实例级别规则
     * @param rule {string} 规则名称
     * @param [validator] {function} 规则函数
     * @returns {Validation}
     */
    rule: function (rule, validator) {
        var the = this;

        if (!validator) {
            return the[_instanceRules][rule];
        }

        the[_instanceRules][rule] = validator;
        return the;
    },

    /**
     * 限制
     * @param rule {string|function} 限制（静态、实例）规则，或函数
     * @param limit {*} 规则限制条件
     * @param [message] {string} 超过规则限制的消息
     * @returns {Validation}
     */
    constrain: function (rule, limit, message) {
        var the = this;
        the[_currentField].constraints.push(
            the[_buildConstraint](rule, limit, message)
        );
        return the;
    },

    /**
     * 字段类型
     * @returns {Validation}
     */
    trim: function () {
        return this.constrain('trim', true);
    },

    /**
     * 字段类型
     * @param type {string} 类型
     * @param [message] {string} 消息
     * @returns {Validation}
     */
    type: function (type, message) {
        return this.constrain('type', type, message);
    },

    /**
     * 字段类型
     * @param [message] {string} 消息
     * @returns {Validation}
     */
    required: function (message) {
        return this.constrain('required', true, message);
    },

    /**
     * 字段类型
     * @param minLength {number} 最小长度
     * @param [message] {string} 消息
     * @returns {Validation}
     */
    minLength: function (minLength, message) {
        return this.constrain('minLength', minLength, message);
    },

    /**
     * 字段类型
     * @param maxLength {number} 最大长度
     * @param [message] {string} 消息
     * @returns {Validation}
     */
    maxLength: function (maxLength, message) {
        return this.constrain('maxLength', maxLength, message);
    },

    /**
     * 字段类型
     * @param min {number} 最小值
     * @param [message] {string} 消息
     * @returns {Validation}
     */
    min: function (min, message) {
        return this.constrain('min', min, message);
    },

    /**
     * 字段类型
     * @param max {number} 最大值
     * @param [message] {string} 消息
     * @returns {Validation}
     */
    max: function (max, message) {
        return this.constrain('max', max, message);
    },

    /**
     * 字段类型
     * @param field {string} 字段
     * @param [message] {string} 消息
     * @returns {Validation}
     */
    equal: function (field, message) {
        return this.constrain('equal', field, message);
    },

    /**
     * 字段类型
     * @param pattern {regexp} 正则表达式
     * @param [message] {string} 消息
     * @returns {Validation}
     */
    pattern: function (pattern, message) {
        return this.constrain('pattern', pattern, message);
    },

    /**
     * 表单验证
     * @param data
     * @param callback
     */
    validate: function (data, callback) {
        var the = this;
        var errs = [];
        var skipInvalid = the[_options].skipInvalid;

        if (the[_currentField]) {
            the[_fields].push(the[_currentField]);
            the[_currentField] = null;
        }

        plan
            .each(the[_fields], function (index, field, next) {
                var build = the[_buildContext](field, data);
                plan
                    .each(field.constraints, function (index, constraint, next) {
                        var context = build(constraint);
                        the[_execValidate](context, constraint, function (err) {
                            if (!err) {
                                return next();
                            }

                            errs.push(err);

                            if (skipInvalid) {
                                return next();
                            }

                            next(1);
                        });
                    })
                    .serial(next);
            })
            .serial(function (err) {
                if (skipInvalid) {
                    return callback(errs, data);
                }

                callback(errs[0], data);
            });
    }
});
var sole = Validation.sole;
var _options = sole();
var _fields = sole();
var _instanceRules = sole();
var _currentField = sole();
var _aliases = sole();
var _buildField = sole();
var _buildConstraint = sole();
var _buildContext = sole();
var _execValidate = sole();
var proto = Validation.prototype;

/**
 * 自定义静态规则
 * @param rule {string} 规则名称
 * @param [validator] {function} 规则函数
 */
Validation.rule = function (rule, validator) {
    if (!validator) {
        return staticRules[rule];
    }

    staticRules[rule] = validator;
};

staticRules.trim = require('./rules/trim');
staticRules.type = require('./rules/type');
staticRules.required = require('./rules/required');

module.exports = Validation;

// ======================================================
// ======================================================
// ======================================================

/**
 * 构建字段
 * @param name
 * @param alias
 * @returns {{name: *, alias: *, useful: (function(): boolean), constraints: Array}}
 */
proto[_buildField] = function (name, alias) {
    var the = this;

    return {
        name: name,
        alias: the[_aliases][name] = alias || name,
        useful: function () {
            return true;
        },
        constraints: []
    };
};

/**
 * 构建验证器
 * @param rule
 * @param limit
 * @param message
 * @returns {{rule: *, validator: *, limit: *, message: *}}
 */
proto[_buildConstraint] = function (rule, limit, message) {
    var the = this;
    var args = access.args(arguments);
    var validator;

    if (typeis.Function(args[0])) {
        validator = args[0];
    } else {
        validator = the[_instanceRules][args[0]];
    }

    validator = validator || function () {
        return true;
    };

    return {
        rule: rule,
        validator: validator,
        limit: limit,
        message: message
    };
};

/**
 * 执行验证
 * @param context
 * @param constraint
 * @param callback
 */
proto[_execValidate] = function (context, constraint, callback) {
    var errWith = function (err) {
        context.message = err.message;
        err.validation = context;
        return err;
    };
    var next = function (message) {
        if (message === true) {
            return callback();
        }

        if (message === false) {
            return callback(errWith(new Error(context.message)));
        }

        if (message instanceof Error) {
            return callback(errWith(message));
        }

        message = message && message.message || message;

        if (typeis.String(message) && message) {
            return callback(errWith(new Error(message)));
        }

        callback();
    };
    var validator = constraint.validator;

    if (validator.length >= 2) {
        validator.call(context, context.value, next);
    } else {
        next(validator.call(context, context.value));
    }
};

/**
 * 构建上下文
 * @param field
 * @param field.name
 * @param field.alias
 * @param data
 * @returns {function(*): {name: (Validation.field|(function(*=, *=): Validation)|*), alias: *, value: *}}
 */
proto[_buildContext] = function (field, data) {
    var the = this;
    var name = field.name;
    var context = {
        name: name,
        aliases: the[_aliases],
        alias: field.alias,
        value: data[name],
        data: data
    };

    /**
     * 构建上下文
     * @param constraint
     * @param constraint.limit
     * @param constraint.message
     * @param constraint.rule
     */
    return function (constraint) {
        context.limit = constraint.limit;
        context.message = constraint.message;
        context.rule = constraint.rule;
        return context;
    }
};
