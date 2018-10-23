import SessionService from '../services/sessionService';

export default (req, res) => {
	const account = SessionService.GetAccount(req);

	const topupAmount = Number(req.session.data['topup-amount']) || 0;
	account.addToCurrentBalance(topupAmount);
	account.lastTopup = topupAmount;
	SessionService.SaveAccount(req, account);

	res.render('prototype/topup-success', {
		account
	});
};
