<template>
  <!-- Conteneur principal pour l'insertion d'un ingrédient -->
  <div class="insert-container">
    <h1>INSERTION D'UN INGREDIENT</h1>

    <!-- Formulaire d'insertion -->
    <form @submit.prevent="handleSubmit" class="insert-form">

      <!-- Champ pour le nom de l'ingrédient -->
      <div class="input-group">
        <label for="nomIngredient">Nom :</label>
        <input type="text" id="nomIngredient" v-model="nomIngredient" required>
      </div>

      <!-- Champ pour le nom de l'image associée -->
      <div class="input-group">
        <label for="nomImage">Nom de l'Image :</label>
        <input type="text" id="nomImage" v-model="nomImage" required>
      </div>

      <!-- Bouton de soumission -->
      <button type="submit" class="btn-submit">Insérer</button>
    </form>
  </div>
</template>

<script>
// Importation de la fonction postData pour envoyer une requête HTTP
import { postData } from '../utils/api';

export default {
  data() {
    return {
      nomIngredient: '', // Stocke le nom de l'ingrédient
      nomImage: ''       // Stocke le nom de l'image associée
    };
  },
  methods: {
    /**
     * Méthode pour gérer la soumission du formulaire.
     * - Envoie les informations de l'ingrédient à l'API.
     * - Vide les champs après une insertion réussie.
     * - Affiche la réponse du serveur dans la console.
     */
    async handleSubmit() {
      try {
        // Préparation des données à envoyer
        const payload = {
          nomIngredient: this.nomIngredient, // Nom de l'ingrédient
          nomImage: this.nomImage            // Nom de l'image associée
        };

        // Envoi des données à l'API
        const response = await postData("admin/ingredients/create", payload);
        console.log("Réponse du serveur :", response);

        // Réinitialisation des champs après succès
        this.nomIngredient = '';
        this.nomImage = '';

      } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de l'insertion des données :", error);
      }
    }
  }
};
</script>

<style scoped>
/* Conteneur principal */
.insert-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Style du titre */
h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

/* Style du formulaire */
.insert-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Groupe d'entrée */
.input-group {
  text-align: left;
}

/* Style des labels */
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

/* Style du bouton de soumission */
.btn-submit {
  background-color: #28a745;
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
