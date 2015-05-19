/* jslint node: true */

'use strict';

var express     = require('express'),
    log         = require('log4js').getLogger(),
    router      = express.Router(),
    routes      = {};

routes.collector = function (req, res) {
    log.info(req.body);
    res.json({ success: true });
};

router.post('/collector', routes.collector);

module.exports = exports = router;
