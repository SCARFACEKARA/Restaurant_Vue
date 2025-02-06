<template>
  <div>
    <h1>Admin Panel</h1>
    <router-link to="/insertion">
      <button>Insertion</button>
    </router-link>
    <router-link to="/Stock">
      <button>Gestion de Stock</button>
    </router-link>
    <button @click="handleLogout">Déconnexion</button>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  methods: {
    handleLogout() {
      localStorage.removeItem('token'); // Supprime le token
      this.$router.push({ name: 'Connexion' }); // Redirige vers la page de connexion
    }
  }
};
</script>