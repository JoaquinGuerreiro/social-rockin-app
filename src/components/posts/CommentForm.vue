<script>
import { saveComment } from '../../services/comments';

export default {
    name: 'CommentForm',
    props: {
        postId: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            commentText: '',
        };
    },
    methods: {
        async handleSubmit() {
            const newComment = {
                userId: this.$root.loggedUser.email,
                text: this.commentText,
                createdAt: new Date(),
            };
            await saveComment(this.postId, newComment);
            await this.$emit('comment-added', this.postId, newComment);
            this.commentText = ''; 
        },
    },
};
</script>

<template>
    <form @submit.prevent="handleSubmit">
        <input class="p-1" v-model="commentText" placeholder="Comenta aquí" required />
        <button type="submit" class="ml-4 transition text-red-700 font-medium hover:text-red-500">Comentar</button>
    </form>
</template>