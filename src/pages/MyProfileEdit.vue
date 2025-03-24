<script>
import BaseButton from '../components/BaseButton.vue';
import BaseHeading1 from '../components/BaseHeading1.vue';
import { editMyProfile, subscribeToAuth } from '../services/auth';
import Loader from '../components/Loader.vue';

let unsubscribeFromAuth = () => {};

export default {
    name: 'MyProfileEdit',
    components: { BaseHeading1, BaseButton, Loader, },
    data() {
        return {
            editData: {
                displayName: '',
                bio: '',
                band: '',
            },
            editing: false,
        }
    },
    methods: {
        async handleSubmit() {
            if(this.editing) return;

            this.editing = true;

            try {
                await editMyProfile({...this.editData});
                // Redireccionamos a la vista del perfil con succes true para dar feedback al usuario
                this.$router.push({ path: '/mi-perfil', query: { success: true } });


            } catch (error) {
                console.error('[MyProfileEdit handleSubmit] Error al editar el perfil: ', error);
            }

            this.editing = false;
        }
    },
    mounted() {
        unsubscribeFromAuth = subscribeToAuth(userData => this.editData = {
            displayName: userData.displayName || '',
            bio: userData.bio || '',
            band: userData.band || '',
        });
    },
    unmounted() {
        unsubscribeFromAuth();
    },
}
</script>

<template>
    <BaseHeading1>Editar mi Perfil</BaseHeading1>

    <form 
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <label class="block mb-2" for="bio">Biografía</label>
            <textarea
                id="bio"
                class="w-full min-h-20 p-2 border rounded read-only:bg-gray-200"
                :readonly="editing"
                v-model="editData.bio"
            ></textarea>
        </div>
        <div class="mb-4">
            <label class="block mb-2" for="displayName">Nombre de Usuario</label>
            <input
                type="text"
                id="displayName"
                class="w-full p-2 border rounded read-only:bg-gray-200"
                :readonly="editing"
                v-model="editData.displayName"
            >
        </div>
        <div class="mb-4">
            <label class="block mb-2" for="band">Banda preferida</label>
            <input
                type="text"
                id="band"
                class="w-full p-2 border rounded read-only:bg-gray-200"
                :readonly="editing"
                v-model="editData.band"
            >
        </div>
        <BaseButton>
            <span v-if="!editing">Actualizar mi Perfil</span>
            <Loader v-else />
        </BaseButton>
    </form>
</template>