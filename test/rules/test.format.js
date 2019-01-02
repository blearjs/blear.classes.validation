/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('format', function () {

    it('mobile', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').format('mobile');
        va.field('b').format('mobile', '手机号一定要是一个手机号');

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

        va.field('a').format('email');
        va.field('b').format('email', '邮箱一定要像个邮箱');

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

        va.field('a').format('numerical');
        va.field('b').format('numerical', '不像一个数值');

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

        va.field('a').format('digital');
        va.field('b').format('digital', '不像一个数字');

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

        va.field('a').format('integer');
        va.field('b').format('integer', '不像一个整数');

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

        va.field('a').format('url');
        va.field('b').format('http', '不像一个网络地址');

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

        va.field('a').format('idNo');
        va.field('b').format('idNo', '不像一个身份证号码');

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

    it('format limit is an array', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').format(['mobile', 'email']);
        va.field('b').format(['mobile', 'email']);

        va.validate({
            a: '18812341234',
            b: '123'
        }, function (errs) {
            expect(errs.length).toBe(1);
            expect(errs[0].message).toBe('b 必须是手机号格式或邮箱格式');
            done();
        });
    });

    it('format valid', function (done) {
        var va = new Validation();
        var data = {
            a: 'string',
            b: 123,
            c: true,
            d: [1],
            e: {
                E: 'E'
            },
            f: function () {
                // ...
            },
            g: '18812341234',
            h: 'a@b.cc',
            i: '123',
            j: '0012',
            k: '123',
            l: 'http://123.com',
            m: 'https://456.cc',
            n: '110101201508049664',
            o: 'xxxxx'
        };
        va.field('g').format('mobile');
        va.field('h').format('email');
        va.field('i').format('numerical');
        va.field('j').format('digital');
        va.field('k').format('integer');
        va.field('l').format('url');
        va.field('m').format('http');
        va.field('n').format('idNo');
        va.field('o').format('unknow');
        va.validate(data, function (err) {
            expect(err).toEqual(undefined);
            done();
        });
    });


});


