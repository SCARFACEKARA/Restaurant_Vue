<template>
  <div class="container">
    <h1>Insertion Ingrédient-Plat</h1>
    <form @submit.prevent="associerIngredientPlat" class="form">
      
      <!-- Sélection du plat -->
      <div class="input-group">
        <label for="plat">Plat :</label>
        <select id="plat" v-model="selectedPlat" required>
          <option value="" disabled>Sélectionnez un plat</option>
          <option v-for="plat in plats" :key="plat.id" :value="plat.id">
            {{ plat.nomPlat }}
          </option>
        </select>
      </div>

      <!-- Sélection des ingrédients -->
      <div class="input-group">
        <label>Ingrédients :</label>
        <div v-for="ingredient in ingredients" :key="ingredient.id">
          <input
            type="checkbox"
            :id="'ingredient-' + ingredient.id"
            :value="ingredient.id"
            v-model="selectedIngredients"
          />
          <label :for="'ingredient-' + ingredient.id">{{ ingredient.nomIngredient }}</label>
        </div>
      </div>

      <button type="submit" class="submit-button">Associer</button>

      <!-- Affichage des messages d'erreur ou de succès -->
      <p v-if="message" :class="{'success-message': success, 'error-message': !success}">
        {{ message }}
      </p>
    </form>
  </div>
</template>

<script>
import { postData, getData } from '../utils/api'; // Centralisation des appels API

export default {
  name: "InsertIngredientPlat",
  data() {
    return {
      plats: [],
      ingredients: [],
      selectedPlat: "",
      selectedIngredients: [],
      message: "",
      success: false
    };
  },
  methods: {
    async loadPlats() {
      try {
        this.plats = await getData("admin/plats/all");
      } catch (error) {
        console.error("Erreur lors de la récupération des plats :", error);
      }
    },
    async loadIngredients() {
      try {
        this.ingredients = await getData("admin/ingredients/all");
      } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients :", error);
      }
    },
    async associerIngredientPlat() {
      // Vérifier si un plat est sélectionné
      if (!this.selectedPlat) {
        this.message = "Veuillez sélectionner un plat.";
        this.success = false;
        return;
      }
      
      // Vérifier si des ingrédients sont sélectionnés
      if (this.selectedIngredients.length === 0) {
        this.message = "Veuillez sélectionner au moins un ingrédient.";
        this.success = false;
        return;
      }

      try {
        // Préparer les données à envoyer au serveur
        const payloads = this.selectedIngredients.map(idIngredient => ({
          idPlat: this.selectedPlat,
          idIngredient
        }));

        // Envoyer chaque association
        const results = await Promise.all(
          payloads.map(payload => postData("admin/ingredient-plats/create", payload))
        );

        // Message de succès
        this.message = "Associations ajoutées avec succès !";
        this.success = true;

        // Réinitialisation des sélections
        this.selectedPlat = "";
        this.selectedIngredients = [];
      } catch (error) {
        // Gestion des erreurs
        console.error("Erreur lors de l'association :", error);
        this.message = "Une erreur est survenue lors de l'association.";
        this.success = false;
      }
    }
  },
  mounted() {
    this.loadPlats();
    this.loadIngredients();
  }
};
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
}

h1 {
    font-size: 1.8rem;
    margin-bottom: 20px;
}

.input-group {
    margin-bottom: 15px;
    text-align: left;
}

label {
    font-size: 1rem;
    color: #333;
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.submit-button {
    width: 100%;
    padding: 10px;
    font-size: 1.1rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #218838;
}
</style>
