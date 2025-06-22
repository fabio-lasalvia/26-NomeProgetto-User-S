/////////////////////////////////////
/////GESTIONE CARICAMENTO PAGINE/////
/////////////////////////////////////
const PATH_UTENTI_HOME = 'utentiHome.html'

function caricaUtentiHome() {
    caricaPagina(PATH_UTENTI_HOME)
}

function caricaPagina(pagina) {
    window.location.replace(pagina)
}

/////////////////////////////////////////
/////DICHIARAZIONE VARIABILI GLOBALI/////
/////////////////////////////////////////
const spinner = document.querySelector('#spinner')
const tBody = document.querySelector('#tBody')
const searchbar = document.querySelector('#campoCerca')
const filtro = document.querySelector('#filterSelect')
let utenti = []

/////////////////////////////////
/////GESTIONE CHIAMATE FETCH/////
/////////////////////////////////
async function fetchaUtenti() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/users")
        const data = await response.json()
        console.log(data)
        utenti = data
        mostraUtenti(data)
    } catch (error) {
        alert('Errore nella fetch: ', error)
    }
}

////////////////////////////////////
/////GESTIONE CHIAMATA FUNZIONI/////
////////////////////////////////////
const path = window.location.pathname;

if (path.includes('utentiHome.html')) {
    gestisciSpinner()
    fetchaUtenti()
}

//////////////////////////
/////GESTIONE SPINNER/////
//////////////////////////
function gestisciSpinner() {
    // Verifico se il caricamento della pagina è già terminato
    if (document.readyState === "complete") {
        // Se sì, nascondo lo spinner
        spinner.classList.add("d-none");
    } else {
        // Se la pagina non è ancora completamente caricata,
        // allora aspetta l'evento "load" (il completamento del caricamento)
        window.addEventListener("load", () => {
            // Quando il caricamento è finito, si nasconde lo spinner
            spinner.classList.add("d-none");
        });
    }
}

///////////////////////////////
/////GESTIONE RENDER FETCH/////
///////////////////////////////
function mostraUtenti(users) {
    tBody.innerHTML = ''

    const tabellaUtenti = users.map(user => caricaRiga(user))
    tBody.append(...tabellaUtenti)
}

////////////////////////////////////
/////GESTIONE CREAZIONE TABELLA/////
////////////////////////////////////
function caricaRiga(user) {
    try {
        const tr = document.createElement('tr')


        const tdName = document.createElement('td')
        tdName.innerText = user.name

        const tdUsername = document.createElement('td')
        tdUsername.innerText = user.username

        const tdMail = document.createElement('td')
        tdMail.innerText = user.email

        tr.append(tdName, tdUsername, tdMail)
        return tr

    } catch (error) {
        console.warn('Errore nel caricamento della riga: ', error)
    }
}

///////////////////////////////
/////GESTIONE RICERCA DATI/////
///////////////////////////////
function cercaUtenti() {
    let utenteCercato = searchbar.value.trim().toLowerCase()
    const filtroSelezionato = filtro.value

    const utentiFiltrati = utenti.filter(user => {
        return user[filtroSelezionato].toLowerCase().includes(utenteCercato)
    })
    mostraUtenti(utentiFiltrati)
}

searchbar.addEventListener('keyup', cercaUtenti)