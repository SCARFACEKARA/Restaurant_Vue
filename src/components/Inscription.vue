<template>
  <div class="inscription-container">
    <h1>PAGE D'INSCRIPTION</h1>
    <!-- Formulaire d'inscription -->
    <form @submit.prevent="handleSubmit" class="inscription-form">
      <!-- Champ pour l'email -->
      <div class="input-group">
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="email" required>
      </div>
      <!-- Champ pour le mot de passe -->
      <div class="input-group">
        <label for="password">Mot de passe :</label>
        <input type="password" id="password" v-model="password" required>
      </div>
      <!-- Bouton de soumission -->
      <button type="submit" class="btn-submit">S'inscrire</button>
    </form>
  </div>
</template>

<script>
// Importation de la fonction postData pour envoyer la requête HTTP
import { postData } from '../utils/api';

export default {
  data() {
    return {
      email: '',       // Stocke l'email de l'utilisateur
      password: ''     // Stocke le mot de passe de l'utilisateur
    };
  },
  methods: {
    /**
     * Méthode pour gérer la soumission du formulaire d'inscription.
     * - Envoie les informations de l'utilisateur à l'API.
     * - Affiche la réponse du serveur dans la console.
     */
    async handleSubmit() {
      try {
        const payload = {
          email: this.email,
          mdp: this.password,
          role: "ADMIN" // Rôle par défaut pour l'utilisateur
        };
        const response = await postData("users/create", payload);
        console.log("Réponse du serveur :", response);
        // Redirection après une inscription réussie (ajout potentiel)
        if (response.success) {
          this.$router.push({ name: 'LoginPage' }); // Redirection vers la connexion
        }
      } catch (error) {
        console.error("Erreur lors de l'inscription :", error);
      }
    }
  }
};
</script>

<style scoped>
.inscription-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4b6cb7, #182848);
  font-family: Arial, sans-serif;
}

.inscription-form {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.input-group {
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  background: #f9f9f9;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #4b6cb7;
}

.btn-submit {
  background-color: #4b6cb7;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #3b5998;
}
</style>