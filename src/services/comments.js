import { addDoc, collection, getDocs, query, orderBy, onSnapshot, serverTimestamp} from "firebase/firestore";
import { db } from "./firebase";

/**
 * Guarda un nuevo comentario en Firestore.
 * 
 * @param {string} postId 
 * @param {{userId: string, text: string}} newComment 
 * @returns {Promise<void>}
 */
export async function saveComment(postId, newComment) {
    const commentsRef = collection(db, `posts/${postId}/comments`);
    await addDoc(commentsRef, {
        ...newComment,
        created_at: serverTimestamp(), 
    });
}


/**
 * Suscribe a los cambios en los comentarios de una publicación.
 * 
 * @param {string} postId 
 * @param {(comments: Array) => void} callback 
 */
export function subscribeToComments(postId, callback) {
    const commentsRef = collection(db, `posts/${postId}/comments`);
    const commentsQuery = query(commentsRef, orderBy('created_at', 'desc')); 
    onSnapshot(commentsQuery, snapshot => {
        const comments = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        callback(comments);
    });
}

