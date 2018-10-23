"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = (req, res, key, value) => {
	req.session.data[key] = value;
	res.locals.data[key] = value;
};

module.exports = exports["default"];