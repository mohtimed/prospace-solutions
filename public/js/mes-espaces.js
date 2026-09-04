// ================== SÉLECTION DES ÉLÉMENTS ==================
const listeFavoris = document.getElementById("liste-favoris");
const compteurFavoris = document.getElementById("compteur-favoris");
const messageVideFavoris = document.getElementById("message-vide-favoris");
const btnVider = document.getElementById("btn-vider");

let tousLesEspaces = [];

// ================== AFFICHAGE DES FAVORIS ==================
function afficherFavoris() {
  const favoris = getFavoris();

  listeFavoris.innerHTML = "";

  // Compteur
  if (favoris.length === 1) {
    compteurFavoris.textContent = "1 espace dans votre sélection";
  } else {
    compteurFavoris.textContent = favoris.length + " espaces dans votre sélection";
  }

  // Message si liste vide
  if (favoris.length === 0) {
    messageVideFavoris.classList.remove("hidden");
    btnVider.classList.add("hidden");
    return;
  }

  messageVideFavoris.classList.add("hidden");
  btnVider.classList.remove("hidden");

  // On affiche chaque espace favori
  favoris.forEach(function (id) {
    const espace = tousLesEspaces.find(function (element) {
      return element.id === id;
    });

    if (!espace) {
      return;
    }

    const carte = document.createElement("article");
    carte.className = "carte-favori";

    let html = "";

    html += "<div class='carte-favori__image'>";
    html += "<img src='" + espace.image + "' alt='" + espace.nom + " à " + espace.quartier + "' loading='lazy'>";
    html += "</div>";

    html += "<div class='carte-favori__contenu'>";
    html += "<h2 class='carte-favori__titre'>" + espace.nom + "</h2>";
    html += "<p class='carte-favori__lieu'><img src='img/Icon-localisation.png' alt=''>" + espace.quartier + "</p>";

    html += "<p class='carte-favori__infos'>";
    html += "<img src='img/Icon-personne.png' alt=''>" + espace.capacite + " pers.";
    html += "<span class='carte-favori__prix'>" + espace.prixHeure + "€ <span>/h</span></span>";
    html += "<span class='carte-favori__etoiles' aria-hidden='true'>★★★★★</span>";
    html += "<span class='carte-favori__avis'>(" + espace.avis + ")</span>";
    html += "</p>";
    html += "</div>";

    html += "<div class='carte-favori__actions'>";
    html += "<a href='espace.html?id=" + espace.id + "' class='btn-voir'>Voir Fiche</a>";
    html += "<button class='btn-retirer' data-id='" + espace.id + "' aria-label='Retirer " + espace.nom + " de ma sélection'>";
    html += "<span class='btn-retirer__icone'>";
    html += "<img src='img/Icon-poubelle.png' alt='' class='icone-normal'>";
    html += "<img src='img/Icon-poubelle-rose.png' alt='' class='icone-hover'>";
    html += "</span>";
    html += "Retirer";
    html += "</button>";

    carte.innerHTML = html;
    listeFavoris.appendChild(carte);
  });
}

// ================== RETIRER UN ESPACE ==================
listeFavoris.addEventListener("click", function (event) {
  const bouton = event.target.closest(".btn-retirer");

  if (bouton === null) {
    return;
  }

  const id = bouton.dataset.id;
  basculerFavori(id);
  afficherFavoris();
});

// ================== VIDER LA SÉLECTION ==================
btnVider.addEventListener("click", function () {
  localStorage.removeItem("favoris");
  majBadgeFavoris();
  afficherFavoris();
});

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
    afficherFavoris();
  })
  .catch(function (error) {
    console.error("Erreur : " + error.message);
  });