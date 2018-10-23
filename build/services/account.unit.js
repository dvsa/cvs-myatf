'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _account = require('./account');

var _account2 = _interopRequireDefault(_account);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('account service', () => {

	describe('addToCurrentBalance', () => {
		describe('when 50 is added to balance of 100', () => {
			it('should return 150', done => {
				const account = new _account2.default(100);
				account.addToCurrentBalance(50);
				(0, _expect2.default)(account.currentBalance).toBe(150);
				done();
			});
		});
		describe('when -50 is added to balance of 100', () => {
			it('should return 50', done => {
				const account = new _account2.default(100);
				account.addToCurrentBalance(-50);
				(0, _expect2.default)(account.currentBalance).toBe(50);
				done();
			});
		});
	});
});