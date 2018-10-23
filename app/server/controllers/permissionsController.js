
export default (permissionsService, urlRoot, req, res) => {
	permissionsService.setPermissions(req.params.user);
	req.session.setUser = req.params.user;
	res.redirect(`${urlRoot}prototype/account-summary`);
};
