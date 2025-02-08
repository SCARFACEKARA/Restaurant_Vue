<template>
  <div class="insert-container">
    <div class="insert-card">
      <h1>INSERTION D'UN PLAT</h1>

      <form @submit.prevent="handleSubmit" class="insert-form">
        <div class="input-group">
          <label for="nomPlat">Nom du plat :</label>
          <input type="text" id="nomPlat" v-model="nomPlat" required placeholder="Entrez le nom du plat">
        </div>

        <div class="input-group">
          <label for="prixUnitaire">Prix (Ar) :</label>
          <input type="number" id="prixUnitaire" v-model="prixUnitaire" required placeholder="Entrez le prix">
        </div>

        <div class="input-group">
          <label for="tempsCuisson">Temps de cuisson :</label>
          <input type="time" id="tempsCuisson" v-model="tempsCuisson" required>
        </div>

        <button type="submit" class="btn-submit">Insérer</button>
      </form>
    </div>
  </div>
</template>

<script>
import { postData } from '../utils/api';

export default {
  data() {
    return {
      nomPlat: '',
      prixUnitaire: '',
      tempsCuisson: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        const payload = {
          nomPlat: this.nomPlat,
          prixUnitaire: this.prixUnitaire,
          tempsCuisson: this.tempsCuisson
        };
        
        const response = await postData("admin/plats/create", payload);
        console.log("Réponse du serveur :", response);

        this.nomPlat = '';
        this.prixUnitaire = '';
        this.tempsCuisson = '';

        alert("Plat inséré avec succès !");
      } catch (error) {
        console.error("Erreur lors de l'insertion des données :", error);
        alert("Une erreur est survenue, veuillez réessayer.");
      }
    }
  }
};
</script>

<style scoped>
.insert-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: linear-gradient(135deg, #4b6cb7, #182848);
  font-family: Arial, sans-serif;
}

.insert-card {
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  width: 90%;
  max-width: 400px;
  text-align: center;
}

h1 {
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
  font-weight: bold;
}

.insert-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.input-group {
  text-align: left;
}

label {
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
}

input[type="text"],
input[type="number"],
input[type="time"] {
  width: 100%;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-sizing: border-box;
  background: #f9f9f9;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #4b6cb7;
}

.btn-submit {
  background-color: #4b6cb7;
  color: white;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  transition: background-color 0.3s;
}

.btn-submit:hover {
  background-color: #3b5998;
}
</style>
