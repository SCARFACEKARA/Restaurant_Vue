<template>
  <div class="admin-container">
    <!-- Titre principal de la page -->
    <h1>Insertion</h1>

    <!-- Conteneur pour le contenu -->
    <div class="content-wrapper">
      <div class="image-container">
        <img src="../assets/image/1x/Logo.png" alt="Image de connexion" class="login-image" />
      </div>

      <!-- Groupe de boutons pour la navigation -->
      <div class="button-group">
        <router-link to="/InsertPlat">
          <button class="btn-insertion">Insertion Plat</button>
        </router-link>

        <router-link to="/InsertIngredient">
          <button class="btn-stock">Insertion Ingrédient</button>
        </router-link>

        <router-link to="/InsertIngredientPlat">
          <button class="btn-commande">Insertion Ingrédient-Plat</button>
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
/* ==========================
   Styles Généraux
   ========================== */
* {
  box-sizing: border-box;
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* ==========================
   Conteneur Principal
   ========================== */
.admin-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  }

/* ==========================
   Titre de la Page
   ========================== */
h1 {
  font-size: 50px;
  color: #ff3574;
  margin-bottom: 30px;
  text-align: center;
  font-weight: bold;
  /* text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4); */
  font-family: 'Nudica', sans-serif;
}

/* ==========================
   Conteneur pour l'image et le formulaire
   ========================== */
.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px; /* Espace entre l'image et les boutons */
  width: 100%;
  max-width: 900px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  /* box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); */
  margin: auto; /* Centre horizontalement */
}

/* ==========================
   Conteneur pour l'image
   ========================== */
.image-container {
  flex: 1;
  max-width: 400px;
}

.login-image {
  width: 100%;
  height: auto;
  border-radius: 12px;
}

/* ==========================
   Groupe de boutons
   ========================== */
.button-group {
  display: flex;
  flex-direction: column;
  gap: 15px; /* Espace entre les boutons */
}

/* ==========================
   Boutons
   ========================== */
button {
  padding: 12px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  width: 100%; /* Pour que tous les boutons aient la même largeur */
}

button:hover {
  transform: scale(1.02);
}

/* Bouton d'insertion */
.btn-insertion {
  background-color: #ff3574; /* Vert */
  color: #ffffff;
}

.btn-insertion:hover {
  background-color: #FF9CBB;
}

/* Bouton de gestion de stock */
.btn-stock {
  background-color: #FFA304; /* Bleu */
  color: #ffffff;
}

.btn-stock:hover {
  background-color: #FFD54B;
}

/* Bouton de commande */
.btn-commande {
  background-color: #93D7D7; /* Orange */
  color: #ffffff;
}

.btn-commande:hover {
  background-color: #b7e2e2;
}
</style>