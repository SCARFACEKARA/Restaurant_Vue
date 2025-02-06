import { createRouter, createWebHistory } from 'vue-router';
import Connexion from '../components/Connexion.vue';
import Inscription from '../components/Inscription.vue';
import AdminPage from '../components/AdminPage.vue';
import Stock from '../components/Stock.vue';
import insertion from '../components/insertion.vue';
import InsertPlat from '../components/InsertPlat.vue';
import InsertIngredient from '../components/InsertIngredient.vue';
import InsertIngredientPlat from '../components/InsertIngredientPlat.vue';

const routes = [
    {
        path: '/',
        name: 'Connexion',
        component: Connexion
    },
    {
        path: '/inscription',
        name: 'Inscription',
        component: Inscription
    },
    {
        path: '/admin',
        name: 'AdminPage',
        component: AdminPage,
        meta: { requiresAuth: true } // Ajout d'une meta-information pour protéger la route
    },
    {
        path: '/stock',
        name: 'Stock',
        component: Stock,
        meta: { requiresAuth: true }
    },
    {
        path: '/insertion',
        name: 'insertion',
        component: insertion,
        meta: { requiresAuth: true }
    },
    {
        path: '/InsertPlat',
        name: 'InsertPlat',
        component: InsertPlat,
        meta: { requiresAuth: true }
    },
    {
        path: '/InsertIngredient',
        name: 'InsertIngredient',
        component: InsertIngredient,
        meta: { requiresAuth: true }
    },
    {
        path: '/InsertIngredientPlat',
        name: 'InsertIngredientPlat',
        component: InsertIngredientPlat,
        meta: { requiresAuth: true }
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

// Protection des routes
router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token'); // Vérifie si un token est présent dans le localStorage

    if (to.meta.requiresAuth && !isAuthenticated) {
        next({ name: 'Connexion' }); // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    } else {
        next(); // Continue la navigation
    }
});

export default router;