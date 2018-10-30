/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('required', function () {

    it('basic', function () {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a').required();
        va.field('b', 'B段').required('<<B 段一定不能为空>>');
        va.field('c', 'C段');

        va.validate({
            a: '',
            b: '',
            c: ''
        }, function (errs) {
            expect(errs.length).toBe(2);

            expect(errs[0].context.name).toBe('a');
            expect(errs[0].context.alias).toBe('a');
            expect(errs[0].context.message).toBe('a不能为空');

            expect(errs[1].context.name).toBe('b');
            expect(errs[1].context.alias).toBe('B段');
            expect(errs[1].context.message).toBe('<<B 段一定不能为空>>');
        });
    });

});


