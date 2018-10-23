'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _gridDefinition = require('../models/gridDefinition');

var _gridDefinition2 = _interopRequireDefault(_gridDefinition);

var _gridHeading = require('../models/gridHeading');

var _gridHeading2 = _interopRequireDefault(_gridHeading);

var _gridRowItem = require('../models/gridRowItem');

var _gridRowItem2 = _interopRequireDefault(_gridRowItem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class HealthAndSafetyDetailsAdapter {}
exports.default = HealthAndSafetyDetailsAdapter;

HealthAndSafetyDetailsAdapter.Process = searchResults => {
	const headings = [new _gridHeading2.default('Reason', 'bold'), new _gridHeading2.default('Details', 'bold'), new _gridHeading2.default('Attachment', 'bold'), new _gridHeading2.default('Resolved', 'bold')];

	const rows = searchResults.map(val => {
		return [new _gridRowItem2.default(val.reason), new _gridRowItem2.default(val.details), new _gridRowItem2.default(val.attachment), new _gridRowItem2.default(val.resolved)];
	});

	return new _gridDefinition2.default(headings, rows);
};

module.exports = exports['default'];