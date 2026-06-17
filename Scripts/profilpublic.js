// Fonction qui permet de charger les utilisateurs depuis le localStorage
function chargerEtudiants() {
    const data = localStorage.getItem("membre");
    if (data !== null) {
    membre = JSON.parse(data);
}}

// Fonction qui permet de sauvegarder les utilisateurs
function sauvegarderMembre() {
    localStorage.setItem("membre", JSON.stringify(membre));
}

// Fonction qui permet de sauvegarder les publications
function sauvegarderPost() {
    localStorage.setItem("post", JSON.stringify(postsjson));
}

// Fonction qui permet d'afficher les utilisateurs dans la console
function afficherEtudiants() {
    for (let i = 0; i < membre.length; i++) {
        console.log(membre[i].pseudo, " ", membre[i].email, " ", membre[i].mdp, " ", membre[i].desc);
    }
}

// Fonction qui permet de charger les publications depuis le localStorage
function chargerPost(){
    const data = localStorage.getItem("post")
    if (data !== null) {
        postsjson = JSON.parse(data);
}}

let postsjson = [];

chargerEtudiants()
chargerPost()

// On récupère le pseudo de l'utilisateur connecté ainsi que son index
const pseudoActif = sessionStorage.getItem("membreActif");
const indexActif = membre.findIndex(m => m.pseudo === pseudoActif);
const champPseudo = document.getElementById("recherchePseudo");
const champPost = document.getElementById("recherchePost");
const btnRecherche = document.getElementById("btnRecherche");

// On récupère la photo de profil de l'utilisateur connecté
const img = document.getElementById("Profil");
img.src = membre[indexActif].path;

// On récupère le pseudo du profil visité
const pseudoVisite = sessionStorage.getItem("profilVisite");
const membreVisite = membre.find(m => m.pseudo === pseudoVisite);

const btnAbonnement = document.getElementById("btnAbonnement");

// Fonction qui permet de sauvegarder les utilisateurs
function sauvegarderMembre() {
    localStorage.setItem("membre", JSON.stringify(membre));
}

// Fonction qui permet de mettre à jour le texte du bouton d'abonnement
function mettreAJourBoutonAbonnement()
{
    const actif = membre[indexActif];

    if (!actif.abonnements)
        actif.abonnements = [];

    const estAbonne = actif.abonnements.includes(pseudoVisite);

    btnAbonnement.textContent = estAbonne ? "Se désabonner" : "S'abonner";
}

// Permet de s'abonner ou de se désabonner d'un utilisateur
btnAbonnement.addEventListener("click", function() {
        const actif = membre[indexActif];

        if (!actif.abonnements)
            actif.abonnements = [];

        if (!membreVisite.abonnes)
            membreVisite.abonnes = [];

        // on vérifie si l'utilisateur est deja abonné au profil visité
        const index = actif.abonnements.indexOf(pseudoVisite);

        // on ajoute l'abonnement
        if (index === -1) {
            actif.abonnements.push(pseudoVisite); // on le rajoute dans la liste des abonnements
            membreVisite.abonnes.push(pseudoActif); // on l'ajotute aussi l'utilisateur dans la liste d'abonné
        }
        else
        {
            actif.abonnements.splice(index, 1); // on supprime le profil visité dans la liste des abonnements
            const indexAbonne = membreVisite.abonnes.indexOf(pseudoActif); // on cherche la position de l'utilisateur actif dans la liste des abonné

            if (indexAbonne !== -1)
            {
                membreVisite.abonnes.splice(indexAbonne, 1); // et on le supprime
            }
        }

        sauvegarderMembre();

        mettreAJourBoutonAbonnement();
    }
);

mettreAJourBoutonAbonnement();

if (membreVisite) {
    document.getElementById("pseudoProfil").textContent = membreVisite.pseudo;
    document.getElementById("descProfil").textContent = membreVisite.desc;
    const imgProfil = document.getElementById("photoProfil");

    if (membreVisite && membreVisite.path) {
        imgProfil.src = membreVisite.path;
    }
}

