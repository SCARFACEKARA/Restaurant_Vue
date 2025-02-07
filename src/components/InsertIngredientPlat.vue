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
import { postData, getData } from '../utils/api';

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
        const payloads = this.selectedIngredients.map(idIngredient => ({
          idPlat: this.selectedPlat,
          idIngredient
        }));

        // Journalisation des données envoyées
        console.log("Envoi des associations au backend :", payloads);

        const results = await Promise.all(
          payloads.map(async payload => {
            try {
              const response = await postData("admin/ingredient-plats/create", payload);
              return { status: 'success', data: response };
            } catch (error) {
              // Journalisation complète de l'erreur
              console.error("Erreur backend pour l'association", payload, ":");
              console.error("Status:", error.response?.status);
              console.error("Data:", error.response?.data);
              console.error("Headers:", error.response?.headers);
              return { 
                status: 'error', 
                error: error.response?.data || error.message,
                payload 
              };
            }
          })
        );

        // Analyse des résultats
        const successful = results.filter(r => r.status === 'success');
        const failed = results.filter(r => r.status === 'error');

        // Construction du message
        let messageParts = [];
        if (successful.length > 0) {
          messageParts.push(`${successful.length} association(s) réussie(s) !`);
        }
        if (failed.length > 0) {
          failed.forEach((f, index) => {
            let errorMsg = `Erreur pour l'ingrédient ${f.payload.idIngredient}: `;
            
            if (f.error?.error) {
              // Gestion des erreurs connues du backend
              switch (f.error.error) {
                case 'This ingredient is already associated with this plat':
                  errorMsg += "Cet ingrédient est déjà associé à ce plat";
                  break;
                case 'Plat not found':
                  errorMsg += "Plat introuvable";
                  break;
                case 'Ingredient not found':
                  errorMsg += "Ingrédient introuvable";
                  break;
                default:
                  errorMsg += f.error.error;
              }
            } else {
              errorMsg += "Erreur inconnue";
            }
            
            messageParts.push(`${index + 1}. ${errorMsg}`);
          });
        }

        this.message = messageParts.join('\n');
        this.success = failed.length === 0;

        // Réinitialisation seulement si tout est réussi
        if (failed.length === 0) {
          this.selectedPlat = "";
          this.selectedIngredients = [];
        }

      } catch (error) {
        // Erreur globale inattendue
        console.error("Erreur globale inattendue :", error);
        this.message = "Une erreur critique est survenue lors de l'opération";
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

/* Style pour la liste des ingrédients */
.ingredient-list {
  margin-top: 40px;
}

.ingredient-list table {
  width: 100%;
  border-collapse: collapse;
}

.ingredient-list th,
.ingredient-list td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

.ingredient-list th {
  background-color: #f1f1f1;
}

.stock-list {
  margin-top: 40px;
}

.filters {
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

table th,
table td {
  padding: 10px;
  border: 1px solid #ddd;
  text-align: left;
}

table th {
  background-color: #f8f9fa;
}
</style>
