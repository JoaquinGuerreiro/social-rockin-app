<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import SkeletonLoader from '../components/SkeletonLoader.vue';
import { subscribeToAuth } from '../services/auth';
import { subscribeToUserPosts } from '../services/posts';


let unsubscribeFromAuth = () => {};
let unsubscribeFromPosts = () => {};


export default {
    name: 'MyProfile',
    components: { BaseHeading1, SkeletonLoader, },
    data() {
        return {
            loggedUser: {
                id: null,
                email: null,
                displayName: null,
                bio: null,
                band: null,
                fullProfileLoaded: false,
            },
            userPosts: [],
            postsLoaded: false,
        }
    },
    mounted() {
        unsubscribeFromAuth = subscribeToAuth(newUserData => {
            this.loggedUser = newUserData;

            if (newUserData.id) {
                unsubscribeFromPosts = subscribeToUserPosts(newUserData.email, posts => {
                    this.userPosts = posts;
                    this.postsLoaded = true;
                });
            }
        });
    },
    unmounted() {
        unsubscribeFromAuth();
        unsubscribeFromPosts();

    },
}
</script>

<template>
    <div class="flex items-end gap-4">
        <BaseHeading1>Mi Perfil</BaseHeading1>
        <router-link
            class="mb-4 text-blue-700 underline"
            to="/mi-perfil/editar"
        >Editar</router-link>
    </div>
    
    <div v-if="$route.query.success" class="mb-4 mt-4">
      <span class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">¡Actualizaste tu perfil con éxito!</span>
    </div>

    <div class="mb-4">
        <p v-if="loggedUser.fullProfileLoaded">{{ loggedUser.bio || 'Acá va mi biografía...' }}</p>
        <SkeletonLoader class="w-96 h-5" v-else />
    </div>

    <ul>
        <li>
            <span class="font-bold">Email</span>
            <span class="mb-3 block">{{ loggedUser.email }}</span>
        </li> 
        
        <li>
            <span class="font-bold">Nombre de Usuario</span> 
            <span class="mb-3 block">
            <span v-if="loggedUser.fullProfileLoaded">{{ loggedUser.displayName || 'No especfiicado...' }}</span>
            <SkeletonLoader class="w-96 h-5" v-else /></span> 
        </li>
        
        <li>
            <span class="font-bold">Banda preferida</span>
            <span class="mb-3 block">
            <span v-if="loggedUser.fullProfileLoaded">{{ loggedUser.band || 'No especificada...' }}</span>
            <SkeletonLoader class="w-96 h-5" v-else /></span>
        </li>
    </ul>


    <div>
        <h2 class="text-lg font-semibold mt-6">Mis Publicaciones</h2>

        <div v-if="!postsLoaded">
            <SkeletonLoader class="w-full h-6 mb-2" />
            <SkeletonLoader class="w-full h-6 mb-2" />
            <SkeletonLoader class="w-full h-6 mb-2" />
        </div>

        <div v-else-if="userPosts.length === 0">No tienes publicaciones.</div>

        <div v-else>
        <div v-for="post in userPosts" :key="post.id" class="mt-4 border p-4 rounded">
            <h3 class="text-sm text-slate-600 font-semibold">
                {{ post.email }}
                <span class="text-xs text-gray-500">{{ post.createdAt.toDate().toLocaleString() }}</span>
            </h3>
            <p class="text-xl font-medium mb-2">{{ post.text }}</p>
            <img class="max-w-80" v-if="post.imageUrl" :src="post.imageUrl" alt="Imagen posteada" />
        </div>
        </div>
    </div>
</template>