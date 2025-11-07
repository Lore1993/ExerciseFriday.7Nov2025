// Prende il prodotto salvato in localStorage
const product = JSON.parse(localStorage.getItem("selectedProduct"));
const container = document.querySelector(".container");

if (!product) {
  container.innerHTML = "<p class='text-danger'>Nessun prodotto selezionato!</p>";
} else {
  const card = document.createElement("div");
  card.classList.add("card", "mx-auto", "shadow-sm");
  card.style.maxWidth = "400px";

  const img = document.createElement("img");
  img.src = product.imageUrl || "https://via.placeholder.com/250x300";
  img.classList.add("card-img-top");
  img.alt = product.name;

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
  price.innerText = `Prezzo: €${product.price}`;

  const backBtn = document.createElement("button");
  backBtn.classList.add("btn", "btn-primary");
  backBtn.innerText = "Torna alla Home";
  backBtn.addEventListener("click", () => {
    window.location.href = "index.html";
  });

  cardBody.appendChild(title);
  cardBody.appendChild(desc);
  cardBody.appendChild(price);
  cardBody.appendChild(backBtn);

  card.appendChild(img);
  card.appendChild(cardBody);

  container.appendChild(card);
}

