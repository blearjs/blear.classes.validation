/**
 * 文件描述
 * @author ydr.me
 * @create 2018-10-30 11:06
 * @update 2018-10-30 11:06
 */


'use strict';

/**
 * 英文两端空白
 * @param alias
 * @param spacePosition {number} 1=左边空白，2=右边空白，3=两端空白
 * @returns {string}
 */
module.exports = function (alias, spacePosition) {
    var left = spacePosition === 1 || spacePosition === 3 ? ' ' : '';
    var right = spacePosition === 2 || spacePosition === 3 ? ' ' : '';
    return /^[\w-.]+$/.test(alias) ? left + alias + right : alias;
};


