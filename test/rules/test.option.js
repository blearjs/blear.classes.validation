/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 10:10
 * @update 2018-10-30 10:10
 */


'use strict';

var Validation = require('../../src/index.js');

describe('option', function () {

    it('basic', function (done) {
        var va = new Validation({
            skipInvalid: true
        });

        va.field('a');
        va.field('b').option(['甲']);
        va.field('c').option(['甲'], '中一个');
        va.field('d').option(['甲', '乙', '丙', '丁']);

        va.validate({
            a: '甲',
            b: '戊',
            c: ['及', '五'],
            d: ['及', '五']
        }, function (errs) {
            expect(errs.length).toBe(3);
            expect(errs[0].message).toBe('b 必须是“甲”中的一个');
            expect(errs[1].message).toBe('中一个');
            expect(errs[2].message).toBe('d 必须是“甲、乙、丙、丁”中的一个');
            done();
        });
    });

});


