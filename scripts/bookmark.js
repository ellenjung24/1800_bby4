var species;
var code;
var remove;

// Inserts username of current user
function insertName() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get()
                .then(userDoc => {
                    var userName = userDoc.data().name;
                    console.log(userName);
                    document.getElementById("name-goes-here").innerText = userName;
                })
        } else {
            // No user is signed in.
        }
    });
}


// Pulls user bookmarks from database and displays the plants in user bookmark collection
function displayBookmark() {

    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            db.collection("users").doc(user.uid).collection("bookmark").get().then(allPlants => {
                allPlants.forEach(doc => {
                    this.species = doc.data().name.replaceAll(" ", "_").toLowerCase();;
                    let dateAdded = doc.data().dateAdded;
                    code = doc.data().name.replaceAll(" ", "_").toUpperCase();
                    remove = doc.data().name;

                    let card = document.createElement("div");
                    card.setAttribute("class", "box img-fluid rounded-start");

                    let photo = document.createElement("img");
                    photo.setAttribute("src", "./images/plants/" + species + ".png");

                    let cardCaption = document.createElement("div");
                    cardCaption.setAttribute("class", "card-body");
                    let links = document.createElement("a");
                    links.setAttribute("href", "plantinfo.html?code=" + code);
                    links.setAttribute("id", species);
                    links.setAttribute("class", "links-to-info");

                    let cardTitle = document.createElement("h5");
                    cardTitle.setAttribute("class", "card-title");
                    cardTitle.setAttribute("id", "plantName");
                    cardTitle.innerHTML = "<strong>" + species + "</strong> <br>";

                    let cardText = document.createElement("h7");
                    cardText.setAttribute("class", "card-text");
                    cardText.innerHTML = dateAdded;

                    let cardText1 = document.createElement("i");
                    cardText1.setAttribute("class", "fa fa-heart");
                    cardText1.setAttribute("type", "button");
                    cardText1.setAttribute("onclick", "removeFav(this.id)");
                    cardText1.setAttribute("id", remove);

                    plantCards.appendChild(card);
                    card.appendChild(photo);
                    card.appendChild(cardCaption);
                    cardCaption.appendChild(cardTitle);
                    cardCaption.appendChild(links);
                    links.appendChild(cardTitle);
                    cardCaption.appendChild(cardText);
                    card.appendChild(cardText1);
                })
            })
        }
    })
}


// removes plant from bookmark page when user clicks heart icon. 
// @param id of the plant that was unfavourited
function removeFav(clicked_id) {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {

            db.collection("users").doc(user.uid).collection("bookmark").doc(clicked_id).delete().then(() => {
                console.log("Document successfully deleted!");
                console.log(clicked_id);
                localStorage.setItem("className", "fa fa-heart-o");
                localStorage.getItem("className");
                alert("Plant removed from bookmark");
                window.location.href = "bookmark.html";
            }).catch((error) => {
                console.error("Error removing document: ", error);
            });
        }
    })

}

insertName();
displayBookmark();