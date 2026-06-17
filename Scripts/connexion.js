// On déifnit les éléments de la page html qui nous seront utiles dans le futur
const form = document.getElementById("form-etudiant");
const inputsobriquet = document.getElementById("Sobriquet");
const inputemail = document.getElementById("Email");
const inputmdp = document.getElementById("mdp");

// Fonction qui permet de charger les étudiants, qui correspond ici aux utilisateurs
function chargerEtudiants() {
    const data = localStorage.getItem("membre"); // on cherche l'item membre dans le localstorage
    if (data !== null) {
        membre = JSON.parse(data); // et si il est pas null on le met dans la variable membre
}}

// Fonction qui permet de sauvegarder un membre, ici un utilisateur
function sauvegarderMembre() { 
    localStorage.setItem("membre", JSON.stringify(membre));
}

// Permet d'afficher les utilisateurs dans la console
function afficherEtudiants() {
    for (let i = 0; i < membre.length; i++) {
        console.log(membre[i].pseudo, " ", membre[i].email, " ", membre[i].mdp);
    }
}

// appel des fonctions pour avoir la variable membre et les différents utilisateurs dans la console
chargerEtudiants()


// Permet de submit lors de la connexion
form.addEventListener("submit", function (event) {
    event.preventDefault();
    var check = 0;
    var check_mdp = 0;
    const nom = inputsobriquet.value.trim();
    const mdp = inputmdp.value;

    // on demande obligatoirement le nom et le mdp pour al connexion, sans quoi l'accès est refusé
    if (nom === "") {
        verif_info.innerHTML = "Le nom est obligatoire.";
        return;
        }
    
    if (mdp === "") {
            verif_info.innerHTML = "Le mot de passe est obligatoire.";
            return;
    }

    // ici on va parcourir chaque membre et vérifier que le nom rensseigné et le mdp renseigné par l'utilisateur correspond a des donneés dans le localstorage
    for (var i = 0; i < membre.length; i++) {
        if (nom === membre[i].pseudo){
            check += 1;
            if (mdp === membre[i].mdp){
                check_mdp += 1;
                sessionStorage.setItem("membreActif", nom); // on met ici le pseudo actif de l'utilisateur, cel anou sera utile un peu partout
                window.location.href = "profil.html";
            }
            //         // if (mdp[y] != membre[i].mdp[i]){
            //         //     return;
            //         // }
            // }
            break;
        }
    }

    if (check !== 1){
        verif_info.innerHTML = "Le nom ne figure pas dans notre base de donnée.";
    }
    if (check_mdp !== 1){
        verif_info.innerHTML = "Le mot de passe ne correspond pas.";
    }
    
    
    });