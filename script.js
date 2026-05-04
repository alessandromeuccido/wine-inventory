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

  function addWine(name, quantity) {
    wineBottles.push({
      name: name, 
      quantity: quantity
    });
  };

  function toggleForm() {
    document.getElementById("add-form").classList.toggle("is-open");
  }

