<template>
    <div>
        <h1>PAGE DE CONNEXION</h1>
        <form @submit.prevent="handleSubmit" id="inscription">
            <label for="email">Email :</label>
            <input type="email" id="email" v-model="email" required>

            <label for="password">Mot de passe :</label>
            <input type="password" id="password" v-model="password" required>

            <button type="submit" :disabled="isLoading">
                {{ isLoading ? 'Connexion en cours...' : 'Se connecter' }}
            </button>
        </form>

        <!-- Bouton pour aller à l'inscription -->
        <button @click="goToInscription">S'inscrire</button>

        <!-- Message d'erreur -->
        <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>
    </div>
</template>

<script>
import { postData } from '../utils/api';

export default {
    data() {
        return {
            email: '',
            password: '',
            errorMessage: '',
            isLoading: false // Ajout d'un indicateur de chargement
        };
    },
    methods: {
        async handleSubmit() {
            this.isLoading = true; // Active l'indicateur de chargement
            try {
                const payload = {
                    email: this.email,
                    mdp: this.password,
                    role: "ADMIN"
                };

                const response = await postData("users/login", payload);
                console.log("Réponse du serveur :", response);

                // Vérifie si la connexion est réussie et redirige vers la page Admin
                if (response.success || response.token) {
                    this.errorMessage = "Email ou mot de passe incorrect.";
                } else {
                    
                    localStorage.setItem('token', response.token); // Stocke le token dans le localStorage
                    this.$router.push({ name: 'AdminPage' }); // Redirection vers la page Admin
                }
            } catch (error) {
                console.error("Erreur lors de la connexion :", error);
                this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
            } finally {
                this.isLoading = false; // Désactive l'indicateur de chargement
            }
        },
        goToInscription() {
            this.$router.push({ name: 'Inscription' }); // Redirection vers la page d'inscription
        }
    },
    async mounted() {
        console.log("Composant monté !");
    }
};
</script>