<template>
  <!-- Conteneur principal pour la page admin -->
  <div class="admin-container">
    <!-- Titre de la page d'administration -->
    <div class="admin-card">
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
/* Conteneur principal pour l'arrière-plan */
.admin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4b6cb7, #182848);
  font-family: Arial, sans-serif;
}

/* Carte centrale contenant le contenu */
.admin-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 90%;
  max-width: 400px;
}

/* Titre principal */
h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

/* Groupe des boutons */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Style des boutons principaux (verts) */
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

/* Effet au survol des boutons verts */
.btn-primary:hover {
  background-color: #218838;
  transform: scale(1.05);
}

/* Bouton de déconnexion (rouge) */
.btn-danger {
  background-color: #dc3545;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: all 0.3s ease;
}

/* Effet au survol du bouton rouge */
.btn-danger:hover {
  background-color: #c82333;
  transform: scale(1.05);
}
</style>
