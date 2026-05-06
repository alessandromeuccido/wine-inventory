// prossimo Id disponibile 
let nextWineId = 3;

// Array vini nel form
let wineBottles = [
  {
    id: 1,
    name:"Pinot Grigio DOC Le Romiglia",
    quantity: 2,
    cantina: "Prova",
    anno: 2022,
    min: 3,
    price: 1,
    status: "OK"
  },
  {
    id:2,
    name:"Lunario Colli Colli Lanuvini DOP Superiore La Luna Del Casale",
    quantity: 2,
    cantina: "Prova",
    anno: 2022,
    min: 3,
    price: 1,
    status: "OK"
  }
]

// OPEN FORM NEW WINE
function toggleForm() {
  document.getElementById("add-form").classList.toggle("is-open");
}

// ADD NEW WINES 
function addWine() {

  // passo 1 — leggi
  let nome    = document.getElementById("f-nome").value;
  let cantina = document.getElementById("f-cantina").value;
  let anno    = parseInt(document.getElementById("f-anno").value) || 0;
  let types   = document.getElementById("f-types").value;
  let qty     = parseInt(document.getElementById("f-qty").value);
  let min     = parseInt(document.getElementById("f-min").value);
  let price   = parseInt(document.getElementById("f-price").value);
  let status  = qty <= min ? "Scorte basse" : "OK";

  // passo 2 — costruisci
  let nuovoVino = {
    id:       nextWineId,
    name:     nome,
    cantina:  cantina,
    anno:     anno,
    types:    types,
    quantity: qty,
    min:      min,
    price:    price,
    status:   status
  };

  // passo 3 — aggiungi
  wineBottles.push(nuovoVino);

  // incremento per il prossimo vino
  nextWineId = nextWineId +1

  // passo 4 — pulisci
  document.getElementById("f-nome").value    = "";
  document.getElementById("f-cantina").value = "";
  document.getElementById("f-anno").value    = "";
  document.getElementById("f-types").value   = "";
  document.getElementById("f-qty").value     = "";
  document.getElementById("f-min").value     = "";
  document.getElementById("f-price").value   = "";
  // document.getElementById("f-status").value  = "";
  

  renderTable();
  renderStats();
}

// cancella vini selezionati 
function deleteWine(id) {
  wineBottles = wineBottles.filter(function(vino) {
    return vino.id !== id;
  })
  
  renderTable();
  renderStats();
}

// RENDER WINES TABLES 
function renderTable() {
  let righe = "";

  wineBottles.forEach(function(vino) {
    righe = righe + 
      `<tr>
        <td>${vino.name}</td>
        <td>${vino.cantina}</td>
        <td>${vino.anno}</td>
        <td>${vino.types || "-"}</td>
        <td>${vino.quantity}</td>
        <td>${vino.min}</td>
        <td>${vino.price}</td>
        <td>${vino.status}</td>
        <td>
        <button class="btn btn-icon btn-delete" onclick="deleteWine(${vino.id})">✕</button>
        </td>
      </tr>`;
  });

  document.getElementById('tbody').innerHTML = "";
  document.getElementById('tbody').innerHTML = righe;
}

// RENDER STATS
function renderStats() {

  console.log(wineBottles);

  let totaleBottiglie = wineBottles.reduce(function(somma, vino) {
    return somma + vino.quantity;
  }, 0);

  let lowStocks = wineBottles.filter(function(vino) {
    return vino.quantity <= vino.min;
  });

  let valoreMagazzino = wineBottles.reduce(function(somma, vino) {
    return somma + (vino.quantity * vino.price);
  }, 0); 

  document.getElementById("stat-totale").innerHTML = totaleBottiglie;
  document.getElementById("stat-scorte").innerHTML = lowStocks.length;
  document.getElementById("stat-tipologie").innerHTML = wineBottles.length;
  document.getElementById("stat-value").innerHTML = "€" + valoreMagazzino;
}

renderTable();
renderStats();



