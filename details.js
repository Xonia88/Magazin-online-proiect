const API_URL = "https://68f2b639fd14a9fcc426bb04.mockapi.io/kendame";
const container = document.getElementById("product-details");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

window.addEventListener("DOMContentLoaded", () => {
  updateCartBadge();
  if (!id) {
    container.innerHTML = "<p style='color:red;'>Produsul nu a fost găsit.</p>";
    return;
  }

  fetch(`${API_URL}/${id}`)
    .then((res) => res.json())
    .then((produs) => {
      container.innerHTML = `
        <div class="produs-detalii">
          <img src="${produs.imageURL}" alt="${
        produs.name
      }" style="width:300px; border-radius:10px;" />
          <h2>${produs.name}</h2>
          <p><strong>Preț:</strong> ${produs.price} LEI</p>
          <p><strong>Categorie:</strong> ${produs.category || "Standard"}</p>
          <p><strong>Descriere:</strong> ${
            produs.description ||
            "Kendama de calitate superioară pentru toate nivelurile."
          }</p>
          <button id="add-to-cart" class="cart-btn"><i class="fa-solid fa-cart-plus"></i> Adaugă în coș</button>
        </div>
      `;
      document
        .getElementById("add-to-cart")
        .addEventListener("click", () => addToCart(produs));
    });
});

function addToCart(produs) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existing = cart.find((item) => item.id === produs.id);

  if (existing) {
    existing.quantity += 1;
  } else {
    produs.quantity = 1;
    cart.push(produs);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartBadge();
  alert(`${produs.name} a fost adăugat în coș!`);
}

function updateCartBadge() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.textContent = count;
}
