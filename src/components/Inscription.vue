<template>
  <!-- Conteneur principal de la page d'inscription -->
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
/* Conteneur principal */
.inscription-container {
  max-width: 400px; /* Largeur maximale du formulaire */
  margin: 50px auto; /* Centrage vertical et horizontal */
  padding: 20px; /* Espacement interne */
  background-color: #f8f8f8; /* Couleur de fond */
  border-radius: 10px; /* Coins arrondis */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre légère */
  text-align: center;
}

/* Titre */
h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

/* Mise en page du formulaire */
.inscription-form {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espacement entre les champs */
}

/* Groupe d'entrée */
.input-group {
  text-align: left;
}

/* Label des champs */
.input-group label {
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
}

/* Style des champs de saisie */
.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Bouton de soumission */
.btn-submit {
  background-color: #28a745; /* Vert */
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

/* Effet au survol du bouton */
.btn-submit:hover {
  background-color: #218838;
}
</style>
