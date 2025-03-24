import { addDoc, collection, getDocs, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Guarda una nueva publicación en Firestore.
 * 
 * @param {{userId: string, text: string, imageUrl: string}} newPost 
 * @returns {Promise<void>}
 */
export async function savePost(newPost) {
    const postsRef = collection(db, 'posts');
    await addDoc(postsRef, {
        ...newPost,
        created_at: serverTimestamp(),
    });
}


/**
 * Obtiene todas las publicaciones.
 * 
 * @returns {Promise<Array>}
 */
export async function getPosts() {
    const postsRef = collection(db, 'posts');
    const snapshot = await getDocs(postsRef);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}


/**
 * Suscribe a los cambios en las publicaciones.
 * 
 * @param {(posts: Array) => void} callback 
 */
export function subscribeToPosts(callback) {
    const postsRef = collection(db, 'posts');
    const postsQuery = query(postsRef, orderBy('created_at', 'desc'));
    onSnapshot(postsQuery, snapshot => {
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(posts);
    });
}


/**
 * Suscribe a los cambios en las publicaciones de un usuario.
 * 
 * @param {string} email 
 * @param {(posts: Array) => void} callback 
 */
export function subscribeToUserPosts(email, callback) {
    const postsRef = collection(db, 'posts');
    const q = query(
        postsRef, 
        where('email', '==', email), 
        orderBy('created_at', 'desc')
    );
    
    return onSnapshot(q, (snapshot) => {
        const posts = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(posts);
    });
}


