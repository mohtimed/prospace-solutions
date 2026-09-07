import { majBadgeFavoris } from "./favoris.js";

majBadgeFavoris();

// ================== SÉLECTION DES ÉLÉMENTS ==================
const formContact = document.getElementById("form-contact");
const confirmation = document.getElementById("form-confirmation");
const champSujet = document.getElementById("sujet");

// ================== PRÉ-REMPLISSAGE DEPUIS L'URL ==================
const parametresContact = new URLSearchParams(window.location.search);
const espaceDemande = parametresContact.get("espace");

if (espaceDemande !== null) {
  champSujet.value = "reservation";

  const champMessage = document.getElementById("message");
  champMessage.value = "Bonjour,\n\nJe souhaite obtenir des informations sur l'espace suivant : " + espaceDemande + ".\n\n";
}

// ================== AFFICHAGE DES ERREURS ==================
function afficherErreur(idChamp, message) {
  const zoneErreur = document.getElementById("erreur-" + idChamp);
  zoneErreur.textContent = message;
}

function effacerErreurs() {
  const zonesErreur = document.querySelectorAll(".form__erreur");
  zonesErreur.forEach(function (zone) {
    zone.textContent = "";
  });
}

// ================== VALIDATION ==================
function validerFormulaire() {
  let estValide = true;

  effacerErreurs();

  // Nom
  const nom = document.getElementById("nom").value.trim();
  if (nom.length === 0) {
    afficherErreur("nom", "Veuillez saisir votre nom complet.");
    estValide = false;
  } else if (nom.length < 3) {
    afficherErreur("nom", "Le nom doit contenir au moins 3 caractères.");
    estValide = false;
  }

  // Email
  const email = document.getElementById("email").value.trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email.length === 0) {
    afficherErreur("email", "Veuillez saisir votre email professionnel.");
    estValide = false;
  } else if (!emailRegex.test(email)) {
    afficherErreur("email", "Le format de l'email n'est pas valide.");
    estValide = false;
  }

  // Entreprise
  const entreprise = document.getElementById("entreprise").value.trim();
  if (entreprise.length === 0) {
    afficherErreur("entreprise", "Veuillez indiquer le nom de votre entreprise.");
    estValide = false;
  }

  // Téléphone (facultatif, mais validé s'il est rempli)
  const telephone = document.getElementById("telephone").value.trim();
  const telephoneRegex = /^(\+33|0)[1-9]([-. ]?[0-9]{2}){4}$/;
  if (telephone.length > 0 && !telephoneRegex.test(telephone)) {
    afficherErreur("telephone", "Le format du téléphone n'est pas valide.");
    estValide = false;
  }

  // Message
  const message = document.getElementById("message").value.trim();
  if (message.length === 0) {
    afficherErreur("message", "Veuillez décrire votre demande.");
    estValide = false;
  } else if (message.length < 20) {
    afficherErreur("message", "Le message doit contenir au moins 20 caractères.");
    estValide = false;
  }

  // Case RGPD
  const rgpd = document.getElementById("rgpd").checked;
  if (rgpd === false) {
    afficherErreur("rgpd", "Vous devez accepter la politique de confidentialité.");
    estValide = false;
  }

  return estValide;
}

// ================== ENVOI DU FORMULAIRE ==================
formContact.addEventListener("submit", function (event) {
  event.preventDefault();

  if (validerFormulaire()) {
    confirmation.textContent = "Merci ! Votre message a bien été envoyé. Notre équipe vous répondra sous 2 heures ouvrées.";
    confirmation.classList.remove("hidden");
    formContact.reset();
  } else {
    confirmation.classList.add("hidden");
  }
});

// ================== DONNÉES DE L'ÉQUIPE ==================
const equipe = [
  { nom: "Alexandre Moreau", poste: "CEO & Co-fondateur", photo: "img/equipe3_converted.png" },
  { nom: "Sophie Leclerc", poste: "Directrice Commerciale", photo: "img/equipe4_converted.png" },
  { nom: "Thomas Bergeron", poste: "Responsable Partenariats", photo: "img/equipe5_converted.png" },
  { nom: "Marine Dubois", poste: "Chargée de Clientèle Senior", photo: "img/equipe6_converted.png" },
  { nom: "Julien Fontaine", poste: "Directeur Technique", photo: "img/equipe7_converted.png" },
  { nom: "Élodie Garnier", poste: "Chargée des Opérations", photo: "img/equipe1_converted.png" },
  { nom: "Nicolas Vidal", poste: "Responsable Support", photo: "img/equipe2_converted.png" }
];

// ================== SÉLECTION DES ÉLÉMENTS ==================
const carrouselPiste = document.getElementById("carrousel-piste");
const carrouselPoints = document.getElementById("carrousel-points");
const btnPrecedent = document.getElementById("carrousel-precedent");
const btnSuivant = document.getElementById("carrousel-suivant");

// Nombre de membres visibles à la fois
const membresVisibles = 4;

// Position actuelle
let positionActuelle = 0;

// ================== AFFICHAGE DES MEMBRES ==================
function afficherMembres() {
  carrouselPiste.innerHTML = "";

  for (let i = 0; i < membresVisibles; i++) {
    // Le modulo permet de revenir au début quand on dépasse la fin
    const index = (positionActuelle + i) % equipe.length;
    const membre = equipe[index];

    const carte = document.createElement("article");
    carte.className = "membre";

    let html = "";
    html += "<div class='membre__photo'>";
    html += "<img src='" + membre.photo + "' alt='Portrait de " + membre.nom + "' loading='lazy'>";
    html += "</div>";
    html += "<p class='membre__nom'>" + membre.nom + "</p>";
    html += "<p class='membre__poste'>" + membre.poste + "</p>";

    carte.innerHTML = html;
    carrouselPiste.appendChild(carte);
  }

  majPoints();
}

// ================== POINTS DE PAGINATION ==================
function creerPoints() {
  carrouselPoints.innerHTML = "";

  for (let i = 0; i < equipe.length; i++) {
    const point = document.createElement("button");
    point.className = "carrousel__point";
    point.dataset.position = i;
    point.setAttribute("aria-label", "Afficher à partir de " + equipe[i].nom);
    carrouselPoints.appendChild(point);
  }
}

function majPoints() {
  const points = document.querySelectorAll(".carrousel__point");

  points.forEach(function (point, index) {
    if (index === positionActuelle) {
      point.classList.add("actif");
    } else {
      point.classList.remove("actif");
    }
  });
}

// ================== ÉCOUTEURS ==================
btnPrecedent.addEventListener("click", function () {
  positionActuelle = positionActuelle - 1;

  // Si on passe avant le premier, on repart à la fin
  if (positionActuelle < 0) {
    positionActuelle = equipe.length - 1;
  }

  afficherMembres();
});

btnSuivant.addEventListener("click", function () {
  positionActuelle = positionActuelle + 1;

  // Si on dépasse le dernier, on repart au début
  if (positionActuelle >= equipe.length) {
    positionActuelle = 0;
  }

  afficherMembres();
});

carrouselPoints.addEventListener("click", function (event) {
  const point = event.target.closest(".carrousel__point");

  if (point === null) {
    return;
  }

  positionActuelle = parseInt(point.dataset.position);
  afficherMembres();
});

// ================== INITIALISATION ==================
creerPoints();
afficherMembres();