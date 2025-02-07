<template>
  <div class="container">
    <h1>GESTION DE STOCK INGREDIENT</h1>
    
    <!-- Formulaire d'ajout de stock -->
    <form @submit.prevent="handleSubmit" id="inscription" class="form">
      
      <!-- Sélection de l'ingrédient -->
      <div class="input-group">
        <label for="idIngredient">Ingrédient :</label>
        <select id="idIngredient" v-model="idIngredient" required>
          <option v-for="ingredient in ingredients" :key="ingredient.id" :value="ingredient.id">
            {{ ingredient.nomIngredient }}
          </option>
        </select>
      </div>

      <!-- Champ pour entrer la quantité -->
      <div class="input-group">
        <label for="quantite">Quantité :</label>
        <input type="number" id="quantite" v-model.number="quantite" placeholder="Entrez la quantité" min="1" required>
      </div>

      <!-- Sélection de la date -->
      <div class="input-group">
        <label for="dateStock">Date :</label>
        <input type="date" id="dateStock" v-model="dateStock" required>
      </div>

      <!-- Sélection du type d'opération (entrée ou sortie) -->
      <div class="input-group">
        <label for="status">Type d'opération :</label>
        <select id="status" v-model="status" required>
          <option value="entree">Entrée</option>
          <option value="sortie">Sortie</option>
        </select>
      </div>

      <!-- Bouton de soumission -->
      <button type="submit" class="submit-button">Enregistrer</button>
    </form>

    <!-- Liste des ingrédients enregistrés -->
    <div class="ingredient-list">
      <h2>Liste des ingrédients enregistrés</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom de l'ingrédient</th>
            <th>Quantité</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingredient in stockIngredient" :key="ingredient.id">
            <td>{{ ingredient.id }}</td>
            <td>{{ ingredient.ingredient['nomIngredient'] }}</td>
            <td>{{ ingredient.quantite }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Liste des mouvements de stock -->
    <div class="stock-list">
      <h2>Mouvement de stock</h2>
      
      <!-- Filtre pour afficher les entrées/sorties -->
      <div class="filters">
        <label for="filterStatus">Filtrer par type d'opération :</label>
        <select id="filterStatus" v-model="filterStatus">
          <option value="all">Tous</option>
          <option value="entree">Entrée</option>
          <option value="sortie">Sortie</option>
        </select>
      </div>
      
      <table>
        <thead>
          <tr>
            <th>Ingrédient</th>
            <th>Quantité</th>
            <th>Date</th>
            <th>Type d'opération</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stock in filteredStocks" :key="stock.id">
            <td>{{ stock.ingredient['nomIngredient'] }}</td>
            <td>{{ stock.quantite }}</td>
            <td>{{ stock.dateStock }}</td>
            <td>{{ stock.status === 'entree' ? 'Entrée' : 'Sortie' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { postData, getData } from '../utils/api';

export default {
  data() {
    return {
      idIngredient: '', // Identifiant de l'ingrédient sélectionné
      quantite: 1, // Quantité par défaut
      dateStock: new Date().toISOString().split('T')[0], // Date actuelle par défaut
      status: 'entree', // Type d'opération par défaut
      stockIngredient: [], // Liste des ingrédients récupérés depuis l'API
      stocks: [], // Liste des mouvements de stock récupérés depuis l'API
      filterStatus: 'all', // Filtre actif pour l'affichage des stocks
      ingredients: [] // Liste des ingrédients disponibles
    };
  },
  computed: {
    // Filtrer les stocks en fonction du type d'opération sélectionné
    filteredStocks() {
      return this.filterStatus === 'all' ? this.stocks : this.stocks.filter(stock => stock.status === this.filterStatus);
    }
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
        
        // Envoi des données à l'API
        const response = await postData('admin/stocks/create', payload);
        console.log("Stock ajouté :", response);
        alert("Stock enregistré avec succès !");
        this.loadStocks(); // Recharger la liste des stocks après l'ajout
        
        // Réinitialisation du formulaire après l'ajout
        this.idIngredient = '';
        this.quantite = 1;
        this.dateStock = new Date().toISOString().split('T')[0];
        this.status = 'entree';
      } catch (error) {
        console.error("Erreur lors de l'ajout du stock :", error);
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    },
    async loadIngredients() {
      try {
        // Charger les ingrédients et les stocks depuis l'API
        this.stockIngredient = await getData('admin/stocks/all');
        this.ingredients = await getData('admin/ingredients/all');
      } catch (error) {
        console.error("Erreur lors du chargement des ingrédients :", error);
      }
    },
    async loadStocks() {
      try {
        // Charger les mouvements de stock depuis l'API
        this.stocks = await getData('admin/stocks/all_basic');
      } catch (error) {
        console.error("Erreur lors du chargement des stocks :", error);
      }
    }
  },
  mounted() {
    // Charger les données au montage du composant
    this.loadIngredients();
    this.loadStocks();
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
