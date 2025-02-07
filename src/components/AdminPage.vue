<template>
  <div class="admin-container">
    <h1>Admin Panel</h1>
    <div class="button-group">
      <router-link to="/insertion">
        <button class="btn-primary">Insertion</button>
      </router-link>
      <router-link to="/Stock">
        <button class="btn-primary">Gestion de Stock</button>
      </router-link>
      <button class="btn-danger" @click="handleLogout">Déconnexion</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AdminPage",
  methods: {
    handleLogout() {
      localStorage.removeItem('token');
      this.$router.push({ name: 'Connexion' });
    }
  }
};
</script>

<style scoped>
.admin-container {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.btn-primary {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-primary:hover {
  background-color: #218838;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>