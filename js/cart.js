let tbody = document.querySelector("tbody");
let Ids = JSON.parse(localStorage.getItem("productIds"));
let checkBox = document.querySelector(`input[type = "checkbox"]`);
let shipping = document.querySelector(`.shipping`);
let totals = document.querySelectorAll(".new__price.Subtotal");

let products;

// console.log(Ids);
window.addEventListener("DOMContentLoaded", async function () {
              products = await getProducts();
              displayCart(products);
              deleteCart();
});

function deleteCart() {
              let trashes = document.querySelectorAll(".trashCane");
              
              trashes.forEach(trash => {
                           
                            // console.log(typeof sibling);

                            // console.log(sibling);
                            trash.addEventListener('click', (e) => {
                                          // let sibling = parseInt("-" + trash.previousElementSibling.innerText.slice(1));
                                          // console.log(sibling);
                                          // e.preventDefault();
                                          let nIds = Ids.filter((val) => val != e.target.id);
                                          // console.log(nIds);

                                          localStorage.setItem("productIds", JSON.stringify(nIds));
                                          // subT(sibling);
                                          displayCart();
                                          
                            })
              })


}

function displayCart(items) {
              Ids = JSON.parse(localStorage.getItem("productIds"));
              let idsSet = new Set(Ids);


              // console.log("ssas" , idsSet);

              let filterArr = products.filter((item) => {
                            // console.log(item);

                            return idsSet.has(item.id.toString());

              });


              tbody.innerHTML = "";
              // console.log(filterArr);


              let displayProduct = filterArr.forEach(product => {
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


              deleteCart();
              addDIP();

}



function addDIP() {

              const minus = document.querySelectorAll(".minus-btn");
              const plus = document.querySelectorAll(".plus-btn");
              const input = document.querySelectorAll(".counter-btn");

              const newprice = document.querySelectorAll(".new__price");
              const aPrice = document.querySelectorAll(".aPrice");
              let param = 0;


              // console.log();

              for (let i = 0; i < minus.length; i++) {
                            let currPrice = minus[i].getAttribute("data-price")



                            minus[i].addEventListener("click", () => {
                                          // let iPrice = input[i].value * parseInt(currPrice);

                                          if (input[i].value > 1) {
                                                        input[i].value--;
                                                        aPrice[i].innerText = "$" + input[i].value * parseInt(currPrice);


                                                        subT(parseInt(aPrice[i].innerText.slice(1)) - parseInt(currPrice) - parseInt(currPrice));

                                          }
                            });


                            plus[i].addEventListener("click", () => {
                                          let iPrice = input[i].value * parseInt(currPrice);

                                          input[i].value++;
                                          aPrice[i].innerText = "$" + input[i].value * parseInt(currPrice);
                                          subT(parseInt(aPrice[i].innerText.slice(1)) - parseInt(currPrice));


                            });
              }

              for (let i = 0; i < aPrice.length; i++) {
                            param += parseInt(aPrice[i].innerText.slice(1));
                            console.log(param);
              }


              subT(param);



}

function subT(price) {
              // console.log(price);
              totals[0].innerText = parseInt(totals[0].innerText) + price;

              // console.log(totals[0].innerText);

              totals[1].innerText = parseInt(totals[1].innerText) + price;
              // totals[1].innerText = 
              // console.log(totals[1].innerText);

};

// checkBox.addEventListener('change',()=>{
//               console.log(this.checked);
//               shipping.innerText = "$7";

// })

checkBox.addEventListener('change', function () {
              if (this.checked) {
                            shipping.innerText = "$7";
                            subT(7);

              } else {
                            shipping.innerText = "$0";
                            subT(-7);
              }
});