// Displaying the product+
const container = document.getElementById("products-container");

products.forEach((product) => {
  const productDiv = document.createElement("div");
  productDiv.classList.add("product");
  productDiv.dataset.name = product.name;
  productDiv.dataset.price = product.price;
  productDiv.dataset.image = product.image;

  productDiv.innerHTML = `
        <div class="product-image">
          <img
            src="${product.image}"
            alt="${product.name}"
          />
        </div>
        <div class="product-info">
          <div class="product-name">${product.name}</div>
          <div class="product-price">₱ ${product.price}</div>
        </div>
  `;

  container.appendChild(productDiv);
});
//
let cart = [];
window.addEventListener("load", loadCart);

// Make each tile working
document.querySelectorAll(".product-image").forEach(function (click) {
  click.addEventListener("click", function () {
    const product = click.parentElement;
    const name = product.dataset.name;
    const price = parseFloat(product.dataset.price);
    const image = product.dataset.image;
    console.log(name + " " + price + " " + image);
    addToCart(name, price, image);
  });
});

function addToCart(name, price, image) {
  cart.push({ name, price, image });
  saveCart();
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartList = document.getElementById("cart");
  const cartTotal = document.getElementById("total");
  cartList.innerHTML = "";

  let total = 0;

  cart.forEach(function (item, index) {
    total += item.price;

    const li = document.createElement("li");
    li.innerHTML = `
  <div class="cart-item">
          <img
            src="${item.image}"
          />
          <p>${item.name} - ₱ ${item.price}</p>
          <button class="removeBtn">Remove</button>
        </div>
  `;
    const removeBtn = li.querySelector(".removeBtn");
    removeBtn.addEventListener("click", () => removeFromCart(index));

    cartList.appendChild(li);
  });

  cartTotal.innerHTML = `Total: P${total}`;
}

function removeFromCart(index) {
  cart.splice(index, 1);
  saveCart();
  updateCartDisplay();
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const storedCart = localStorage.getItem("cart");
  if (storedCart) {
    cart = JSON.parse(storedCart);
    updateCartDisplay(); // show saved cart immediately
  }
}
