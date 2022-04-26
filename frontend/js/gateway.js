const submitBtn = document.querySelector(".submit-btn");
async function gatewayPrice() {
  let price = await fetchPrice();
  console.log(price);
  submitBtn.setAttribute("value" , `${"Pay $" + price}`)
}

gatewayPrice()

async function fetchPrice() {
  const results = await fetch("/cartProductPrice");
  const data = await results.json();
  const items = data.price;

  return items;
}
