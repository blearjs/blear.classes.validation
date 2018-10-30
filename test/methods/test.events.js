/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Validation = require('../../src/index.js');

describe('events', function () {

    it('basic', function (done) {
        var fields = [];
        var rules = [];
        var validNames = [];
        var invalidNames = [];
        var successed = false;
        var errored = false;
        var va = new Validation();

        va.field('a').required().type('number');
        va.field('b').required().type('number');
        va.field('c').required().type('number');

        va.on('field', function (context) {
            fields.push(context.name);
        });

        va.on('validate', function (context) {
            rules.push(context.rule);
        });

        va.on('valid', function (context) {
            validNames.push(context.name);
        });

        va.on('invalid', function (context) {
            invalidNames.push(context.name);
        });

        va.on('success', function (context) {
            successed = true;
        });

        va.on('error', function (context) {
            errored = true;
        });

        va.validate({
            a: 1,
            b: '2',
            c: ''
        }, function () {
            setTimeout(function () {
                expect(fields).toEqual(['a', 'b']);
                expect(rules).toEqual([
                    'required',
                    'type',
                    'required',
                    'type'
                ]);
                expect(validNames).toEqual([
                    'a',
                    'a',
                    'b'
                ]);
                expect(invalidNames).toEqual([
                    'b'
                ]);
                expect(successed).toBe(false);
                expect(errored).toBe(true);

                done();
            }, 10);
        });
    });

});
