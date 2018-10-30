/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('equal', function () {

    it('basic', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a');
        va.field('b').equal('a');
        va.field('c').equal('a', 'c=a');

        va.validate({
            a: '1',
            b: '2',
            c: '3'
        }, function (errs) {
            expect(errs.length).toBe(2);
            expect(errs[0].message).toBe('b 必须与 a 相同');
            expect(errs[1].message).toBe('c=a');
            done();
        });
    });

});


