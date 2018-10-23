'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _configService = require('../services/configService');

var _configService2 = _interopRequireDefault(_configService);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const runningLocally = _configService2.default.IsRunningLocally();
const assets = _configService2.default.GetAssets();

exports.default = recordFileName => {
	return runningLocally ? `public/mock-data/${recordFileName}` : `${assets}public/mock-data/${recordFileName}`;
};

module.exports = exports['default'];