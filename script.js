let cart = [];

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
  console.log(cart);
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
          <p>${item.name}</p>
          <p>${item.price}</p>
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
  updateCartDisplay();
}
