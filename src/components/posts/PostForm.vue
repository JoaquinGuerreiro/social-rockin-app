<script>
import BaseButton from '../BaseButton.vue';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../services/firebase';

export default {
    name: 'PostForm',
    components: { BaseButton },
    data() {
        return {
            text: '',
            imageUrl: '',
            imageFile: null, 
        };
    },
    methods: {
        async handleSubmit() {
            if (this.imageFile) {
                try {
                    // Uso de Firebase Storage para el manejo de imágenes o multimedia
                    const storageRef = ref(storage, `posts/${Date.now()}-${this.imageFile.name}`);
                    
                    const snapshot = await uploadBytes(storageRef, this.imageFile);

                    this.imageUrl = await getDownloadURL(snapshot.ref);
                } catch (error) {
                    console.error("Error al subir la imagen: ", error);
                    return; 
                }
            }

            // Se dan los datos del usuario que crea el post
            const newPost = {
                userId: this.$root.loggedUser.id,  
                email: this.$root.loggedUser.email, 
                text: this.text,
                imageUrl: this.imageUrl, 
                createdAt: new Date(),
            };
            this.$emit('post-added', newPost); 
            this.text = '';
            this.imageFile = null;
        },

        handleImageUpload(event) {
            const file = event.target.files[0];
            this.imageFile = file; 
        },
    },
};
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input class="w-60 mr-4 bg-slate-100 p-2 rounded-md" v-model="text" placeholder="Escribe tu publicación" required />
        <input class="bg-red-100 mr-4 rounde" type="file" @change="handleImageUpload" />
        <BaseButton>
            <span>Publicar</span> 
        </BaseButton>
    </form>
</template>
