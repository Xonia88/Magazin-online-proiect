window.addEventListener("DOMContentLoaded", displayProducts);

const URL = "https://68f2b639fd14a9fcc426bb04.mockapi.io/kendame";

function displayProducts() {
  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Eroare la preluarea produselor!");
      }
      return response.json();
    })
    .then((products) => {
      document.querySelector(".produse").innerHTML = products
        .map(
          (product) => `
        <div class="produs">
          <img src="${product.imageURL}" alt="${product.name}" />
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>${product.category || "Kendama"}</p>
            <div class="price"><strong>${product.price} LEI</strong></div>
            <div class="buttons">
              <a href="details.html?id=${
                product.id
              }" class="detalii">Detalii</a>
              <button class="cart-btn" onclick="addToCart(${product.id})">
                <i class="fa-solid fa-cart-plus"></i> Adaugă în coș
              </button>
            </div>
          </div>
        </div>
      `
        )
        .join("");
    })
    .catch(() => {
      document.querySelector(".produse").innerHTML =
        "<p style='color:red;'>Eroare la încărcarea produselor.</p>";
    });
}

function addToCart(productId) {
  fetch(`${URL}/${productId}`)
    .then((res) => res.json())
    .then((product) => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existing = cart.find((item) => item.id === product.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        product.quantity = 1;
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      updateCartBadge();
      alert(`${product.name} a fost adăugat în coș!`);
    });
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}

updateCartBadge();
