<template>
    <div class="container">
        <h1>INSERTION D'UN PLAT</h1>
        <h2>{{ nomPlat }}</h2>
        <form @submit.prevent="handleSubmit" id="inscription" class="form">
            <div class="input-group">
                <label for="nomPlat">Nom du plat :</label>
                <input type="text" id="nomPlat" v-model="nomPlat" placeholder="Entrez le nom du plat" required>
            </div>

            <div class="input-group">
                <label for="prixUnitaire">Prix (Ar) :</label>
                <input type="number" id="prixUnitaire" v-model="prixUnitaire" placeholder="Entrez le prix" min="0" required>
            </div>

            <div class="input-group">
                <label for="tempsCuisson">Temps de cuisson :</label>
                <input type="time" id="tempsCuisson" v-model="tempsCuisson" required>
            </div>

            <button type="submit" class="submit-button">Insérer</button>
        </form>
    </div>
</template>

<script>
import { postData } from '../utils/api';

export default {
    data() {
        return {
            nomPlat: '',
            prixUnitaire: '',
            tempsCuisson: '',
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
            } catch (error) {
                console.error("Erreur lors de l'insertion des données :", error);
            }
        }
    },
    mounted() {
        console.log("Composant monté !");
    }
};
</script>

<style scoped>
.container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background: white;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
}

h1 {
    font-size: 1.8rem;
    margin-bottom: 20px;
}

.input-group {
    margin-bottom: 15px;
    text-align: left;
}

label {
    font-size: 1rem;
    color: #333;
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.submit-button {
    width: 100%;
    padding: 10px;
    font-size: 1.1rem;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.submit-button:hover {
    background-color: #218838;
}
</style>
