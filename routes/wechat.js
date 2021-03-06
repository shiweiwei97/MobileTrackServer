/* jslint node: true */

'use strict';

var express     = require('express'),
    log         = require('log4js').getLogger(),
    wechat      = require('wechat'),
    appid       = '45243392f153e83de593417bb2266c80',
    token       = 'wechat_token',
    secrect     = '45243392f153e83de593417bb2266c80',
    config      = {
        token: token,
        appid: appid,
        encodingAESKey: secrect
    },
    router;

router = wechat(token, function (req, res, next) {
    var message = req.weixin;
    log.debug(message);

    res.reply('hehe');
});

module.exports = exports = router;
