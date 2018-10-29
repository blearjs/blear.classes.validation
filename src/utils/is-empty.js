/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-29 15:44
 * @update 2018-10-29 15:44
 */


'use strict';

/**
 * 判断是否为空
 * @param value
 * @returns {boolean}
 */
module.exports = function (value) {
    // 字符串或者数组
    return value === undefined || value === null || value.length === 0;
};


