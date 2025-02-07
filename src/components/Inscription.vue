<template>
    <div class="inscription-container">
      <h1>PAGE D'INSCRIPTION</h1>
      <form @submit.prevent="handleSubmit" class="inscription-form">
        <div class="input-group">
          <label for="email">Email :</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="input-group">
          <label for="password">Mot de passe :</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" class="btn-submit">S'inscrire</button>
      </form>
    </div>
  </template>
  
  <script>
  import { postData } from '../utils/api';
  
  export default {
    data() {
      return {
        email: '',
        password: ''
      };
    },
    methods: {
      async handleSubmit() {
        try {
          const payload = {
            email: this.email,
            mdp: this.password,
            role: "ADMIN"
          };
          const response = await postData("users/create", payload);
          console.log("Réponse du serveur :", response);
        } catch (error) {
          console.error("Erreur lors de l'inscription :", error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .inscription-container {
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
  
  .inscription-form {
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