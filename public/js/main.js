// ================== SÉLECTION DES ÉLÉMENTS ==================
const listeEspaces = document.getElementById("liste-espaces");
const compteur = document.getElementById("compteur-espaces");
const spinner = document.getElementById("spinner");
const messageVide = document.getElementById("message-vide");

const filtreVille = document.getElementById("filtre-ville");
const filtreCapacite = document.getElementById("filtre-capacite");
const checkboxes = document.querySelectorAll("input[name='equipements']");

// Stocke tous les espaces chargés depuis le JSON
let tousLesEspaces = [];

// ================== TRADUCTION DES ÉQUIPEMENTS ==================
function afficherEquipements(equipements) {
  let html = "";

  equipements.forEach(function (equipement) {
    let nom = "";

    if (equipement === "wifi") {
      nom = "Fibre";
    } else if (equipement === "pmr") {
      nom = "PMR";
    } else if (equipement === "ecran") {
      nom = "4K";
    } else if (equipement === "visio") {
      nom = "Visio";
    } else if (equipement === "cafe") {
      nom = "Café";
    }

    html += "<li>" + nom + "</li>";
  });

  return html;
}

// ================== AFFICHAGE DES CARTES ==================
function afficherEspaces(espaces) {
  // On vide la grille avant de la remplir
  listeEspaces.innerHTML = "";

  // On met à jour le compteur
  compteur.textContent = espaces.length + " espaces disponibles";

  // On affiche ou masque le message "aucun résultat"
  if (espaces.length === 0) {
    messageVide.classList.remove("hidden");
  } else {
    messageVide.classList.add("hidden");
  }

  // On crée une carte pour chaque espace
  espaces.forEach(function (espace) {
    const carte = document.createElement("article");
    carte.className = "carte";

    let html = "";
    html += "<img src='" + espace.image + "' alt='" + espace.nom + " à " + espace.quartier + "' loading='lazy'>";
    html += "<h3>" + espace.nom + "</h3>";
    html += "<p>" + espace.quartier + "</p>";
    html += "<p>" + espace.note + " (" + espace.avis + " avis)</p>";
    html += "<p>" + espace.capacite + " pers.</p>";
    html += "<ul class='carte__equipements'>" + afficherEquipements(espace.equipements) + "</ul>";
    html += "<p>" + espace.prixHeure + "€ /heure</p>";
    html += "<a href='espace.html?id=" + espace.id + "'>Voir la fiche</a>";

    carte.innerHTML = html;
    listeEspaces.appendChild(carte);
  });
}

// ================== FILTRAGE ==================
function filtrerEspaces() {
  const ville = filtreVille.value;
  const capacite = filtreCapacite.value;

  // On récupère les équipements cochés
  const equipementsCoches = [];
  checkboxes.forEach(function (checkbox) {
    if (checkbox.checked) {
      equipementsCoches.push(checkbox.value);
    }
  });

  // On garde les espaces qui correspondent
  const resultats = [];

  tousLesEspaces.forEach(function (espace) {
    let correspond = true;

    // Filtre ville
    if (ville !== "" && espace.ville !== ville) {
      correspond = false;
    }

    // Filtre capacité
    if (capacite === "1-10" && espace.capacite > 10) {
      correspond = false;
    }
    if (capacite === "11-25" && (espace.capacite < 11 || espace.capacite > 25)) {
      correspond = false;
    }
    if (capacite === "26-50" && espace.capacite < 26) {
      correspond = false;
    }

    // Filtre équipements : l'espace doit avoir TOUS ceux cochés
    equipementsCoches.forEach(function (equipement) {
      if (!espace.equipements.includes(equipement)) {
        correspond = false;
      }
    });

    if (correspond === true) {
      resultats.push(espace);
    }
  });

  afficherEspaces(resultats);
}

// ================== CHARGEMENT DES DONNÉES ==================
fetch("data/espaces.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Impossible de charger les espaces.");
    }
    return response.json();
  })
  .then(function (data) {
    tousLesEspaces = data;
    afficherEspaces(data);
  })
  .catch(function (error) {
    console.error("Erreur : " + error.message);
  });

// ================== ÉCOUTEURS DES FILTRES ==================
filtreVille.addEventListener("change", filtrerEspaces);
filtreCapacite.addEventListener("change", filtrerEspaces);

checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("change", filtrerEspaces);
});