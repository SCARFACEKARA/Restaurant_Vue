<template>
  <div class="insert-container">
    <!-- Titre de la page -->
    <h1>INSERTION D'UN PLAT</h1>

    <!-- Formulaire d'insertion avec gestion de l'événement submit -->
    <form @submit.prevent="handleSubmit" class="insert-form">
      <!-- Champ de saisie pour le nom du plat -->
      <div class="input-group">
        <label for="nomPlat">Nom du plat :</label>
        <input type="text" id="nomPlat" v-model="nomPlat" required>
      </div>

      <!-- Champ de saisie pour le prix unitaire du plat -->
      <div class="input-group">
        <label for="prixUnitaire">Prix (Ar) :</label>
        <input type="number" id="prixUnitaire" v-model="prixUnitaire" required>
      </div>

      <!-- Champ de saisie pour le temps de cuisson -->
      <div class="input-group">
        <label for="tempsCuisson">Temps de cuisson :</label>
        <input type="time" id="tempsCuisson" v-model="tempsCuisson" required>
      </div>

      <!-- Bouton pour soumettre le formulaire -->
      <button type="submit" class="btn-submit">Insérer</button>
    </form>
  </div>
</template>

<script>
import { postData } from '../utils/api';

export default {
  data() {
    return {
      // Variables liées aux champs du formulaire
      nomPlat: '',
      prixUnitaire: '',
      tempsCuisson: ''
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // Création de l'objet à envoyer à l'API
        const payload = {
          nomPlat: this.nomPlat,
          prixUnitaire: this.prixUnitaire,
          tempsCuisson: this.tempsCuisson
        };

        // Envoi des données à l'API
        const response = await postData("admin/plats/create", payload);
        console.log("Réponse du serveur :", response);

        // Réinitialisation des champs après une insertion réussie
        this.nomPlat = '';
        this.prixUnitaire = '';
        this.tempsCuisson = '';

        // Message de confirmation
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
/* Conteneur principal du formulaire */
.insert-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f8f8f8;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

/* Style du titre */
h1 {
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 20px;
}

/* Style du formulaire */
.insert-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

/* Conteneur des champs de saisie */
.input-group {
  text-align: left;
}

/* Style des labels */
.input-group label {
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;
}

/* Style des champs de saisie */
.input-group input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Bouton de soumission */
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

/* Effet au survol du bouton */
.btn-submit:hover {
  background-color: #218838;
}
</style>