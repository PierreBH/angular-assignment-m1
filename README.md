# A propos du projet

Cette application est generée avec  le framework front-end Angular, un back-end basé sur Node.JS et une base de donnée NoSQL MongoDB.

# Comment tester l'application ? 

## Prerequis

* Il est conseillé d'installer un éditeur de code comme [Visual Code](https://code.visualstudio.com/download) ou bien [WebStorm](https://www.jetbrains.com/fr-fr/webstorm/)
* Installer [NodeJS](https://nodejs.org/en/download/)
* Installer Angular CLI avec la commande `npm install -g @angular/cli`

## Cloner le projet

### IDE Jetbrains
Plusieurs possibilités :
* Vous avez la possibilité grâce à l'IDE avec la suite Jetbrains, de cloner le projet directement sur l'application :

<p align="center">
  <img src="https://user-images.githubusercontent.com/98599523/210174360-c46c4617-4863-4aa7-84e2-815f4b12ab0f.png" />
</p>

Ensuite, à partir du menu ouvrant, sélectionner les paramètres que vous souhaitez. Comme vous faîtes parti du projet, vous pouvez lié votre compte github avec votre compte Jetbrains et ainsi sélectionner les deux projets en question.

Sinon autre possibilité, vous pouvez récupérer le lien https du github et l'importer dans l'entrée "url".

<p align="center">
  <img src="https://user-images.githubusercontent.com/98599523/210174506-a19b47ce-d255-4873-9522-74cf52c965d0.png" />
</p>

<p align="center">
  <img src="https://user-images.githubusercontent.com/98599523/210174435-4e2103b6-89f5-41f7-bc74-bf6cf6272564.png" />
</p>

Enfin cliquez sur "Clone".

### Visual studio code

Pour cela, ouvrir un invite de commande et rentrer la commande suivante : 

`git clone https://github.com/PierreBH/angular-assignment-m1.git`

Après cela fait, il faudra importer les dépendances avec cette commande : 

`npm install`

Le faire pour les deux projets github et répéter les manipulations.

## Démarrer le projet en local

Pour la partie Front Angular, lancer dans un invite de commande :

`ng serve`

Pour la partie Back NodeJS, lancer dans un invite de commande : 

`npm start`

# Les fonctionnalités principales

Toutes les fonctionnalités demandées pour ce projet ont été réalisé (avancée ainsi qu'avancée ++)

* Visualisation sous forme de table, tous les devoirs.
  1. Possibilité de filtrer les éléments par rendu/non rendu,
  2. Affichage des informations comme la date de rendu, la note...etc
  3. Informations complémentaires comme des icons représentation si le devoir est rendu et si le devoir a été rendu en retard.
  4. Boutons d'actions, pour modifier ou visualiser en détails un devoir

* Partie connexion/inscription : (Une partie du code en back a été copier d'Alexis Malattia)
  1. Toute la partie connexion et inscription a été gérer par l'objet utilisateur : Ajout d'une collection de donnée dynamique dans MongoDB
  2. Inscription demandant plusieurs informations: 
      - Pseudo / nom d'utilisateur
      - Mot de passe
      - Rôle : Admin ou User : 
        1. Compte administrateur ayant le droit d'ajouter un devoir, les etudiants et de les noter.
        2. Compte etudiant pour deposer le devoir et consulter ses notes / remarques
    
  3. Connexion :
      - Formulaire de connexion nom d'utilisateur + mot de passe
      - Implémentation de Snackbar, losrqu'on est connecté ou lorsque le mot de passe / nom d'utilisateur est incorrect (Gestions des erreurs)
      - Implémentation du JWT Tokens qui est valable 24 heures (Accès en front à l'objet utilisateur connecté ainsi que de son token pour ainsi savoir s'il est connecté)
    
* SideBar :
  * Ajouter un devoir
  * Peupler la base (1000 assignments)
  * Paramètres
  
* Ajouter un devoir :
  1. Implémentation du Stepper
  2. Plusieurs informations sont importantes pour la création d'un devoir : 
      - Nom + date de rendu + rendu
      - Un élève : Implémentation de la collection élève dans MongoDB dynamique
      - Une matière : Implémentation de la collection élève dans MongoDB dynamique
      - note : La note est null par défaut si le devoir n'est pas rendu
      - remarque : La remarque est null par défaut si le devoir n'est pas rendu

* Peupler la base (1000 Assignments) : Bouton pour implémenter 1000 devoirs dans la collection assignments

* Paramètres :
    1. Seul l'utilisateur possédant le droit admin peut accéder à cette page
    2. Plusieurs paramétrages sont possibles sur cette page :
        - Pour les deux premières partie : Matières + élèves
            1. Possibilité de voir la liste des informations
            2. Trier par nom (nom de matière ou nom prof pour l'un et nom de l'élève pour l'autre)
            3. On a la possibilité d'ajouter des éléments de manière dynamique et de supprimer si on le souhaite
            
        - Pour la partie Utilisateur :
           1. Même possibilité de supprimer, ajouter, visionner la liste des utilisateurs
           2. Spécificité : on peut modifier un utilisateur et ainsi modifier le rôle utilisateur sélectionné. Une snackbar s'affiche lors de la modification

# Le but de l'application

Un professeur souhaite ajouter dans l'application, une boite de depot des devoirs pour pouvoir noter ses étudiants.
Nous allons presenter les fonctionnalités de cette application.

Le professeur se connecte tout d'abord afin d'avoir le droit de noter et ajouter un assignement et la liste des étudiants

![image](https://user-images.githubusercontent.com/90200870/209881197-69487b4e-ccc4-4ede-a359-45f160318b23.png)

Il clique sur  ![image](https://user-images.githubusercontent.com/90200870/209881266-b970957d-447c-4c10-9a82-930694518cc5.png) 
 et rentre les informations necessaires, la date de rendu est obligatoire
 ![image](https://user-images.githubusercontent.com/90200870/209881531-b8e6c321-4dd7-4ff5-a7e5-ecfca6a08ed8.png)
