/**
 * 数据验证
 * @author ydr.me
 * @create 2016-08-17 10:40
 */


'use strict';


var Events = require('blear.classes.events');
var object = require('blear.utils.object');
var howdo = require('blear.utils.howdo');
var fun = require('blear.utils.function');

var rulesMap = require('./rules-map.js');
var RULES = {};
var emptyRule = function (value, done) {
    done();
};
var defaults = {
    /**
     * 是否跳过非法验证继续后面的验证
     * @type Boolean
     */
    skipInvalid: true
};
var Validation = Events.extend({
    className: 'Validation',
    constructor: function (options) {
        var the = this;

        the[_options] = object.assign({}, defaults, options);
        Validation.parent(the);
        the[_rules] = {};
        // [{
        //   path: '字段',
        //   rules: [fn1, fn2]
        // }]
        the[_ruleGroup] = [];
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

        howdo.each(the[_ruleGroup], function (_1, ruleList, nextList) {
            // 不跳过已经非法的字段
            if (!options.skipInvalid && errs.length) {
                return nextList();
            }

            howdo.each(ruleList.rules, function (_2, arr, nextRule) {
                var fn = arr[0];
                var item = object.assign({}, arr[1]);
                var value = data[item.path];

                item.value = value;
                item.data = data;
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
        the[_ruleGroup].push(the[_lastRuleList] = {
            path: the[_path] = path,
            alias: the[_alias] = alias || path,
            rules: []
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
            message: message
        };

        the[_lastRuleList].rules.push([
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
    }
});
var _options = Validation.sole();
var _path = Validation.sole();
var _alias = Validation.sole();
var _rules = Validation.sole();
var _ruleGroup = Validation.sole();
var _lastRuleList = Validation.sole();

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
