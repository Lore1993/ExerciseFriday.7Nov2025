const getYearInFooter = function () {
  const footer = document.getElementById('year')
  footer.innerText = new Date().getFullYear() // 2025
}

getYearInFooter()

// questa pagina dettagli si carica con nell'URL un parametro, "concertID"
// questo parametro mi trasmette nella pagina dettagli la proprietà _id
// del concerto su cui ho cliccato
// ora devo RECUPERARE quel parametro "concertID" ed utilizzarlo per fare
// una chiamata GET molto specifica su ".../agenda/:id"
// es. 'https://striveschool-api.herokuapp.com/api/agenda/690c73f54c1df3001589c89c'

// a) recupero il _id della barra degli indirizzi, sarà il valore del parametro "concertID"
const url = location.search // tutto il contenuto della barra degli indirizzi
console.log(url)
const allTheParameters = new URLSearchParams(url)
const id = allTheParameters.get('concertID')
console.log('ID', id)

const eventsURL = 'https://striveschool-api.herokuapp.com/api/agenda'

// b) recupero i dettagli
const getDetails = function () {
  fetch(eventsURL + '/' + id)
    .then((res) => {
      if (res.ok) {
        return res.json()
      } else {
        throw new Error(res.status)
      }
    })
    .then((eventDetails) => {
      console.log('DETTAGLI EVENTO', eventDetails)
      // ora con questi dati vado a riempire gli "spazi vuoti" che ho lasciato nella card
      document.getElementById('name').innerText = eventDetails.name
      document.getElementById('description').innerText =
        eventDetails.description
      document.getElementById('price').innerText = eventDetails.price + '€'
      document.getElementById('time').innerText = eventDetails.time
    })
    .catch((err) => {
      console.log('ERRORE NEL RECUPERO DETTAGLI', err)
      document.getElementById('name').innerText = err
    })
}

getDetails()

// ELIMINAZIONE EVENTO
const deleteEvent = function () {
  fetch(eventsURL + '/' + id, {
    method: 'DELETE',
  })
    .then((res) => {
      if (res.ok) {
        // elemento ELIMINATO
        alert('CONCERTO ELIMINATO!')
        // riportiamo l'utente in homepage
        location.assign('./index.html')
      } else {
        // problema nell'eliminazione
        throw new Error(`problema nella response: ${res.status}`)
      }
    })
    .catch((err) => {
      console.log('ERRORE IN ELIMINAZIONE', err)
    })
}

const editEvent = function () {
  // questa funzione deve riportarmi in backoffice con il parametro del concerto
  // da modificare
  location.assign('./backoffice.html?concertID=' + id)
}

// RECAP DEGLI URL
// GET su 'https://striveschool-api.herokuapp.com/api/agenda' --> TUTTI I CONCERTI
// GET su 'https://striveschool-api.herokuapp.com/api/agenda/690c73f54c1df3001589c89c' --> UN CONCERTO
// POST su 'https://striveschool-api.herokuapp.com/api/agenda'
// DELETE su 'https://striveschool-api.herokuapp.com/api/agenda/690c73f54c1df3001589c89c' --> UN CONCERTO
// PUT su 'https://striveschool-api.herokuapp.com/api/agenda/690c73f54c1df3001589c89c'
