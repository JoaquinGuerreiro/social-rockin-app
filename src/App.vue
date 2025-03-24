<script>
import Posts from './pages/Posts.vue';
import { logout, subscribeToAuth } from './services/auth';
import Loader from './components/Loader.vue';

export default {
    name: 'App',
    components: { Posts, Loader },
    data() {
        return {
            loggedUser: {
                id: null,
                email: null,
            },
            isLoading: true // Mientras cargan los datos del usuario
        };
    },
    methods: {
        handleLogout() {
            logout();
            // Redirigimos al usuario al login.
            this.$router.push('/iniciar-sesion');
        }
    },
    mounted() {
        subscribeToAuth(newUserData => {
            this.loggedUser = newUserData;
            this.isLoading = false; // Deja de cargar cuando tenemos los datos
        });
    },
}
</script>

<template>
    <header v-if="!isLoading">
        <nav class="flex justify-between items-center p-4 bg-red-950 text-red-200 font-medium">
            <router-link 
                :to="{name: 'posts'}" 
                class="text-xl font-bold hover:text-red-400 transition"
            >Social Rockin'</router-link>

            <ul class="flex gap-2">
                <template v-if="loggedUser.id !== null">
                    <li><router-link 
                        class="block py-2 px-4 hover:text-red-400 transition"
                        :to="{name: 'posts'}"
                    >Posteos</router-link></li>
                    <li><router-link 
                        class="block py-2 px-4 hover:text-red-400 transition"
                        to="/mi-perfil"
                    >Mi Perfil</router-link></li>
                    <li>
                        <form
                            action="#"
                            @submit.prevent="handleLogout"
                        >
                            <button
                                type="submit"
                                class="block py-2 px-4 hover:text-red-400 transition"
                            >{{ loggedUser.email }} (Cerrar Sesión)</button>
                        </form>
                    </li>
                </template>
                <template v-else>
                    <li><router-link 
                        class="block py-2 px-4"
                        to="/registro"
                    >Registrarse</router-link></li>
                    <li><router-link 
                        class="block py-2 px-4"
                        to="/iniciar-sesion"
                    >Iniciar sesión</router-link></li>
                </template>
            </ul>
        </nav>
    </header>
    
    <main class="container p-4 mx-auto">
        <Loader v-if="isLoading" />
        <router-view v-else />
    </main>

    <footer class="flex justify-center items-center h-25 mt-12 bg-neutral-950 text-red-200 font-normal">
        <p>Copyright &copy; Social Rockin' 2024</p>
    </footer>
</template>
