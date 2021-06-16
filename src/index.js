import './main.scss';
window.bootstrap = require('bootstrap/dist/js/bootstrap.bundle.js');
import 'regenerator-runtime/runtime';

// code goes below -- these are examples

[...document.querySelectorAll(`input[type="number"]`)].forEach((e) => {
	e.addEventListener('input', (e) => {
		e.preventDefault();

		convert(e.target);
	});
});

[...document.getElementsByClassName('form-select')].forEach((e) => {
	e.addEventListener('input', (e) => {
		e.preventDefault();
		convert(e.target);
	});
});

async function convert(eventItem) {
	let curOne = document.getElementById('currency1').value;
	let curTwo = document.getElementById('currency2').value;
	let amount;

	switch (eventItem.id) {
		case 'val1':
			document.getElementById('val2').value = await getPrice(
				curOne,
				curTwo,
				eventItem.value
			);
			break;

		case 'val2':
			document.getElementById('val1').value = await getPrice(
				curTwo,
				curOne,
				eventItem.value
			);
			break;

		case 'currency1':
			document.getElementById('val2').value = await getPrice(
				eventItem.value,
				curTwo,
				document.getElementById('val1').value
			);
			break;

		case 'currency2':
			document.getElementById('val1').value = await getPrice(
				eventItem.value,
				curOne,
				document.getElementById('val2').value
			);
			break;
	}

	async function getPrice(baseCur, quoteCur, amount) {
		let data = await fetch(
			`https://api.coinpaprika.com/v1/price-converter?base_currency_id=${baseCur}&quote_currency_id=${quoteCur}&amount=${amount}`
		);
		console.log(baseCur, quoteCur, amount);
		let jsonData = await data.json();
		return jsonData.price;
	}
}
