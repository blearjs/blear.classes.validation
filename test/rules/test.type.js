/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('type', function () {

    it('mobile', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').type('mobile');
        va.field('b').type('mobile', '手机号一定要是一个手机号');

        va.validate({
            a: ' 123 ',
            b: ' 123 '
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('手机号码不合法');
            expect(errs[1].message).toBe('手机号一定要是一个手机号');
            done();
        });
    });

    it('email', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').type('email');
        va.field('b').type('email', '邮箱一定要像个邮箱');

        va.validate({
            a: ' 123 ',
            b: ' 123 '
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('邮箱地址不合法');
            expect(errs[1].message).toBe('邮箱一定要像个邮箱');
            done();
        });
    });

    it('numerical', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').type('numerical');
        va.field('b').type('numerical', '不像一个数值');

        va.validate({
            a: '123-',
            b: '123a'
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a数值不合法');
            expect(errs[1].message).toBe('不像一个数值');
            done();
        });
    });

    it('digital', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').type('digital');
        va.field('b').type('digital', '不像一个数字');

        va.validate({
            a: '123-',
            b: '123a'
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a必须是数字');
            expect(errs[1].message).toBe('不像一个数字');
            done();
        });
    });

    it('integer', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').type('integer');
        va.field('b').type('integer', '不像一个整数');

        va.validate({
            a: '123a',
            b: '-1000b'
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a必须是整数');
            expect(errs[1].message).toBe('不像一个整数');
            done();
        });
    });

});


