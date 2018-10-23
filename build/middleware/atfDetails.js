'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _sessionService = require('../services/sessionService');

var _sessionService2 = _interopRequireDefault(_sessionService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// add atfName if we have it. Pages can decide to display or not
exports.default = (req, res, next) => {

	res.locals.atfName = _sessionService2.default.GetAtf(req).atfAccountName;
	next();
};

module.exports = exports['default'];