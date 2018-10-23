'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _data = require('../services/data');

var _data2 = _interopRequireDefault(_data);

var _historyData = require('../models/historyData');

var _historyData2 = _interopRequireDefault(_historyData);

var _paymentReceiptDetailsAdapter = require('../adapters/paymentReceiptDetailsAdapter');

var _paymentReceiptDetailsAdapter2 = _interopRequireDefault(_paymentReceiptDetailsAdapter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dataService = new _data2.default();

exports.default = (req, res) => {

	dataService.getPaymentReceiptDetails(10, 0, {}, _paymentReceiptDetailsAdapter2.default.Process).then(result => {
		const historyData = new _historyData2.default({}, result);
		res.render('prototype/payment-receipt', historyData);
	});
};

module.exports = exports['default'];