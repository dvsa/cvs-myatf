'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Try to match a request to a template, for example a request for /test
// would look for /app/views/test.html
// or /app/views/text/index.html
exports.default = (req, res) => {
	const localPath = req.params[0];
	res.render(localPath, (err, htmlRender) => {
		if (err) {
			res.render(`${_path2.default}/index`, (err2, htmlRendering) => {
				if (err2) {
					res.locals.statusCode = 404;
					res.status(404).render('error');
				} else {
					res.end(htmlRendering);
				}
			});
		} else {
			res.setHeader('content-type', 'text/html');
			res.end(htmlRender);
		}
	});
};

module.exports = exports['default'];