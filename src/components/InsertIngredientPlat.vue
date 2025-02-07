<template>
  <div class="container">
    <h1>INSERTION INGREDIENT PLAT</h1>
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
import { postData, getData } from '../utils/api';

export default {
  name: "InsertIngredientPlat",
  data() {
    return {
      plats: [], // Stocke la liste des plats
      ingredients: [], // Stocke la liste des ingrédients
      selectedPlat: "", // Stocke l'ID du plat sélectionné
      selectedIngredients: [], // Stocke les IDs des ingrédients sélectionnés
      message: "", // Stocke le message d'affichage (erreur ou succès)
      success: false // Indique si l'opération est un succès
    };
  },
  methods: {
    // Récupère la liste des plats depuis l'API
    async loadPlats() {
      try {
        this.plats = await getData("admin/plats/all-detailed");
      } catch (error) {
        console.error("Erreur lors de la récupération des plats :", error);
      }
    },
    // Récupère la liste des ingrédients depuis l'API
    async loadIngredients() {
      try {
        this.ingredients = await getData("admin/ingredients/all");
      } catch (error) {
        console.error("Erreur lors de la récupération des ingrédients :", error);
      }
    },
    // Associe les ingrédients au plat sélectionné
    async associerIngredientPlat() {
      if (!this.selectedPlat) { // Vérifie si un plat a été sélectionné
        this.message = "Veuillez sélectionner un plat.";
        this.success = false;
        return;
      }
      
      if (this.selectedIngredients.length === 0) { // Vérifie si au moins un ingrédient a été sélectionné
        this.message = "Veuillez sélectionner au moins un ingrédient.";
        this.success = false;
        return;
      }

      try {
        // Crée un tableau d'objets représentant les associations plat-ingrédient
        const payloads = this.selectedIngredients.map(idIngredient => ({
          idPlat: this.selectedPlat,
          idIngredient
        }));

        // Exécute toutes les requêtes en parallèle
        const results = await Promise.allSettled(
          payloads.map(payload => postData("admin/ingredient-plats/create", payload))
        );

        let successCount = 0;
        let errorMessages = [];

        // Analyse les résultats des requêtes
        results.forEach((result) => {
          if (result.status === "fulfilled") {
            successCount++; // Compte le nombre de succès
          } else {
            const errorData = result.reason.response?.data;
            const errorMessage = errorData?.error || "Erreur inconnue";
            errorMessages.push(`• ${errorMessage}`); // Stocke les messages d'erreur
          }
        });

        if (successCount > 0) {
          this.message = `${successCount} association(s) réussie(s) !`;
          this.success = true;
        }

        if (errorMessages.length > 0) {
          this.message += `\n\n${errorMessages.join("\n")}`;
          this.success = false;
        }

        // Réinitialise les sélections si tout a réussi
        if (successCount === this.selectedIngredients.length) {
          this.selectedPlat = "";
          this.selectedIngredients = [];
        }

      } catch (error) {
        console.error("Erreur critique :", error);
        this.message = "Une erreur critique est survenue lors de l'opération.";
        this.success = false;
      }
    }
  },
  mounted() {
    this.loadPlats(); // Charge la liste des plats au montage du composant
    this.loadIngredients(); // Charge la liste des ingrédients au montage du composant
  }
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.form {
  margin-bottom: 40px;
}

.input-group {
  margin-bottom: 15px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.submit-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #218838;
}

/* Style pour les messages */
.success-message {
  color: green;
  font-weight: bold;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>
