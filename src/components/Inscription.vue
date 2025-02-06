<template>
    <div>
        <h1>PAGE D'INSCRIPTION</h1>
        <h2>{{ this.email }}</h2>
        <form @submit.prevent="handleSubmit" id="inscription">
            <label for="email">Email :</label>
            <input type="email" id="email" v-model="email" required>

            <label for="password">Mot de passe :</label>
            <input type="password" id="password" v-model="password" required>

            <button type="submit">inserer</button>
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
                    email: this.email,
                    mdp: this.password,
                    role: "ADMIN"
                };
                const response = await postData("users/create", payload);
                console.log("Réponse du serveur :", response);
            } catch (error) {
                console.error("Erreur lors de la modification des données :", error);
            }
        }
    },
    async mounted() {
        console.log("Composant monté !");
    }
};
</script>

