/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Validation = require('../../src/index.js');

describe('#enable', function () {

    it('(bool)', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').enable(true).required();
        va.field('b').enable(false).required();

        va.validate({}, function (errs) {
            expect(errs.length).toBe(1);
            done();
        });
    });

    it('(fn(value))', function (done) {
        var va = new Validation();

        va.field('username', '用户名')
            .constrain('required', true)
            .enable(function (value) {
                expect(this.options.skipInvalid).toBe(false);
                expect(this.data).toBe(data);
                expect(this.alias).toBe('用户名');
                expect(this.name).toBe('username');
                expect(this.value).toBe('123');
                expect(value).toBe('123');
                return false;
            });

        var data = {
            username: '123'
        };
        va.validate(data, function (err) {
            expect(err).toBeFalsy();
            done();
        });
    });

    it('(fn(value, next))', function (done) {
        var va = new Validation();

        va.field('username', '用户名')
            .constrain('required', true)
            .enable(function (value, next) {
                expect(this.options.skipInvalid).toBe(false);
                expect(this.data).toBe(data);
                expect(this.alias).toBe('用户名');
                expect(this.name).toBe('username');
                expect(this.value).toBe('123');
                expect(value).toBe('123');

                setTimeout(function () {
                    next(false);
                }, 10);
            });

        var data = {
            username: '123'
        };
        va.validate(data, function (err) {
            expect(err).toBeFalsy();
            done();
        });
    });

});
