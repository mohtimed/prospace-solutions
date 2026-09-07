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