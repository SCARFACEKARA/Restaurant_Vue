<template>
  <div class="container">
    <h1>GESTION DE STOCK INGREDIENT</h1>
    <form @submit.prevent="handleSubmit" id="inscription" class="form">
      <div class="input-group">
        <label for="idIngredient">Ingrédient :</label>
        <select id="idIngredient" v-model="idIngredient" required>
          <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">
            {{ ingredient.nomIngredient }}
          </option>
        </select>
      </div>

      <div class="input-group">
        <label for="quantite">Quantité :</label>
        <input type="number" id="quantite" v-model.number="quantite" placeholder="Entrez la quantité" min="1" required>
      </div>

      <div class="input-group">
        <label for="dateStock">Date :</label>
        <input type="date" id="dateStock" v-model="dateStock" required>
      </div>

      <div class="input-group">
        <label for="status">Type d'opération :</label>
        <select id="status" v-model="status" required>
          <option value="entree">Entrée</option>
        </select>
      </div>

      <button type="submit" class="submit-button">Enregistrer</button>
    </form>
  </div>
</template>

<script>
import { postData, getData } from '../utils/api';

export default {
  data() {
    return {
      idIngredient: '',
      quantite: 1,
      dateStock: new Date().toISOString().split('T')[0],
      status: 'entree',
      ingredients: []
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const payload = {
          idIngredient: this.idIngredient,
          quantite: this.quantite,
          dateStock: this.dateStock,
          status: this.status
        };
        
        const response = await postData('admin/stocks/create', payload); // Supprimez le "/" au début
        console.log("Stock ajouté :", response);
        alert("Stock enregistré avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'ajout du stock :", error);
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    },
    async loadIngredients() {
      try {
        this.ingredients = await getData('admin/ingredients/all'); // Supprimez le "/" au début
      } catch (error) {
        console.error("Erreur lors du chargement des ingrédients :", error);
      }
    }
  },
  mounted() {
    this.loadIngredients();
  }
};
</script>