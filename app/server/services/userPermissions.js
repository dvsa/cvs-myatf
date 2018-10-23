export default class UserPermissions {

	constructor(user) {
		this.setPermissions(user);
	}

	setPermissions = (user) => {
		this.permissions = [];
		// TODO lookup permissions for user and add
		if (user === 'user') {
			this.addPermission('balance.viewOnly');
			this.addPermission('testHistory.viewOnly');
			this.addPermission('booked.viewOnly');
			this.addPermission('notify.viewOnly');
		} else if (user === 'demo') {
			this.addPermission('balance.full');
			this.addPermission('testHistory.full');
			this.addPermission('booked.full');
			this.addPermission('notify.full');
			this.addPermission('topup.full');
		} else if (user === 'finance') {
			this.addPermission('balance.full');
			this.addPermission('topup.full');
		} else if (user === 'multisiteAdmin') {
			this.addPermission('balance.full');
			this.addPermission('testHistory.full');
			this.addPermission('booked.full');
			this.addPermission('notify.full');
			this.addPermission('topup.full');
			this.addPermission('multisite.full');
		} else {
			this.addPermission('balance.full');
			this.addPermission('testHistory.full');
			this.addPermission('booked.full');
			this.addPermission('notify.full');
			this.addPermission('topup.full');
		}
	}

	setPermissionsFromString = (list) => {
		this.permissions = [];
		const permissions = list.split(',');
		permissions.forEach((element) => {
			this.addPermission(element);
		});
	}

	hasPermissions = (permission) => {
		const permissionsToCheck = permission.split(',');
		let hasPermission = false;

		this.permissions.forEach((element) => {
			if (permissionsToCheck.indexOf(element) >= 0) {
				hasPermission = true;
			}
		});
		return (hasPermission);
	}

	addPermission = (permission) => {
		if (!this.hasPermissions(permission)) {
			this.permissions.push(permission);
		}
	}
}
