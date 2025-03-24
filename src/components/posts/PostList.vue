<script>
import CommentList from './CommentList.vue';
import CommentForm from './CommentForm.vue';
import { subscribeToPosts } from '../../services/posts';
import { subscribeToComments } from '../../services/comments';

export default {
    name: 'PostList',
    components: { CommentList, CommentForm },
    data() {
        return {
            posts: [],
        };
    },
    methods: {
        onCommentAdded(postId, newComment) {
            const post = this.posts.find(p => p.id === postId);
            if (post) {
                post.comments.push(newComment);
            }
        },
    },
    mounted() {
        subscribeToPosts(posts => {
            this.posts = posts.map(post => ({
                ...post,
                comments: post.comments || [],
                commentsSubscribed: false,
            }));

            this.posts.forEach(post => {
                if (!post.commentsSubscribed) {
                    subscribeToComments(post.id, comments => {
                        post.comments = comments;
                    });
                    post.commentsSubscribed = true;
                }
            });
        });
    },
};
</script>

<template>
<div class="lg:flex lg:gap-4 lg:items-center ">
    <div>
        <div v-for="post in posts" :key="post.id" class="mt-20">
            <h2 class="text-sm text-red-900 font-semibold">

                <router-link class="hover:text-red-500 transition" :to="{ name: 'user-profile', params: { id: post.userId } }"> 
                    {{ post.email }}
                </router-link>

                <span class="text-xs text-gray-500">
                    <span v-if="post.created_at">
                        | {{ post.created_at.toDate().toLocaleString() }}
                    </span>
                    <span v-else>
                        Fecha no disponible
                    </span>
                </span>
            </h2>
            
            <p class="text-xl font-medium mb-4">{{ post.text }}</p>
            <img class="max-w-80 mb-4" v-if="post.imageUrl" :src="post.imageUrl" alt="Imagen posteada" />

            
            <CommentList :comments="post.comments" />
            <CommentForm :postId="post.id" @comment-added="onCommentAdded" />
        </div>
    </div>
    <div class="mt-16 lg:mt-0 text-center">
        <img src="/social-rockin.png" alt="Logo de Social Rockin'" class="lg:w-96 w-48 m-auto">
    </div>
</div>
</template>