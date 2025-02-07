<template>
  <!-- Conteneur principal pour la page admin -->
  <div class="admin-container">
    <!-- Titre de la page d'administration -->
    <h1>ADMIN PANEL</h1>

    <!-- Groupe de boutons pour la navigation -->
    <div class="button-group">
      <!-- Lien vers la page d'insertion -->
      <router-link to="/insertion">
        <button class="btn-primary">Insertion</button>
      </router-link>

      <!-- Lien vers la gestion du stock -->
      <router-link to="/Stock">
        <button class="btn-primary">Gestion de Stock</button>
      </router-link>

      <!-- Lien vers la gestion des commandes -->
      <router-link to="/Commande">
        <button class="btn-primary">Commande</button>
      </router-link>

      <!-- Bouton de déconnexion avec un événement "click" -->
      <button class="btn-danger" @click="handleLogout">Déconnexion</button>
    </div>
  </div>
</template>

<script>
export default {
  // Nom du composant
  name: "AdminPage",
  
  methods: {
    /**
     * Méthode pour gérer la déconnexion de l'utilisateur.
     * - Supprime le token de l'utilisateur du stockage local.
     * - Redirige vers la page de connexion.
     */
    handleLogout() {
      localStorage.removeItem('token'); // Suppression du token stocké
      this.$router.push({ name: 'Connexion' }); // Redirection vers la page de connexion
    }
  }
};
</script>

<style scoped>
/* Conteneur principal pour la mise en page */
.admin-container {
  max-width: 600px; /* Largeur maximale du conteneur */
  margin: 50px auto; /* Centrage du conteneur */
  padding: 20px; /* Espacement interne */
  background-color: #f8f8f8; /* Couleur de fond */
  border-radius: 10px; /* Coins arrondis */
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); /* Ombre pour effet de profondeur */
  text-align: center; /* Alignement du texte au centre */
}

/* Style du titre */
h1 {
  font-size: 2rem; /* Taille du texte */
  color: #333; /* Couleur du texte */
  margin-bottom: 20px; /* Espacement sous le titre */
}

/* Conteneur des boutons, disposés verticalement */
.button-group {
  display: flex; /* Utilisation de flexbox */
  flex-direction: column; /* Alignement en colonne */
  gap: 15px; /* Espacement entre les boutons */
}

/* Style des boutons principaux (vert) */
.btn-primary {
  background-color: #28a745; /* Couleur verte */
  color: white; /* Couleur du texte */
  padding: 10px 20px; /* Espacement intérieur */
  border: none; /* Suppression des bordures */
  border-radius: 5px; /* Coins arrondis */
  cursor: pointer; /* Curseur en mode clic */
  font-size: 1rem; /* Taille de la police */
  transition: background-color 0.3s; /* Animation au survol */
}

/* Changement de couleur au survol des boutons verts */
.btn-primary:hover {
  background-color: #218838;
}

/* Style du bouton de déconnexion (rouge) */
.btn-danger {
  background-color: #dc3545; /* Couleur rouge */
  color: white; /* Couleur du texte */
  padding: 10px 20px; /* Espacement intérieur */
  border: none; /* Suppression des bordures */
  border-radius: 5px; /* Coins arrondis */
  cursor: pointer; /* Curseur interactif */
  font-size: 1rem; /* Taille du texte */
  transition: background-color 0.3s; /* Animation fluide */
}

/* Changement de couleur au survol du bouton rouge */
.btn-danger:hover {
  background-color: #c82333;
}
</style>
