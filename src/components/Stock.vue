<template>
  <div class="container">
    <h1>Gestion de stock ingredient</h1>

    <div class="content-wrapper">
      <!-- <div class="image-container">
        <img src="../assets/image/1x/Logo.png" alt="Image de connexion" class="login-image" />
      </div> -->

      <!-- Formulaire d'ajout de stock -->
      <form @submit.prevent="handleSubmit" id="inscription" class="form">
        <!-- Sélection de l'ingrédient -->
        <div class="input-group">
          <label for="idIngredient">Ingrédient :</label>
          <select id="idIngredient" v-model="idIngredient" required>
            <option value="">choisir ingrédient</option>
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
    </div> <!-- Fermeture de .content-wrapper -->
  </div> <!-- Fermeture de .container -->
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
/* ==========================
   Styles Généraux
   ========================== */
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
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  font-family: 'Nudica', sans-serif;
}

.content-wrapper {
  display: flex;
  flex-direction: column;
  gap: 50px;
  width: 100%;
  max-width: 1100px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.image-container {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.form {
  margin-bottom: 40px;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  font-size: 20px;
  color: #151514;
  font-weight: 600;
  margin-bottom: 5px;
  display: block;
}

.input-group input,
.input-group select {
  width: 100%;
  padding: 14px;
  font-size: 18px;
  border: 2px solid #ff3574;
  border-radius: 10px;
  background: #fff;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-group input:focus,
.input-group select:focus {
  border-color: #ff3574;
  box-shadow: 0 4px 12px rgba(255, 53, 116, 0.3);
}

.submit-button {
  background-color: #93D7D7;
  color: #ffffff;
  padding: 14px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%;
}

.submit-button:hover {
  background-color: #b7e2e2;
  transform: scale(1.02);
}

.submit-button:disabled {
  background-color: #ff9cbb;
  cursor: not-allowed;
}

/* ==========================
   Style pour la liste des ingrédients et mouvements de stock
   ========================== */
.ingredient-list,
.stock-list {
  margin-top: 40px;
}

.ingredient-list table,
.stock-list table {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.ingredient-list th,
.stock-list th,
.ingredient-list td,
.stock-list td {
  padding: 15px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 16px;
}

.ingredient-list th,
.stock-list th {
  background-color: #FFD54B;
  color: white;
  font-weight: bold;
}

.filters {
  margin-bottom: 20px;
}

.filters label {
  font-size: 18px;
  font-weight: 600;
  margin-right: 10px;
}

.filters select {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #ff3574;
  border-radius: 8px;
  background: #fff;
  outline: none;
}
</style>
