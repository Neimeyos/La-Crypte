// on récupère tout ce qui est utile qui vient de l'html
const btn_profil = document.getElementById("random");
const pdp = document.getElementById("pdp");
const sauvProfil = document.getElementById("sauvegarder");
const descdesc = document.getElementById("story");
const email = document.getElementById("Email");
const fileInput = document.getElementById('input');
const buttonfile = document.getElementById('btninput');
const champmdp = document.getElementById("mdp");
const btnmdp = document.getElementById("modif");
const nvmdp = document.getElementById("mdp_nv");
const mdpconfirm = document.getElementById("mdpconfirm");
const fonddec = document.getElementById("ahah");
const buttonquitter = document.getElementById("quitter");
const supprimer = document.getElementById("supprimer");

let membre = [];
chargerEtudiants();

// on récupere le pseudo de l'utilisateur actif et son index
const pseudoActif = sessionStorage.getItem("membreActif");
const indexActif = membre.findIndex(m => m.pseudo === pseudoActif);
boolfalsetrue = false;
wantoquit = false;
// phrase de base pour la description
const value_desc = "J'adore les compotes pom'pot abricot banane parce que c'est bon pour être en bonne santé";

// permet de charger les informations de l'utilisateur
if (indexActif !== -1) { // pour charger les données a l'arrivée
    const m = membre[indexActif];
    document.getElementById("Sobriquet").value = m.pseudo || "";
    document.getElementById("Email").value = m.email || "";
    document.getElementById("mdp").value = m.mdp;
    pdp.src = m.path || "../Images/pdp/g10.png";
    if (m.desc === "" || !m.desc){
        descdesc.value = value_desc;
        m.desc = value_desc;
    }
    else {
        descdesc.value = m.desc;
    }
}

// Fonction qui permet de charger les posts
function chargerPost(){
    const data = localStorage.getItem("post");
    if (data !== null)
        return JSON.parse(data);

    return [];
}

// permet de charger les mmembres
function chargerEtudiants() {
    const data = localStorage.getItem("membre");
    if (data !== null) {
    membre = JSON.parse(data);
}}

// FOnction qui permet de sauvegarder les utilisateurs
function sauvegarderMembre() {
    localStorage.setItem("membre", JSON.stringify(membre));
}

// affiche les memebres dans la console
function afficherEtudiants() {
    for (let i = 0; i < membre.length; i++) {
        console.log(membre[i].pseudo, " ", membre[i].email, " ", membre[i].mdp, " ", membre[i].path, " ", membre[i].desc);
    }
}

btn_profil.addEventListener("click",  function (event) { // photo de profil random

    nombre = "../Images/pdp/g";
    min = Math.ceil(1);
    max = Math.ceil(10);
    random = Math.floor(Math.random() * (max - min) + min);
    nombre += random;
    nombre += ".png";
    blabl = "../Images/pdp/g5.png";

    pdp.src = nombre;
    localStorage.removeItem(membre[indexActif].pseudo);
    membre[indexActif].path = nombre;
    sauvegarderMembre();
});

// permet de sauvegarder les modifications faites au profil
sauvProfil.addEventListener("click", function (event) {

    if (!email.checkValidity()) {
        alert("Veuillez saisir une adresse email valide.");
        return;
    }

    membre[indexActif].pseudo = document.getElementById("Sobriquet").value.trim();
    membre[indexActif].email = document.getElementById("Email").value.trim();
    membre[indexActif].desc = descdesc.value.trim();

    sauvegarderMembre();
});

// Fonction uqi permet la sauvegarde des posts
function sauvegarderPost(posts)
{
    localStorage.setItem("post", JSON.stringify(posts));
}

// ouvre l'explorateur de fichier pour les photos
buttonfile.onclick = () => {
  fileInput.click();
}

// permet de charger une image personnalisé qu'on converti en base64
fileInput.addEventListener('change', (event) => {
    const file = event.target.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = () => {
            membre[indexActif].path = reader.result;
            sauvegarderMembre();
            pdp.src = reader.result;
        };

        reader.readAsDataURL(file);
    }
});

// Permet d'activer ou désactiver la modification du mot de passe
btnmdp.addEventListener("click",  function (event) {
    champmdp.disabled = false;
    nvmdp.style.display = "block";
    mdpconfirm.style.display = "block";
    if (boolfalsetrue === true){
        fonddec.style.backgroundImage = "url('../Images/fondprofil/byeob.png')";
        boolfalsetrue = false;
        champmdp.disabled = true;
        nvmdp.style.display = "none";
        mdpconfirm.style.display = "none";
        document.getElementById("mdp").value = membre[indexActif].mdp;
    }
    else {
        fonddec.style.backgroundImage = "url('../Images/fondprofil/byeobmodif.png')";
        boolfalsetrue = true;
        document.getElementById("mdp").value = "";
    }
});

