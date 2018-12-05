/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Validation = require('../../src/index.js');

describe('#child', function () {

    it('对象嵌套', function (done) {
        var va1 = new Validation({
            skipInvalid: true
        });
        var va2 = new Validation({
            skipInvalid: true
        });
        var data = {
            a: {
                b: '1',
                c: 1
            }
        };

        va1.field('a').type('object').child(va2);
        va2.field('b').type('number');
        va2.field('c').type('number');

        va1.validate(data, function (errs) {
            expect(errs.length).toBe(1);
            expect(errs[0].message).toEqual('b 必须是数值格式');
            done();
        });
    });

});
