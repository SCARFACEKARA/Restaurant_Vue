import axios from 'axios';

const API_KEY = "AIzaSyACtOuu3hUJOd6mknO43RG7n6FIaq9cEwA";
const BASE_URL = "https://identitytoolkit.googleapis.com/v1/accounts";

// Fonction pour enregistrer les tokens dans localStorage
const saveAuthData = async (idToken, refreshToken, expiresIn) => {
  try {
    const expirationDate = new Date().getTime() + parseInt(expiresIn) * 1000; // Convertir `expiresIn` en timestamp
    localStorage.setItem('idToken', idToken);
    localStorage.setItem('refreshToken', refreshToken);
    localStorage.setItem('expirationDate', expirationDate.toString());
  } catch (error) {
    console.error("Erreur lors du stockage des tokens:", error);
  }
};

// Fonction pour récupérer les tokens stockés
export const getAuthToken = async () => {
  try {
    const idToken = localStorage.getItem('idToken');
    const expirationDate = localStorage.getItem('expirationDate');

    if (!idToken || !expirationDate) {
      return null; // Aucun token enregistré
    }

    if (new Date().getTime() > parseInt(expirationDate)) {
      console.log("Token expiré, rafraîchissement nécessaire.");
      return await refreshAuthToken();
    }

    return idToken;
  } catch (error) {
    console.error("Erreur de récupération du token:", error);
    return null;
  }
};

// Vérifier l'expiration du token
export const checkAuthToken = async () => {
    const token = localStorage.getItem('idToken');
    const expiresIn = localStorage.getItem('expirationDate');

    if (!token || !expiresIn || Date.now() >= parseInt(expiresIn)) {
        localStorage.removeItem('idToken');
        localStorage.removeItem('expirationDate');
        return false; // Token invalide
    }
    
    return true; // Token valide
};

// Inscription
export const signUp = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}:signUp?key=${API_KEY}`, {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, expiresIn } = response.data;
    await saveAuthData(idToken, refreshToken, expiresIn);

    return response.data;
  } catch (error) {
    console.error("Erreur d'inscription:", error.response?.data?.error?.message);
    return null;
  }
};

// Connexion
export const signIn = async (email, password) => {
  try {
    const response = await axios.post(`${BASE_URL}:signInWithPassword?key=${API_KEY}`, {
      email,
      password,
      returnSecureToken: true,
    });

    const { idToken, refreshToken, expiresIn } = response.data;
    await saveAuthData(idToken, refreshToken, expiresIn);

    return response.data;
  } catch (error) {
    console.error("Erreur de connexion:", error.response?.data?.error?.message);
    return null;
  }
};

// Déconnexion
export const logOut = async () => {
  try {
    localStorage.removeItem('idToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('expirationDate');
    console.log("Utilisateur déconnecté");
    return true;
  } catch (error) {
    console.error("Erreur de déconnexion:", error);
    return false;
  }
};
