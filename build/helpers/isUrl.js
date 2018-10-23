'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = path => {
	return path.startsWith('http');
};

module.exports = exports['default'];