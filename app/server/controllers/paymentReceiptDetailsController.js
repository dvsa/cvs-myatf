import DataService from '../services/data';
import HistoryData from '../models/historyData';
import PaymentReceiptDetailsAdapter from '../adapters/paymentReceiptDetailsAdapter';

const dataService = new DataService();

export default (req, res) => {

	dataService.getPaymentReceiptDetails(10, 0, {}, PaymentReceiptDetailsAdapter.Process)
		.then((result) => {
			const historyData = new HistoryData({}, result);
			res.render('prototype/payment-receipt', historyData);
		});
};
