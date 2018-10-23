'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = class {
	constructor(text, classes = '', link = '') {
		this.Text = text;
		this.Classes = classes;
		this.Link = link;
	}
};
module.exports = exports['default'];