const dialogueElement = document.getElementById('dialogue');
const inputElement = document.getElementById('input');

let isPathEntered = false;
let isOptionSelected = false;
let archiveNotFoundCounter = 0;

function afficherDialogue(texte) {
    // Délai entre chaque caractère (en millisecondes)
    const delaiEntreCaracteres = 20;
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
            afficherDialogue("La suite du dialogue est terminée."); // Afficher un message indiquant que la suite du dialogue est terminée
        }, 200); // Attendre 0.5 secondes avant de supprimer l'image
    };
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
                    afficherDialogue('Option 2 sélectionnée : Logs\n\n');
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
