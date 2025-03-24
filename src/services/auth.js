import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth } from "./firebase";
import { createUserProfile, editUserProfile, getUserProfileById } from "./user-profiles";

let userData = {
    id: null,
    email: null,
    displayName: null,
    bio: null,
    band: null,
    fullProfileLoaded: false,
}

// Acá vamos a guardar la lista de callbacks para ser notificados de los cambios en userData.
let observers = [];

onAuthStateChanged(auth, user => {
    if(user) {
        updateUserData({
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
        });

        // Traemos el resto de los datos de Firestore para sumarlo al perfil.
        getUserProfileById(userData.id).then(fullProfile => {
            updateUserData({
                bio: fullProfile.bio,
                band: fullProfile.band,
                fullProfileLoaded: true,
            });
        });
    } else {
        updateUserData({
            id: null,
            email: null,
            displayName: null,
            bio: null,
            band: null,
            fullProfileLoaded: false,
        });
    }
});


/**
 * Registra un nuevo usuario.
 * 
 * @param {{email: string, password: string}} credentials
 * @returns {Promise<void>}
 */
export async function register({ email, password }) {
    try {
        // crear el documento en la collection de "user-profiles" de Firestore.
        const credentials = await createUserWithEmailAndPassword(auth, email, password);

        // Creamos el perfil en Firestore.
        await createUserProfile(credentials.user.uid, { email });
    } catch (error) {
        console.error("[auth.js register] Error al tratar de registrar el usuario: ", error);
        throw error;
    }
}


/**
 * Loguea a un usuario existente.
 * 
 * @param {{email: string, password: string}} credentials 
 * @returns {Promise<void>}
 */
export async function login( { email, password } ) {
    try {
        await signInWithEmailAndPassword(auth, email, password);

        console.log("Usuario autenticado con éxito.");
    } catch (error) {
        console.error("[auth.js login] Error al autenticar: ", error);
        throw error;
    }
}


/**
 * Modifica los valores del usuario actualmente autenticado.
 * 
 * @param {{displayName: string, bio: string, band: string}} data
 * @returns {Promise<void>}
 */
export async function editMyProfile({ displayName, bio, band }) {
    try {
        // Empezamos por actualizar el usuario en Firebase Authentication.
        const promiseAuth = updateProfile(auth.currentUser, { displayName });

        const promiseStore = editUserProfile(userData.id, { displayName, bio, band });

        await Promise.all([promiseAuth, promiseStore]);
        // Actualizamos los datos de userData.
        updateUserData({
            ...userData,
            displayName,
            bio,
            band,
        });
    } catch (error) {
        console.error('[auth.js editMyProfile] Error al editar el perfil: ', error);
    }
}


/**
 * Cierra la sesión del usuario autenticado.
 * 
 * @returns {Promise<void>}
 */
export async function logout() {
    return signOut(auth);
}


/**
 * Suscribe un observer para ser notificado de los cambios del estado de autenticación.
 * Retorna una función que cancela la suscripción.
 * 
 * @param {Function} callback 
 * @returns {Function}
 */
export function subscribeToAuth(callback) {
    observers.push(callback);

    notify(callback);

    return () => {
        observers = observers.filter(obs => obs !== callback)
    };
}


/**
 * Notifica a un observer del estado actual de autenticación,.
 * 
 * @param {Function} callback 
 */
function notify(callback) {
    // Ejecutamos el callback con una copia de los datos de autenticación.
    callback({...userData});
}

function notifyAll() {
    observers.forEach(callback => notify(callback));
}


/**
 * Actualiza los datos del usuario y notifica a los observers.
 * 
 * @param {{}} newData 
 */
function updateUserData(newData) {
    userData = {
        ...userData,
        ...newData,
    }
    notifyAll();
}