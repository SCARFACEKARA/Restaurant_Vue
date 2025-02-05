<template>
    <h1>Bonjour Anthony</h1>
</template>

<script>
import { getData, postData ,deleteData, putData} from '../utils/api';

export default {
    async mounted() {
        await this.test();
    },
    methods: {
        async test() {
            try {
                // const data = await fetchData("users/all");
                const json = {
                    "email":"adala@gmail.com",
                    "mdp":"adala",
                    "role":"CLIENT"
                };
                const data = await putData("users/edit/2",json);
                console.log(data);
            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        }
    }
};
</script>
