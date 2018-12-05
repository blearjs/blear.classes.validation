/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('type', function () {

    it('数据格式', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').type('string');
        va.field('b').type('number');
        va.field('c').type('boolean');
        va.field('d').type('array');
        va.field('e').type('object');
        va.field('f').type('function');

        va.validate({
            a: 1,
            b: '2',
            c: 3,
            d: 4,
            e: 5,
            f: 6
        }, function (errs) {
            expect(errs.length).toBe(6);
            expect(errs[0].message).toEqual('a 必须是字符串类型');
            expect(errs[1].message).toEqual('b 必须是数值类型');
            expect(errs[2].message).toEqual('c 必须是布尔值类型');
            expect(errs[3].message).toEqual('d 必须是数组类型');
            expect(errs[4].message).toEqual('e 必须是对象类型');
            expect(errs[5].message).toEqual('f 必须是函数类型');

            done();
        });
    });

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
            expect(errs[0].message).toBe('a 必须是手机号格式');
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
            expect(errs[0].message).toBe('a 必须是邮箱格式');
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
            expect(errs[0].message).toBe('a 必须是有效数值格式');
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
            expect(errs[0].message).toBe('a 必须是数字格式');
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
            expect(errs[0].message).toBe('a 必须是整数格式');
            expect(errs[1].message).toBe('不像一个整数');
            done();
        });
    });

    it('url/http', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').type('url');
        va.field('b').type('http', '不像一个网络地址');

        va.validate({
            a: '123a',
            b: '-1000b'
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a 必须是网络地址格式');
            expect(errs[1].message).toBe('不像一个网络地址');
            done();
        });
    });

    it('idNo', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').type('idNo');
        va.field('b').type('idNo', '不像一个身份证号码');

        va.validate({
            a: '123a',
            b: '-1000b'
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a 必须是身份证格式');
            expect(errs[1].message).toBe('不像一个身份证号码');
            done();
        });
    });

    it('type limit is an array', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').type(['boolean', 'number']);
        va.field('b').type(['boolean', 'number']);

        va.validate({
            a: '123',
            b: 123
        }, function (errs) {
            expect(errs.length).toBe(1);
            expect(errs[0].message).toBe('a 必须是布尔值类型或数值类型');
            done();
        });
    });

});


