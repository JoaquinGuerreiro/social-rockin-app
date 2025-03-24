// Servicio para manejar todo lo relativo a los perfiles de los usuarios.

import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Obtiene el perfil de usuario por su ID.
 * 
 * @param {string} id 
 * @returns {Promise<{id: string, email: string, displayName: string, bio: string, band: string}>}
 */
export async function getUserProfileById(id) {
    const profileRef = doc(db, `user-profiles/${id}`);

    const profileSnapshot = await getDoc(profileRef);

    return {
        id: profileSnapshot.id,
        email: profileSnapshot.data().email,
        displayName: profileSnapshot.data().displayName,
        bio: profileSnapshot.data().bio,
        band: profileSnapshot.data().band,
    }
}


/**
 * Crea un perfil de usuario en Firestore.
 * 
 * @param {string} id 
 * @param {{email: string}} data 
 * @returns {Promise<void>}
 */
export async function createUserProfile(id, { email }) {
    const profileRef = doc(db, `user-profiles/${id}`);

    await setDoc(profileRef, {
        email,
    });
}

/**
 * Edita los datos del perfil del usuario indicado por su id.
 * 
 * @param {string} id 
 * @param {{displayName: string, bio: string, band: string }} data
 * @returns {Promise<void>}
 */
export async function editUserProfile(id, { displayName, bio, band }) {
    const profileRef = doc(db, `user-profiles/${id}`);

    return await updateDoc(profileRef, {displayName, bio, band});
}