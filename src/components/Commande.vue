<template>
    <div class="container">
      <h1>GESTION DES COMMANDES</h1>
  
      <!-- Liste des commandes -->
      <div class="commandes-list">
        <h2>Liste des Commandes</h2>
        <table>
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
                <!-- Sélecteur pour modifier le statut de la commande -->
                <select v-model="commande.status" @change="updateCommandeStatus(commande)">
                  <option value="en cours">En cours</option>
                  <option value="en attente">En attente</option>
                  <option value="fini">Fini</option>
                  <option value="livrer">Livrer</option>
                </select>
              </td>
              <td>
                <!-- Bouton pour supprimer une commande -->
                <button @click.stop="deleteCommande(commande.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Détails de la commande sélectionnée -->
      <div v-if="selectedCommande" class="commande-details">
        <h2>Détails de la Commande #{{ selectedCommande.id }}</h2>
        <table>
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
        commandes: [], // Liste des commandes
        selectedCommandeId: null, // ID de la commande sélectionnée
        selectedCommande: null, // Détails de la commande sélectionnée
        message: "", // Message d'erreur ou de succès
        success: false, // Statut du message (succès ou erreur)
      };
    },
    methods: {
      // Charger la liste des commandes depuis l'API
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
  
      // Sélectionner une commande et afficher ses détails
      selectCommande(commandeId) {
        this.selectedCommandeId = commandeId;
        this.selectedCommande = this.commandes.find(c => c.id === commandeId) || null;
      },
  
      // Formater le temps de cuisson (exemple : convertir HH:MM:SS en HHh MMmin SSs)
      formatTime(time) {
        if (!time) return "-";
        const [hours, minutes, seconds] = time.split(":");
        return `${hours}h ${minutes}min ${seconds}s`;
      },
  
      // Supprimer une commande après confirmation
      async deleteCommande(commandeId) {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
          try {
            await deleteData(`admin/commandes/delete/${commandeId}`);
            this.message = "Commande supprimée avec succès.";
            this.success = true;
            this.loadCommandes(); // Recharger la liste des commandes
          } catch (error) {
            console.error("Erreur lors de la suppression de la commande :", error);
            this.message = "Erreur lors de la suppression de la commande.";
            this.success = false;
          }
        }
      },
    },
    mounted() {
      this.loadCommandes(); // Charger les commandes au montage du composant
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
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  th,
  td {
    padding: 12px;
    border: 1px solid #ddd;
    text-align: left;
  }
  
  th {
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
  
  button {
    padding: 5px 10px;
    background-color: #dc3545;
    color: white;
    border: none;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #c82333;
  }
  </style>
