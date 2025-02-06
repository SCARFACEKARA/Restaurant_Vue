<template>
    <div>
      <h1>Insertion</h1>
      <router-link to="/InsertPlat"><button>Insertion Plat</button></router-link>
      <router-link to="/InsertIngredient"><button>Insertion Ingrédient</button></router-link>
      <router-link to="/InsertIngredientPlat"><button>Insertion Ingrédient-Plat</button></router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: "Insertions"
  };
  </script>
  
  <style scoped>
  a {
    display: block;
    margin: 10px 0;
  }
  </style>