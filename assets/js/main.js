/* eslint-disable no-use-before-define */
const contentContainer = document.querySelector('#content-container');
const cartCounterLabel = document.querySelector('#cart-counter-label');

let cartCounter = 0;
let cartPrice = 0;

let basketArr = [];

const btnClickHandler = (e) => {
  const target = e.target;
  const interval = 2000;

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


  addToArr(target);
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

// -------------------------------------------------------------------------------------
const header = document.querySelector('.page-header');
const bntBasket = document.querySelector('.page-header__cart-btn');

function addId() {
  let cont = document.querySelectorAll('.container-fluid');

  let ii = 0;

  for (let i = 0; i <= cont.length - 1; i++) {
    cont[i].setAttribute('data-slide-to', `${++ii}`);
  }
}

function basketStyle() {
  let style = document.createElement('style');

  style.innerHTML = `
    .basket__container {
    position: absolute;
    top: 102px;
    right: 0;
    width: 300px;
    height: 200px;
    background-color: red;
  }`;

  document.head.append(style);
}

function createBasketCont() {
  let basketCont = document.createElement('div');

  basketCont.setAttribute('class', 'basket__container');

  header.appendChild(basketCont);
}

function addToArr(target) {
  let deviceContainer = target.parentElement.parentElement;
  let devTitle = deviceContainer.querySelector('.item-title').innerHTML;
  let devPrice = deviceContainer.querySelector('.item-price').innerHTML;

  devPrice = devPrice.replace(/^\$(\d+).+?(\d+).+$/, '$1.$2');
  let el = {
    data: `${deviceContainer.dataset.slideTo}`,
    title: `${devTitle}`,
    price: `${devPrice}`
  };

  basketArr.push(el);
}

function emptyBasket() {
  let basket = document.querySelector('.basket__container');
  let title = document.createElement('div');
  let btnContainer = document.createElement('div');

  title.setAttribute('class', 'basket__container-empty');
  title.innerHTML = 'В корзине 0 товаров';
  btnContainer.setAttribute('class', 'btn__container');

  basket.appendChild(title);
  basket.appendChild(btnContainer);

  let btnQueryContainer = document.querySelector('.btn__container');

  btnContinue(btnQueryContainer);
}

function fullBasket() {
  let basket = document.querySelector('.basket__container');
  let title = document.createElement('div');
  let btnContainer = document.createElement('div');

  title.setAttribute('class', 'basket__container-full');
  btnContainer.setAttribute('class', 'btn__container');

  basket.appendChild(title);
  basket.appendChild(btnContainer);

  let btnQueryContainer = document.querySelector('.btn__container');

  let res = basketArr.reduce((acc, i) => {
    // eslint-disable-next-line no-prototype-builtins
    if (acc.hasOwnProperty(i.data)) {
      acc[i.data] += 1;
    } else {
      acc[i.data] = 1;
    }

    return acc;
  }, {});

  title.innerHTML = `В корзине ${basketArr.length} товаров`;

  for (let i = 0; i <= basketArr.length - 1; i++) {
    let all = +basketArr[i].data;
    let itemCont = document.createElement('div');

    itemCont.setAttribute('class', 'basket__item-container');

    let query = document.querySelector('class', '.basket__item-container');
    // console.log(basketArr[i]);
    // console.log(basketArr);
    // console.log(all);
    // console.log(typeof all);
    // console.log(basketArr[all]);

    console.log(query.innerHTML);
    console.log(query.innerHTML.includes(basketArr[all - 1].title));
    // if (itemCont.innerHTML.includes(basketArr[all - 1].title)) return;
    itemCont.innerHTML += `
                  <span>${basketArr[i].title}</span>
                  ${res[all]} шт
                  <span>${basketArr[i].price}</span>
                  <i class="fas fa-times basket__item-del"></i>`;

    basket.appendChild(itemCont);
  }


  btnContinue(btnQueryContainer);
  btnClear(btnQueryContainer);
  btnOrder(btnQueryContainer);

}

function btnContinue(cont) {
  let btnCont = document.createElement('button');

  btnCont.setAttribute('class', 'btn btn-primary basket__btn-next');
  btnCont.setAttribute('id', 'btn-next');
  btnCont.setAttribute('type', 'button');

  btnCont.innerHTML = 'Продолжить покупки';

  cont.appendChild(btnCont);
}

function btnClear(cont) {
  let btnCont = document.createElement('button');

  btnCont.setAttribute('class', 'btn btn-primary basket__btn-clear');
  btnCont.setAttribute('type', 'button');

  btnCont.innerHTML = 'Очистить корзину';

  cont.appendChild(btnCont);
}

function btnOrder(cont) {
  let btnCont = document.createElement('button');

  btnCont.setAttribute('class', 'btn btn-primary basket__btn-order');
  btnCont.setAttribute('type', 'submit');

  btnCont.innerHTML = 'Оформить заказ';

  cont.appendChild(btnCont);
}

function createBasketElem() {
  if (basketArr.length === 0) {
    createBasketCont();
    emptyBasket();
  } else {
    createBasketCont();
    fullBasket();

  }
}

addId();

bntBasket.addEventListener('click', createBasketElem);

basketStyle();
