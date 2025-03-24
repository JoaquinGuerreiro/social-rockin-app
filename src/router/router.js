import { createRouter, createWebHashHistory } from "vue-router";
import Posts from '../pages/Posts.vue';
import Register from '../pages/Register.vue';
import Login from '../pages/Login.vue';
import MyProfile from '../pages/MyProfile.vue';
import MyProfileEdit from '../pages/MyProfileEdit.vue';
import UserProfile from '../pages/UserProfile.vue';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const routes = [
    { path: '/',                    name: 'posts',              component: Posts,           meta: { requiresAuth: true },},
    { path: '/registro',            name: 'register',           component: Register, },
    { path: '/iniciar-sesion',      name: 'login',              component: Login, },
    { path: '/mi-perfil',           name: 'my-profile',         component: MyProfile,       meta: { requiresAuth: true }, },
    { path: '/mi-perfil/editar',    name: 'my-profile.edit',    component: MyProfileEdit,   meta: { requiresAuth: true }, },
    { path: '/perfil/:id',          name: 'user-profile',       component: UserProfile,     meta: { requiresAuth: true }, },
];


const router = createRouter({
    history: createWebHashHistory(),
    routes
});


// Manejamos la autenticación del usuario
router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
        // Esperamos a que Firebase devuelva el estado del usuario
        const unsubscribe = onAuthStateChanged(auth, user => {
            if (user) {
                next();
            } else {
                next({ name: 'login' });
            }
            unsubscribe();
        });
    } else {
        next();
    }
});

export default router;
