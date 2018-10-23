import ConfigService from '../services/configService';

export default (req, res, next) => {

	res.locals.feedbackMailto = ConfigService.GetFeedbackMailto();
	next();
};
