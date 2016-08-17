/**
 * Validation
 * @author zcl
 * @create 2016-05-06 10:50
 */


'use strict';

var Events =  require('blear.classes.events');
var ajax =    require('blear.core.ajax');
var typeis =  require('blear.utils.typeis');
var array =   require('blear.utils.array');
var howdo =   require('blear.utils.howdo');
var object =  require('blear.utils.object');
var string =  require('blear.utils.string');
var access =  require('blear.utils.access');
var lang =    require('blear.utils.lang');


/**
 * 验证错误时返回的提示信息
 */
var defaultMessage = {
    required: '必填项',
    email: '邮箱格式错误',
    url: '网址格式错误',
    date: '无效的日期',
    number: '不是一个数字',
    digits: '不是整数',
    equalTo: '不是相同的数据',
    minlength: function (param) {
        param = Number(param);
        return '最小长度不能低于' + param;
    },
    maxlength: function (param) {
        param = Number(param);
        return '最大长度不能超过' + param;
    },
    rangelength: function (min, max) {
        min = Number(min);
        max = Number(max);
        return '数据长度应该在' + min + '至' + max + '之间';
    },
    min: function (param) {
        return '不能小于' + param;
    },
    max: function (param) {
        return '不能大于' + param;
    },
    range: function (min, max) {
        return '不能小于' + min + '并且不能大于' + max;
    },
    remote: '该帐号已被注册'
};

/**
 * 所有验证规则
 */
var ruleItems = {
    required: function (value, next) {
        value = string.trim(value);
        if (value.length > 0) {
            next(null);
        }
    },
    email: function (value, next) {
        if (lang.isEmail(value)) {
            next(null);
        }
    },
    url: function (value, next) {
        if (lang.isHTTP(value)) {
            next(null);
        }
    },
    date: function (value, next) {
        if (!/Invalid|NaN/.test(new Date(value).toString())) {
            next(null);
        }
        ;
    },
    number: function (value, next) {
        if (lang.isNumber(value)) {
            next(null);
        }
    },
    digits: function (value) {
        if (lang.isInteger(value)) {
            next(null);
        }
    },
    minlength: function (value, min, next) {
        if (value.length >= parseInt(min)) {
            next(null);
        }
        ;
    },
    maxlength: function (value, max, next) {
        if (value.length <= parseInt(max)) {
            next(null);
        }
        ;
    },
    min: function (value, min, next) {
        if (value.length >= min) {
            next(null);
        }
        ;
    },
    max: function (value, max, next) {
        if (value.length <= max) {
            next(null);
        }
        ;
    },
    equalTo: function (value, param, next) {
        if (value === param) {
            next(null);
        }
        ;
    }
}


var Validation = Events.extend({
    className: 'Validation',
    constructor: function (options) {
        var the = this;

        the.Super();
        the[_defaultMessage] = defaultMessage;
        the[_options] = options;
        the[_ruleItems] = ruleItems;
        the[_process] = false;

        the[_resultContainer] = {
            success: true,
            message: '验证成功'
        }

        the[_ruleTasks] = [];
        the[_createTasks]();

        the.on('complete', function () {
            the[_process] = false;
        });
    },


    // validate
    vali: function (data) {
        var the = this;
        the[_valiItem](data);
        return the;
    },

    // va.rule('xx', function (){
    //    ajax(function (data) {
    //       next(data.message);
    //    });
    // })
    rule: function (name, rule) {
        var the = this;
        return access.getSet({
            set: function (name, rule) {
                the[_ruleItems][name] = rule;
            },
            setLength: 2
        }, arguments);
    },

    getResult: function () {
        var the = this;
        return the[_resultContainer];
    },

    getRules: function () {
        return this[_ruleItems];
    },


    message: function (name, message) {
        var the = this;

        return access.getSet({
            set: function (name, message) {
                the[_defaultMessage][name] = message;
            },
            setLength: 2
        }, arguments);
    },

    /**
     * 销毁实例
     */
    destroy: function () {
        var the = this;

        the.resultContainer = null;
        the.Super.destroy();
    }
});

var _defaultMessage = Validation.sole();
var _options = Validation.sole();
var _ruleItems = Validation.sole();
var _resultContainer = Validation.sole();
var _process = Validation.sole();
var _valiItem = Validation.sole();
var _createTasks = Validation.sole();
var _ruleTasks = Validation.sole();
var _valiSuccess = Validation.sole();
var _valiError = Validation.sole();

var pro = Validation.prototype;

/**
 * 循环验证
 * @param value
 * @param rules
 * @returns {{}}
 */
pro[_valiItem] = function (data) {
    var the = this;

    if (the[_process]) {
        return;
    }

    // 优化 state，是否在进行验证
    the[_process] = true;

    if (the.emit('before') === false) {
        the.emit('complete');
        return;
    }

    var validateResult = {};
    howdo
        .each(the[_ruleTasks], function (key, val, next) {
            // 建议修改
            var item = val.rule.split('_');
            var param = [data[val.name]];
            param.push.apply(param, item);
            // val, 6
            param.splice(1, 1);

            var ruleSelect = the[_ruleItems][item[0]];

            if (item[0] !== 'remote') {
                param.push(next)
                validateResult.result = ruleSelect.apply(null, param);

                if (!validateResult.result) {
                    validateResult.rule = item[0];
                    validateResult.param = [];

                    array.each(param, function (i, n) {
                        if (i !== 0) {
                            validateResult.param.push(n);
                        }
                    });

                    the[_valiError](validateResult);

                } else {
                    next(null);
                }
            } else {
                param.push(next);
                ruleSelect.method.apply(the, param);
            }

        })
        .follow(function (err, data) {
            the[_valiSuccess]();
        });
};

pro[_createTasks] = function () {
    var the = this;

    // [{name: 字段, rules: [rule, 'equalTo_'] }]
    object.each(the[_options], function (i, item) {
        object.each(item.rules, function (k, rule) {
            the[_ruleTasks].push({
                name: item.name,
                rule: rule
            })
        })
    });
};

/**
 * 验证成功时处理函数
 */
pro[_valiSuccess] = function () {
    var the = this;

    the[_resultContainer].success = true;
    the.emit('success', the[_resultContainer].message);
    the.emit('complete');
}

/**
 * 验证错误时处理函数
 * @param {Object} validateResult
 */
pro[_valiError] = function (validateResult) {
    var the = this;

    the[_resultContainer].success = false;
    var msg = the[_resultContainer].message = the[_defaultMessage][validateResult.rule];
    if (typeis.Function(msg)) {
        the[_resultContainer].message = msg.apply(null, validateResult.param)
    }

    the.emit('error', the[_resultContainer].message);
    the.emit('complete');
}

Validation.message = function (name, message) {
    defaultMessage[name] = message;
};

Validation.rule = function (name, rule) {
    ruleItems[name] = rule;
};

module.exports = Validation;
