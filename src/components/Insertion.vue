<template>
  <div class="insert-container">
    <!-- Titre principal de la page -->
    <div class="insert-card">
      <h1>INSERTION</h1>

      <!-- Liens de navigation vers les pages d'insertion avec des boutons -->
      <div class="button-group">
        <router-link to="/InsertPlat">
          <button class="btn-primary">Insertion Plat</button>
        </router-link>

        <router-link to="/InsertIngredient">
          <button class="btn-primary">Insertion Ingrédient</button>
        </router-link>

        <router-link to="/InsertIngredientPlat">
          <button class="btn-primary">Insertion Ingrédient-Plat</button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Insertions",
};
</script>

<style scoped>
/* Conteneur principal pour l'arrière-plan */
.insert-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4b6cb7, #182848);
  font-family: Arial, sans-serif;
}

/* Carte centrale contenant le contenu */
.insert-card {
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

/* Style des boutons principaux */
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

/* Effet au survol des boutons */
.btn-primary:hover {
  background-color: #218838;
  transform: scale(1.05);
}
</style>
