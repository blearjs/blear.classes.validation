/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('trim', function () {

    it('basic', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').trim().constrain(function (value) {
            expect(value).toBe('123');
            return false;
        });
        va.field('b').constrain(function (value) {
            expect(value).toBe(' 123 ');
            return 'b两端有空白';
        });

        va.validate({
            a: ' 123 ',
            b: ' 123 '
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a不合法');
            expect(errs[1].message).toBe('b两端有空白');
            done();
        });
    });

    it('override = true', function (done) {
        var va = new Validation({
            override: true
        });
        var data = {
            a: '  123  ',
            b: '  456\n\n\n\t\t'
        };

        va.field('a').trim();
        va.field('b').trim();

        va.validate(data, function (err, data2) {
            expect(err).toBeFalsy();
            expect(data.a).toEqual('123');
            expect(data.b).toEqual('456');
            expect(data2).toBe(data);
            done();
        });
    });

    it('override = false', function (done) {
        var va = new Validation({
            override: false
        });
        var a = '  123  ';
        var b = '  456\n\n\n\t\t';
        var data = {
            a: a,
            b: b
        };

        va.field('a').trim();
        va.field('b').trim();

        va.validate(data, function (err, data2) {
            expect(err).toBeFalsy();
            expect(data.a).toEqual(a);
            expect(data.b).toEqual(b);
            expect(data2).toBe(data);
            done();
        });
    });

});


