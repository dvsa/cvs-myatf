'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.addCheckedFunction = exports.addNunjucksFilters = undefined;

var _core_filters = require('./core_filters');

var _core_filters2 = _interopRequireDefault(_core_filters);

var _filters = require('./filters');

var _filters2 = _interopRequireDefault(_filters);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Require core and custom filters, merges to one object
// and then add the methods to Nunjucks environment
const addNunjucksFilters = exports.addNunjucksFilters = env => {
	const core = (0, _core_filters2.default)(env);
	const custom = (0, _filters2.default)(env);
	const filters = Object.assign(core, custom);
	Object.keys(filters).forEach(filterName => {
		env.addFilter(filterName, filters[filterName]);
	});
};

// Add Nunjucks function called 'checked' to populate radios and checkboxes
const addCheckedFunction = exports.addCheckedFunction = env => {
	env.addGlobal('checked', function checkedFunc(name, value) {
		// Check data exists
		if (this.ctx.data === undefined) {
			return '';
		}

		const storedValue = this.ctx.data[name];

		// Check the requested data exists
		if (storedValue === undefined) {
			return '';
		}

		let checked = '';

		// If data is an array, check it exists in the array
		if (Array.isArray(storedValue)) {
			if (storedValue.indexOf(value) !== -1) {
				checked = 'checked';
			}
		} else if (storedValue === value) {
			// The data is just a simple value, check it matches
			checked = 'checked';
		}
		return checked;
	});
};