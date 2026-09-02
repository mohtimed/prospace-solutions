// ================== RÉCUPÉRATION DE L'ID DANS L'URL ==================
const parametres = new URLSearchParams(window.location.search);
const idEspace = parametres.get("id");

// ================== SÉLECTION DES ÉLÉMENTS ==================
const arianeNom = document.getElementById("ariane-nom");
const espaceNom = document.getElementById("espace-nom");
const espaceAdresse = document.getElementById("espace-adresse");
const espaceNote = document.getElementById("espace-note");
const espaceGalerie = document.getElementById("espace-galerie");
const espaceDescription = document.getElementById("espace-description");
const espaceEquipements = document.getElementById("espace-equipements");
const espaceCapacite = document.getElementById("espace-capacite");

const tarifHeure = document.getElementById("tarif-heure");
const tarifDemi = document.getElementById("tarif-demi");
const tarifJournee = document.getElementById("tarif-journee");

const btnContact = document.getElementById("btn-contact");

// ================== AFFICHAGE DE L'ESPACE ==================
function afficherEspace(espace) {

  // Mise à jour du titre de la page (SEO - US-10)
  document.title = espace.nom + " - Salle de réunion " + espace.capacite + " p. | ProSpace Solutions";

  // Fil d'ariane
  arianeNom.textContent = espace.nom;

  // En-tête
  espaceNom.textContent = espace.nom;
  espaceAdresse.textContent = espace.adresse;
  espaceNote.textContent = espace.note + " (" + espace.avis + " avis)";

  // Galerie
  espaceGalerie.innerHTML += "<img src='" + espace.image + "' alt='" + espace.nom + " à " + espace.quartier + "'>";

  // Description
  espaceDescription.textContent = espace.description;

  // Équipements
  let htmlEquipements = "";
  espace.equipementsDetail.forEach(function (equipement) {
    htmlEquipements += "<li><img src='img/Icon_verified.png' alt=''>" + equipement + "</li>";
  });
  espaceEquipements.innerHTML = htmlEquipements;

  // Capacité et configuration
  let htmlCapacite = "";
  htmlCapacite += "<strong>Jusqu'à " + espace.capacite + " personnes</strong><br>";
  htmlCapacite += espace.configuration;
  espaceCapacite.innerHTML = htmlCapacite;

  // Tarifs
  tarifHeure.textContent = espace.prixHeure + "€";
  tarifDemi.textContent = espace.prixDemiJournee + "€";
  tarifJournee.textContent = espace.prixJournee + "€";

  // Lien de contact pré-rempli
  btnContact.href = "contact.html?espace=" + espace.id;
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
    // On cherche l'espace correspondant à l'id de l'URL
    const espace = data.find(function (element) {
      return element.id === idEspace;
    });

    if (espace) {
      afficherEspace(espace);
    } else {
      espaceNom.textContent = "Espace introuvable";
      espaceDescription.textContent = "Cet espace n'existe pas ou n'est plus disponible.";
    }
  })
  .catch(function (error) {
    console.error("Erreur : " + error.message);
  });