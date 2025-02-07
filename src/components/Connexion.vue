<template>
    <!-- Conteneur principal de la page de connexion -->
    <div class="container">
        <!-- Titre de la page -->
        <h1>PAGE DE CONNEXION</h1>

        <!-- Formulaire de connexion avec interception de l'événement "submit" -->
        <form @submit.prevent="handleSubmit" id="inscription">
            <!-- Champ pour l'email -->
            <label for="email">Email :</label>
            <input type="email" id="email" v-model="email" required>

            <!-- Champ pour le mot de passe -->
            <label for="password">Mot de passe :</label>
            <input type="password" id="password" v-model="password" required>

            <!-- Bouton de connexion avec gestion du chargement -->
            <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
            </button>
        </form>

        <!-- Bouton pour accéder à la page d'inscription -->
        <button @click="goToInscription">S'inscrire</button>

        <!-- Message d'erreur affiché en cas d'échec de connexion -->
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
</template>

<script>
// Importation de la fonction postData pour envoyer les requêtes HTTP
import { postData } from '../utils/api';

export default {
    data() {
        return {
            email: '',         // Stocke l'email de l'utilisateur
            password: '',      // Stocke le mot de passe de l'utilisateur
            errorMessage: '',  // Stocke les messages d'erreur en cas d'échec
            isLoading: false   // Indicateur de chargement pour désactiver le bouton
        };
    },
    methods: {
        /**
         * Méthode pour gérer la soumission du formulaire de connexion.
         * - Envoie une requête POST à l'API avec les informations d'identification.
         * - Gère la réponse et stocke le token en cas de succès.
         * - Affiche un message d'erreur en cas d'échec.
         */
        async handleSubmit() {
            this.isLoading = true; // Active l'indicateur de chargement
            try {
                const payload = {
                    email: this.email,
                    mdp: this.password,
                    role: "ADMIN" // Définit le rôle de l'utilisateur
                };

                const response = await postData("users/login", payload);
                console.log("Réponse du serveur :", response);

                // Vérifie si la connexion a échoué et affiche un message d'erreur
                if (response.success || response.token) {
                    this.errorMessage = "Email ou mot de passe incorrect.";
                } else {
                    // Stocke le token dans le localStorage et redirige vers la page admin
                    localStorage.setItem('token', response.token);
                    this.$router.push({ name: 'AdminPage' });
                }
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
                this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
            } finally {
                this.isLoading = false; // Désactive l'indicateur de chargement
            }
        },

        /**
         * Méthode pour rediriger l'utilisateur vers la page d'inscription.
         */
        goToInscription() {
            this.$router.push({ name: 'Inscription' });
        }
    },

    /**
     * Hook appelé lorsque le composant est monté.
     */
    async mounted() {
        console.log("Composant monté !");
    }
};
</script>

<style>
/* Conteneur principal de la page */
.container {
    max-width: 400px; /* Largeur maximale */
    margin: 0 auto; /* Centrage du conteneur */
    padding: 20px; /* Espacement interne */
    background-color: #f9f9f9; /* Couleur de fond */
    border-radius: 8px; /* Coins arrondis */
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Ombre légère */
}

/* Style du titre */
h1 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

/* Mise en page du formulaire */
form {
    display: flex;
    flex-direction: column;
    gap: 15px; /* Espacement entre les champs */
}

/* Styles des champs de saisie */
input[type="email"],
input[type="password"] {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
}

/* Style général des boutons */
button {
    background-color: #4CAF50; /* Vert */
    color: white;
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
}

/* Désactive le bouton lors du chargement */
button:disabled {
    background-color: #ddd;
}

/* Effet au survol des boutons actifs */
button:hover:not(:disabled) {
    background-color: #45a049;
}

/* Message d'erreur en rouge */
p {
    text-align: center;
    font-size: 14px;
    color: red;
}

/* Style du bouton d'inscription */
button:last-of-type {
    background-color: #28a745; /* Vert différent */
    color: white;
    margin-top: 15px;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
}

/* Changement de couleur au survol du bouton d'inscription */
button:last-of-type:hover {
    background-color: #0056b3;
}
</style>
