const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZTIxZWY0YmQ0NzAwMTU4NWIyYWUiLCJpYXQiOjE3NjI1MTc1MzQsImV4cCI6MTc2MzcyNzEzNH0.UkXfBihoi1e3xDp22zSbpnBXeJlc_UGECPhIaOGwICw";

const eventsRow = document.getElementById("events-row");
const adminBtn = document.getElementById("admin-btn");
let adminMode = false;

// Click amministratore: mostra/nasconde bottoni modifica/delete
adminBtn.addEventListener("click", () => {
  adminMode = !adminMode;
  renderProducts(); // ricarica prodotti mostrando o nascondendo bottoni
});

// Funzione per creare la card di un prodotto
function createCard(product) {
  const col = document.createElement("div");
  col.classList.add("col");

  const card = document.createElement("div");
  card.classList.add("card", "h-100", "shadow-sm");
  card.style.cursor = "pointer";

  // immagine
  const img = document.createElement("img");
  img.classList.add("card-img-top");
  img.src = product.imageUrl || "https://via.placeholder.com/250x300";
  img.alt = product.name;

  // click immagine -> details
  img.addEventListener("click", () => {
    localStorage.setItem("selectedProduct", JSON.stringify(product));
    window.location.href = "details.html";
  });

  const cardBody = document.createElement("div");
  cardBody.classList.add("card-body");

  const title = document.createElement("h5");
  title.classList.add("card-title");
  title.innerText = product.name;

  const desc = document.createElement("p");
  desc.classList.add("card-text");
  desc.innerText = product.description;

  const price = document.createElement("p");
  price.classList.add("card-text", "fw-bold");
  price.innerText = `€${product.price}`;

  cardBody.appendChild(title);
  cardBody.appendChild(desc);
  cardBody.appendChild(price);

  // bottoni admin solo se adminMode
  if (adminMode) {
    const btnGroup = document.createElement("div");
    btnGroup.classList.add("d-flex", "justify-content-between");

    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "btn-sm", "btn-primary");
    editBtn.innerText = "Modifica";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("Sicuro di voler modificare questo prodotto?")) {
        window.location.href = `backoffice.html?id=${product._id}`;
      }
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("btn", "btn-sm", "btn-danger");
    deleteBtn.innerText = "Elimina";
    deleteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      if (confirm("Sicuro di voler eliminare questo prodotto?")) {
        fetch(`${API_URL}${product._id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${TOKEN}` },
        })
          .then((res) => {
            if (!res.ok) throw new Error("Errore eliminazione prodotto");
            renderProducts();
          })
          .catch((err) => alert(err));
      }
    });

    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);
    cardBody.appendChild(btnGroup);
  }

  card.appendChild(img);
  card.appendChild(cardBody);
  col.appendChild(card);

  return col;
}

// Recupera prodotti dal server
function renderProducts() {
  eventsRow.innerHTML = ""; // reset
  fetch(API_URL, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
    .then((res) => res.json())
    .then((products) => {
      if (!products.length) {
        eventsRow.innerHTML = "<p class='text-center'>Nessun prodotto disponibile</p>";
        return;
      }
      products.forEach((prod) => {
        const card = createCard(prod);
        eventsRow.appendChild(card);
      });
    })
    .catch((err) => console.error(err));
}

// inizializza pagina
renderProducts();
