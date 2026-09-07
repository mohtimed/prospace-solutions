// ================== GESTION DES FAVORIS ==================

// Récupère la liste des favoris depuis le localStorage
export function getFavoris() {
  const favorisTexte = localStorage.getItem("favoris");

  if (favorisTexte === null) {
    return [];
  }

  return JSON.parse(favorisTexte);
}

// Enregistre la liste des favoris dans le localStorage
export function sauvegarderFavoris(favoris) {
  localStorage.setItem("favoris", JSON.stringify(favoris));
}

// Vérifie si un espace est déjà en favori
export function estFavori(id) {
  const favoris = getFavoris();
  return favoris.includes(id);
}

// Ajoute ou retire un espace des favoris
export function basculerFavori(id) {
  let favoris = getFavoris();

  if (favoris.includes(id)) {
    // On le retire
    const nouveauxFavoris = [];
    favoris.forEach(function (favori) {
      if (favori !== id) {
        nouveauxFavoris.push(favori);
      }
    });
    favoris = nouveauxFavoris;
  } else {
    // On l'ajoute
    favoris.push(id);
  }

  sauvegarderFavoris(favoris);
  majBadgeFavoris();
}

// Met à jour le badge du header
export function majBadgeFavoris() {
  const badge = document.getElementById("badge-favoris");

  if (badge === null) {
    return;
  }

  const nombre = getFavoris().length;
  badge.textContent = nombre;

  if (nombre === 0) {
    badge.classList.add("hidden");
  } else {
    badge.classList.remove("hidden");
  }
}