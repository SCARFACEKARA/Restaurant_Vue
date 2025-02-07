<template>
  <div>
    <!-- Titre principal de la page -->
    <h1>INSERTION</h1>

    <!-- Liens de navigation vers les pages d'insertion avec des boutons -->
    <router-link to="/InsertPlat">
      <button>Insertion Plat</button>
    </router-link>

    <router-link to="/InsertIngredient">
      <button>Insertion Ingrédient</button>
    </router-link>

    <router-link to="/InsertIngredientPlat">
      <button>Insertion Ingrédient-Plat</button>
    </router-link>
  </div>
</template>

<script>
export default {
name: "Insertions" // Nom du composant
};
</script>

<style scoped>
/* Style des liens (router-link) */
a {
display: block; /* Affichage en bloc pour séparer les boutons */
margin: 10px 0; /* Espacement entre chaque lien */
}
</style>
