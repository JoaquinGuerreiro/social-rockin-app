<script>
import BaseHeading1 from '../components/BaseHeading1.vue';
import PostList from '../components/posts/PostList.vue';
import PostForm from '../components/posts/PostForm.vue';
import { savePost } from '../services/posts';

export default {
    name: 'Posts',
    components: { BaseHeading1, PostList, PostForm },
    methods: {
        async addPost(newPost) {
            await savePost(newPost);
        },
    },
};
</script>

<template>
    <div>
        <BaseHeading1>Publicaciones</BaseHeading1>
        <PostForm @post-added="addPost" />
        <PostList />
    </div>
</template>