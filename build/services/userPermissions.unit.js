'use strict';

var _expect = require('expect');

var _expect2 = _interopRequireDefault(_expect);

var _userPermissions = require('./userPermissions');

var _userPermissions2 = _interopRequireDefault(_userPermissions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('permissions service', () => {

	describe('doesUserHavePermission', () => {
		describe('when user is demo', () => {
			const permissions = new _userPermissions2.default('demo');
			it('should have full on balance', done => {
				(0, _expect2.default)(permissions.hasPermissions('balance.full')).toBe(true);
				done();
			});

			it('should have full on testHistory', done => {
				(0, _expect2.default)(permissions.hasPermissions('testHistory.full')).toBe(true);
				done();
			});
			it('should return false for nonexistant  permission', done => {
				(0, _expect2.default)(permissions.hasPermissions('nonsense.full')).toBe(false);
				done();
			});
		});
		describe('when user is finance', () => {
			const permissions2 = new _userPermissions2.default('finance');
			it('should have full on balance', done => {
				(0, _expect2.default)(permissions2.hasPermissions('balance.full')).toBe(true);
				done();
			});

			it('should have full on topup', done => {
				(0, _expect2.default)(permissions2.hasPermissions('topup.full')).toBe(true);
				done();
			});
			it('should return false for testHistory  permission', done => {
				(0, _expect2.default)(permissions2.hasPermissions('testHistory.full,testHistory.viewOnly')).toBe(false);
				done();
			});
			it('should return false for booked  permission', done => {
				(0, _expect2.default)(permissions2.hasPermissions('booked.full,booked.viewOnly')).toBe(false);
				done();
			});
		});
	});
});