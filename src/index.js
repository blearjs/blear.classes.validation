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
        var lastErrorPath = null;

        howdo.each(the[_ruleGroup], function (_, ruleList, next) {
            // 不跳过已经非法的字段
            if (!options.skipInvalid && errs.length) {
                return next();
            }

            lastErrorPath = null;
            howdo.each(ruleList.rules, function (__, arr, next) {
                var fn = arr[0];
                var item = arr[1];

                // 同一个字段，有一个规则验证非法即跳过
                if (lastErrorPath === item.path) {
                    return next();
                }

                var value = data[item.path];

                item.value = value;
                fn.call(item, value, function (message) {
                    if (message) {
                        lastErrorPath = item.path;
                        item.message = message;
                        errs.push(item);
                        the.emit('invalid', item);
                        return next(1);
                    }

                    next();
                });
            }).follow(next);
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
            name: rule,
            path: the[_path],
            alias: the[_alias],
            limit: limit,
            message: message
        };

        the[_lastRuleList].rules.push([RULES[rule] || emptyRule, item]);

        return the;
    }
});
var _options = Validation.sole();
var _path = Validation.sole();
var _alias = Validation.sole();
var _ruleGroup = Validation.sole();
var _lastRuleList = Validation.sole();

Validation.rule = function (name, fn) {
    RULES[name] = fn;
};

object.each(rulesMap, function (name, fn) {
    RULES[name] = fn;
});

Validation.defaults = defaults;
module.exports = Validation;
