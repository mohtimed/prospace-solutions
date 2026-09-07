# ProSpace Solutions — Plateforme B2B de location d'espaces de travail

Application web multi-pages permettant aux professionnels de rechercher, comparer et sauvegarder des espaces de travail flexibles (salles de réunion, bureaux privatifs, coworking) partout en France.

Projet réalisé dans le cadre de la formation Développeur Full Stack — module Front-End.

---

## Sommaire

1. [Aperçu du projet](#1-aperçu-du-projet)
2. [Stack technique](#2-stack-technique)
3. [Installation et lancement](#3-installation-et-lancement)
4. [Architecture du projet](#4-architecture-du-projet)
5. [Architecture SCSS](#5-architecture-scss)
6. [Architecture JavaScript](#6-architecture-javascript)
7. [Documentation des données (JSON)](#7-documentation-des-données-json)
8. [Paramétrage URLSearchParams](#8-paramétrage-urlsearchparams)
9. [Gestion des favoris (localStorage)](#9-gestion-des-favoris-localstorage)
10. [Référencement naturel (SEO)](#10-référencement-naturel-seo)
11. [Accessibilité numérique](#11-accessibilité-numérique)
12. [Scores Lighthouse](#12-scores-lighthouse)
13. [Responsive design](#13-responsive-design)
14. [Choix techniques et écarts assumés](#14-choix-techniques-et-écarts-assumés)
15. [Pistes d'amélioration](#15-pistes-damélioration)

---

## 1. Aperçu du projet

L'application comporte **4 pages** reliées par une navigation partagée :

| Page | Fichier | Rôle |
|---|---|---|
| Accueil & Recherche | `index.html` | Moteur de recherche multi-critères, grille de résultats dynamique |
| Fiche Espace | `espace.html?id=...` | Page détaillée alimentée dynamiquement selon l'ID de l'URL |
| Mes Espaces | `mes-espaces.html` | Carnet de favoris persistant via la Web Storage API |
| Contact | `contact.html` | Formulaire validé côté client, informations entreprise, carrousel équipe |

### Fonctionnalités principales

- Chargement asynchrone des données via `fetch()` avec indicateur de chargement
- Filtrage combiné par ville, capacité d'accueil et équipements
- Génération dynamique des cartes à partir d'un fichier JSON
- Navigation entre pages par paramètre d'URL (`URLSearchParams`)
- Sauvegarde des favoris persistante entre les sessions (`localStorage`)
- Formulaire de contact avec validation temps réel et messages d'erreur accessibles
- Carrousel d'équipe en JavaScript natif, navigable au clavier
- Interface entièrement responsive (mobile, tablette, desktop)

---

## 2. Stack technique

| Technologie | Usage |
|---|---|
| HTML5 sémantique | Structure des pages, landmarks ARIA |
| SCSS (Sass) | Préprocesseur CSS, architecture modulaire 7-1 |
| JavaScript ES6+ natif | Modules `import`/`export`, `fetch`, DOM, `localStorage` |
| npm | Gestion de la dépendance Sass |
| Git / GitHub | Versionnement, commits conventionnels |

**Aucun framework** n'a été utilisé : ni CSS (Bootstrap, Tailwind), ni JavaScript (React, Vue). L'ensemble est développé en langages natifs conformément aux contraintes du cahier des charges.

---

## 3. Installation et lancement

### Prérequis

- [Node.js](https://nodejs.org) (version 18 ou supérieure)
- Un serveur local — l'extension **Live Server** de VS Code est recommandée

> **Important** : l'application utilise `fetch()` et les modules ES6, qui ne fonctionnent pas en ouvrant les fichiers directement (protocole `file://`). Un serveur local est indispensable.

### Installation

```bash
git clone https://github.com/<mohtimed>/prospace-solutions.git
cd prospace-solutions
npm install
```

### Compilation du SCSS

```bash
# Compilation en continu pendant le développement
npm run sass

# Équivalent de la commande complète
npx sass --watch public/assets/main.scss public/css/styles.css
```

### Lancement

Ouvrir `public/index.html` avec Live Server, puis accéder à :

```
http://127.0.0.1:5500/public/index.html
```

---

## 4. Architecture du projet

```
prospace-solutions/
│
├── public/
│   ├── index.html              # Page Accueil & Recherche
│   ├── espace.html             # Page Fiche Espace (dynamique)
│   ├── mes-espaces.html        # Page Favoris
│   ├── contact.html            # Page Contact
│   │
│   ├── assets/                 # Sources SCSS (non servies au navigateur)
│   │   ├── abstracts/
│   │   ├── base/
│   │   ├── layout/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── main.scss
│   │
│   ├── css/                    # CSS compilé (généré)
│   │   ├── styles.css
│   │   └── styles.css.map
│   │
│   ├── js/                     # Modules JavaScript
│   │   ├── config.js
│   │   ├── utils.js
│   │   ├── favoris.js
│   │   ├── main.js
│   │   ├── espace.js
│   │   ├── mes-espaces.js
│   │   └── contact.js
│   │
│   ├── data/
│   │   └── espaces.json        # Base de données des espaces
│   │
│   ├── img/                    # Images et icônes SVG/PNG
│   └── fonts/
│
├── package.json
├── .gitignore
└── README.md
```

### Séparation `public/` et `assets/`

Le dossier `public/` contient tout ce qui est accessible au navigateur. À l'intérieur, `assets/` regroupe les **sources SCSS** qui ne sont jamais servies directement — seul le `css/styles.css` compilé est chargé par les pages.

---

## 5. Architecture SCSS

L'organisation suit le **pattern 7-1**, adapté au périmètre du projet.

```
assets/
├── abstracts/          # Outils — ne génèrent aucun CSS
│   ├── _colors.scss        # Palette de couleurs
│   ├── _variables.scss     # Espacements, breakpoints, rayons
│   ├── _typography.scss    # Polices, tailles, graisses
│   └── _mixins.scss        # Mixins réutilisables
│
├── base/               # Fondations
│   ├── _reset.scss         # Réinitialisation navigateur
│   └── _global.scss        # Styles globaux, conteneur
│
├── layout/             # Structures récurrentes
│   ├── _header.scss
│   ├── _footer.scss
│   └── _forms.scss
│
├── components/         # Éléments réutilisables
│   ├── cards/
│   │   └── _espace-card.scss
│   └── _spinner.scss
│
├── pages/              # Styles spécifiques
│   ├── _home.scss
│   ├── _espace.scss
│   ├── _mes-espaces.scss
│   └── _contact.scss
│
├── utils/              # Classes utilitaires
│   └── _accessibility.scss
│
└── main.scss           # Point d'entrée : importe tous les partiels
```

### Ordre d'importation dans `main.scss`

L'ordre est significatif : les `abstracts` doivent être chargés en premier car ils définissent les variables utilisées partout ensuite.

```scss
// Variables, mixins et fonctions
@use "abstracts/colors";
@use "abstracts/variables";
@use "abstracts/typography";
@use "abstracts/mixins";

// Styles de base
@use "base/reset";
@use "base/global";

// Layouts
@use "layout/header";
@use "layout/footer";
@use "layout/forms";

// Composants
@use "components/cards/espace-card";
@use "components/spinner";

// Pages
@use "pages/home";
@use "pages/espace";
@use "pages/mes-espaces";
@use "pages/contact";

// Utilitaires
@use "utils/accessibility";
```

### Mixins réutilisables

Trois mixins sont définis dans `_mixins.scss` :

```scss
// 1. Style de base des boutons — utilisé sur 6 boutons du site
@mixin button-style($bg-color, $text-color) { ... }

// 2. Media queries — utilisé dans tous les fichiers responsive
@mixin responsive($breakpoint) {
  @media (max-width: $breakpoint) {
    @content;
  }
}

// 3. Effet de survol des cartes — utilisé sur 2 types de cartes
@mixin carte-hover { ... }
```

### Règles respectées

- Imbrication limitée à **3 niveaux maximum**
- Toutes les couleurs, espacements et tailles passent par des variables
- Aucune valeur en dur répétée dans le code

---

## 6. Architecture JavaScript

Le code est découpé en **modules ES6** avec `import`/`export`. Chaque page charge un seul script en `type="module"`, qui importe ce dont il a besoin.

```
js/
├── config.js         # Constantes du projet (chemins, libellés)
├── utils.js          # Fonctions partagées (chargement JSON, badges)
├── favoris.js        # Gestion complète des favoris
│
├── main.js           # Logique de la page Accueil
├── espace.js         # Logique de la page Fiche Espace
├── mes-espaces.js    # Logique de la page Favoris
└── contact.js        # Formulaire + carrousel
```

### Chargement dans les pages

```html
<script type="module" src="js/main.js"></script>
```

L'attribut `type="module"` est indispensable pour que les `import` fonctionnent. Il implique aussi que les scripts sont différés par défaut (équivalent à `defer`).

### Exemple de découpage

```javascript
// config.js
export const CHEMIN_DONNEES = "data/espaces.json";

// utils.js
import { CHEMIN_DONNEES } from "./config.js";

export function chargerEspaces() {
  return fetch(CHEMIN_DONNEES)
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Impossible de charger les espaces.");
      }
      return response.json();
    });
}

// main.js
import { chargerEspaces } from "./utils.js";
import { majBadgeFavoris } from "./favoris.js";
```

### Bénéfices

- Le bloc `fetch` est écrit **une seule fois** au lieu de trois
- Les fonctions de favoris sont partagées par les quatre pages
- Chaque fichier a une responsabilité identifiable
- Les variables ne polluent plus l'espace global

---

## 7. Documentation des données (JSON)

Les 6 espaces sont décrits dans `public/data/espaces.json`, un tableau d'objets.

### Structure d'un espace

```json
{
  "id": "wagram-opera",
  "nom": "Espace Wagram Opéra",
  "ville": "paris",
  "quartier": "Paris 8e",
  "capacite": 12,
  "note": 4.8,
  "avis": 34,
  "prixHeure": 45,
  "prixDemiJournee": 160,
  "prixJournee": 280,
  "equipements": ["wifi", "pmr", "ecran"],
  "image": "img/espace-wagram-opera-1.png",
  "images": ["...", "...", "..."],
  "adresse": "14 Avenue de Wagram, 75008 Paris",
  "description": "Au cœur du 8e arrondissement...",
  "equipementsDetail": ["WiFi Fibre 1 Gb/s", "Écran 4K 86\"", "..."],
  "configuration": "Configuration modulable : théâtre, classe, U, boardroom"
}
```

### Description des champs

| Champ | Type | Usage |
|---|---|---|
| `id` | string | Identifiant unique, utilisé dans l'URL et le localStorage |
| `nom` | string | Titre affiché sur toutes les pages |
| `ville` | string | Valeur technique pour le filtrage (minuscules, sans accent) |
| `quartier` | string | Libellé affiché à l'utilisateur |
| `capacite` | number | Nombre de personnes, utilisé pour le filtrage par tranche |
| `note` / `avis` | number | Notation et nombre d'avis |
| `prixHeure` | number | Affiché sur les cartes de l'accueil |
| `prixDemiJournee` / `prixJournee` | number | Grille tarifaire de la fiche détail |
| `equipements` | array | Codes courts pour le filtrage et les badges |
| `image` | string | Vignette de la carte |
| `images` | array | Galerie de la fiche détail (3 photos) |
| `equipementsDetail` | array | Libellés complets pour la fiche détail |
| `configuration` | string | Options d'agencement de la salle |

### Pourquoi deux champs pour les équipements ?

`equipements` contient des **codes courts** (`"wifi"`, `"pmr"`) utilisés pour le filtrage et pour construire les chemins d'icônes. `equipementsDetail` contient les **libellés commerciaux complets** (`"WiFi Fibre 1 Gb/s"`) affichés sur la fiche détail. Les deux répondent à des besoins différents.

---

## 8. Paramétrage URLSearchParams

L'API `URLSearchParams` permet de lire les paramètres passés dans l'URL. Elle est utilisée à deux endroits.

### Page Fiche Espace (US-05)

Quand l'utilisateur clique sur « Voir la fiche » depuis une carte, il est dirigé vers :

```
espace.html?id=wagram-opera
```

Le script `espace.js` lit ce paramètre au chargement :

```javascript
const parametres = new URLSearchParams(window.location.search);
const idEspace = parametres.get("id");
```

Puis recherche l'espace correspondant dans les données :

```javascript
chargerEspaces()
  .then(function (data) {
    const espace = data.find(function (element) {
      return element.id === idEspace;
    });

    if (espace) {
      afficherEspace(espace);
    } else {
      // Gestion du cas "espace introuvable"
    }
  });
```

**Gestion d'erreur** : si l'ID est absent, invalide ou ne correspond à aucun espace, un message explicite est affiché à la place du contenu.

### Page Contact — pré-remplissage

Le bouton « Contacter l'équipe » de la fiche détail construit dynamiquement son lien :

```javascript
btnContact.href = "contact.html?espace=" + espace.id;
```

Sur la page Contact, ce paramètre pré-sélectionne le sujet et pré-remplit le message :

```javascript
const espaceDemande = parametresContact.get("espace");

if (espaceDemande !== null) {
  champSujet.value = "reservation";
  champMessage.value = "Bonjour,\n\nJe souhaite obtenir des informations sur l'espace suivant : "
    + espaceDemande + ".\n\n";
}
```

### URLs supportées

| URL | Comportement |
|---|---|
| `espace.html?id=wagram-opera` | Affiche la fiche de l'Espace Wagram Opéra |
| `espace.html?id=inexistant` | Affiche « Espace introuvable » |
| `espace.html` | Affiche « Espace introuvable » |
| `contact.html?espace=wagram-opera` | Formulaire pré-rempli |
| `contact.html` | Formulaire vierge |

---

## 9. Gestion des favoris (localStorage)

### Principe

Seuls les **identifiants** des espaces sont stockés, pas les objets complets :

```javascript
localStorage.setItem("favoris", JSON.stringify(["wagram-opera", "confluence-executive"]));
```

Les détails sont ensuite retrouvés dans le JSON. Cela garantit que les informations affichées (prix, disponibilité) restent toujours à jour, même si le catalogue évolue.

### API interne (`favoris.js`)

| Fonction | Rôle |
|---|---|
| `getFavoris()` | Lit le localStorage et retourne un tableau |
| `sauvegarderFavoris(favoris)` | Écrit le tableau dans le localStorage |
| `estFavori(id)` | Vérifie la présence d'un identifiant |
| `basculerFavori(id)` | Ajoute si absent, retire si présent |
| `majBadgeFavoris()` | Met à jour le compteur du header |

### Conversion texte / tableau

Le localStorage ne stocke que des chaînes de caractères. On utilise donc :

- `JSON.stringify()` pour convertir le tableau en texte avant l'écriture
- `JSON.parse()` pour reconstituer le tableau à la lecture

Un cas particulier est géré : à la première visite, la clé n'existe pas et `getItem()` renvoie `null`. La fonction retourne alors un tableau vide plutôt que de provoquer une erreur.

### Synchronisation entre les pages

Le badge du header se met à jour sur les quatre pages, puisque `majBadgeFavoris()` est appelée au chargement de chacune. Un espace ajouté depuis l'accueil apparaît immédiatement sur la page « Mes Espaces ».

---

## 10. Référencement naturel (SEO)

### Métadonnées uniques par page

Chaque page dispose d'un `<title>` et d'une `<meta name="description">` distincts, construits autour d'expressions-clés B2B plutôt que du seul nom de l'entreprise.

| Page | Title |
|---|---|
| Accueil | Location de bureaux et salles de réunion en France \| ProSpace Solutions |
| Mes Espaces | Mes espaces sauvegardés \| ProSpace Solutions |
| Contact | Contact et demande de devis \| ProSpace Solutions |

### Titre dynamique sur la fiche espace (US-10)

Le titre de la page détail est reconstruit en JavaScript pour intégrer le nom du lieu et sa capacité :

```javascript
document.title = espace.nom + " - Salle de réunion " + espace.capacite
  + " p. | ProSpace Solutions";
```

Résultat dans l'onglet et les résultats de recherche :

```
Espace Wagram Opéra - Salle de réunion 12 p. | ProSpace Solutions
```

### Structure sémantique

- Un seul `<h1>` par page
- Hiérarchie de titres respectée (`h1` → `h2` → `h3`, sans saut de niveau)
- Balises sémantiques : `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<aside>`, `<footer>`
- Aucune `<div>` utilisée là où une balise sémantique existe
- Fil d'ariane en `<ol>` sur la fiche détail

### Optimisation du chargement (US-11)

- Attribut `loading="lazy"` sur toutes les images hors du premier écran
- Attribut `alt` descriptif sur chaque image informative, `alt=""` sur les icônes décoratives
- Noms de fichiers explicites (`espace-wagram-opera-1.png`) plutôt que génériques
- Aucune bibliothèque externe chargée via CDN
- Police système native (`-apple-system`, `Segoe UI`, `Roboto`) : zéro requête de téléchargement

### Liens internes

Le footer propose une navigation secondaire vers les principales destinations, ce qui aide les robots d'indexation à parcourir le catalogue.

---

## 11. Accessibilité numérique

Le projet vise le niveau **WCAG 2.1 AA** / **RGAA 4.1**.

### Navigation au clavier (US-14)

- Tous les éléments interactifs sont des `<a>` ou des `<button>` natifs — jamais des `<div>` cliquables
- L'ordre de tabulation suit l'ordre logique du document
- Le focus reste visible sur les champs de formulaire (`outline` explicite)
- Le carrousel se pilote entièrement au clavier (Tab + Entrée/Espace)

### Compatibilité lecteurs d'écran (US-15)

| Technique | Application |
|---|---|
| `aria-label` | Boutons sans texte visible (favoris, flèches du carrousel) |
| `aria-current="page"` | Lien de la page active dans le menu |
| `aria-pressed` | État des boutons favoris (à deux positions) |
| `aria-describedby` | Liaison champ ↔ message d'erreur dans le formulaire |
| `aria-live="polite"` | Annonce du changement de slide du carrousel |
| `role="status"` | Message de confirmation du formulaire |
| `aria-hidden="true"` | Étoiles décoratives (la note chiffrée est lue juste après) |
| `.sr-only` | Titres de section masqués visuellement mais présents pour la structure |

### Labels de formulaire

Chaque champ dispose d'un `<label>` explicitement associé via `for` / `id`. Les labels visuellement absents de la maquette (filtres de recherche) sont conservés dans le HTML avec la classe `.sr-only`.

### Tableaux de données

La grille tarifaire utilise `<th scope="row">` pour établir la relation entre en-têtes et valeurs, ainsi qu'un `<caption>` descriptif.

### Contrastes visuels (US-16)

Les couples texte/fond ont été vérifiés avec le [WCAG Contrast Checker](https://www.siegemedia.com/contrast-ratio). L'information n'est jamais transmise par la seule couleur : les badges d'équipement associent une icône **et** un libellé texte, les états des boutons favoris changent d'icône **et** de texte.

### Navigation multiple

Les zones `<nav>` sont distinguées par un `aria-label` (« Navigation principale », « Destinations », « Services », « Informations légales et accès »), évitant l'annonce répétitive « navigation, navigation, navigation ».

---

## 12. Scores Lighthouse

Tests réalisés en mode Navigation, appareil Desktop, sur Chrome.

| Page | Performance | Accessibilité | Bonnes pratiques | SEO |
|---|---|---|---|---|
| **Accueil** | 100 | **96** | 96 | **100** |
| **Fiche Espace** | 81 | **96** | 88 | **100** |
| **Mes Espaces** | 85 | **95** | 92 | **100** |
| **Contact** | 100 | **92** | 92 | **100** |

**Les objectifs du cahier des charges (> 90 en SEO et Accessibilité) sont atteints sur les quatre pages.**

> Les captures d'écran des rapports sont disponibles dans le dossier `docs/lighthouse/`.

### Points de perte identifiés

- **Performance sur Fiche Espace et Mes Espaces** : les images sont servies au format PNG. Une conversion en WebP est identifiée comme axe d'amélioration.
- **Bonnes pratiques** : certaines images ont une résolution inférieure à la densité 2× recommandée pour les écrans haute définition.

---

## 13. Responsive design

### Points de rupture

```scss
$breakpoint-mobile: 768px;   // en dessous : affichage mobile
$breakpoint-tablet: 1024px;  // en dessous : affichage tablette
```

### Adaptations par page

| Zone | Comportement mobile |
|---|---|
| Header | Passage en colonne, réduction des espacements du menu |
| Hero | Titre réduit, arguments empilés verticalement |
| Filtres | Champs en colonne, séparateur masqué |
| Grille de cartes | 3 colonnes → 2 (tablette) → 1 (mobile) |
| Galerie fiche espace | Passage en colonne, images secondaires côte à côte |
| Encart tarifs | Passe sous le contenu au lieu d'être en colonne latérale |
| Cartes favoris | Passage en colonne, image pleine largeur |
| Formulaire contact | Champs sur une seule colonne |
| Carrousel équipe | 4 membres → 2 par ligne |
| Footer | Colonnes empilées, bas de page centré |

Aucun défilement horizontal n'apparaît, quelle que soit la largeur testée (jusqu'à 320px).

---

## 14. Choix techniques et écarts assumés

### Approche desktop-first

La maquette fournie étant en version desktop, les styles ont été écrits pour grand écran puis adaptés vers le bas avec des media queries `max-width`. Le cahier des charges mentionnait une approche mobile-first ; le résultat visuel et fonctionnel est identique, seule la méthode de construction diffère.

### Fusion maquette / cahier des charges sur les filtres

La maquette présente 3 filtres d'équipement (WiFi Fibre, Accès PMR, Écran 4K) tandis que le cahier des charges en mentionnait cinq (Fibre, Visioconférence, Accès PMR, Café). Les cinq ont été implémentés afin de couvrir les deux sources.

### Promesses `.then()` plutôt que `async/await`

La stack imposée mentionnait `async/await`. Le choix a été fait de conserver la syntaxe `.then()` / `.catch()`, plus proche des supports de cours suivis et parfaitement équivalente sur le plan fonctionnel. Le code reste asynchrone et gère les erreurs de manière explicite.

### Liens de navigation secondaire

Les liens du footer (mentions légales, CGV, politique de confidentialité) pointent vers l'accueil, ces pages sortant du périmètre du projet.

### Police d'écriture

La maquette utilise SF Pro, police système d'Apple non distribuable sur le web. Une pile de polices système a été mise en place : chaque système d'exploitation affiche sa police native (SF Pro sur macOS/iOS, Segoe UI sur Windows, Roboto sur Android). Ce choix supprime toute requête de téléchargement de police.

---

## 15. Pistes d'amélioration

- **Conversion des images en WebP** (qualité 75-80) et redimensionnement à la taille d'affichage — gain estimé de 25 à 40 % sur le poids total
- **Génération d'un `sitemap.xml`** et d'un `robots.txt` pour faciliter l'indexation
- **Ajout de données structurées** [schema.org](https://schema.org) sur les fiches espaces
- **URLs canoniques** pour prévenir le contenu dupliqué
- **Menu burger** sur mobile plutôt que le passage en colonne
- **Transitions animées** sur le carrousel plutôt qu'un changement instantané
- **Prise en charge de `prefers-reduced-motion`** pour désactiver les animations selon les préférences système
- **Envoi réel du formulaire** vers un backend (actuellement simulé côté client)

---

## Convention de commits

Le projet suit la convention des commits conventionnels :

```
feat(accueil): affichage dynamique des espaces depuis le JSON
fix(header): correction de l'alignement du logo
style(filtres): design de la barre de filtres conforme à la maquette
refactor(js): modularisation avec import/export
docs(readme): documentation de l'architecture
chore: initialisation du projet et arborescence SCSS 7-1
```

---

## Auteur

Projet réalisé par **Mohamed** dans le cadre de la formation Développeur Full Stack.