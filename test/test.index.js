/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Validation = require('../src/index.js');

describe('测试文件', function () {
    // it('simple', function (done) {
    //     var va = new Validation();
    //
    //     va
    //         .path('username', '用户名')
    //         .constrain('minLength', 4)
    //         .constrain('maxLength', 8);
    //
    //     va.validate({
    //         username: '1234567890'
    //     }, function (errs) {
    //         expect(errs.length).toEqual(1);
    //         console.log(errs);
    //         done();
    //     });
    //
    //     va.on('invalid', function (invalid) {
    //         console.log('invalid',invalid);
    //     });
    // });
    //
    // it('skipInvalid: true', function (done) {
    //     var va = new Validation({
    //         skipInvalid: true
    //     });
    //
    //     va
    //         .path('username')
    //         .constrain('required', true)
    //         .constrain('minLength', 2)
    //         .constrain('maxLength', 6)
    //
    //         .path('password')
    //         .constrain('required', true)
    //         .constrain('minLength', 2)
    //         .constrain('maxLength', 6);
    //
    //     va.validate({
    //         username: 'a',
    //         password: 'b'
    //     }, function (errs) {
    //         console.log(errs);
    //         expect(errs.length).toEqual(2);
    //         done();
    //     });
    // });
    //
    // it('skipInvalid: false', function (done) {
    //     var va = new Validation({
    //         skipInvalid: false
    //     });
    //
    //     va
    //         .path('username')
    //         .constrain('required', true)
    //         .constrain('minLength', 2)
    //         .constrain('maxLength', 6)
    //
    //         .path('password')
    //         .constrain('required', true)
    //         .constrain('minLength', 2)
    //         .constrain('maxLength', 6);
    //
    //     va.validate({
    //         username: 'a',
    //         password: 'b'
    //     }, function (errs) {
    //         console.log(errs);
    //         expect(errs.length).toEqual(1);
    //         done();
    //     });
    // });

    it('custorm rule', function (done) {
        var va = new Validation();

        va.rule('custormRule', function (value, next) {
            setTimeout(function () {
                next('我不想多说什么，超时丢给你的错误，你接着');
            }, 345);
        });
        va.path('abc').constrain('custormRule', true);

        va.validate({abc: '1'}, function (errs) {
            console.log(errs);
            expect(errs.length).toEqual(1);
            done();
        });
    }, 100000);
});
