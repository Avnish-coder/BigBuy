let tbody = document.querySelector("tbody");
let Ids = JSON.parse(localStorage.getItem("productIds"));
let checkBox = document.querySelector(`input[type = "checkbox"]`);
let shipping = document.querySelector(`.shipping`);
let totals = document.querySelectorAll(".new__price.Subtotal");

let products;



window.addEventListener("DOMContentLoaded", async function () {
              products = await getProducts();
              displayCart(products);
              deleteCart();
                addDIP();
              cartTotal.innerText = localStorage.getItem("Items");
             
});

function deleteCart() {
              let trashes = document.querySelectorAll(".trashCane");
              
              trashes.forEach(trash => {
                            // console.log(sibling);
                            trash.addEventListener('click', (e) => {
                                        //   let sibling = parseInt("-" + trash.previousElementSibling.innerText.slice(1));
                                        //   console.log(sibling);

                                          let nIds = Ids.filter((val) => val != e.target.id);
                                        localStorage.setItem("productIds", JSON.stringify(nIds));
                                        //   subT(sibling);
                                           localStorage.setItem("Items",nIds.length );
                                          displayCart();
                                        //   console.log("1");
                                        //   location.reload();
                                        deleteCart();
                                        addDIP();
                                        // localStorage.setItem("Items",nIds.length );
                                        cartTotal.innerText = localStorage.getItem("Items");
                                        
                                          
                            })
              })


}

function displayCart(items) {
              Ids = JSON.parse(localStorage.getItem("productIds"));
              let idsSet = new Set(Ids);

              let filterArr = products.filter((item) => {
                                return idsSet.has(item.id.toString());
              });

              tbody.innerHTML = "";

              filterArr.forEach(product => {
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
                                </tr>`}
              );

            //   deleteCart();
            //   addDIP();
}



function addDIP() {
              const minus = document.querySelectorAll(".minus-btn");
              const plus = document.querySelectorAll(".plus-btn");
              const input = document.querySelectorAll(".counter-btn");
              const aPrice = document.querySelectorAll(".aPrice");
              

              for (let i = 0; i < minus.length; i++) {
                            let currPrice = minus[i].getAttribute("data-price")
                            minus[i].addEventListener("click", () => {

                                          if (input[i].value > 1) {
                                                        input[i].value--;
                                                        aPrice[i].innerText = "$" + input[i].value * parseInt(currPrice);
                                                        subT(getPrice());
                                                        // subT(parseInt(aPrice[i].innerText.slice(1)) - parseInt(currPrice) - parseInt(currPrice));
                                          }
                            });

                            plus[i].addEventListener("click", () => {

                                          input[i].value++;
                                          aPrice[i].innerText = "$" + input[i].value * parseInt(currPrice);
                                        //   subT(parseInt(aPrice[i].innerText.slice(1)) - parseInt(currPrice));
                                        subT(getPrice());
                            });
              }
              function getPrice() {
                let param = 0;
                for (let i = 0; i < aPrice.length; i++) {
                    param += parseInt(aPrice[i].innerText.slice(1));
                    console.log(param);
                    }
                    // subT(param);
                  return param;
              }

              
                subT(getPrice());


}

function subT(price) {
              totals[0].innerText = price;
              totals[1].innerText = price;
              

};



checkBox.addEventListener('change', function () {
    let totalprice = parseInt(totals[0].innerText);
              if (this.checked) {
                            totalprice = "$7";
                            subT(totalprice + 7);

              } else {
                            shipping.innerText = "$0";
                            subT(totalprice - 7);
              }
});