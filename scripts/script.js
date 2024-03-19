const btn = document.querySelector("#main-action-btn");
const menu = document.querySelector("#products");
const listWithlinks = document.querySelector(".menu-list");
const productBtns = document.querySelectorAll(".product-button");
const orderBtn = document.querySelector("#order-action");
const orderInputs = document.querySelectorAll(
  ".order-form-input > label > input"
);
const currency = document.querySelector("#change-currency");
const productsItemPrice = document.querySelectorAll(".products-item-price");

const scrollToMenu = () => {
  menu.scrollIntoView({ behavior: "smooth" });
};

const anchorLinks = (event) => {
  if (event.target.closest("a")) {
    const dataLink = event.target.getAttribute("data-link");
    document
      .querySelector(`#${dataLink}`)
      .scrollIntoView({ behavior: "smooth" });
  }
  if (event.target.closest("button")) {
    document.querySelector("#order").scrollIntoView({ behavior: "smooth" });
  }
};

const validateForm = () => {
  let hasError = false;
  orderInputs.forEach((item) => {
    if (!item.value) {
      item.parentElement.parentElement.style.background = "red";
      hasError = !hasError;
    } else {
      item.parentElement.parentElement.style.background = "";
    }
  });

  if (!hasError) {
    orderInputs.forEach((item) => {
      item.value = "";
    });
    alert("Thanks for order!");
  }
};

const changeCurrency = (e) => {
  let currentCurrency = e.target.innerHTML;
  let newCurrency = "$";
  let coefficient = 1;

  if (currentCurrency === "$") {
    newCurrency = "€";
    coefficient = 0.92;
  } else if (currentCurrency === "€") {
    newCurrency = "£";
    coefficient = 0.79;
  }else if (currentCurrency === '£') {
    newCurrency = '¥';
    coefficient = 6.9;
  }

  e.target.innerText = newCurrency;
  productsItemPrice.forEach((item) => {
    item.innerHTML =
      (item.getAttribute("data-base-price") * coefficient).toFixed(1) +
      "" +
      newCurrency;
  });
};

btn.addEventListener("click", scrollToMenu);
listWithlinks.addEventListener("click", anchorLinks);
productBtns.forEach((item) => {
  item.addEventListener("click", anchorLinks);
});
orderBtn.addEventListener("click", validateForm);
currency.addEventListener("click", changeCurrency);
