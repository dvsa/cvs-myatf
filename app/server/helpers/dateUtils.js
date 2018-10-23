export default class DateUtils {

	static getDayOfMonth(date) {
		return date.getUTCDate();
	}

	static getMonth(date) {
		return date.getUTCMonth() + 1;
	}

	static getFullYear(date) {
		return date.getUTCFullYear();
	}

}
