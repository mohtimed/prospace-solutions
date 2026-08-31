// ================== SÉLECTION DES ÉLÉMENTS ==================
const listeEspaces = document.getElementById("liste-espaces");
const compteur = document.getElementById("compteur-espaces");
const spinner = document.getElementById("spinner");
const messageVide = document.getElementById("message-vide");

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

// ================== CHARGEMENT DES DONNÉES ==================
fetch("data/espaces.json")
  .then(function (response) {
    if (!response.ok) {
      throw new Error("Impossible de charger les espaces.");
    }
    return response.json();
  })
  .then(function (data) {
    afficherEspaces(data);
  })
  .catch(function (error) {
    console.error("Erreur : " + error.message);
  });