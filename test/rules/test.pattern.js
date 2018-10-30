/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('pattern', function () {

    it('basic', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').pattern(/^[a-z]+$/);
        va.field('b').pattern(/^[a-z]+$/, '必须是小写英文字母');
        va.field('c').pattern(/^[a-z]+$/);
        va.field('d').pattern(/^[a-z]+$/);

        va.validate({
            a: 'a1',
            b: 'A1',
            c: 'ab',
            d: ''
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a 不合法');
            expect(errs[1].message).toBe('必须是小写英文字母');
            done();
        });
    });

});


