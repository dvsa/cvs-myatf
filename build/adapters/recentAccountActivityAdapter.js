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

class RecentAccountActivityAdapter {}
exports.default = RecentAccountActivityAdapter;

RecentAccountActivityAdapter.Process = searchResults => {
	const headings = [new _gridHeading2.default('Activity', 'bold'), new _gridHeading2.default('Start and end time', 'bold'), new _gridHeading2.default('Total fees', 'bold')];

	const rows = searchResults.map(val => {
		const showPound = val.fees ? '£' : '';
		const newlines = val.activityDescription ? '\n\n' : '';
		return [new _gridRowItem2.default(`${val.activityId}${newlines}${val.activityDescription}`, val.startEndTime ? '' : 'bold'), new _gridRowItem2.default(val.startEndTime), new _gridRowItem2.default(`${showPound}${val.fees}`)];
	});

	return new _gridDefinition2.default(headings, rows);
};

module.exports = exports['default'];