// On récupère le conteneur qui va accueillir les publications du profil visité
const listePosts = document.getElementById("listePosts");

// on parcour lesp ublications enregistrés
for (let i = 0; i < postsjson.length; i++)
{
    const postData = postsjson[i];

    // on affiche seulement lesp osts qui appartiennent au profil visité
    if (postData.pseudo != pseudoVisite)
    {
        continue;
    }

    const detext = document.createElement("div");
    detext.classList.add("detext");

    const container = document.createElement("div");
    container.classList.add("post");

    
    detext.style.backgroundImage = `url("../Images/backtest.png")`;
    container.style.backgroundImage = `url("../Images/fondpost2.png")`;

    const img = document.createElement("img");
    img.src = membre.find(m => m.pseudo === postData.pseudo)?.path || postData.path;
    img.classList.add("pdp");

    // ici on va creer la photo de profil, le texte de la publication, le pseudo, le bouton like 
    const nouveauParagraphe = document.createElement("p");
    nouveauParagraphe.textContent = postData.post;
    const pseudoElem = document.createElement("p"); 
    pseudoElem.textContent = postData.pseudo;
    pseudoElem.classList.add("username");
    const btnLike = document.createElement("button");
    btnLike.style.fontFamily = "Dumbledor";

    const nblikes = postData.likes ? postData.likes.length : 0;

    btnLike.textContent = nblikes + (nblikes > 1 ? " Likes" : " Like");
    btnLike.addEventListener("click", function() {
        toggleLike(postData.id);

         location.reload();
    });

    let imagePost = null;

        // Si le post possède une image, on la crée
        if ( postData.image && postData.image !== ""){
            imagePost = document.createElement("img");
            imagePost.src = postData.image;
            imagePost.style.maxWidth = "400px";
            imagePost.style.maxHeight = "400px";
            imagePost.style.display = "block";
            imagePost.style.marginTop = "10px";
            imagePost.style.borderRadius = "10px";
        }

    // et on ajoute les différents élémnets de la publicaiton
    detext.appendChild(img);
    detext.appendChild(pseudoElem);

    container.appendChild(detext);
    container.appendChild(nouveauParagraphe);

    if (imagePost) {
    container.appendChild(imagePost);
}

    container.appendChild(btnLike);

    listePosts.appendChild(container);
}

document.getElementById("retour").addEventListener("click", function() {

    window.location.href = "page_principale.html";

});

// Fonction qui permet d'afficher un nombre donné de pubs a drotie en fonction du nombre de posts
function fabriquerPub()
{
    // va chercher l'element qui a la classe right
    const trucBizarre = document.querySelector(".right");
    // On vide
    trucBizarre.innerHTML = "<p></p>";
    const hauteurDuFeed = document.getElementById("listePosts").scrollHeight;
    // 1 pub tous les 700px
    const nombreMagique = Math.max(1, Math.ceil(hauteurDuFeed / 700));

    const pubs = [
            "../Images/pub/pub1.png",
            "../Images/pub/pub2.png",
            "../Images/pub/pub5.png",
            "../Images/pub/pub6.png"
        ];

    for(let i=0; i < nombreMagique; i++) {
        const boitePub = document.createElement("div");
        boitePub.classList.add("pub");
        trucBizarre.appendChild(boitePub);
        boitePub.style.backgroundImage = `url("${pubs[Math.floor(Math.random() * pubs.length)]}")`;}
}

fabriquerPub();

// Fonction qui permet d'ajouter ou retirer un like sur une publication
function toggleLike(postId)
{
    // On cherche la publication concernée
    const post = postsjson.find( p => p.id === postId);

    if (!post)
        return;

    if (!post.likes)
        post.likes = [];

    // On vérifie si l'utilisateur a déjà liké
    const index = post.likes.indexOf(pseudoActif);

    // Si ce n'est pas le cas, on ajoute le like
    if (index === -1) {
        post.likes.push(pseudoActif);
    }
     // Sinon on retire le like
    else {
        post.likes.splice(index,1);
    }

    sauvegarderPost();
}
