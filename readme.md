# blear.classes.validation
顺序、异步的数据逻辑的表单验证。


[![npm module][npm-img]][npm-url]
[![build status][travis-img]][travis-url]
[![coverage][coveralls-img]][coveralls-url]

[travis-img]: https://img.shields.io/travis/blearjs/blear.classes.validation/master.svg?maxAge=2592000&style=flat-square
[travis-url]: https://travis-ci.org/blearjs/blear.classes.validation

[npm-img]: https://img.shields.io/npm/v/blear.classes.validation.svg?maxAge=2592000&style=flat-square
[npm-url]: https://www.npmjs.com/package/blear.classes.validation

[coveralls-img]: https://img.shields.io/coveralls/blearjs/blear.classes.validation/master.svg?maxAge=2592000&style=flat-square
[coveralls-url]: https://coveralls.io/github/blearjs/blear.classes.validation?branch=master


# 用法
```
var va = new Validation();

// 先验证用户名、然后验证密码
// 用户名：先验证是否为空，然后验证最小长度，然后最大长度，最后是正则表达式
va
    .path('username', '用户名')
    .constrian('required', true)
    .constrain('minLength', 4)
    .constrain('maxLength', 12)
    .constrain('pattern', /^[a-z][a-z\d]{11}$/i, '用户名必须是字母开头，字母和数组组成');

// 密码：先验证是否为空，然后验证最小长度，最后最大长度
va
    .path('password', '密码')
    .constrian('required', true)
    .constrain('minLength', 4)
    .constrain('maxLength', 12);

va.validate({
    username: 'abcd',
    password: '123'
}， function (errs) {
    // errs 
    // [{
    //     rule: 'minLength',
    //     limit: 4,
    //     message: '密码长度不能少于4', 
    //     path: 'password', 
    //     alias: '密码', 
    //     value: '123', 
    //     data: {
    //         username: 'abcd',
    //         password: '123'
    //     }
    // }]
});
```


# 实例接口
## `#path(path, alias)` 标记验证的字段
```
va.path('username', '用户名');
```


## `#constrain(rule, limit)` 验证约束
```
va.constrain('minLength', 4);
```


## `#validate(data, callback)` 验证数据
```
va.validate(data, function (errs) {
    // errs 是一个数据，如果验证通过，将是一个空数组
    // 如果验证失败，将是一个非空数组
});
```


## `#rule(rule, fn)` 自定义实例级别的规则
该规则只能在当前实例使用。
```
va.rule('自定义规则', function (value, next) {
    var item = this;
    
    next('出错的消息');
});
```



# 静态接口
## `.rule(rule, fn)` 自定义静态级别的规则
该规则可以在任意实例使用。
```
Validation.rule('自定义规则', function (value, next) {
   var item = this;
   
   next('出错的消息');
});
```
