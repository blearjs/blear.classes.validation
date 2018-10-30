/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Validation = require('../../src/index.js');

describe('#rule', function () {

    it('静态 rule', function (done) {
        var rule = 'r' + Date.now();
        var validator = function (value) {
            return '就是不符合';
        };

        Validation.rule(rule, validator);
        expect(Validation.rule(rule)).toBe(validator);

        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').constrain(rule, true);
        va.field('b').constrain(rule, true, '不符合吗');
        va.validate({}, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('就是不符合');
            expect(errs[1].message).toBe('不符合吗');
            done();
        });
    });

    it('实例 rule', function (done) {
        var rule1 = 'r1' + Date.now();
        var rule3 = 'r2' + Date.now();
        var validator1 = function (value) {
            return '就是不符合1';
        };
        var validator2 = function (value) {
            return '就是不符合2';
        };
        var validator3 = function (value) {
            return '就是不符合3';
        };

        Validation.rule(rule1, validator1);
        Validation.rule(rule3, validator3);
        expect(Validation.rule(rule1)).toBe(validator1);

        var va = new Validation({
            skipInvalid: true
        });

        // 覆盖静态
        va.rule(rule1, validator2);

        expect(va.rule(rule1)).toBe(validator2);
        expect(va.rule(rule3)).toBe(validator3);

        va.field('a').constrain(rule1, true);
        va.field('b').constrain(rule1, true, '不符合吗');
        va.validate({}, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('就是不符合2');
            expect(errs[1].message).toBe('不符合吗');
            done();
        });
    });

});
