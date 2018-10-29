/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Validation = require('../src/index.js');

describe('测试文件', function () {
    it('simple', function (done) {
        var va = new Validation();

        va
            .path('username', '用户名')
            .constrain('minLength', 4)
            .constrain('maxLength', 8);

        va.validate({
            username: '1234567890'
        }, function (err) {
            expect(err.length).toEqual(undefined);
            expect(err.path).toEqual('username');
            expect(err.alias).toEqual('用户名');
            expect(err.rule).toEqual('maxLength');
            expect(err.limit).toEqual(8);
            expect(err.value).toEqual('1234567890');
            console.log(err);
            done();
        });

        va.on('invalid', function (invalid) {
            console.log('invalid', invalid);
        });
    });

    it('skipInvalid: true', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va
            .path('username')
            .constrain('required', true)
            .constrain('minLength', 2)
            .constrain('maxLength', 6)

            .path('password')
            .constrain('required', true)
            .constrain('minLength', 2)
            .constrain('maxLength', 6);

        va.validate({
            username: 'a',
            password: 'b'
        }, function (errs) {
            console.log(errs);
            expect(errs.length).toEqual(2);
            done();
        });
    });

    it('skipInvalid: false', function (done) {
        var va = new Validation({
            skipInvalid: false
        });

        va
            .path('username')
            .constrain('required', true)
            .constrain('minLength', 2)
            .constrain('maxLength', 6)

            .path('password')
            .constrain('required', true)
            .constrain('minLength', 2)
            .constrain('maxLength', 6);

        va.validate({
            username: 'a',
            password: 'b'
        }, function (err) {
            console.log(err);
            expect(err.length).toEqual(undefined);
            done();
        });
    });

    it('custorm rule', function (done) {
        var va = new Validation();

        va.rule('custormRule', function (value, next) {
            setTimeout(function () {
                next('123-456');
            }, 345);
        });
        va.path('abc').constrain('custormRule', true);

        va.validate({abc: '1'}, function (err) {
            console.log(err);
            expect(err.message).toEqual('123-456');
            done();
        });
    }, 100000);

    it('equal', function (done) {
        var va = new Validation();

        va.path('password', '密码').constrain('required', true);
        va.path('password2', '确认密码').constrain('equal', 'password');

        va.validate({
            password: '123',
            password2: ''
        }, function (errs) {
            console.log(errs[0]);
            done();
        });
    });

    it('limit:function', function (done) {
        var va = new Validation();

        va.path('b').constrain('max', function (data) {
            return data.a;
        }, 'b不能大于a');

        va.validate({
            a: 10,
            b: 20
        }, function (errs) {
            console.log(errs[0]);
            done();
        });
    });

    it('message:function', function (done) {
        var va = new Validation();

        va.path('b').constrain('max', function (data) {
            return data.a;
        }, function (data) {
            return 'b 不能大于 ' + data.a;
        });

        va.validate({
            a: 10,
            b: 20
        }, function (errs) {
            console.log(errs[0]);
            done();
        });
    });

    it('rule', function (done) {
        var va = new Validation();

        va.rule('x', function (value, next) {
            if (value === '123') {
                return next();
            }

            next('必须等于 123');
        });

        va.path('a').constrain('x', true);
        va.validate({
            a: '1'
        }, function (err) {
            expect(err.message).toBe('必须等于 123');
            done();
        });
    });

    it('empty rule', function (done) {
        var va = new Validation();
        va.path('a').constrain('-----', true);

        va.validate({a: 1}, function (err) {
            expect(err).toBeFalsy();
            done();
        });
    });

    it('static rule', function (done) {
        var ruleName = 'r' + Date.now();
        var rule = function (value, next) {
            if (/^[a-z][a-z\d]4$/.test(value)) {
                return next();
            }

            next('invalid');
        };

        Validation.rule(ruleName, rule);
        expect(Validation.rule(ruleName)).toBe(rule);

        var va = new Validation();
        va.path('a').constrain(ruleName, true);

        va.validate({
            a: 'a'
        }, function (err) {
            expect(err.message).toBe('invalid');
            done();
        });
    });

    it('get rule', function () {
        var va = new Validation();
        var rule = function (value, next) {
            next();
        };

        va.rule('a', rule);

        expect(va.rule('a')).toBe(rule);
    });

    it('useful - 1', function (done) {
        var va = new Validation();

        va
            .path('a')
            .useful(function (value) {
                return false;
            })
            .constrain('minLength', 2);

        va.validate({
            a: '1'
        }, function (err) {
            expect(err).toBeFalsy();
            done();
        });
    });

    it('useful - 2', function (done) {
        var va = new Validation();

        va
            .path('a')
            .useful(true)
            .constrain('minLength', 2);

        va.validate({
            a: '0'
        }, function (err) {
            expect(err).toBeTruthy();
            done();
        });
    });
});
