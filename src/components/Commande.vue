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
              <td>{{ commande.clientEmail }}</td>
              <td>{{ commande.dateCommande }}</td>
              <td>{{ commande.montantTotal }} €</td>
              <td>
                <select v-model="commande.status" @change="updateCommandeStatus(commande)">
                  <option value="en cours">En cours</option>
                  <option value="en attente">En attente</option>
                  <option value="fini">Fini</option>
                  <option value="livrer">Livrer</option>
                </select>
              </td>
              <td>
                <button @click.stop="deleteCommande(commande.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Détails de la commande sélectionnée -->
      <div v-if="selectedCommandeId" class="commande-details">
        <h2>Détails de la Commande #{{ selectedCommandeId }}</h2>
        <table>
          <thead>
            <tr>
              <th>Plat</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="detail in detailsCommande" :key="detail.id">
              <td>{{ detail.nomPlat }}</td>
              <td>
                <select v-model="detail.status" @change="updateDetailStatus(detail)">
                  <option value="fini">Fini</option>
                  <option value="recuperer">Récupérer</option>
                </select>
              </td>
              <td>
                <button @click.stop="deleteDetail(detail.id)">Supprimer</button>
              </td>
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
        detailsCommande: [], // Détails de la commande sélectionnée
        selectedCommandeId: null, // ID de la commande sélectionnée
        message: "", // Message d'erreur ou de succès
        success: false, // Statut du message
      };
    },
    methods: {
      // Charger la liste des commandes
      async loadCommandes() {
        try {
          const data = await getData("admin/commandes/all");
          this.commandes = data.map(commande => ({
            ...commande,
            clientEmail: commande.client.email, // Récupérer l'email du client
          }));
        } catch (error) {
          console.error("Erreur lors de la récupération des commandes :", error);
          this.message = "Erreur lors du chargement des commandes.";
          this.success = false;
        }
      },
  
      // Charger les détails d'une commande
      async loadDetailsCommande(commandeId) {
        try {
          const data = await getData(`admin/commandes/${commandeId}/details`);
          this.detailsCommande = data.map(detail => ({
            ...detail,
            nomPlat: detail.plat.nomPlat, // Récupérer le nom du plat
          }));
        } catch (error) {
          console.error("Erreur lors de la récupération des détails :", error);
          this.message = "Erreur lors du chargement des détails de la commande.";
          this.success = false;
        }
      },
  
      // Sélectionner une commande
      async selectCommande(commandeId) {
        this.selectedCommandeId = commandeId;
        await this.loadDetailsCommande(commandeId);
      },
  
      // Mettre à jour le statut d'une commande
      async updateCommandeStatus(commande) {
        try {
          await postData(`admin/commandes/${commande.id}/update-status`, {
            status: commande.status,
          });
          this.message = "Statut de la commande mis à jour avec succès.";
          this.success = true;
        } catch (error) {
          console.error("Erreur lors de la mise à jour du statut :", error);
          this.message = "Erreur lors de la mise à jour du statut.";
          this.success = false;
        }
      },
  
      // Mettre à jour le statut d'un détail de commande
      async updateDetailStatus(detail) {
        try {
          await postData(`admin/details-commande/${detail.id}/update-status`, {
            status: detail.status,
          });
          this.message = "Statut du détail mis à jour avec succès.";
          this.success = true;
        } catch (error) {
          console.error("Erreur lors de la mise à jour du statut :", error);
          this.message = "Erreur lors de la mise à jour du statut.";
          this.success = false;
        }
      },
  
      // Supprimer une commande
      async deleteCommande(commandeId) {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
          try {
            await deleteData(`admin/commandes/${commandeId}/delete`);
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
  
      // Supprimer un détail de commande
      async deleteDetail(detailId) {
        if (confirm("Êtes-vous sûr de vouloir supprimer ce détail ?")) {
          try {
            await deleteData(`admin/details-commande/${detailId}/delete`);
            this.message = "Détail supprimé avec succès.";
            this.success = true;
            this.loadDetailsCommande(this.selectedCommandeId); // Recharger les détails
          } catch (error) {
            console.error("Erreur lors de la suppression du détail :", error);
            this.message = "Erreur lors de la suppression du détail.";
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