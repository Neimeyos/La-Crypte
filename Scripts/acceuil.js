const btngauche = document.getElementById("Connexion");
const btndroite = document.getElementById("Inscription");
const fonddec = document.getElementById("Choix");

btngauche.addEventListener("mouseover", (event) => {
    event.preventDefault();
    fonddec.style.backgroundImage = "url('Images/fondacceuil/ababgauche.png')";
})

btngauche.addEventListener("mouseout", (event) => {
    event.preventDefault();
    fonddec.style.backgroundImage = "url('Images/fondacceuil/abab.png')";
})

btndroite.addEventListener("mouseover", (event) => {
    event.preventDefault();
    fonddec.style.backgroundImage = "url('Images/fondacceuil/ababdroite.png')";
})

btndroite.addEventListener("mouseout", (event) => {
    event.preventDefault();
    fonddec.style.backgroundImage = "url('Images/fondacceuil/abab.png')";
})