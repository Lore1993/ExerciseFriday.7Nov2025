const getYearInFooter = function () {
  const footer = document.getElementById('year')
  footer.innerText = new Date().getFullYear() // 2025
}

getYearInFooter()

const eventsURL = 'https://striveschool-api.herokuapp.com/api/agenda'

// ok, è arrivato il momento di recuperare gli EVENTI dall'API di EPICODE
// e inserirli nella pagina!
const getEvents = function () {
  fetch(eventsURL)
    .then((res) => {
      console.log('RESPONSE', res)
      if (res.ok) {
        // la risposta è stata 200 o simili
        // i dati sono arrivati! :) però per estrarre un JSON da una Response
        // devo utilizzare il metodo .json()
        // il metodo .json() però è ASINCRONO, e TORNA UNA PROMISE
        return res.json()
      } else {
        // la risposta è stata 400, 401, 404, 500 etc.
        // c'è stato un errore!
        // per evitare di riscrivere e ri-gestire l'errore, riutilizziamo
        // il codice del blocco catch! teletrasportiamoci!
        throw new Error(
          `Errore nella risposta ricevuta dal server: ${res.status}`
        )
      }
    })
    .then((arrayOfEvents) => {
      // ed è qui dentro che voi avete accesso ai dati!
      // qui dentro manipoleremo il DOM in modo da utilizzarli
      console.log('ARRAYOFEVENTS', arrayOfEvents)
      // adesso, per ogni evento recuperato, creiamo una colonna con dentro una card
      // e le disponiamo nella riga events-row
      const row = document.getElementById('events-row')
      arrayOfEvents.forEach((book) => {
        row.innerHTML += `
            <div class="col">
                <div class="card h-100 d-flex flex-column">
                    <img src="https://www.gedistatic.it/content/gnn/img/lastampa/2024/03/08/103515446-e41635c6-62d3-43c1-8974-f0a9d7338cb4.jpg" class="card-img-top" alt="...">
                    <div class="card-body flex-grow-1">
                        <h5 class="card-title">${book.name}</h5>
                        <p class="card-text">${book.description}</p>
                        <p class="card-text">${book.brand}</p>
                        <img class="card-text">${book.image}</img>
                    </div>
                    <a href="./details.html?bookID=${book._id}" class="btn btn-primary">Vai ai dettagli</a>
                </div>
            </div>
        `
      })
    })
    .catch((err) => {
      console.log('PROBLEMA', err)
      // problemi di connessione, spina staccata etc.
    })
}

getEvents()
