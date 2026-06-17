const textarea = document.getElementById("textepost");
const compteurcarac = document.getElementById("characcomptlabel");
const btnpost = document.getElementById("btnpost");
const texterreurs = document.getElementById("petittextediscret");
const imageInput = document.getElementById("imagePost");
const previewImage = document.getElementById("previewImage");
const nomFichier = document.getElementById("nomFichier");

let imageSelectionnee = "";

let postsjson = [];
val = 0;

chargerPost()

// Fonction qui permet de charger les étudiants, qui correspond ici aux utilisateurs
function chargerEtudiants() {
    const data = localStorage.getItem("membre");
    if (data !== null) {
    membre = JSON.parse(data);
}}

// Fonction qui permet de charger tout les posts
function chargerPost(){
    const data = localStorage.getItem("post")
    if (data !== null) {
        postsjson = JSON.parse(data);
}}

// Fonction qui permet l'enregistrement de tout les posts
function sauvegarderPost() {
    localStorage.setItem("post", JSON.stringify(postsjson));
}

// Fonction qui permet de sauvegarder un membre, ici un utilisateur
function sauvegarderMembre() {
    localStorage.setItem("membre", JSON.stringify(membre));
}

// Permet d'afficher les utilisateurs dans la console
function afficherEtudiants() {
    for (let i = 0; i < membre.length; i++) {
        console.log(membre[i].pseudo, " ", membre[i].email, " ", membre[i].mdp, " ", membre[i].desc);
    }
}

// Fonction qui permet l'affichage des posts dans la console pour le debug
function afficherPost() {
    for (let i = 0; i < postsjson.length; i++) {
        console.log(postsjson[i].pseudo, " ", postsjson[i].post);
    }
}

chargerEtudiants()

// ici on défini le pseudo et l'indice actif
const pseudoActif = sessionStorage.getItem("membreActif");
const indexActif = membre.findIndex(m => m.pseudo === pseudoActif);
// Je suis le CEO, je suis le CEO, je suis le CEO, je suis le CEO, je suis le CEO, je suis le CEOOOOOOOOOOOOO JE SUIS LE CEOOOOOOOOOOOOOOO JE SUIS LE CEO

// A chaque fois que l'utilisateur envoie le formulaire
btnpost.addEventListener("click", function (event) {
    event.preventDefault();
    if (textarea.value == ""){ // si le contenu est vide, on renvoie un mesage d'erreur
        texterreurs.style.display = "block";
        texterreurs.innerText  = "Il faudrait songer a rédiger avant de poster";
    }
    else if (textarea.value.length < 25){ // si le contenu est trop faible, on renvoie un msg d'erreur
        texterreurs.style.display = "block";
        texterreurs.innerText  = "Je suis sur que tu as plus de choses à dire (min 25 caractères)";
    }
    else { //et puis si tout va bien on enregistre ! 
        texterreurs.style.display = "none";
        const value = textarea.value.trim();
        enregistrerPost(value);
    }
})

// Fonction qui permet l'enregistrement du post dans le localstorage
function enregistrerPost(text){
    const post = {
        id: Date.now(),
        pseudo: membre[indexActif].pseudo,
        path : membre[indexActif].path,
        post : text,
        image: imageSelectionnee,
        likes: [],
        commentaires: []
    };
    postsjson.push({
        id: Date.now(),
        pseudo: membre[indexActif].pseudo,
        path : membre[indexActif].path,
        post : text,
        image: imageSelectionnee,
        likes: [],
        commentaires: []
    });
    sauvegarderPost();
    window.location.href = "page_principale.html";
}

// a chque fois que l'utilisateur ecrit, on met 
textarea.addEventListener('input', function () {
    const len = textarea.value.length;
    if (len > 150) {
        textarea.value = textarea.value.substring(0, 150);
    }
    console.log("o");
    compteurcarac.innerHTML = textarea.value.length.toString();
})

// si une image est renseignée
imageInput.addEventListener("change", function(event) {
        const fichier = event.target.files[0]; // récupere le premier fichier selectionné

        if (!fichier) // si il n'y a pas de fichier, on arrete la fonction
            return;

        nomFichier.textContent = fichier.name;

        const reader =  new FileReader(); // objet qui permet de lire le contenu du fichier

        // des que la lecture par l'objet est fini
        reader.onload = function(e) {
            imageSelectionnee = e.target.result; // on sotcke l'image en base64 pour pouvoir la sauvegarder dans le localstorage

            previewImage.src = imageSelectionnee;

            previewImage.style.display = "block";
        };

        // on lance la lecture du fichier sous forme de chaine base64
        reader.readAsDataURL(fichier);
    }
);