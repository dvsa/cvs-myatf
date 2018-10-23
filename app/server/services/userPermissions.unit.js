import expect from 'expect';
import UserPermissionsService from './userPermissions';

describe('permissions service', () => {

	describe('doesUserHavePermission', () => {
		describe('when user is demo', () => {
			const permissions = new UserPermissionsService('demo');
			it('should have full on balance', (done) => {
				expect(permissions.hasPermissions('balance.full')).toBe(true);
				done();
			});

			it('should have full on testHistory', (done) => {
				expect(permissions.hasPermissions('testHistory.full')).toBe(true);
				done();
			});
			it('should return false for nonexistant  permission', (done) => {
				expect(permissions.hasPermissions('nonsense.full')).toBe(false);
				done();
			});
		});
		describe('when user is finance', () => {
			const permissions2 = new UserPermissionsService('finance');
			it('should have full on balance', (done) => {
				expect(permissions2.hasPermissions('balance.full')).toBe(true);
				done();
			});

			it('should have full on topup', (done) => {
				expect(permissions2.hasPermissions('topup.full')).toBe(true);
				done();
			});
			it('should return false for testHistory  permission', (done) => {
				expect(permissions2.hasPermissions('testHistory.full,testHistory.viewOnly')).toBe(false);
				done();
			});
			it('should return false for booked  permission', (done) => {
				expect(permissions2.hasPermissions('booked.full,booked.viewOnly')).toBe(false);
				done();
			});

		});
	});
});
