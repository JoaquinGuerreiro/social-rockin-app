<script>
export default {
    name: 'CommentList',
    props: {
        comments: {
            type: Array,
            required: true,
        }
    },
};
</script>

<template>
    <div>
        <div v-for="comment in comments" :key="comment.id">
            <p class="mb-4 text-gray-700"><span class="font-medium">{{ comment.userId }}</span>: {{ comment.text }} 
                <span class="text-xs text-gray-500">
                    {{ comment.created_at ? new Date(comment.created_at.seconds * 1000).toLocaleString() : 'Sin fecha' }}
                </span>
            </p>
        </div>
    </div>
</template>