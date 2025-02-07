<template>
    <div class="insert-container">
      <h1>INSERTION D'UN INGREDIENT</h1>
      <form @submit.prevent="handleSubmit" class="insert-form">
        <div class="input-group">
          <label for="nomIngredient">Nom :</label>
          <input type="text" id="nomIngredient" v-model="nomIngredient" required>
        </div>
        <div class="input-group">
          <label for="nomImage">Nom de l'Image :</label>
          <input type="text" id="nomImage" v-model="nomImage" required>
        </div>
        <button type="submit" class="btn-submit">Insérer</button>
      </form>
    </div>
  </template>
  
  <script>
  import { postData } from '../utils/api';
  
  export default {
    data() {
      return {
        nomIngredient: '',
        nomImage: ''
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const payload = {
            nomIngredient: this.nomIngredient,
            nomImage: this.nomImage
          };
          const response = await postData("admin/ingredients/create", payload);
          console.log("Réponse du serveur :", response);
        } catch (error) {
          console.error("Erreur lors de l'insertion des données :", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .insert-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f8f8f8;
    border-radius: 10px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  h1 {
    font-size: 1.8rem;
    color: #333;
    margin-bottom: 20px;
  }
  
  .insert-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .input-group {
    text-align: left;
  }
  
  .input-group label {
    font-size: 1rem;
    color: #555;
    margin-bottom: 5px;
  }
  
  .input-group input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .btn-submit {
    background-color: #28a745;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;
  }
  
  .btn-submit:hover {
    background-color: #218838;
  }
  </style>