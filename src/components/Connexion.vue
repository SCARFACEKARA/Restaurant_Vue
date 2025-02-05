<template>
    <div>
        <h1>Bonjour Anthony</h1>
        <h2>{{ this.email }} {{ this.password }}</h2>
        <form @submit.prevent="handleSubmit" id="inscription">
            <label for="email">Email :</label>
            <input type="email" id="email" v-model="email" required>

            <label for="password">Mot de passe :</label>
            <input type="password" id="password" v-model="password" required>

            <button type="submit">Se connecter</button>
        </form>
    </div>
</template>

<script>
import { postData } from '../utils/api';

export default {
    data() {
        return {
            email: '',
            password: '',
        };
    },
    methods: {
    async handleSubmit() {
        try {
            const payload = {
                "email": this.email,
                "mdp": this.password
            };
            console.log("Données envoyées :", payload);
            const response = await postData("users/login", payload);
            console.log("Réponse du serveur :", response);
        } catch (error) {
            console.error("Erreur lors de la connexion :", error);
        }
    }
},
    async mounted() {
        console.log("Composant monté !");
    }
};
</script>

