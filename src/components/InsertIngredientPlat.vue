<template>
  <div class="container">
    <h1>Insertion Ingrédient Plat</h1>

    <div class="content-wrapper">
      <!-- Image à gauche -->
      <div class="image-container">
        <img src="../assets/image/1x/Logo.png" alt="Image de connexion" class="login-image" />
      </div>

      <!-- Formulaire d'association d'ingrédient -->
      <form @submit.prevent="associerIngredientPlat">
        <div class="input-group">
          <label for="plat">Plat :</label>
          <select id="plat" v-model="selectedPlat" required>
            <option value="" disabled>Sélectionnez un plat</option>
            <option v-for="plat in plats" :key="plat.id" :value="plat.id">
              {{ plat.nomPlat }}
            </option>
          </select>
        </div>

        <div class="input-group">
          <label>Ingrédients :</label>
          <div class="checkbox-group">
            <div class="checkbox-column">
              <div v-for="ingredient in ingredients.slice(0, Math.ceil(ingredients.length / 2))" :key="ingredient.id" class="checkbox-item">
                <input
                  type="checkbox"
                  :id="'ingredient-' + ingredient.id"
                  :value="ingredient.id"
                  v-model="selectedIngredients"
                />
                <label :for="'ingredient-' + ingredient.id" class="ingredient-label">{{ ingredient.nomIngredient }}</label>
              </div>
            </div>
            <div class="checkbox-column">
              <div v-for="ingredient in ingredients.slice(Math.ceil(ingredients.length / 2))" :key="ingredient.id" class="checkbox-item">
                <input
                  type="checkbox"
                  :id="'ingredient-' + ingredient.id"
                  :value="ingredient.id"
                  v-model="selectedIngredients"
                />
                <label :for="'ingredient-' + ingredient.id" class="ingredient-label">{{ ingredient.nomIngredient }}</label>
              </div>
            </div>
          </div>
        </div>

        <button type="submit">Associer</button>

        <p v-if="message" :class="{'success-message': success, 'error-message': !success}">
          {{ message }}
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { postData, getData } from "../utils/api";

export default {
  name: "InsertIngredientPlat",
  data() {
    return {
      plats: [],
      ingredients: [],
      selectedPlat: "",
      selectedIngredients: [],
      message: "",
      success: false,
    };
  },
  methods: {
    async loadPlats() {
      try {
        this.plats = await getData("admin/plats/all-detailed");
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
      if (!this.selectedPlat) {
        this.message = "Veuillez sélectionner un plat.";
        this.success = false;
        return;
      }

      if (this.selectedIngredients.length === 0) {
        this.message = "Veuillez sélectionner au moins un ingrédient.";
        this.success = false;
        return;
      }

      try {
        const payloads = this.selectedIngredients.map((idIngredient) => ({
          idPlat: this.selectedPlat,
          idIngredient,
        }));

        const results = await Promise.allSettled(
          payloads.map((payload) => postData("admin/ingredient-plats/create", payload))
        );

        let successCount = 0;
        let errorMessages = [];

        results.forEach((result) => {
          if (result.status === "fulfilled") {
            successCount++;
          } else {
            const errorData = result.reason.response?.data;
            const errorMessage = errorData?.error || "Erreur inconnue";
            errorMessages.push(`• ${errorMessage}`);
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

        if (successCount === this.selectedIngredients.length) {
          this.selectedPlat = "";
          this.selectedIngredients = [];
        }
      } catch (error) {
        console.error("Erreur critique :", error);
        this.message = "Une erreur critique est survenue lors de l'opération.";
        this.success = false;
      }
    },
  },
  mounted() {
    this.loadPlats();
    this.loadIngredients();
  },
};
</script>

<style scoped>
/* Styles généraux */
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
}

h1 {
  font-size: 50px;
  color: #ff3574;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
}

.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
  max-width: 900px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-container {
  flex: 1;
  max-width: 400px;
}

.login-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
}

label {
  font-size: 20px;
  color: #151514;
  font-weight: 600;
}

.checkbox-group {
  display: flex;
  gap: 20px;
}

.checkbox-column {
  flex: 1;
}

.checkbox-item {
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.checkbox-item input[type="checkbox"] {
  margin-right: 10px;
}
select,
input[type="checkbox"] {
  padding: 14px;
  font-size: 18px;
  border: 2px solid #ff3574;
  border-radius: 10px;
  background: #fff;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
}

select:focus,
input[type="checkbox"]:focus {
  border-color: #ff3574;
  box-shadow: 0 4px 12px rgba(255, 53, 116, 0.3);
}
.ingredient-label {
  font-weight: normal;
}

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

.success-message {
  color: green;
  font-weight: bold;
}

.error-message {
  color: red;
  font-weight: bold;
}
</style>
