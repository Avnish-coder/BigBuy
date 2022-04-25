const getProducts = async () => {
  try {
    const results = await fetch("/products");
    const data = await results.json();
    const products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};
/*
=============
Load Category Products
=============
 */

let cartTotal = document.querySelector("#cart__total");
const categoryCenter = document.querySelector(".category__center");

window.addEventListener("DOMContentLoaded", async function () {
  const products = await getProducts();
  displayProductItems(products);
  addCart();
  subscribe();
  cartTotal.innerText = await getCartItem1();
});

const displayProductItems = (items) => {
  let displayProduct = [];
  for (let i = 0; i < items.length; i++) {
    let product = items[i];
    let temp = ` 
      <div class="product category__products">
        <div class="product__header">
          <img src=${product.image} alt="product">
        </div>
        <div class="product__footer">
          <h3>${product.title}</h3>
          <div class="rating">
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-full"></use>
            </svg>
            <svg>
              <use xlink:href="./images/sprite.svg#icon-star-empty"></use>
            </svg>
          </div>
          <div class="product__price">
            <h4>$${product.price}</h4>
          </div>
          <button type="submit" class="product__btn"  id = "${product.id}">Add To Cart</button>
        </div>
      <ul>
          <li>
            <a data-tip="Quick View" class = "view" id = "${product.id}" data-place="left" >
              <svg>
                <use xlink:href="./images/sprite.svg#icon-eye"></use>
              </svg>
            </a>
          </li>
          <li>
            <a data-tip="Add To Wishlist" data-place="left" href="#">
              <svg>
                <use xlink:href="./images/sprite.svg#icon-heart-o"></use>
              </svg>
            </a>
          </li>
          <li>
            <a data-tip="Add To Compare" data-place="left" href="#">
              <svg>
                <use xlink:href="./images/sprite.svg#icon-loop2"></use>
              </svg>
            </a>
          </li>
      </ul>
      </div>
      `;
    displayProduct.push(temp);
  }
  displayProduct = displayProduct.join("");
  if (categoryCenter) {
    categoryCenter.innerHTML = displayProduct;
    addEven();
  }
};

/*
=============
Filtering
=============
 */

const filterBtn = document.querySelectorAll(".filter-btn");
const categoryContainer = document.getElementById("category");

if (categoryContainer) {
  categoryContainer.addEventListener("click", async (e) => {
    const target = e.target.closest(".section__title");
    if (!target) return;

    const id = target.dataset.id;
    const products = await getProducts();

    if (id) {
      // remove active from buttons
      Array.from(filterBtn).forEach((btn) => {
        btn.classList.remove("active");
      });
      target.classList.add("active");

      // Load Products
      let menuCategory = products.filter((product) => {
        if (product.category === id) {
          return product;
        }
      });

      if (id === "All Products") {
        displayProductItems(products);
        addCart();
      } else {
        displayProductItems(menuCategory);
        addCart();
      }
    }
  });
}

/*
=============
Product Details Left
=============
 */
const pic1 = document.getElementById("pic1");
const pic2 = document.getElementById("pic2");
const pic3 = document.getElementById("pic3");
const pic4 = document.getElementById("pic4");
const pic5 = document.getElementById("pic5");
const picContainer = document.querySelector(".product__pictures");
const zoom = document.getElementById("zoom");
const pic = document.getElementById("pic");

// Picture List
const picList = [pic1, pic2, pic3, pic4, pic5];

// Active Picture
let picActive = 1;

["mouseover", "touchstart"].forEach((event) => {
  if (picContainer) {
    picContainer.addEventListener(event, (e) => {
      const target = e.target.closest("img");
      if (!target) return;
      const id = target.id.slice(3);
      changeImage(`./images/products/iPhone/iphone${id}.jpeg`, id);
    });
  }
});

// change active image
const changeImage = (imgSrc, n) => {
  // change the main image
  pic.src = imgSrc;
  // change the background-image
  zoom.style.backgroundImage = `url(${imgSrc})`;
  //   remove the border from the previous active side image
  picList[picActive - 1].classList.remove("img-active");
  // add to the active image
  picList[n - 1].classList.add("img-active");
  //   update the active side picture
  picActive = n;
};

/*
=============
Product Details Bottom
=============
 */

const btns = document.querySelectorAll(".detail-btn");
const detail = document.querySelector(".product-detail__bottom");
const contents = document.querySelectorAll(".content");

if (detail) {
  detail.addEventListener("click", (e) => {
    const target = e.target.closest(".detail-btn");
    if (!target) return;

    const id = target.dataset.id;
    if (id) {
      Array.from(btns).forEach((btn) => {
        // remove active from all btn
        btn.classList.remove("active");
        e.target.closest(".detail-btn").classList.add("active");
      });
      // hide other active
      Array.from(contents).forEach((content) => {
        content.classList.remove("active");
      });
      const element = document.getElementById(id);
      element.classList.add("active");
    }
  });
}

// shop now button

// searching by typing starts

const searchForm = document.querySelector("#search-form");
// console.log(searchForm);
const searchFormInput = searchForm.querySelector("input"); // <=> document.querySelector("#search-form input");

searchFormInput.addEventListener("keypress", async function (e) {
  searchProduct(e.target.value);
});

async function searchProduct(input) {
  let productSearching = await getProducts();
  // console.log(productSearching);
  if (input == "") {
    const products = await getProducts();
    displayProductItems(products);
    addCart();
    return;
  }

  let products = productSearching.filter(function (prd) {
    return prd.title.toLowerCase() == input.toLowerCase();
  });
  document.getElementById("category").scrollIntoView();
  displayProductItems(products);
  addCart();
}

// The speech recognition interface lives on the browser’s window object

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition; // if none exists -> undefined

if (SpeechRecognition) {
  console.log("Your Browser supports speech Recognition");

  const recognition = new SpeechRecognition();
  recognition.continuous = true;
  // recognition.lang = "en-US";

  searchForm.insertAdjacentHTML(
    "beforeend",
    ' <button type="button" class="icon__item icon__cart" ><i class="fa fa-microphone" aria-hidden="true" style = "width : 17px" ></i></i></button>'
  );
  searchFormInput.style.paddingRight = "50px";

  const micBtn = searchForm.querySelector("button");
  const micIcon = micBtn.firstElementChild;

  micBtn.addEventListener("click", micBtnClick);

  function micBtnClick() {
    if (micIcon.classList.contains("fa-microphone")) {
      // Start Voice Recognition
      recognition.start(); // First time you have to allow access to mic!
    } else {
      recognition.stop();
    }
  }

  recognition.addEventListener("start", startSpeechRecognition); // <=> recognition.onstart = function() {...}
  function startSpeechRecognition() {
    micIcon.classList.remove("fa-microphone");
    micIcon.classList.add("fa-microphone-slash");
    searchFormInput.focus();
    console.log("Voice activated, SPEAK");
  }

  recognition.addEventListener("end", endSpeechRecognition); // <=> recognition.onend = function() {...}
  function endSpeechRecognition() {
    micIcon.classList.remove("fa-microphone-slash");
    micIcon.classList.add("fa-microphone");
    searchFormInput.focus();
    console.log("Speech recognition service disconnected");
  }

  recognition.addEventListener("result", resultOfSpeechRecognition); // <=> recognition.onresult = function(event) {...} - Fires when you stop talking
  function resultOfSpeechRecognition(event) {
    const current = event.resultIndex;
    const transcript = event.results[current][0].transcript;

    searchFormInput.value = transcript;
    // if(transcript != ""){
    //   searchProduct(transcript);
    // }else{
    //   await getProducts();
    // }
    searchProduct(transcript);

    console.log(transcript);
  }
} else {
  console.log("Your Browser does not support speech Recognition");
}

async function getCartItem1() {
  const results = await fetch("/getCart");
  const data = await results.json();
  const items = data.carts[0].items;
  // console.log(items);
  // cartTotal.innerText = localStorage.getItem("Items");
  return items;
}

async function setCartItems1(id, items) {
  console.log(id);
  console.log(items);
  const results = await fetch("/postCart", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items: id, productIds: items }),
  });

  // cartTotal.innerText = localStorage.getItem("Items");
  // cartTotal.innerText = items
}

