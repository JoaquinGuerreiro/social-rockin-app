<script>
import BaseButton from '../components/BaseButton.vue';
import BaseHeading1 from '../components/BaseHeading1.vue';
import Loader from '../components/Loader.vue';
import { login } from '../services/auth';

export default {
    name: 'Login',
    components: { BaseHeading1, BaseButton, Loader },
    data() {
        return {
            user: {
                email: '',
                password: '',
            },
            loading: false,
        };
    },
    methods: {
        async handleSubmit() {
            // Si ya se está ejecutando el login, entonces no hacemos nada.
            if(this.loading) return;

            this.loading = true;

            try {
                await login({
                    ...this.user,
                });
                this.$router.push('/mi-perfil');
            } catch (error) {
                console.error("[Login handleSubmit] Error al autenticar al usuario: ", error);
            }

            this.loading = false;
        }
    }
}
</script>

<template>
    <BaseHeading1>Ingresar a tu Cuenta</BaseHeading1>

    <form 
        action="#"
        @submit.prevent="handleSubmit"
    >
        <div class="mb-4">
            <label class="block mb-2" for="email">Email</label>
            <input
                type="email"
                id="email"
                class="w-full p-2 border rounded read-only:bg-gray-200"
                :readonly="loading"
                v-model="user.email"
            >
        </div>
        <div class="mb-4">
            <label class="block mb-2" for="password">Contraseña</label>
            <input
                type="password"
                id="password"
                class="w-full p-2 border rounded read-only:bg-gray-200"
                :readonly="loading"
                v-model="user.password"
            >
        </div>
        <BaseButton>
            <span v-if="!loading">
                Ingresar
            </span>
            <Loader v-else />
        </BaseButton>
    </form>
</template>