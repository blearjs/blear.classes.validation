/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Validation = require('../src/index.js');

describe('测试文件', function () {

    it('basical', function (done) {
        var va = new Validation();

        va.field('username', '用户名')
            .constrain('required', true);

        var data = {};
        va.validate(data, function (err) {
            expect(err.validation.alias).toBe('用户名');
            expect(err.validation.limit).toBe(true);
            expect(err.validation.message).toBe('用户名不能为空');
            expect(err.validation.name).toBe('username');
            expect(err.validation.rule).toBe('required');
            expect(err.validation.value).toBe(undefined);
            expect(err.validation.data).toBe(data);
            expect(err.validation.aliases).toEqual({
                username: '用户名'
            });
            done();
        });
    });

});
