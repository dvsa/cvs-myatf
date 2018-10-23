import SessionService from '../services/sessionService';

// add atfName if we have it. Pages can decide to display or not
export default (req, res, next) => {

	res.locals.atfName = SessionService.GetAtf(req).atfAccountName;
	next();
};
