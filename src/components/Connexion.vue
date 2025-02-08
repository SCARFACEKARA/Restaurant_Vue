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
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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

<style scoped>
/* ==========================
   Styles Généraux
   ========================== */
   * {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* ==========================
   Conteneur Principal
   ========================== */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #4b6cb7, #182848);
  padding: 20px;
}

/* ==========================
   Titre de la Page
   ========================== */
h1 {
  font-size: 28px;
  color: #ffffff;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
}

/* ==========================
   Formulaire de Connexion
   ========================== */
form {
  background: #ffffff;
  border-radius: 12px;
  padding: 25px 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
  max-width: 400px;
}

/* ==========================
   Labels
   ========================== */
label {
  font-size: 14px;
  color: #333;
  font-weight: 600;
  margin-bottom: 8px;
}

/* ==========================
   Champs de Saisie
   ========================== */
input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #f9f9f9;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #4b6cb7;
  box-shadow: 0 0 6px rgba(75, 108, 183, 0.5);
}

/* ==========================
   Boutons
   ========================== */
button {
  background-color: #4b6cb7;
  color: #ffffff;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
}

button:hover {
  background-color: #3b5998;
  transform: scale(1.02);
}

button:disabled {
  background-color: #999;
  cursor: not-allowed;
}

/* Bouton de redirection (ex. : vers l'inscription) */
.secondary-button {
  background-color: #182848;
  margin-top: 15px;
}

/* ==========================
   Message d'Erreur
   ========================== */
.error-message {
  font-size: 14px;
  color: #ff4d4d;
  text-align: center;
  margin-top: 10px;
  font-weight: 600;
}
</style>
