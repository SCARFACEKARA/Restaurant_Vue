<template>
    <div class="container">
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

<style>
/* Global Container */
.container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Title */
h1 {
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
}

/* Form */
form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

/* Input Fields */
input[type="email"],
input[type="password"] {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 100%;
    box-sizing: border-box;
}

/* Button Styles */
button {
    background-color: #4CAF50;
    color: white;
    font-size: 16px;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
    width: 100%;
}

button:disabled {
    background-color: #ddd;
}

button:hover:not(:disabled) {
    background-color: #45a049;
}

/* Error Message */
p {
    text-align: center;
    font-size: 14px;
    color: red;
}

/* Button for Registration */
button:last-of-type {
    background-color: #28a745;
    color: white;
    margin-top: 15px;
    border: none;
    padding: 10px;
    border-radius: 4px;
    cursor: pointer;
    width: 100%;
}

button:last-of-type:hover {
    background-color: #0056b3;
}

</style>