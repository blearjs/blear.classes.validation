/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Validation = require('../src/index.js');

describe('blear.classes.validation', function () {

    it('basic', function (done) {
        var va = new Validation();

        va.field('username', '用户名')
            .constrain('required', true);

        var data = {};
        va.validate(data, function (err) {
            expect(err.context.options.skipInvalid).toBe(false);
            expect(err.context.alias).toBe('用户名');
            expect(err.context.limit).toBe(true);
            expect(err.context.message).toBe('用户名不能为空');
            expect(err.context.name).toBe('username');
            expect(err.context.rule).toBe('required');
            expect(err.context.value).toBe(undefined);
            expect(err.context.data).toBe(data);
            expect(err.context.aliases).toEqual({
                username: '用户名'
            });
            done();
        });
    });

});
