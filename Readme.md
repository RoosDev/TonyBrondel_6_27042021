# Piiquante
----------------------------

Site complet pour le partage communautaire de recettes de sauces

----------------------------

## Prérequis ##

Pour installer et faire fonctionner ce site vous devez avoir installer :

* Git
* Node 
* 'npm'


----------------------------

## Installation ##

Les étapes d'installation :

1. Créer un répertoire sur votre machine qui accueillera le site
2. Aller dans ce répertoire  
3. Ouvrir une fenêtre de commande et taper : 

    ```
    $git clone https://github.com/RoosDev/TonyBrondel_6_27042021.git
    $cd TonyBrondel_6_27042021/BACKEND
    $npm install
    ```
4. Pour que le BACKEND fonctionne vous pouvez me contacter directement pour avoir le fichier .env . Sans ce fichier l'interface ne peut fonctionner. Il est composé des éléments suivants : 
* PORT=3000
* URL_DB="mongodb+srv://...."
* APP_SECRET_KEY="..."
* ARGON2_ASSOCIATEDDATA="..."
* Crypto_Passphrase="..."

5. Lorsque vous avez ce fichier .env placez le dans le dossier BACKEND et ouvrez une fenetre de commande dans ce même dossier puis taper : 

    ```
    mkdir images/
    $npm start
    ```

6. Dans un nouveau Powershell / invite de commande , retourner dans le dossier racine où à été cloné le dépot git puis taper :

    ```
    $cd TonyBrondel_6_27042021/FRONTEND
    $npm install
    $npm start

    ```

4. Le navigateur s'ouvre automatiquement et affiche le site : http://localhost:8081  ou  http://127.0.0.1:8081
5. Vous pouvez vous inscrire ou partager vos sauces.


Merci 
