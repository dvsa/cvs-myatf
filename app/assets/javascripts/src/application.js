/* global $ */
/* global GOVUK */
/* global DatePicker */
/* global AddPrintBtn */
/* global window */

$(document).ready(() => {
	const path = window.location.pathname;
	// Use GOV.UK shim-links-with-button-role.js to trigger a link styled to look like a button,
	// with role="button" when the space key is pressed.
	GOVUK.shimLinksWithButtonRole.init();

	// Details/summary polyfill from frontend toolkit
	GOVUK.details.init();

	// Show and hide toggled content
	// Where .multiple-choice uses the data-target attribute
	// to toggle hidden content
	const showHideContent = new GOVUK.ShowHideContent();
	showHideContent.init();

	// Date picker
	// TODO: Move into separate file once we have a module loader for the client
	if (path.indexOf('history') > -1 ||
		path.indexOf('test-details') > -1 ||
		path.indexOf('payment-receipt') > -1) {
		const fieldsToReplace = $('.atf-flatpickr-replace');
		const datePicker = new DatePicker(fieldsToReplace);
		const addPrintBtn = new AddPrintBtn();
		datePicker.init();
		addPrintBtn.add();
	}
});
