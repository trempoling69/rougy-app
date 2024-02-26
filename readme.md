# APPLICATION MOBILE D'ENCAISSEMENT

## Description

Application mobile s'inscrivant dans mon projet pour Rougy Horticulture.
Cette application permet de réaliser rapidement des encaissement en utilsant leur prix préalablement enregistré grâce à l'application web. </br>
L'exploitation fonctionne avec des prix groupé, toutes les plantes dans un certain conteneur avec une certaine taille et couleur aura le même prix, l'application utilise alors seulement ces groupes de prix pour faciliter les choses au lieu d'utiliser les produits individuellement.</br>
Il est alors possible de séléctionner un prix et d'ajouter la quantité de plantes associées à ce prix que le client à pris. L'application calcul ensuite grâce au prix unitaire le prix total de la commande.</br>
Lorsque le panier est validé, il est stocker en base de données et le panier sur l'application est reset.</br>
Il est possible d'accéder à l'historique des paniers avec la date et l'heure ainsi que son total.

## Technologie

- React Native
- Expo 
- Expo Router
- Axios
- TypeScript

## Fonctionnalité

- Authentification
- Création de panier
- Modification de panier
- Suppression de panier
- Récupération des prix de l'exploitation
- Récupération de l'historique des paniers