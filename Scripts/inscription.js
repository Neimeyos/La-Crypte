// On récup ici tout les elements necessaires pour la suite du code
const form = document.getElementById("form-etudiant");
const inputsobriquet = document.getElementById("Sobriquet");
const inputemail = document.getElementById("Email");
const inputmdp = document.getElementById("mdp");
let membre = [];
chargerEtudiants()

// Fonction qui permet de vérifier que les deux mots de passes sont identiques
function verif() {

    var a = document.getElementById("mdp");
    var b = document.getElementById("mdp_confirm").value;
    var c = document.getElementById("verif_mdp_cache");
    var d = document.getElementById("verif_mdp_cache").value;

    if (a.value!=b) {
        c.innerHTML = "Erreur !";
    }
    else {
        c.innerHTML = "";
    }

}

// Fonction qui vérifie que le mot de passe est conforme aux règles
function mdpconforme(mdp)
{
    let nbMaj = 0;
    let nbMin = 0;
    let nbNum = 0;
    let nbSpec = 0;

    if (mdp.length < 12)
        return "Minimum 12 caractères";

    // on parcours chaque caractere du mot de passe 
    for (let i = 0; i < mdp.length; i++)
    {
        const c = mdp[i];

        // et si on trouve soit une majuscule, minuscule, nombre ou bien caractere special
        if (c >= "A" && c <= "Z")
            nbMaj++;

        else if (c >= "a" && c <= "z")
            nbMin++;

        else if (c >= "0" && c <= "9")
            nbNum++;

        else
            nbSpec++;
    }

    if (nbMaj < 3)
        return "Minimum 3 majuscules";

    if (nbMin < 3)
        return "Minimum 3 minuscules";

    if (nbNum < 3)
        return "Minimum 3 chiffres";

    if (nbSpec < 3)
        return "Minimum 3 caractères spéciaux";

    return null;
}

// charge les utilisateurs
function chargerEtudiants() {
    const data = localStorage.getItem("membre");
    if (data !== null) {
    membre = JSON.parse(data);
}}

// Fonction qui sauvegarde les différents utilisateurs
function sauvegarderMembre() {
    localStorage.setItem("membre", JSON.stringify(membre));
}

// Fonction qui affiche les utilisateurs dans la console pour le debug
function afficherEtudiants() {
    for (let i = 0; i < membre.length; i++) {
        console.log(membre[i].pseudo, " ", membre[i].email, " ", membre[i].mdp);
    }
}

// Si l'utilisateur clique sur creer un compte
form.addEventListener("submit", function (event) {

    event.preventDefault();

    // on récupere les valeurs qu'il a renseigné
    const nom = inputsobriquet.value.trim();
    const email = inputemail.value.trim();
    const mdp = inputmdp.value;
    const mdpConfirm = document.getElementById("mdp_confirm").value;
    const desc = "";
    const path = "../Images/pdp/g10.png";

    verif_info.innerHTML = "";

    // on vérifie que chqque champ n'est pas vide
    if (nom === "") {
        verif_info.innerHTML = "Le nom est obligatoire.";
        return;
    }

    if (email === "") {
        verif_info.innerHTML = "L'email est obligatoire.";
        return;
    }

    if (mdp === "") {
        verif_info.innerHTML = "Le mot de passe est obligatoire.";
        return;
    }

    // vérifie que les deux mdp sont les memes
    if (mdp !== mdpConfirm) {
        verif_info.innerHTML = "Les mots de passe sont différents.";
        return;
    }

    // on vérifie que le mot de passe resepcte les regles
    const erreurMdp = mdpconforme(mdp);

    if (erreurMdp !== null) {
        verif_info.innerHTML = erreurMdp;
        return;
    }

    // on vérifie si le pseudo existe deja
    const pseudoExiste =  membre.some(m => m.pseudo === nom);

    if (pseudoExiste) {
        verif_info.innerHTML = "Ce pseudo existe déjà.";
        return;
    }

    // on verifie si le mail existe deja
    const emailExiste = membre.some(m => m.email === email);

    if (emailExiste) {
        verif_info.innerHTML = "Cet email existe déjà.";
        return;
    }

    // ajout du nouveau membre dans le local storage
    membre.push({
        pseudo: nom,
        email: email,
        mdp: mdp,
        path: path,
        desc: desc,
        abonnements: [],
        abonnes: []
    });

    // on met le pseudo actif au nom qui vient d'etre renseigné
    sessionStorage.setItem("membreActif", nom);

    sauvegarderMembre();

    window.location.href = "profil.html";
});