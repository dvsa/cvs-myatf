'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.postTopupForm = exports.getTopupForm = undefined;

var _check = require('express-validator/check');

var _sessionService = require('../services/sessionService');

var _sessionService2 = _interopRequireDefault(_sessionService);

var _manuallySetSessionData = require('../middleware/manuallySetSessionData');

var _manuallySetSessionData2 = _interopRequireDefault(_manuallySetSessionData);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getTopupForm = exports.getTopupForm = (req, res) => {
	const account = _sessionService2.default.GetAccount(req);
	res.render('prototype/topup', {
		lastTopup: account.lastTopup
	});
};

const postTopupForm = exports.postTopupForm = (req, res) => {
	const errors = (0, _check.validationResult)(req);
	if (errors.isEmpty()) {
		// Align last-topup and topup-amount variables
		// This passes the correct value through when you select "Top up with last amount"
		if (req.session.data['last-topup'] && req.session.data['last-topup'] > 0) {
			(0, _manuallySetSessionData2.default)(req, res, 'topup-amount', req.session.data['last-topup']);
		}

		res.redirect('topup-summary');
	} else {
		// Create validation object
		const errorsObj = errors.array()[0];
		const validationObject = {
			errorHeading: errorsObj.msg,
			errorSummary: errorsObj.nestedErrors.map(err => ({ fieldId: err.param, message: err.msg }))
		};
		res.render('prototype/topup', validationObject);
	}
};