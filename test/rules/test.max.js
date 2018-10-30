/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('min', function () {

    it('basic', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').type('numerical').min(100);
        va.field('b').type('numerical').min(100, '100最小了');
        va.field('c').type('numerical').min(100);

        va.validate({
            a: 12,
            b: 12,
            c: 199
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a 不能小于 100');
            expect(errs[1].message).toBe('100最小了');
            done();
        });
    });

});


