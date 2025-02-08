<template>
  <div class="container">
    <h1>GESTION DES COMMANDES</h1>

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
  </div>
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
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.commandes-list,
.commande-details {
  margin-bottom: 40px;
}

.table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.table th,
.table td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: left;
}

.table th {
  background-color: #f8f9fa;
}

tr.selected {
  background-color: #e9f5ff;
  cursor: pointer;
}

tr:hover {
  background-color: #f1f1f1;
  cursor: pointer;
}

.success-message {
  color: green;
}

.error-message {
  color: red;
}

.btn {
  padding: 8px 12px;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border: none;
}

.btn-danger:hover {
  background-color: #c82333;
}

.input-group {
  width: 100%;
  padding: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
