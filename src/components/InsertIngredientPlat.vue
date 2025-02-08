<template>
  <div class="insert-container">
    <div class="insert-card">
      <h1>INSERTION INGREDIENT PLAT</h1>

      <form @submit.prevent="associerIngredientPlat" class="insert-form">
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
          <div class="checkbox-group">
            <div v-for="ingredient in ingredients" :key="ingredient.id" class="checkbox-item">
              <input
                type="checkbox"
                :id="'ingredient-' + ingredient.id"
                :value="ingredient.id"
                v-model="selectedIngredients"
              />
              <label :for="'ingredient-' + ingredient.id">{{ ingredient.nomIngredient }}</label>
            </div>
          </div>
        </div>

        <button type="submit" class="btn-primary">Associer</button>

        <!-- Affichage des messages d'erreur ou de succès -->
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
  max-width: 500px;
}

/* Titre */
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

.input-group select,
.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border-color 0.3s;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #4b6cb7;
  outline: none;
}

/* Groupe des checkboxes */
.checkbox-group {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); /* Largeur ajustée pour alignement */
  gap: 15px; /* Espace entre les éléments */
  background: #f4f4f4;
  padding: 15px;
  border-radius: 8px;
  text-align: left; /* Aligne tout à gauche */
}

/* Élément individuel */
.checkbox-item {
  display: flex;
  align-items: center; /* Aligne verticalement la case et le texte */
  gap: 10px; /* Espace entre la checkbox et le texte */
  font-size: 0.9rem;
  color: #555;
}

/* Style des cases à cocher */
.checkbox-item input[type="checkbox"] {
  width: 16px;
  height: 16px;
  cursor: pointer;
}

/* Style des labels */
.checkbox-item label {
  text-align: justify; /* Justifie le texte */
  margin: 0;
  cursor: pointer; /* Change le curseur pour indiquer qu'on peut cliquer */
  flex: 1; /* Prend tout l'espace disponible */
  line-height: 1.4; /* Améliore la lisibilité du texte */
}

/* Bouton */
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

/* Messages */
.success-message {
  color: green;
  font-weight: bold;
  margin-top: 15px;
}

.error-message {
  color: red;
  font-weight: bold;
  margin-top: 15px;
}
</style>
