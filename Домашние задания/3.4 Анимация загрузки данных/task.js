const loader = document.getElementById('loader');
const items = document.getElementById('items');
const requestUrl = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

// Заведение разметки для одной валюты
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

// Очистка контейнера и foreach вывод значений валют
function renderCurrencies(currencies) {
  items.textContent = '';

  Object.values(currencies).forEach(function (currency) {
    const currencyItem = createCurrencyItem(currency);

    items.appendChild(currencyItem);
  });
}

// Сокрытие анимации загрузки
function hideLoader() {
  loader.classList.remove('loader_active');
}

// Фунция отправки GET-запроса и парсинга ответа API с последующим вызовом нижестоящих функций по рендеру и поведению загрузчика
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