<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import SkeletonLoader from '../components/SkeletonLoader.vue';
import { getUserProfileById } from '../services/user-profiles';
import { subscribeToUserPosts } from '../services/posts';

export default {
  name: 'UserProfile',
  components: { BaseHeading1, SkeletonLoader },
  data() {
    return {
      userProfile: {
        id: null,
        displayName: null,
        email: null,
        bio: null,
        band: null,
        fullProfileLoaded: false,
      },
      userPosts: [],
      postsLoaded: false,
    };
  },
  mounted() {
    const userId = this.$route.params.id;

    // Obtener el perfil del usuario seleccionado
    getUserProfileById(userId).then(profile => {
      this.userProfile = {
        ...profile,
        fullProfileLoaded: true,
      };

      // Obtener las publicaciones del usuario seleccionado
      subscribeToUserPosts(profile.email, posts => {
        this.userPosts = posts;
        this.postsLoaded = true;
      });
    });
  },
};
</script>

<template>
  <div>
    <BaseHeading1>{{ userProfile.displayName }}</BaseHeading1>

    <p v-if="userProfile.fullProfileLoaded" class="mb-4">{{ userProfile.bio || 'Biografía no disponible...' }}</p>
    <SkeletonLoader class="w-96 h-5" v-else />

    <p v-if="userProfile.fullProfileLoaded">Banda preferida:  <strong>{{ userProfile.band || 'Banda preferida no especificada...' }}</strong></p>
    <SkeletonLoader class="w-96 h-5" v-else />

    <div>
      <h2 class="text-lg font-semibold mt-12">Publicaciones de {{ userProfile.displayName }}</h2>

      <div v-if="!postsLoaded">
        <SkeletonLoader class="w-full h-6 mb-2" />
        <SkeletonLoader class="w-full h-6 mb-2" />
        <SkeletonLoader class="w-full h-6 mb-2" />
      </div>

      <div v-else-if="userPosts.length === 0">Este usuario no tiene publicaciones.</div>

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
  </div>
</template>

