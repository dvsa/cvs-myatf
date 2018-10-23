import expect from 'expect';
import Account from './account';

describe('account service', () => {

	describe('addToCurrentBalance', () => {
		describe('when 50 is added to balance of 100', () => {
			it('should return 150', (done) => {
				const account = new Account(100);
				account.addToCurrentBalance(50);
				expect(account.currentBalance).toBe(150);
				done();
			});
		});
		describe('when -50 is added to balance of 100', () => {
			it('should return 50', (done) => {
				const account = new Account(100);
				account.addToCurrentBalance(-50);
				expect(account.currentBalance).toBe(50);
				done();
			});
		});
	});
});
