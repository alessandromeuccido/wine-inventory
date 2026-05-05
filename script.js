const wineBottles = [
  {
    name:"Pinot Grigio DOC Le Romiglia",
    quantity: 2
  },
  {
    name:"Lunario Colli Colli Lanuvini DOP Superiore La Luna Del Casale",
    quantity: 2
  }
]

function toggleForm() {
  document.getElementById("add-form").classList.toggle("is-open");
}

function addWine() {

  // passo 1 — leggi
  let nome    = document.getElementById("f-nome").value;
  let cantina = document.getElementById("f-cantina").value;
  let anno    = document.getElementById("f-anno").value;
  let qty     = document.getElementById("f-qty").value;
  let min     = document.getElementById("f-min").value;

  // passo 2 — costruisci
  let nuovoVino = {
    name:     nome,
    cantina:  cantina,
    anno:     anno,
    quantity: qty,
    min:      min
  };

  // passo 3 — aggiungi
  wineBottles.push(nuovoVino);

  // passo 4 — pulisci
  document.getElementById("f-nome").value    = "";
  document.getElementById("f-cantina").value = "";
  document.getElementById("f-anno").value    = "";
  document.getElementById("f-qty").value     = "";
  document.getElementById("f-min").value     = "";
  
  console.log(wineBottles)
}

