const API_URL = "https://wine-inventory-production.up.railway.app";

// VARIABILE FILTRO ATTIVO
let filtroAttivo = "Tutti";

// ARRAY VINI — ora viene popolato dal server
let wineBottles = [];

// OPEN/CLOSE FORM
function toggleForm() {
  document.getElementById("add-form").classList.toggle("is-open");
}

// ADD WINE — salva nel database
async function addWine() {
  let nome    = document.getElementById("f-nome").value;
  let cantina = document.getElementById("f-cantina").value;
  let anno    = parseInt(document.getElementById("f-anno").value) || 0;
  let types   = document.getElementById("f-types").value;
  let qty     = parseInt(document.getElementById("f-qty").value);
  let min     = parseInt(document.getElementById("f-min").value);
  let price   = parseInt(document.getElementById("f-price").value);
  let status  = qty <= min ? "Scorte basse" : "OK";

  let nuovoVino = {
    name: nome, cantina, anno, types,
    quantity: qty, min, price, status
  };

  const risposta = await fetch(`${API_URL}/api/wines`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(nuovoVino)
  });

  

  const vinoSalvato = await risposta.json();
  wineBottles.push(vinoSalvato);

  document.getElementById("f-nome").value    = "";
  document.getElementById("f-cantina").value = "";
  document.getElementById("f-anno").value    = "";
  document.getElementById("f-types").value   = "";
  document.getElementById("f-qty").value     = "";
  document.getElementById("f-min").value     = "";
  document.getElementById("f-price").value   = "";

  renderTable();
  renderStats();
  toggleForm();
}

// DELETE WINE — elimina dal database
async function deleteWine(id) {
  await fetch(`${API_URL}/api/wines/${id}`, {
    method: "DELETE"
  });

  wineBottles = wineBottles.filter(function(vino) {
    return vino.id !== id;
  });

  renderTable();
  renderStats();
}

// RENDER TABLE
function renderTable() {
  let visibili = filtroAttivo === "Tutti"
    ? wineBottles
    : wineBottles.filter(function(vino) {
        return vino.types === filtroAttivo;
      });

  let righe = "";
  visibili.forEach(function(vino) {
    righe = righe +
      `<tr>
        <td>${vino.name}</td>
        <td>${vino.cantina}</td>
        <td>${vino.anno}</td>
        <td>${vino.types || "-"}</td>
        <td>${vino.quantity}</td>
        <td>${vino.min}</td>
        <td>€${vino.price}</td>
        <td>${vino.status}</td>
        <td>
          <button class="btn btn-icon btn-delete" onclick="deleteWine(${vino.id})">✕</button>
        </td>
      </tr>`;
  });

  document.getElementById("tbody").innerHTML = righe;
}

// RENDER STATS
function renderStats() {
  let totaleBottiglie = wineBottles.reduce(function(somma, vino) {
    return somma + vino.quantity;
  }, 0);

  let lowStocks = wineBottles.filter(function(vino) {
    return vino.quantity <= vino.min;
  });

  let valoreMagazzino = wineBottles.reduce(function(somma, vino) {
    return somma + (vino.quantity * vino.price);
  }, 0);

  document.getElementById("stat-totale").innerHTML    = totaleBottiglie;
  document.getElementById("stat-scorte").innerHTML    = lowStocks.length;
  document.getElementById("stat-tipologie").innerHTML = wineBottles.length;
  document.getElementById("stat-value").innerHTML     = "€" + valoreMagazzino;
}

// SET FILTER
function setFilter(tipo, btn) {
  filtroAttivo = tipo;

  document.querySelectorAll(".filter-btn").forEach(function(b) {
    b.classList.remove("is-active");
  });

  btn.classList.add("is-active");
  renderTable();
}

// AVVIO — carica vini dal server
async function caricaVini() {
  const risposta  = await fetch(`${API_URL}/api/wines`);
  wineBottles     = await risposta.json();
  renderTable();
  renderStats();
}

caricaVini();