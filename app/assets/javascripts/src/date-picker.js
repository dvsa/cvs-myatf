/* global $ */
/* global flatpickr */

class DatePicker { // eslint-disable-line

	constructor($elements) {
		this.$elements = $elements;
	}

	flatpickrOptions = {
		dateFormat: 'd/m/Y',
		maxDate: new Date()
	}

	replaceDateFields() {
		this.$elements.each((i, element) => {
			// Get current values
			const noScriptTag = $(element).find('noscript')[0];
			const noScriptHtml = noScriptTag.textContent || noScriptTag.innerHTML;

			let dayVal = '';
			let monthVal = '';
			let yearVal = '';
			let dateString = '';
			if (noScriptHtml) {
				const tempElement = document.createElement('div');
				tempElement.innerHTML = noScriptHtml;
				dayVal = $("[name^='date-day']", tempElement)[0].value;
				monthVal = $("[name^='date-month']", tempElement)[0].value;
				yearVal = $("[name^='date-year']", tempElement)[0].value;
			}
			if (dayVal !== '' && monthVal !== '' && yearVal !== '') {
				dateString = `${dayVal}/${monthVal}/${yearVal}`;
			}

			$(element).replaceWith(`<input name="date-picker-${i}" class="form-control flatpickr flatpickr-input" placeholder="Select Date.." readonly="readonly" value="${dateString}">`);
		});
	}

	init() {
		this.replaceDateFields();
		new flatpickr('.flatpickr', this.flatpickrOptions); // eslint-disable-line
	}

}
