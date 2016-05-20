# blear.classes.validation

[![npm module][npm-img]][npm-url]
[![build status][travis-img]][travis-url]
[![coverage][coveralls-img]][coveralls-url]

[travis-img]: https://img.shields.io/travis/blearjs/blear.classes.validation/master.svg?maxAge=2592000&style=flat-square
[travis-url]: https://travis-ci.org/blearjs/blear.classes.validation

[npm-img]: https://img.shields.io/npm/v/blear.classes.validation.svg?maxAge=2592000&style=flat-square
[npm-url]: https://www.npmjs.com/package/blear.classes.validation

[coveralls-img]: https://img.shields.io/coveralls/blearjs/blear.classes.validation/master.svg?maxAge=2592000&style=flat-square
[coveralls-url]: https://coveralls.io/github/blearjs/blear.classes.validation?branch=master



## 消息
- 静态消息
- 实例消息

```
messages: {
 minLength: function (minLength) {
    return '不能小于' + minLength + '个长度';
 }
}
```

## 规则
- 静态规则
- 实例规则

```
rules: {
 minLength: function (value, minLength, next) {
   next(value.length >= minLength);
 }
}
```

## 验证
- `next(message)`
- `va.message()`