const loader = document.getElementById('loader');
const items = document.getElementById('items');
const requestUrl = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';



function createCurrencyItem(currency) {
  const item = document.createElement('div');
  const itemCode = document.createElement('div');
  const itemValue = document.createElement('div');
  const itemCurrency = document.createElement('div');

  item.classList.add('item');
  itemCode.classList.add('item__code');
  itemValue.classList.add('item__value');
  itemCurrency.classList.add('item__currency');

  itemCode.textContent = currency.CharCode;
  itemValue.textContent = currency.Value;
  itemCurrency.textContent = 'руб.';

  item.appendChild(itemCode);
  item.appendChild(itemValue);
  item.appendChild(itemCurrency);

  return item;
}

function renderCurrencies(currencies) {
  Object.values(currencies).forEach(function (currency) {
    const currencyItem = createCurrencyItem(currency);

    items.appendChild(currencyItem);
  });
}

function hideLoader() {
  loader.classList.remove('loader_active');
}

function loadCurrencies() {
  const request = new XMLHttpRequest();

  request.open('GET', requestUrl);

  request.addEventListener('load', function () {
    const data = JSON.parse(request.responseText);
    const currencies = data.response.Valute;

    renderCurrencies(currencies);
    hideLoader();
  });

  request.addEventListener('error', function () {
    hideLoader();
  });

  request.send();
}

loadCurrencies();