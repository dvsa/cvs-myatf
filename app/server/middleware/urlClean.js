export default (req, res, next) => {
	const urlString = req.originalUrl.replace(/\/+$/, '');
	req.originalUrl = urlString;
	next();
};
