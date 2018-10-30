/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('max', function () {

    it('basic', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').type('numerical').max(100);
        va.field('b').type('numerical').max(100, '100最大了');
        va.field('c').type('numerical').max(100);

        va.validate({
            a: 1230,
            b: 1230,
            c: 99
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a 不能大于 100');
            expect(errs[1].message).toBe('100最大了');
            done();
        });
    });

});


