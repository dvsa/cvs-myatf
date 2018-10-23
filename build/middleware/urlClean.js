'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = (req, res, next) => {
	const urlString = req.originalUrl.replace(/\/+$/, '');
	req.originalUrl = urlString;
	next();
};

module.exports = exports['default'];