import { chargerEspaces } from "./utils.js";
import { estFavori, basculerFavori, majBadgeFavoris } from "./favoris.js";

majBadgeFavoris();

// ================== RÉCUPÉRATION DE L'ID DANS L'URL ==================
const parametres = new URLSearchParams(window.location.search);
const idEspace = parametres.get("id");

// ================== SÉLECTION DES ÉLÉMENTS ==================
const arianeVille = document.getElementById("ariane-ville");
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

  // Titre de la page (SEO - US-10)
  document.title = espace.nom + " - Salle de réunion " + espace.capacite + " p. | ProSpace Solutions";

  // Fil d'ariane
  arianeVille.textContent = espace.quartier;
  arianeNom.textContent = espace.nom;

  // En-tête
  espaceNom.textContent = espace.nom;

  let htmlAdresse = "";
  htmlAdresse += "<img src='img/Icon-localisation.png' alt=''>" + espace.adresse;
  espaceAdresse.innerHTML = htmlAdresse;

  let htmlNote = "";
  htmlNote += "<span class='espace__etoiles' aria-hidden='true'>★★★★★</span>";
  htmlNote += "<strong class='espace_note'>" + espace.note + "</strong>";
  htmlNote += "<span class='espace__avis'>· " + espace.avis + " avis vérifiés</span>";
  espaceNote.innerHTML = htmlNote;

  // Galerie : 1 grande image + 2 petites
  let htmlGalerie = "";
  htmlGalerie += "<div class='galerie__principale'>";
  htmlGalerie += "<img src='" + espace.images[0] + "' alt='" + espace.nom + " - vue principale'>";
  htmlGalerie += "</div>";
  htmlGalerie += "<div class='galerie__secondaires'>";
  htmlGalerie += "<img src='" + espace.images[1] + "' alt='" + espace.nom + " - vue secondaire' loading='lazy'>";
  htmlGalerie += "<img src='" + espace.images[2] + "' alt='" + espace.nom + " - vue complémentaire' loading='lazy'>";
  htmlGalerie += "</div>";
  espaceGalerie.innerHTML = htmlGalerie;

  // Description
  espaceDescription.textContent = espace.description;

  // Équipements détaillés
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

  // État initial du bouton favori
  majBoutonFavoriFiche(espace.id);

  // Clic sur le bouton favori
  const btnFavori = document.getElementById("btn-favori");
  btnFavori.addEventListener("click", function () {
    basculerFavori(espace.id);
    majBoutonFavoriFiche(espace.id);
  });
}

// ================== ÉTAT DU BOUTON FAVORI ==================
function majBoutonFavoriFiche(id) {
  const btnFavori = document.getElementById("btn-favori");
  const texte = document.getElementById("btn-favori-texte");
  const icone = document.getElementById("btn-favori-icone");

  if (estFavori(id)) {
    btnFavori.classList.add("actif");
    btnFavori.setAttribute("aria-pressed", "true");
    texte.textContent = "Sauvegardé en Favoris";
    icone.src = "img/Icon-coeur-rouge.png";
  } else {
    btnFavori.classList.remove("actif");
    btnFavori.setAttribute("aria-pressed", "false");
    texte.textContent = "Sauvegarder en Favoris";
    icone.src = "img/Icon-coeur.png";
  }
}

// ================== CHARGEMENT DES DONNÉES ==================
chargerEspaces()
  .then(function (data) {
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