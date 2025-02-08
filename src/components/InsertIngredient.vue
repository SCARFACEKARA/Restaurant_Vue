<template>
  <!-- Conteneur principal pour l'insertion d'un ingrédient -->
  <div class="insert-container">
    <div class="insert-card">
      <h1>INSERTION D'UN INGREDIENT</h1>

      <!-- Formulaire d'insertion -->
      <form @submit.prevent="handleSubmit" class="insert-form">

        <!-- Champ pour le nom de l'ingrédient -->
        <div class="input-group">
          <label for="nomIngredient">Nom :</label>
          <input type="text" id="nomIngredient" v-model="nomIngredient" required />
        </div>

        <!-- Champ pour le nom de l'image associée -->
        <div class="input-group">
          <label for="nomImage">Nom de l'Image :</label>
          <input type="text" id="nomImage" v-model="nomImage" required />
        </div>

        <!-- Bouton de soumission -->
        <button type="submit" class="btn-primary">Insérer</button>
      </form>
    </div>
  </div>
</template>

<script>
// Importation de la fonction postData pour envoyer une requête HTTP
import { postData } from "../utils/api";

export default {
  data() {
    return {
      nomIngredient: "", // Stocke le nom de l'ingrédient
      nomImage: "", // Stocke le nom de l'image associée
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
          nomImage: this.nomImage, // Nom de l'image associée
        };

        // Envoi des données à l'API
        const response = await postData("admin/ingredients/create", payload);
        console.log("Réponse du serveur :", response);

        // Réinitialisation des champs après succès
        this.nomIngredient = "";
        this.nomImage = "";
      } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de l'insertion des données :", error);
      }
    },
  },
};
</script>

<style scoped>
/* Conteneur principal */
.insert-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4b6cb7, #182848);
  font-family: Arial, sans-serif;
}

/* Carte centrale */
.insert-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 90%;
  max-width: 400px;
}

/* Titre principal */
h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

/* Formulaire */
.insert-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
  text-align: left;
}

/* Groupe d'entrée */
.input-group label {
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
  display: block;
}

.input-group input {
  width: 100%;
  padding: 12px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.input-group input:focus {
  border-color: #4b6cb7;
  outline: none;
}

/* Bouton de soumission */
.btn-primary {
  background-color: #28a745;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #218838;
  transform: scale(1.05);
}
</style>
