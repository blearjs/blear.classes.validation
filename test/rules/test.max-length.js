/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('max-length', function () {

    it('basic', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').maxLength(3);
        va.field('b').maxLength(3, '最多三位');
        va.field('c').maxLength(3);

        va.validate({
            a: '123123',
            b: '123123',
            c: '123'
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a 不能超过 3 个长度');
            expect(errs[1].message).toBe('最多三位');
            done();
        });
    });

});


