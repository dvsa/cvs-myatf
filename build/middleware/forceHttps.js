'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

// Redirect HTTP requests to HTTPS
exports.default = (req, res, next) => {
	if (req.headers['x-forwarded-proto'] !== 'https') {
		console.log('Redirecting request to https');
		// 302 temporary - this is a feature that can be disabled
		return res.redirect(302, `https://${req.get('Host')}${req.url}`);
	}
	return next();
};

module.exports = exports['default'];