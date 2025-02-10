<template>
  <div class="container">
    <h1>Gestion de commande</h1>

    <div class="content-wrapper">
      <div class="image-container">
        <img src="../assets/image/1x/Logo.png" alt="Image de connexion" class="login-image" />
      </div>

      <!-- Liste des commandes -->
      <div class="commandes-list">
        <h2>Liste des Commandes</h2>
        <table class="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Client</th>
              <th>Date</th>
              <th>Montant Total</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="commande in commandes"
              :key="commande.id"
              @click="selectCommande(commande.id)"
              :class="{ selected: selectedCommandeId === commande.id }"
            >
              <td>{{ commande.id }}</td>
              <td>{{ commande.client['email'] }}</td>
              <td>{{ commande.dateCommande }}</td>
              <td>{{ commande.montantTotal }} €</td>
              <td>
                <select 
                  v-model="commande.status" 
                  @change="updateCommandeStatus(commande)" 
                  class="input-group"
                >
                  <option value="en cours">En cours</option>
                  <option value="en attente">En attente</option>
                  <option value="fini">Fini</option>
                  <option value="livrer">Livrer</option>
                </select>
              </td>
              <td>
                <button class="btn btn-danger" @click.stop="deleteCommande(commande.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Détails de la commande sélectionnée -->
      <div v-if="selectedCommande" class="commande-details">
        <h2>Détails de la Commande #{{ selectedCommande.id }}</h2>
        <table class="table">
          <thead>
            <tr>
              <th>Plat</th>
              <th>Statut</th>
              <th>Temps de cuisson</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detail in selectedCommande.details" :key="detail.id">
              <td>{{ detail.plat.nomPlat }}</td>
              <td>{{ detail.status }}</td>
              <td>{{ formatTime(detail.plat.tempsCuisson) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Message d'erreur ou de succès -->
      <p v-if="message" :class="{'success-message': success, 'error-message': !success}">
        {{ message }}
      </p>
    </div> <!-- Fermeture de .content-wrapper -->
  </div> <!-- Fermeture de .container -->
</template>

<script>
import { getData, postData, deleteData } from '../utils/api';

export default {
  name: "AdminCommandesPage",
  data() {
    return {
      commandes: [],
      selectedCommandeId: null,
      selectedCommande: null,
      message: "",
      success: false,
    };
  },
  methods: {
    async loadCommandes() {
      try {
        const data = await getData("admin/commandes/all");
        this.commandes = data;
      } catch (error) {
        console.error("Erreur lors de la récupération des commandes :", error);
        this.message = "Erreur lors du chargement des commandes.";
        this.success = false;
      }
    },

    selectCommande(commandeId) {
      this.selectedCommandeId = commandeId;
      this.selectedCommande = this.commandes.find(c => c.id === commandeId) || null;
    },

    formatTime(time) {
      if (!time) return "-";
      const [hours, minutes, seconds] = time.split(":");
      return `${hours}h ${minutes}min ${seconds}s`;
    },

    async deleteCommande(commandeId) {
      if (confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
        try {
          await deleteData(`admin/commandes/delete/${commandeId}`);
          this.message = "Commande supprimée avec succès.";
          this.success = true;
          this.loadCommandes();
        } catch (error) {
          console.error("Erreur lors de la suppression de la commande :", error);
          this.message = "Erreur lors de la suppression de la commande.";
          this.success = false;
        }
      }
    },
  },
  mounted() {
    this.loadCommandes();
  },
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

.login-image {
  width: 200px;
  height: auto;
  border-radius: 12px;
}

.commandes-list,
.commande-details {
  width: 100%;
  border-collapse: collapse;
  border-radius: 12px;
  overflow: hidden;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.table th,
.table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
  font-size: 16px;
}

.table th {
  background-color: #FFD54B;
  color: white;
  font-weight: bold;
}

tr.selected {
  background-color: #ffeff5;
}

tr:hover {
  background-color: #f1f1f1;
}

.success-message {
  color: green;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}

.error-message {
  color: red;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}

button {
  background-color: #ff3574;
  color: #ffffff;
  padding: 10px 20px;
  font-size: 16px;
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

.btn-danger {
  background-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

select {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 2px solid #ff3574;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
}

select:focus {
  border-color: #ff3574;
  box-shadow: 0 4px 12px rgba(255, 53, 116, 0.3);
}
</style>
