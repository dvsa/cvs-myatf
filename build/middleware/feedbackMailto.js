'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _configService = require('../services/configService');

var _configService2 = _interopRequireDefault(_configService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (req, res, next) => {

	res.locals.feedbackMailto = _configService2.default.GetFeedbackMailto();
	next();
};

module.exports = exports['default'];