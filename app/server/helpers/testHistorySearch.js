import DateSplitter from './dateSplitter';
import DateUtils from './dateUtils';
import ConfigService from '../services/configService';

export default function (sessionData) {

	const today = new Date();
	const dateToCompare = new Date();
	dateToCompare.setDate(today.getUTCDate() - ConfigService.GetDefaultNumDaysHistory());
	let startDate = {
		day: DateUtils.getDayOfMonth(dateToCompare),
		month: DateUtils.getMonth(dateToCompare),
		year: DateUtils.getFullYear(dateToCompare)
	};
	let endDate = {
		day: DateUtils.getDayOfMonth(today),
		month: DateUtils.getMonth(today),
		year: DateUtils.getFullYear(today)
	};
	let historyFilter = 'All';

	if (typeof sessionData !== 'undefined') {
		const selectedStartDate = sessionData['date-picker-0'];
		const selectedEndDate = sessionData['date-picker-1'];
		historyFilter = sessionData['radio-account-history'];

		startDate = DateSplitter(selectedStartDate);
		endDate = DateSplitter(selectedEndDate);

		if (typeof startDate === 'undefined') {
			startDate = {
				day: sessionData['date-day-from'],
				month: sessionData['date-month-from'],
				year: sessionData['date-year-from']
			};
		}
		if (typeof endDate === 'undefined') {
			endDate = {
				day: sessionData['date-day-to'],
				month: sessionData['date-month-to'],
				year: sessionData['date-year-to']
			};
		}
	}

	const options = {
		StartDate: startDate,
		EndDate: endDate,
		HistoryFilter: historyFilter
	};

	return options;
}
