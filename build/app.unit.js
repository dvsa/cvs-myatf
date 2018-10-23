'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('App class', () => {

	describe('when initialised', () => {
		it('should run all the right methods', done => {
			_sinon2.default.spy(_app2.default.prototype, 'setupConfig');
			_sinon2.default.spy(_app2.default.prototype, 'setupTemplating');
			_sinon2.default.spy(_app2.default.prototype, 'setupMiddleware');
			_sinon2.default.spy(_app2.default.prototype, 'setupAuth');
			_sinon2.default.spy(_app2.default.prototype, 'setupStaticAssets');
			_sinon2.default.spy(_app2.default.prototype, 'setupRouter');
			const app = new _app2.default();
			(0, _expect2.default)(app.setupConfig.calledOnce).toBe(true);
			(0, _expect2.default)(app.setupTemplating.calledOnce).toBe(true);
			(0, _expect2.default)(app.setupMiddleware.calledOnce).toBe(true);
			(0, _expect2.default)(app.setupAuth.calledOnce).toBe(true);
			(0, _expect2.default)(app.setupStaticAssets.calledOnce).toBe(true);
			(0, _expect2.default)(app.setupRouter.calledOnce).toBe(true);
			done();
		});
	});
});