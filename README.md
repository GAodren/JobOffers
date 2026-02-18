# Job Radar

Dashboard React pour visualiser et filtrer des offres d'emploi scrapées depuis LinkedIn.

## Fonctionnalités

- Affichage des offres sous forme de cartes avec score de pertinence
- Recherche par mot-clé (titre, entreprise, stack, localisation, commentaire)
- Filtres par score minimum et par entreprise
- Tri par date, score ou nombre de candidats
- Affichage des lettres de motivation générées
- Design dark mode avec Tailwind CSS

## Stack technique

- **React 19** + **Vite 6**
- **Tailwind CSS 4**
- Données chargées depuis `jobs.json` (fichier statique)

## Installation

```bash
npm install
```

## Développement

```bash
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Structure du projet

```
src/
├── App.jsx                  # Composant principal
├── main.jsx                 # Point d'entrée
├── index.css                # Styles globaux
├── components/
│   ├── CoverLetterModal.jsx # Modale lettre de motivation
│   ├── EmptyState.jsx       # État vide (aucun résultat)
│   ├── FilterBar.jsx        # Barre de recherche et filtres
│   ├── Footer.jsx           # Pied de page
│   ├── Header.jsx           # En-tête avec statistiques
│   ├── JobCard.jsx          # Carte d'une offre
│   ├── JobGrid.jsx          # Grille d'offres
│   ├── ScoreBadge.jsx       # Badge de score coloré
│   └── TagList.jsx          # Liste de tags (stack)
├── hooks/
│   └── useJobs.js           # Hook de chargement et filtrage
└── utils/
    └── helpers.js           # Fonctions utilitaires
```
