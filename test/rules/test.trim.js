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

});


