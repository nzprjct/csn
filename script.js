const dialogueElement = document.getElementById('dialogue');
const inputElement = document.getElementById('input');

let isPathEntered = false;
let isOptionSelected = false;
let archiveNotFoundCounter = 0;

function afficherDialogue(texte) {
    // Délai entre chaque caractère (en millisecondes)
    const delaiEntreCaracteres = 10;
    let index = 0;

    function afficherCaractere() {
        dialogueElement.textContent += texte[index];
        index++;
        if (index < texte.length) {
            setTimeout(afficherCaractere, delaiEntreCaracteres);
        } else if (texte === dialogueFictif) {
            // Afficher l'image une fois que le dialogue fictif est terminé
            afficherImage();
        }
    }

    afficherCaractere();
}

function clearConsole() {
    dialogueElement.textContent = '';
}

function afficherImage() {
    const image = document.createElement('img');
    image.src = 'image.png'; // Chemin de l'image
    image.onload = () => {
        document.body.appendChild(image);
        setTimeout(() => {
            image.remove(); // Supprimer l'image après un certain délai
            afficherDialogue("Le dialogue est terminé."); // Afficher un message indiquant que la suite du dialogue est terminée
        }, 500); // Attendre 0.5 secondes avant de supprimer l'image
    };
}


function afficherLogs() {
    // Afficher les éléments des logs avec un délai entre chaque élément
    afficherDialogue(' ', true);
    setTimeout(() => {
        afficherDialogue('26/01/2024 - CLASS01 AND CLASS02 DRIVE TO X SPOT SUBJECT01 IS POISONED\n', true);
    }, 1000); // Attendre 0.1 seconde avant d'afficher le premier élément
    setTimeout(() => {
        afficherDialogue('27/01/2024 - FIRST SPAWN TO CLASS01 FIRST SPAWN TO CLASS02\n', true);
    }, 2000); // Attendre 2 secondes avant d'afficher le deuxième élément
    setTimeout(() => {
        afficherDialogue('28/01/2024 - CLASS01 SURVIVED CLASS02 IS DEAD\n', true);
    }, 4000); // Attendre 4 secondes avant d'afficher le troisième élément
    setTimeout(() => {
        afficherDialogue('29/01/2024 - BASEMENT IS DISCOVERED, SUBJECT17 TALK TO HOST\n', true);
    }, 6000); // Attendre 6 secondes avant d'afficher le quatrième élément
    setTimeout(() => {
        afficherDialogue('30/01/2024 - XXXX X X X X X X X  X X XXXX XX X X X X XX X\n', true);
    }, 8000); // Attendre 8 secondes avant d'afficher le cinquième élément
}

inputElement.addEventListener('keydown', function(event) {
    if (event.key === "Enter") {
        const command = inputElement.value.trim();
        inputElement.value = '';

        // Afficher l'entrée utilisateur avec le nom "Admin"
        dialogueElement.textContent += `Admin: ${command}\n`;

        if (!isPathEntered) {
            if (command === "chemin") {
                isPathEntered = true;
                afficherDialogue('[1] - Archives\n[2] - Logs\n[3] - Files\n[0] - Exit\nVeuillez entrer le numéro de ligne pour afficher : \n');
            } else {
                clearConsole();
                afficherDialogue('Console se ferme...\n');
                setTimeout(() => {
                    window.close(); // Fermer la fenêtre
                }, 2000); // Attendez 2 secondes avant de fermer
            }
        } else {
            if (!isOptionSelected) {
                if (command === "1") {
                    isOptionSelected = true;
                    afficherDialogue('- ACHV-0001\nVeuillez entrer le numéro de ligne pour afficher : \n');
                } else if (command === "2") {
                    afficherLogs(); // Afficher les logs
                afficherDialogue('Option 2 sélectionnée : Logs\n\n'); // Correction de l'affichage
                } else if (command === "3") {
                    afficherDialogue('Option 3 sélectionnée : Exit\n\n');
                } else {
                    clearConsole();
                    afficherDialogue('Console se ferme...\n\n');
                    setTimeout(() => {
                        window.close(); // Fermer la fenêtre
                    }, 2000); // Attendez 2 secondes avant de fermer
                }
            } else {
                if (command === "7") {
                    afficherDialogue('Ligne 7 : Contenu de l\'archive.\n\n');
                } else if (command === "ACHV-0001") {
                    // Afficher le dialogue fictif
                    afficherDialogue(dialogueFictif);
                } else {
                    afficherDialogue('Commande invalide.\n\n');
                }
                isOptionSelected = false; // Réinitialiser la sélection d'option
            }
        }
    }
});

// Dialogue fictif
const dialogueFictif = `
[TUZZY] : "Oh, bienvenue... Avez-vous fait bon voyage ? Je me disais bien que nos chemins allaient se Croiser à nouveau. Vous vous êtes donc décidé à rejoindre notre belle académie ? Je vois..."
[$0!&E]: "Je n'aime pas ça.. C'est un travail baclé.. Recommence.
[TUZZY]: "Oh, bienvenue... Avez-vous fait bon voyage ? Je me disais bien que nos chemins allaient se Croiser à nouveau. Vous vous êtes donc décidé à rejoindre notre belle académie ? Je vois..."
[$0!&E]: "Tu n'as presque rien changé.. Je vois qu'il y'a qu'une seule manière qui fonctionne avec toi.."
[TUZZY]: "De quoi parlez vous..?";
`;
