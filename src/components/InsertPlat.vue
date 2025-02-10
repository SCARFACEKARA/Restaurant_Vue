<template>
  <div class="container">
    <h1>Insertion de plat</h1>
    <div class="content-wrapper">
      <!-- Conteneur pour l'image -->
      <div class="image-container">
        <img src="../assets/image/1x/Logo.png" alt="Image du plat" class="login-image" />
      </div>

      <!-- Formulaire d'insertion -->
      <form @submit.prevent="handleSubmit">
        <div class="input-group">
          <label for="nomPlat">Nom du plat :</label>
          <input type="text" id="nomPlat" v-model="nomPlat" required placeholder="Entrez le nom du plat" />
        </div>

        <div class="input-group">
          <label for="prixUnitaire">Prix (Ar) :</label>
          <input type="number" id="prixUnitaire" v-model="prixUnitaire" required placeholder="Entrez le prix" />
        </div>

        <div class="input-group">
          <label for="tempsCuisson">Temps de cuisson :</label>
          <input type="time" id="tempsCuisson" v-model="tempsCuisson" required />
        </div>

        <button type="submit">Insérer</button>
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
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: #f9f9f9;
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
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
  font-family: 'Nudica', sans-serif;
}

/* ==========================
   Conteneur pour l'image et le formulaire
   ========================== */
.content-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 50px;
  width: 100%;
  max-width: 900px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
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
   Formulaire d'insertion
   ========================== */
form {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 400px;
}

label {
  font-size: 20px;
  color: #151514;
  font-weight: 600;
}

input {
  width: 100%;
  padding: 14px;
  font-size: 18px;
  border: 2px solid #ff3574;
  border-radius: 10px;
  background: #fff;
  outline: none;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  border-color: #ff3574;
  box-shadow: 0 4px 12px rgba(255, 53, 116, 0.3);
}

button {
  background-color: #ff3574;
  color: #ffffff;
  padding: 12px;
  font-size: 20px;
  font-weight: bold;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
}

button:hover {
  background-color: #ff9cbb;
  transform: scale(1.02);
}

button:disabled {
  background-color: #ff9cbb;
  cursor: not-allowed;
}
</style>
