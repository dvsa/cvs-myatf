/* global $ */
/* window $ */

class AddPrintBtn { // eslint-disable-line

	printBtn = '<div><a href="#" id="atf-print-btn">Print history report</a></div>';
	printReceipt = '<div><a href="#" id="atf-print-btn">Print payment receipt</a></div>';

	add = () => {
		$('#atf-print-replace').replaceWith(this.printBtn);
		$('#atf-print-receipt').replaceWith(this.printReceipt);
		$('#atf-print-btn').click(this.onClick);
	}

	onClick = (event) => {
		event.preventDefault();
		// TODO: Add js & css to print only the releavant parts of the page
		window.print();
	}

}
