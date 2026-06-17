// Fonction qui permet de charger la liste de membres
function chargerEtudiants() {
    const data = localStorage.getItem("membre");
    if (data !== null) {
    membre = JSON.parse(data);
}}

// Fonction qui permet de sauvegarder les membres
function sauvegarderMembre() {
    localStorage.setItem("membre", JSON.stringify(membre));
}

// Fonction qui permet de sauvegarder un post dans le local storage
function sauvegarderPost() {
    localStorage.setItem("post", JSON.stringify(postsjson));
}

// Fonction qui permet d'afficher les membres dans la console
function afficherEtudiants() {
    for (let i = 0; i < membre.length; i++) {
        console.log(membre[i].pseudo, " ", membre[i].email, " ", membre[i].mdp, " ", membre[i].desc);
    }
}

// Fonction qui permet de charger les posts
function chargerPost(){
    const data = localStorage.getItem("post")
    if (data !== null) {
        postsjson = JSON.parse(data);
}}

let postsjson = [];

chargerEtudiants();

const savedImage = membre[indexActif]?.path;

chargerPost();

// permet de rajouter une id si les posts n'en ont pas
for (let i = 0; i < postsjson.length; i++) {
        if (!postsjson[i].id) {
            postsjson[i].id = Date.now() + i;
        }
}
    
 sauvegarderPost();

// on récupere des petites choses utiles et interessantes
const pseudoActif = sessionStorage.getItem("membreActif");
const indexActif = membre.findIndex(m => m.pseudo === pseudoActif);
const champPseudo = document.getElementById("recherchePseudo");
const champPost = document.getElementById("recherchePost");
const btnRecherche = document.getElementById("btnRecherche");

// ici on reucpere la photo de profil de la personne active
const img = document.getElementById("photoProfil");
img.src = membre[indexActif].path;

if (savedImage) {
    const img = document.getElementById("photoProfil");
    img.src = savedImage;
}

// fonction qui permet d'afficher le feed en montrant tout les posts
function afficherPost(filtrePseudo = "", filtrePost = "") {
    // On récupère le conteneur principal
    const allcontainer = document.getElementById("letout");
    allcontainer.innerHTML = "";
    // On trie les publications en fonction des abonnements
    const postsTries = trierPostsParAbonnements(postsjson.slice());

    for (let i = 0; i < postsTries.length; i++) {
        const postData = postsTries[i];
         // Si le pseudo ne correspond pas à la recherche, on passe au suivant
        if (!postData.pseudo.toLowerCase().includes(filtrePseudo.toLowerCase()))
        {
            continue;
        }
        
        // Si le texte du post ne correspond pas à la recherche, on passe au suivant
        if (!postData.post.toLowerCase().includes(filtrePost.toLowerCase()))
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

        // Si c'est notre propre publication, on utilise notre photo de profil
        if (postData.pseudo == pseudoActif){
            img.src = membre[indexActif].path;
        } 
        else {
            // Image classique (URL)
            img.src = postData.path;
        }
        img.classList.add("pdp");

        const nouveauParagraphe = document.createElement("p");
        nouveauParagraphe.textContent = postData.post;
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

        const pseudoElem = document.createElement("p");
        pseudoElem.textContent = postData.pseudo;
        pseudoElem.classList.add("username");

        const btnLike = document.createElement("BUTTON");
        const nblikes = postData.likes ? postData.likes.length : 0;
        if (nblikes > 1)
            btnLike.textContent = nblikes + " Likes";
        else {
            btnLike.textContent = nblikes + " Like";
        }

        btnLike.style.fontFamily = "Dumbledor";

         // Création du bouton supprimer
        const btnSignal = document.createElement("BUTTON");
        btnSignal.textContent = "SUPPRIMER";
        btnSignal.style.fontFamily = "Dumbledor";

        detext.appendChild(img);
        detext.appendChild(pseudoElem);
        container.appendChild(detext);
        container.appendChild(nouveauParagraphe);
        if (imagePost){
            container.appendChild(imagePost);
        }
        container.appendChild(btnLike);

        // si c'est le post de la personne active, on affiche le bouton supprimer
        if (pseudoActif == postData.pseudo)
            container.appendChild(btnSignal);

        allcontainer.appendChild(container);

        // si on clique sur le pseudo d'une personne
        detext.addEventListener('click', function(event) {
            if (postData.pseudo == pseudoActif)
                {
                    window.location.href = "profil.html";
                    return;
                }

            // On sauvegarde le profil visité
            sessionStorage.setItem("profilVisite", postData.pseudo);
        
            // Puis on ouvre le profil public
            window.location.href = "profilpublic.html";
        
        })

        // Permet de supprimer une publication
        btnSignal.addEventListener('click', function() {
            postsjson.splice(i, 1); // suppr a la place i + le nombre donc 1
            sauvegarderPost();
            afficherPost();
        });

        // Permet d'ajouter ou retirer un like
        btnLike.addEventListener("click", function() {
            toggleLike(postData.id);
        }
    );

    }
    fabriquerPub();
}

// Lorsqu'on clique sur le bouton rechercher
btnRecherche.addEventListener("click", function() {

     // On récupère les informations saisies
    const pseudoRecherche = champPseudo.value.trim();
    const postRecherche = champPost.value.trim();
    // On réaffiche les publications correspondant aux filtres
    afficherPost(pseudoRecherche, postRecherche);
});

afficherPost();

// Fonction qui permet de trier les publications selon les abonnements
function trierPostsParAbonnements(posts)
{
    // On récupère l'utilisateur connecté
    const utilisateur = membre[indexActif];

    // Si la liste des abonnements n'existe pas, on la crée
    if (!utilisateur || !utilisateur.abonnements) {
        return posts;
    }

    const abonnements = utilisateur.abonnements;

    // On trie les publications
    return posts.sort((a,b) => {

        const indexA = abonnements.indexOf(a.pseudo);
        const indexB = abonnements.indexOf(b.pseudo);

        // Si les deux utilisateurs sont abonnés, on respecte leur ordre
        if (indexA !== -1 && indexB !== -1){
            return indexA - indexB;
        }

         // Les abonnements sont prioritaires
        if (indexA !== -1)
            return -1;

        if (indexB !== -1)
            return 1;

        return 0;
    });
}

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
    afficherPost();
}

// Fonction qui permet d'afficher un nombre donné de pubs a drotie en fonction du nombre de posts
function fabriquerPub()
{
    // va chercher l'element qui a la classe right
    const trucBizarre = document.querySelector(".right");
    // On vide
    trucBizarre.innerHTML = "<p></p>";
    const hauteurDuFeed = document.getElementById("letout").scrollHeight;
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
