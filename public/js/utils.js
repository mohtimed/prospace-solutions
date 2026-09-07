import { CHEMIN_DONNEES, LIBELLES_EQUIPEMENTS } from "./config.js";

// ================== CHARGEMENT DES ESPACES ==================
export function chargerEspaces() {
  return fetch(CHEMIN_DONNEES)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Impossible de charger les espaces.");
      }
      return response.json();
    });
}

// ================== BADGES DES ÉQUIPEMENTS ==================
export function afficherEquipements(equipements) {
  let html = "";

  equipements.forEach(function (equipement) {
    const nom = LIBELLES_EQUIPEMENTS[equipement];
    html += "<li><img src='img/icon-" + equipement + ".png' alt=''>" + nom + "</li>";
  });

  return html;
}