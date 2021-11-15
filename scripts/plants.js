const plantCards = document.getElementById("plant-cards");
const plantDB = db.collection("plants");

function displayPlants() {
    plantDB.get().then(allPlants => {
        allPlants.forEach(doc => {
            let common_name = doc.data().common_name;
            let species = doc.data().species;
            let code = doc.data().code.toLowerCase();
            let card = document.createElement("div");
            card.setAttribute("class", "card col-auto");
            let cardCaption = document.createElement("div");
            let photo = document.createElement("img");
            photo.setAttribute("src", "../images/plants/" + code + ".png");
            cardCaption.setAttribute("class", "card-body");
            let cardTitle = document.createElement("h5");
            cardTitle.setAttribute("class", "card-title");
            cardTitle.innerHTML = "<strong>" + common_name + "</strong>";
            let cardText = document.createElement("h7");
            cardText.setAttribute("class", "card-text");
            cardText.innerHTML = "<em>" + species + "</em>";
            plantCards.appendChild(card);
            card.appendChild(photo);
            card.appendChild(cardCaption);
            cardCaption.appendChild(cardTitle);
            cardCaption.appendChild(cardText);
        })
    })
}

displayPlants();