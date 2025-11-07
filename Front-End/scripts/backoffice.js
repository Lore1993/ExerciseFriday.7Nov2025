const API_URL = "https://striveschool-api.herokuapp.com/api/product/";
const TOKEN = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2OTBkZTIxZWY0YmQ0NzAwMTU4NWIyYWUiLCJpYXQiOjE3NjI1MTc1MzQsImV4cCI6MTc2MzcyNzEzNH0.UkXfBihoi1e3xDp22zSbpnBXeJlc_UGECPhIaOGwICw";

const form = document.getElementById("event-form");
const previewImage = document.getElementById("previewImage");
const errorMsg = document.getElementById("errorMsg");

// Funzione per prendere ID dalla query string (modifica)
function getProductIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

// Se è modifica, carica i dati esistenti
const productId = getProductIdFromURL();
if (productId) {
  fetch(`${API_URL}${productId}`, {
    headers: { Authorization: `Bearer ${TOKEN}` }
  })
    .then(res => res.json())
    .then(product => {
      document.getElementById("nomeEdAutore").value = product.name;
      document.getElementById("genereCasaEditrice").value = product.description;
      document.getElementById("price").value = product.price;
      document.getElementById("imageUrl").value = product.imageUrl;
      previewImage.src = product.imageUrl;
      previewImage.classList.remove("d-none");
    })
    .catch(err => console.error(err));
}

// Anteprima immagine locale o URL
document.getElementById("imageUrl").addEventListener("input", e => {
  const url = e.target.value;
  if (url) {
    previewImage.src = url;
    previewImage.classList.remove("d-none");
  }
});

// Submit form
form.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("nomeEdAutore").value.trim();
  const description = document.getElementById("genereCasaEditrice").value.trim();
  const price = Number(document.getElementById("price").value);
  const imageUrl = document.getElementById("imageUrl").value.trim();

  if (!name || !description || !price || !imageUrl) {
    errorMsg.innerText = "Compila tutti i campi obbligatori!";
    return;
  }

  const productData = { name, description, price, imageUrl };

  let method = "POST";
  let url = API_URL;
  if (productId) {
    method = "PUT";
    url += productId;
  }

  fetch(url, {
    method: method,
    headers: {
      "Authorization": `Bearer ${TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(productData)
  })
    .then(res => {
      if (!res.ok) throw new Error("Errore nel salvataggio del prodotto");
      alert("Prodotto salvato con successo!");
      form.reset();
      previewImage.classList.add("d-none");
      if (!productId) {
        window.location.href = "index.html";
      }
    })
    .catch(err => alert(err));
});
