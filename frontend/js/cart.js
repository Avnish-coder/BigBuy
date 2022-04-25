let tbody = document.querySelector("tbody");
let Ids;
let checkBox = document.querySelector(`input[type = "checkbox"]`);
let shipping = document.querySelector(`.shipping`);
let totals = document.querySelectorAll(".new__price.Subtotal");

let products;

window.addEventListener("DOMContentLoaded", async function () {
  Ids = await getCartArray();
  products = await getProducts();

  await getCartItem();
  await displayCart(products);
  deleteCart();
  addDIP();
});

async function getCartItem() {
  const results = await fetch("/getCart");
  const data = await results.json();
  const items = data.carts[0].items;

  cartTotal.innerText = items;
}

async function setCartItems(id, items) {
  const results = await fetch("/postCart", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: items, productIds: id }),
  });
}

function deleteCart() {
  let trashes = document.querySelectorAll(".trashCane");
  trashes.forEach((trash) => {
    trash.addEventListener("click", async (e) => {
      let nIds = Ids.filter((val) => val != e.target.id);
      console.log(nIds);
      console.log(nIds.length);
      console.log("delete Cart");

      await setCartItems(nIds, nIds.length);
      await displayCart();

      deleteCart();
      addDIP();

      await getCartItem();
    });
  });
}

async function getCartArray() {
  const results = await fetch("/getCart");
  const data = await results.json();
  const items = data.carts[0].productIds;

  return items;
}

async function displayCart(items) {
  Ids = await getCartArray();

  let idsSet = new Set(Ids);

  let filterArr = products.filter((item) => {
    return idsSet.has(item.id.toString());
  });

  tbody.innerHTML = "";

  filterArr.forEach((product) => {
    tbody.innerHTML += `<tr>
                                <td class="product__thumbnail">
                                    <a href="#">
                                        <img src="${product.image}" alt="">
                                    </a>
                                </td>
                                <td class="product__name">
                                    <a href="#">${product.title}</a>
                                    <br><br>
                                    <small>White/6.25</small>
                                </td>
                                <td class="product__price">
                                    <div class="price">
                                        <span class="new__price"> $${product.price}</span>
                                    </div>
                                </td>
                                <td class="product__quantity">
                                    <div class="input-counter">
                                        <div>
                                          <i class="fa fa-minus minus-btn" data-price ="${product.price}" style = "font-size : 20px" aria-hidden="false"></i>
                                            <input type="text" min="1" value="1" max="10" class="counter-btn">
                                          <i class="fa fa-plus plus-btn" data-price ="${product.price}" style = "font-size : 20px" aria-hidden="false"></i>
                                        </div>
                                    </div>
                                </td>
                                <td class="product__subtotal">
                                    <div class="price">
                                        <span class="new__price aPrice" data-aPrice = "${product}"> $${product.price}</span>
                                    </div>
                                    <i class="fa fa-trash remove__cart-item trashCane" id="${product.id}" style = "font-size : 20px" aria-hidden="false"></i>
                                </td>
                                </tr>`;
  });
}

function addDIP() {
  const minus = document.querySelectorAll(".minus-btn");
  const plus = document.querySelectorAll(".plus-btn");
  const input = document.querySelectorAll(".counter-btn");
  const aPrice = document.querySelectorAll(".aPrice");

  for (let i = 0; i < minus.length; i++) {
    let currPrice = minus[i].getAttribute("data-price");
    minus[i].addEventListener("click", () => {
      if (input[i].value > 1) {
        input[i].value--;
        aPrice[i].innerText = "$" + input[i].value * parseInt(currPrice);
        subT(getPrice());
      }
    });

    plus[i].addEventListener("click", () => {
      input[i].value++;
      aPrice[i].innerText = "$" + input[i].value * parseInt(currPrice);

      subT(getPrice());
    });
  }

  function getPrice() {
    let param = 0;
    for (let i = 0; i < aPrice.length; i++) {
      param += parseInt(aPrice[i].innerText.slice(1));
    }

    return param;
  }

  subT(getPrice());
}

function subT(price) {
  totals[0].innerText = price;
  totals[1].innerText = price;
}

checkBox.addEventListener("change", function () {
  let totalprice = parseInt(totals[0].innerText);
  if (this.checked) {
    totalprice = "$7";
    subT(totalprice + 7);
  } else {
    shipping.innerText = "$0";
    subT(totalprice - 7);
  }
});
