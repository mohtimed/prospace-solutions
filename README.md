## Titre + présentation

    ProSpace Solutions est une application web de location d'espaces de travail pour les professionnels. Elle permet de rechercher des salles de réunion et bureaux dans plusieurs villes françaises, de consulter leurs détails et de sauvegarder ses favoris. Projet réalisé pendant ma formation développeur full stack, module front-end.

## Installation

    Il faut Node.js pour installer Sass. Après npm install, la commande npm run sass compile le SCSS en continu. Le site doit être lancé avec Live Server : fetch() et les modules JavaScript ne fonctionnent pas si on ouvre les fichiers directement.

## Architecture du projet

    Tout ce qui est accessible au navigateur est dans public/. Le dossier assets/ contient les fichiers SCSS sources, qui ne sont jamais chargés par les pages — seul css/styles.css, généré par la compilation, l'est.

## Architecture SCSS

    J'ai suivi le pattern 7-1 avec six dossiers : abstracts, base, layout, components, pages et utils. L'ordre des imports dans main.scss est important, les abstracts doivent venir en premier car ils déclarent les variables utilisées ensuite. J'ai créé trois mixins réutilisés dans plusieurs fichiers : button-style, responsive et carte-hover.

## Architecture JavaScript

    Chaque page a son propre fichier, plus trois fichiers partagés : config.js pour les constantes, utils.js pour le chargement des données, favoris.js pour le localStorage. Les pages chargent un seul script en type="module" qui importe ce dont il a besoin. Ça évite d'écrire trois fois le même bloc fetch.

## Les données

    Les 6 espaces sont dans data/espaces.json, sous forme de tableau d'objets. J'ai deux champs pour les équipements : equipements contient des codes courts qui servent au filtrage et à construire les chemins d'icônes, equipementsDetail contient les libellés complets affichés sur la fiche.

## URLSearchParams

    Quand on clique sur une carte, on arrive sur espace.html?id=wagram-opera. Le script lit ce paramètre avec URLSearchParams, puis cherche l'espace correspondant dans le JSON avec .find(). Si l'id n'existe pas ou est absent, un message "Espace introuvable" s'affiche. Le même principe sert pour contact.html?espace=..., qui pré-remplit le formulaire.

## Les favoris

    Je stocke uniquement les identifiants dans le localStorage, pas les objets complets. Les détails sont retrouvés dans le JSON à chaque affichage, donc si un prix change, les favoris affichent la bonne valeur. Comme le localStorage ne garde que du texte, j'utilise JSON.stringify pour écrire et JSON.parse pour relire.

## SEO

    Chaque page a un title et une description uniques, construits autour d'expressions-clés plutôt que du nom de l'entreprise. Sur la fiche espace, le titre est réécrit en JavaScript pour inclure le nom du lieu et sa capacité. J'ai aussi mis loading="lazy" sur les images, des alt descriptifs, et je n'utilise aucune bibliothèque externe via CDN.

## Accessibilité

    Tous les éléments cliquables sont des <button> ou des <a>, jamais des <div>, ce qui garantit la navigation au clavier. J'ai utilisé les attributs ARIA là où le texte visible manque : aria-label sur les boutons icônes, aria-pressed pour l'état des favoris, aria-live sur le carrousel. Les labels de formulaire absents de la maquette sont conservés dans le HTML avec une classe .sr-only.

## Scores Lighthouse

    Les objectifs du cahier des charges (plus de 90 en SEO et accessibilité) sont atteints sur les quatre pages. La perte en performance sur deux pages vient des images encore au format PNG.

## Responsive

    Deux points de rupture : 768px pour le mobile et 1024px pour la tablette. La grille de cartes passe de 3 à 2 puis 1 colonne, la galerie et l'encart tarifs s'empilent, et le formulaire passe sur une seule colonne. Aucun défilement horizontal jusqu'à 320px.

## Choix assumés

    J'ai travaillé en desktop-first car la maquette fournie était en version desktop, alors que le cahier des charges suggérait du mobile-first — le résultat est identique, seule la méthode diffère. J'ai gardé la syntaxe .then() plutôt que async/await, plus proche de ce que j'ai appris en cours. Pour les filtres, j'ai implémenté les cinq équipements en fusionnant ceux de la maquette et ceux du cahier des charges.

## Améliorations possibles

    Convertir les images en WebP pour gagner en performance, ajouter un sitemap.xml et des données structurées schema.org, remplacer le passage en colonne du menu mobile par un menu burger, et brancher le formulaire sur un vrai backend.