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

    html += "<li><img src='img/Icon-" + equipement + ".png' alt=''>" + nom + "</li>";
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

    // Image avec bouton favori
    html += "<div class='carte__image'>";
    html += "<img src='" + espace.image + "' alt='" + espace.nom + " à " + espace.quartier + "' loading='lazy'>";
    html += "<button class='carte__favori' data-id='" + espace.id + "' aria-label='Ajouter " + espace.nom + " aux favoris' aria-pressed='false'>";
    html += "<img src='img/Icon-coeur.png' alt=''>";
    html += "</button>";
    html += "</div>";

    // Contenu
    html += "<div class='carte__contenu'>";
    html += "<h3 class='carte__titre'>" + espace.nom + "</h3>";

    html += "<p class='carte__lieu'><img src='img/Icon-localisation.png' alt=''>" + espace.quartier + "</p>";

    html += "<p class='carte__note'>";
    html += "<span class='carte__etoiles' aria-hidden='true'>★★★★★</span>";
    html += "<strong>" + espace.note + "</strong>";
    html += "<span class='carte__avis'>(" + espace.avis + " avis)</span>";
    html += "</p>";

    html += "<p class='carte__infos'>";
    html += "<img src='img/Icon-personne.png' alt=''>" + espace.capacite + " pers.";
    html += "</p>";

    html += "<ul class='carte__equipements'>" + afficherEquipements(espace.equipements) + "</ul>";

    // Pied de carte
    html += "<div class='carte__pied'>";
    html += "<p class='carte__prix'><strong>" + espace.prixHeure + "€</strong> <span>/heure</span></p>";
    html += "<a href='espace.html?id=" + espace.id + "' class='carte__lien'>Voir la fiche</a>";
    html += "</div>";

    html += "</div>";

    carte.innerHTML = html;
    listeEspaces.appendChild(carte);

    // On applique l'état favori au bouton
    const boutonFavori = carte.querySelector(".carte__favori");
    majBoutonFavori(boutonFavori, espace.id);
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


// ================== CLIC SUR LES BOUTONS FAVORIS ==================
listeEspaces.addEventListener("click", function (event) {
  const bouton = event.target.closest(".carte__favori");

  if (bouton === null) {
    return;
  }

  const id = bouton.dataset.id;
  basculerFavori(id);
  majBoutonFavori(bouton, id);
});

// Met à jour l'apparence d'un bouton favori
function majBoutonFavori(bouton, id) {
  if (estFavori(id)) {
    bouton.classList.add("actif");
    bouton.setAttribute("aria-pressed", "true");
  } else {
    bouton.classList.remove("actif");
    bouton.setAttribute("aria-pressed", "false");
  }
}