// searching by typing end

// increase plus minus

// adding functionality

// rendering products
let productIds = new Set();

function addCart() {
  let cartButton = document.querySelectorAll(".product__btn");

  // console.log(tbody);

  for (let i = 0; i < cartButton.length; i++) {
    cartButton[i].addEventListener("click", async function (e) {
      // let getItem = localStorage.getItem("Items") || 0;
      let getItem = await getCartItem1();
      getItem = parseInt(getItem);
      cartTotal.innerText = getItem + 1;

      productIds.add(e.target.id);
      // console.log(productIds);
      let eArr = [];
      productIds.forEach((val) => {
        eArr.push(val);
      });

      // console.log(JSON.stringify(productIds));
      // localStorage.setItem("productIds", JSON.stringify(eArr));
      // localStorage.setItem("Items", getItem + 1);
      await setCartItems1(getItem + 1, eArr);
    });
  }
}

function addEven() {
  let view1 = document.querySelectorAll("a[data-tip='Quick View']");
  view1.forEach((val) => {
    val.addEventListener("click", (e) => {
      // location.pathname = "/pro/" +e.target.id
      location.pathname = "/pro";
      console.log(view1.length);
    });
  });
}

const profile = document.querySelectorAll(".icon__item");


profile[0].addEventListener("mouseenter", () => {
  console.log("avnish");
  location.pathname = "/auth";
});

profile[2].addEventListener("mouseenter", () => {
  location.pathname = "/cart";
});

function subscribe() {
  const val = document.querySelectorAll("input[type='email']");
  const subscribe = document.querySelectorAll(".newsletter__link") 

  for(let i = 0; i < subscribe.length; i++){
    subscribe[i].addEventListener("click", async()=>{
     let res  = await axios.post("/subscribed",{email : val[i].value})
     subscribe[i].innerText = "subscribed"
    // console.log("happy");
    })
  }
  
  
}
