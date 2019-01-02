/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('type', function () {

    it('数据类型', function (done) {
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

    it('type valid', function (done) {
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
        va.field('a').type('string');
        va.field('b').type('number');
        va.field('c').type('boolean');
        va.field('d').type('array');
        va.field('e').type('object');
        va.field('f').type('function');
        va.field('o').type('unknow');
        va.validate(data, function (err) {
            expect(err).toEqual(undefined);
            done();
        });
    });


});


