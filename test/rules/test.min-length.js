/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('min-length', function () {

    it('basic', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').minLength(3);
        va.field('b').minLength(3, '最少三位');
        va.field('c').minLength(3);
        va.field('d').minLength(3);

        va.validate({
            a: '1',
            b: '1',
            c: '123',
            d: ''
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a 不能少于 3 个长度');
            expect(errs[1].message).toBe('最少三位');
            done();
        });
    });

});


