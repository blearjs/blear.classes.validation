/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('length', function () {

    it('basic', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').length(3);
        va.field('b').length(3, '必须三位');
        va.field('c').length(3);
        va.field('d').length(3);

        va.validate({
            a: '123123',
            b: '123123',
            c: '123',
            d: ''
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('a 必须是 3 个长度');
            expect(errs[1].message).toBe('必须三位');
            done();
        });
    });

});


