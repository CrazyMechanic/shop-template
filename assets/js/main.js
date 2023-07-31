/* eslint-disable newline-after-var */
/* eslint-disable no-use-before-define */
const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

// -------------------
const btnBasket = document.getElementById('btn-basket');
const navbar = document.getElementById('navbarSupportedContent');
let basketContainer = document.querySelector('#basket__container');
// ------------------------

let cartCounter = 0;
let cartPrice = 0;

let devicesArr = [];

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;

  // -------------------------
  const element = target.parentElement.parentElement;
  const title = element.querySelector('.item-title');
  // ------------------------------
  let restoreHTML = null;

  if (typeof target !== 'object') return;
  if (!target.matches('.item-actions__cart')) return;

  incrementCounter(cartCounterLabel, ++cartCounter);

  cartPrice = getPrice(target, cartPrice, getMockData);

  restoreHTML = target.innerHTML;
  target.innerHTML = `Added ${cartPrice.toFixed(2)} $`;

  disableControls(target, contentContainer, btnClickHandler);

  setTimeout(() => {
    target.innerHTML = restoreHTML;
    enableControls(target, contentContainer, btnClickHandler);
  }, interval);

  // ------------------------
  const device = {
    data: +element.dataset.device,
    title: title.innerHTML,
    price: getMockData(target)
  };

  devicesArr.push(device);

  // ---------------------------

};

contentContainer.addEventListener('click', btnClickHandler);

function incrementCounter($label, cn) {
  $label.innerHTML = cn;
  if (cn === 1) $label.style.display = 'block';
}

function getMockData(t) {
  return +t.parentElement
    .previousElementSibling
    .innerHTML
    .replace(/^\$(\d+).+?(\d+).+$/, '$1.$2');
}

function getPrice(t, p, cb) {
  return Math.round((p + cb(t)) * 100) / 100;
}

function disableControls(t, $el, fn) {
  t.disabled = true;
  $el.removeEventListener('click', fn);
}

function enableControls(t, $el, fn) {
  t.disabled = false;
  $el.addEventListener('click', fn);
}

// ----------------------------------------

btnBasket.addEventListener('click', openCloseBasket);

function openCloseBasket() {
  if (!basketContainer) {
    createBasketContainer();
  } else {
    basketContainer.remove();
    basketContainer = null;
  }
}

function createBasketContainer() {
  basketContainer = document.createElement('div');
  let deviceContainer = document.createElement('div');

  deviceContainer.setAttribute('class', 'device__container');
  basketContainer.setAttribute('class', 'basket__container');

  basketContainer.appendChild(deviceContainer);
  navbar.appendChild(basketContainer);

  createDeviceItem();
}

function createDeviceItem() {
  let deviceContainer = document.querySelector('.device__container');

  for (let i = 0; i < devicesArr.length; i++) {
    let deviceItemDiv = document.createElement('div');
    let deviceTitle = document.createElement('h3');
    let devicePrice = document.createElement('p');

    deviceTitle.setAttribute('class', 'device__title');
    devicePrice.setAttribute('class', 'device__price');
    deviceItemDiv.setAttribute('class', `device__item device__item-${i + 1}`);

    deviceTitle.innerHTML = devicesArr[i].title;
    devicePrice.innerHTML = devicesArr[i].price;

    let deviceItem = document.querySelector(`.device__item-${i + 1}`);

    deviceItemDiv.appendChild(deviceTitle);
    deviceItemDiv.appendChild(devicePrice);
    deviceContainer.appendChild(deviceItemDiv);
  }

  createSumPriceDiv(basketContainer);
}

function createSumPriceDiv(container) {
  let deviceSumPrice = document.createElement('div');
  let sumPrice = document.createElement('p');

  deviceSumPrice.setAttribute('class', 'device__sum-container');
  sumPrice.setAttribute('class', 'device__sum');

  sumPrice.innerHTML = cartPrice;

  deviceSumPrice.appendChild(sumPrice);
  container.appendChild(deviceSumPrice);
}

// ---------------------------
function createDataSet() {
  const itemContainerArr = document.getElementsByClassName('container-fluid');

  for (let i = 0; i < itemContainerArr.length; i++) {
    itemContainerArr[i].setAttribute('data-device', `${i}`);
  }
}

createDataSet();
// ---------------------------
