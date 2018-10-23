import getAtfById from '../helpers/atfHelpers';
import Account from '../services/account';
import SessionService from '../services/sessionService';


export default (req, res) => {
	getAtfById(req.params.accountNumber, req, res, (atfSite) => {
		const atf = {
			atfAccountNumber: atfSite.AtfAccountNumber,
			atfAccountName: atfSite.AtfAccountName,
			atfAddress: atfSite.AtfAddress
		};
		const account = new Account(atfSite.AtfBalance);
		SessionService.SaveAccount(req, account);
		SessionService.SaveAtf(req, atf);
		res.redirect('/prototype/account-summary');
	});
};
