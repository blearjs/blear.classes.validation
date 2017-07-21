/**
 * 数据验证
 * @author ydr.me
 * @create 2016-08-17 10:40
 */


'use strict';


var Events = require('blear.classes.events');
var object = require('blear.utils.object');
var howdo = require('blear.utils.howdo');
var typeis = require('blear.utils.typeis');
var fun = require('blear.utils.function');

var rulesMap = require('./rules-map.js');
var RULES = {};
var emptyUseful = function () {
    return true;
};
var emptyRule = function (value, done) {
    done();
};
var defaults = {
    /**
     * 是否跳过非法验证继续后面的验证
     * @type Boolean
     */
    skipInvalid: false
};
var Validation = Events.extend({
    className: 'Validation',
    constructor: function (options) {
        var the = this;

        the[_options] = object.assign({}, defaults, options);
        Validation.parent(the);
        the[_rules] = {};
        the[_aliases] = {};
        // [{
        //   path: '字段',
        //   alias: '别名',
        //   rules: [fn1, fn2],
        //   useful: true
        // }]
        the[_constrainGroup] = [];
    },


    /**
     * 验证数据
     * @param data {Object} 待验证的数据
     * @param [callback] {Function} 验证回调
     */
    validate: function (data, callback) {
        var the = this;
        var options = the[_options];
        callback = fun.noop(callback);
        var errs = [];

        howdo.each(the[_constrainGroup], function (_1, constrains, nextList) {
            // 不跳过已经非法的字段
            if (!options.skipInvalid && errs.length) {
                return nextList();
            }

            var path = constrains.path;
            var value = data[path];
            // 验证不可用
            constrains.data = data;
            var useful = constrains.useful(value);

            if (!useful) {
                return nextList();
            }

            howdo.each(constrains.rules, function (_2, arr, nextRule) {
                var fn = arr[0];
                var origin = arr[1];
                var item = object.assign({}, origin);

                item.value = value;
                item.data = data;
                item.limit = typeis.Function(origin.limit) ? origin.limit.call(item, data) : item.limit;
                fn.call(item, value, function (message) {
                    if (message) {
                        item.message = item.message || message;
                        errs.push(item);
                        the.emit('invalid', item);
                        return nextRule(1);
                    }

                    nextRule();
                });
            }).follow(function () {
                nextList();
            });
        }).follow(function () {
            callback(errs);
        });
    },


    /**
     * 指定字段
     * @param path {String} 字段
     * @param [alias] {String} 别名
     * @returns {Validation}
     */
    path: function (path, alias) {
        var the = this;
        the[_constrainGroup].push(the[_lastConstrain] = {
            path: the[_path] = path,
            alias: the[_aliases][path] = the[_alias] = alias || path,
            rules: [],
            useful: emptyUseful,
            data: null
        });
        return the;
    },

    /**
     * 约束条件
     * @param rule {String} 规则名称
     * @param limit {*} 规则限制条件
     * @param [message] {String} 超过规则限制的消息
     * @returns {Validation}
     */
    constrain: function (rule, limit, message) {
        var the = this;
        var item = {
            rule: rule,
            path: the[_path],
            alias: the[_alias],
            limit: limit,
            message: message,
            aliases: the[_aliases]
        };

        the[_lastConstrain].rules.push([
            the[_rules][rule] || RULES[rule] || emptyRule,
            item
        ]);

        return the;
    },


    /**
     * 自定义实例级别的验证规则
     * @param name {String} 规则名称
     * @param [fn] {Function} 规则验证方法
     * @returns {Validation}
     */
    rule: function (name, fn) {
        var the = this;

        if (!fn) {
            return the[_rules][name];
        }

        the[_rules][name] = fn;

        return the;
    },

    /**
     * 指定字段约束是否使用
     * @param {Boolean|Function} fn
     */
    useful: function (fn) {
        var the = this;

        if (typeis.Boolean(fn)) {
            fn = function () {
                return fn;
            };
        }

        the[_lastConstrain].useful = fn;
        return the;
    }
});
var _options = Validation.sole();
var _path = Validation.sole();
var _alias = Validation.sole();
var _aliases = Validation.sole();
var _rules = Validation.sole();
var _constrainGroup = Validation.sole();
var _lastConstrain = Validation.sole();
var _usefulList = Validation.sole();

/**
 * 自定义静态级别的验证规则
 * @param name {String} 规则名称
 * @param [fn] {Function} 规则验证方法
 */
Validation.rule = function (name, fn) {
    if (!fn) {
        return RULES[name];
    }

    RULES[name] = fn;
};

object.each(rulesMap, function (name, fn) {
    RULES[name] = fn;
});

Validation.defaults = defaults;
module.exports = Validation;
