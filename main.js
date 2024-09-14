const CART = [];
const FAVORITES = [];

fetch("./products.json")
  .then((response) => response.json())
  .then((products) => {
    const productsGrid = document.getElementById("productsGrid");

    products.forEach((product) => {
      productsGrid.innerHTML += `
        <div class="product-card" data-id="${product.id}">
          <div class="product-card__header">
            <span class="product-card__model">${product.model}</span>
            <button
              class="product-card__favorite-btn"
              data-action="favorite"
              id="addBtn"
            >
              <img src="/assets/icons/heart_icon.png" alt="Add to favorites" />
            </button>
          </div>

          <div class="product-card__image">
            <img src="${product.imageUrl}" alt="Product Image" />
          </div>

          <div class="product-card__footer">
            <span class="product-card__price">${product.price}</span>
            <button
              class="product-card__add-to-cart-btn"
              data-action="cart"
              id="addBtn"
            >
              Add to cart
            </button>
          </div>
        </div>
      `;
    });

    const favoriteBtns = Array.from(document.querySelectorAll("#addBtn"));

    favoriteBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.parentElement.parentElement.dataset.id;
        const originalProduct = products.find(({ id }) => id === id);

        const alreadyAdded = (productId, array) =>
          array.some(({ id }) => id === productId);

        switch (btn.dataset.action) {
          case "cart":
            if (alreadyAdded(id, CART)) {
              const index = CART.findIndex(({ id }) => id === id);
              CART[index].quantity++;
            } else {
              CART.push(Object.assign({}, originalProduct, { quantity: 1 }));
            }
            break;
          case "favorite":
            if (!alreadyAdded(id, FAVORITES)) {
              FAVORITES.push(originalProduct);
            } else {
              console.log("Ya esta en tu lista de favoritos");
            }
            break;
        }

        console.log({ CART, FAVORITES });
      });
    });
  })
  .catch((error) => console.error("Error loading JSON:", error));
