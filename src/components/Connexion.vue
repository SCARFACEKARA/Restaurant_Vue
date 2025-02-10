<template>
  <!-- Conteneur principal de la page de connexion -->
  <div class="container">
    <!-- Titre de la page -->
    <h1>Page de connexion</h1>

    <!-- Conteneur pour l'image et le formulaire -->
    <div class="content-wrapper">
      <!-- Image à gauche -->
      <div class="image-container">
        <img src="../assets/image/1x/Logo.png" alt="Image de connexion" class="login-image" />
      </div>

      <!-- Formulaire de connexion -->
      <form @submit.prevent="handleSubmit" id="inscription">
        <!-- Champ pour l'email -->
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" required />

        <!-- Champ pour le mot de passe -->
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" required />

        <!-- Bouton de connexion avec gestion du chargement -->
        <button type="submit" :disabled="isLoading">
          {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
        </button>

        <!-- Lien pour accéder à la page d'inscription -->
        <p class="inscription-text">Vous n'avez pas encore de compte ?</p>
        <router-link :to="{ name: 'Inscription' }" class="inscription-link">S'inscrire</router-link>
      </form>
    </div>

    <!-- Message d'erreur affiché en cas d'échec de connexion -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { postData } from '../utils/api';

export default {
  data() {
    return {
      email: '', // Stocke l'email de l'utilisateur
      password: '', // Stocke le mot de passe de l'utilisateur
      errorMessage: '', // Stocke les messages d'erreur en cas d'échec
      isLoading: false, // Indicateur de chargement pour désactiver le bouton
    };
  },
  methods: {
    /**
     * Gère la soumission du formulaire de connexion.
     */
    async handleSubmit() {
      this.isLoading = true;
      this.errorMessage = '';

      try {
        const payload = {
          email: this.email,
          mdp: this.password,
          role: 'ADMIN', // Définit le rôle de l'utilisateur
        };

        const response = await postData('users/login', payload);
        console.log('Réponse du serveur :', response);

        if (response.message) {
          // Stocke le token et redirige vers la page admin
          // localStorage.setItem('token', response.token);
          this.$router.push({ name: 'AdminPage' });
        } else {
          this.errorMessage = 'Email ou mot de passe incorrect.';
        }
      } catch (error) {
        console.error('Erreur lors de la connexion :', error);
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      } finally {
        this.isLoading = false;
      }
    },
  },
  mounted() {
    console.log('Composant monté !');
  },
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
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
}

/* ==========================
   Titre de la Page
   ========================== */
h1 {
  font-size: 50px;
  color: #ff3574;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  font-family: 'Nudica', sans-serif;
}

/* ==========================
   Conteneur pour l'image et le formulaire
   ========================== */
.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px; /* Espace entre l'image et le formulaire */
  width: 100%;
  max-width: 900px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* ==========================
   Conteneur pour l'image
   ========================== */
.image-container {
  flex: 1;
  max-width: 400px;
}

.login-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

/* ==========================
   Formulaire de Connexion
   ========================== */
form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
}

/* ==========================
   Labels
   ========================== */
label {
  font-size: 20px;
  color: #151514;
  font-weight: 600;
}

/* ==========================
   Champs de Saisie
   ========================== */
input {
  width: 100%;
  padding: 14px;
  font-size: 18px;
  border: 2px solid #ff3574;
  border-radius: 10px;
  background: #fff;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #ff3574;
  box-shadow: 0 4px 12px rgba(255, 53, 116, 0.3);
}

/* ==========================
   Boutons de Connexion
   ========================== */
button {
  background-color: #ff3574;
  color: #ffffff;
  padding: 12px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #ff9cbb;
  transform: scale(1.02);
}

button:disabled {
  background-color: #ff9cbb;
  cursor: not-allowed;
}

/* ==========================
   Lien d'Inscription
   ========================== */
.inscription-text {
  text-align: center;
  margin-top: 15px;
  font-size: 12px;
  color: #121211;
}

.inscription-link {
  display: block;
  text-align: center;
  /* margin-top: 10px; */
  font-size: 18px;
  color: #ff3574;
  text-decoration: underline;
  cursor: pointer;
  transition: color 0.3s;
}

.inscription-link:hover {
  color: #ff9cbb;
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