// Fonction qui vérifie que le mot de passe respecte toutes les contraintes imposées
function mdpconforme(mdp) {
    const maj = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "X", "Y", "Z"];
    const nombres = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    const carac = ["é", "~", "#", "\"", "\'", "(", "[", "-", "|", "è", "`", "_", "ç", "^", "à", "@", ")", "]", "=", "+", "²", ",", "?", ";", ".", ":", "/", "!", "^", "¨", "$", "¤", "£", "€", "*", "%", "ù"];
    var check_maj = 0;
    var check_min = 0;
    var check_num = 0;
    var check_carac = 0;

    if (mdp.length < 12) return "Minimum 12 caractères";

    for (var i = 0; i < mdp.length; i++) {        
            for (var j = 0; j < maj.length; j++) {       
                if (mdp[i] === maj[j])
                    check_maj += 1;
                if (mdp[i] === maj[j].toLowerCase())
                    check_min += 1;
                if (mdp[i] === nombres[j])
                    check_num += 1;
                if (mdp[i] === carac[j])
                    check_carac += 1;
     }}
    
        if (check_maj < 3)   
            return "Minimum 3 majuscules !";
        if (check_min < 3)   
            return "Minimum 3 minuscules !";
        if (check_num < 3)   
            return "Minimum 3 nombres !";
        if (check_carac < 3) 
            return "Minimum 3 caractères spéciaux (!, :, +, =)";
    return null;
}

// Permet de valider et d'enregistrer un nouveau mot de passe
mdpconfirm.addEventListener("click", function () {
    const ancienMdp = champmdp.value.trim();   // champ du haut = ancien (disabled au départ)
    const nouveauMdp = nvmdp.value.trim();      // champ du bas = nouveau

    if (ancienMdp !== membre[indexActif].mdp) {
        alert("L'ancien mot de passe est incorrect !");
        return;
    }

    const erreur = mdpconforme(nouveauMdp);
    if (erreur) {
        alert(erreur);
        return;
    }

    membre[indexActif].mdp = nouveauMdp;
    sauvegarderMembre();

    champmdp.value = nouveauMdp;
    champmdp.disabled = true;
    nvmdp.value = "";
    nvmdp.style.display = "none";
    mdpconfirm.style.display = "none";
    fonddec.style.backgroundImage = "url('../Images/fondprofil/byeob.png')";

    alert("Mot de passe modifié avec succès !");
});


// Ici on change de fond d'écran a chaque fois qu'on survole une partie des boutons
buttonquitter.addEventListener("mouseover", (event) => {
    event.preventDefault();
    fonddec.style.backgroundImage = "url('../Images/fondprofil/byeob1.png')";
})

buttonquitter.addEventListener("mouseout", (event) => {
    event.preventDefault();
    fonddec.style.backgroundImage = "url('../Images/fondprofil/byeob.png')";
})

btn_profil.addEventListener("mouseover", (event) => {
    event.preventDefault();
    fonddec.style.backgroundImage = "url('../Images/fondprofil/byeobupl.png')";
})

btn_profil.addEventListener("mouseout", (event) => {
    event.preventDefault();
    fonddec.style.backgroundImage = "url('../Images/fondprofil/byeob.png')";
})


buttonfile.addEventListener("mouseover", (event) => {
    event.preventDefault();
    fonddec.style.backgroundImage = "url('../Images/fondprofil/byeobrand.png')";
})

buttonfile.addEventListener("mouseout", (event) => {
    event.preventDefault();
    fonddec.style.backgroundImage = "url('../Images/fondprofil/byeob.png')";
})


// Fonction qui permet de calculer les statistiques du profil
function calculerStatistiques() {

    const posts = chargerPost();

    const utilisateur = membre[indexActif];

    if (!utilisateur.abonnements)
        utilisateur.abonnements = [];

    if (!utilisateur.abonnes)
        utilisateur.abonnes = [];

    document.getElementById("nb_abonnes").textContent = utilisateur.abonnes.length;

    document.getElementById("nb_abonnements").textContent = utilisateur.abonnements.length;

    const mesPosts = posts.filter(p => p.pseudo === utilisateur.pseudo);

    document.getElementById("nb_parchemins").textContent = mesPosts.length;

    let totalLikes = 0;

    for (const post of mesPosts)
    {
        if (post.likes)
            totalLikes += post.likes.length;
    }

    document.getElementById("nb_sortileges").textContent = totalLikes;
}

calculerStatistiques();

// Permet de supprimer le compte de l'utilsiateur
supprimer.addEventListener("click", function() {
    const confirmation = confirm("Voulez-vous vraiment supprimer ce compte ?");
    if (!confirmation)
        return;

    const pseudoSupprime = membre[indexActif].pseudo;
    // On récupère les posts
    let posts = chargerPost();
    // Supprime ses posts
    posts = posts.filter(post => post.pseudo !== pseudoSupprime);

    // Supprime ses likes
    for (const post of posts) {
        if (post.likes){
            post.likes = post.likes.filter(like => like !== pseudoSupprime);
        }
    }
    // Supprime les abonnement

    for (const utilisateur of membre){
        if (utilisateur.abonnements){
            utilisateur.abonnements = utilisateur.abonnements.filter(pseudo => pseudo !== pseudoSupprime);
        }

        if (utilisateur.abonnes){
            utilisateur.abonnes =utilisateur.abonnes.filter(pseudo => pseudo !== pseudoSupprime);
        }
    }

    // Sauvegarde les posts
    sauvegarderPost(posts);
    localStorage.removeItem(pseudoSupprime);
    // Supprime le membre
    membre.splice(indexActif, 1);
    // Sauvegarde les membres
    sauvegarderMembre();
    // Supprime la session
    sessionStorage.removeItem("membreActif");
    // Retour accueil
    window.location.href = "../index.html";
});
