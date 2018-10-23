import { validationResult } from 'express-validator/check';
import SessionService from '../services/sessionService';
import manuallyStoreSessionData from '../middleware/manuallySetSessionData';

export const getTopupForm = (req, res) => {
	const account = SessionService.GetAccount(req);
	res.render('prototype/topup', {
		lastTopup: account.lastTopup
	});
};

export const postTopupForm = (req, res) => {
	const errors = validationResult(req);
	if (errors.isEmpty()) {
		// Align last-topup and topup-amount variables
		// This passes the correct value through when you select "Top up with last amount"
		if (req.session.data['last-topup'] && req.session.data['last-topup'] > 0) {
			manuallyStoreSessionData(req, res, 'topup-amount', req.session.data['last-topup']);
		}

		res.redirect('topup-summary');
	} else {
		// Create validation object
		const errorsObj = errors.array()[0];
		const validationObject = {
			errorHeading: errorsObj.msg,
			errorSummary: errorsObj.nestedErrors.map(err => (
				{ fieldId: err.param, message: err.msg }
			))
		};
		res.render('prototype/topup', validationObject);
	}
};
