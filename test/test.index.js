/**
 * 测试 文件
 * @author ydr.me
 * @create 2016-05-17 12:13
 */


'use strict';

var Validation = require('../src/index.js');

describe('测试文件', function () {
    it('simple', function (done) {
        var va = new Validation();

        va
            .path('username', '用户名')
            .constrain('minLength', 4)
            .constrain('maxLength', 8);

        va.validate({
            username: '1234567890'
        }, function (errs) {
            expect(errs.length).toEqual(1);
            console.log(errs);
            done();
        });

        va.on('invalid', function (invalid) {
            console.log('invalid',invalid);
        });
    });


    // it('validate:success', function (done) {
    //     var data = {
    //         name:'zcl',
    //         age:28,
    //         email:'116310337@qq.com',
    //         blog:'http://www.baidu.com',
    //         kg:60.8,
    //         birthday:'1988-04-03'
    //     };
    //
    //     var va = new Validation([
    //         {
    //             name:'name',
    //             rules:['required','minlength_2','maxlength_18']
    //         },
    //         {
    //             name:'age',
    //             rules:['required','digits','min_1','max_150']
    //         },
    //         {
    //             name:'email',
    //             rules:['email']
    //         },
    //         {
    //             name:'blog',
    //             rules:['url']
    //         },
    //         {
    //             name:'kg',
    //             rules:['number']
    //         }
    //     ]);
    //
    //     va.on('success',function(){
    //         expect(va.getResult().code).toEqual(1);
    //         done();
    //     })
    //
    //     va.vali(data);
    // });
    //
    // it('validate:error', function (done) {
    //     var data = {
    //         name:'z',
    //         age:28,
    //     };
    //
    //     var va = new Validation([
    //         {
    //             name:'name',
    //             rules:['required','minlength_2','maxlength_18']
    //         },
    //         {
    //             name:'age',
    //             rules:['required','digits','min_1','max_150']
    //         }
    //     ]);
    //
    //     va.on('error',function(){
    //         expect(va.getResult().code).toEqual(0);
    //         done();
    //     })
    //
    //     va.vali(data);
    // });
});
