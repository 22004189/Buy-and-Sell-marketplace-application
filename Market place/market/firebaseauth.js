// Import the functions you need from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, EmailAuthProvider, linkWithCredential, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp, doc, setDoc, getDocs, query, where, getDoc, updateDoc, deleteDoc, orderBy, arrayUnion } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBD9AVNrwPD3rtrf6ZKcJExphs2nru0o9w",
    authDomain: "lab-connect-ab221.firebaseapp.com",
    databaseURL: "https://lab-connect-ab221-default-rtdb.firebaseio.com",
    projectId: "lab-connect-ab221",
    storageBucket: "lab-connect-ab221.appspot.com",
    messagingSenderId: "676025588500",
    appId: "1:676025588500:web:1a7ce186c527f728e58001"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);

async function saveData(collectionName, data) {
    try {
        const ref = await addDoc(collection(db, collectionName), {
            ...data,
            createdAt: serverTimestamp()
        });
        console.log('Saved data to', collectionName, 'id=', ref.id);
        return ref.id;
    } catch (err) {
        console.error('Error saving data:', err);
        throw err;
    }
}

async function saveUserProfile(user, extra = {}) {
    try {
        if (!user || !user.uid) throw new Error('Invalid user object');
        const data = {
            email: user.email || null,
            uid: user.uid,
            ...extra
        };
        await setDoc(doc(db, 'users', user.uid), data, { merge: true });
        console.log('Saved user profile for', user.uid);
        return true;
    } catch (err) {
        console.error('Error saving user profile:', err);
        throw err;
    }
}

async function uploadProfilePhoto(file, userUid) {
    if (!file) return null;
    if (!userUid) throw new Error('Missing user UID for upload');
    try {
        const path = `users/${userUid}/profile_${Date.now()}_${file.name}`;
        const r = ref(storage, path);
        await uploadBytes(r, file);
        const url = await getDownloadURL(r);
        console.log('Uploaded profile photo for', userUid, url);
        return url;
    } catch (err) {
        console.error('Profile upload failed', err);
        throw err;
    }
}

async function uploadProductImage(file) {
    if (!file) return null;
    try {
        const path = `products/${Date.now()}_${file.name}`;
        const r = ref(storage, path);
        await uploadBytes(r, file);
        return await getDownloadURL(r);
    } catch (err) {
        console.error('Product upload failed', err);
        throw err;
    }
}

function serializeForm(form) {
    const result = {};
    const fd = new FormData(form);
    for (const [key, value] of fd.entries()) {
        if (result[key] !== undefined) {
            if (!Array.isArray(result[key])) result[key] = [result[key]];
            result[key].push(value);
        } else {
            result[key] = value;
        }
    }
    return result;
}

function bindFormsToFirestore(collectionName = 'submissions') {
    if (typeof document === 'undefined') return;
    document.querySelectorAll('form').forEach(form => {
        if (form.__firebaseBound || form.hasAttribute('data-custom-handle')) return;
        form.__firebaseBound = true;
        form.addEventListener('submit', async (ev) => {
            ev.preventDefault();
            const data = serializeForm(form);
            try {
                await saveData(collectionName, data);
                form.reset();
                alert('Message sent successfully!');
            } catch (e) {
                console.error('Failed to save form data', e);
                alert('Something went wrong. Please try again.');
            }
        });
    });
}

if (typeof window !== 'undefined') {
    window.firebaseSaveData = saveData;
    window.firebaseBindForms = bindFormsToFirestore;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => bindFormsToFirestore());
    } else {
        bindFormsToFirestore();
    }
}

export {
    app,
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    provider,
    signInWithPopup,
    db,
    saveData,
    bindFormsToFirestore,
    doc,
    setDoc,
    collection,
    addDoc,
    getDocs,
    saveUserProfile,
    getDoc,
    storage,
    uploadProfilePhoto,
    uploadProductImage,
    updateDoc,
    deleteDoc,
    query,
    where,
    orderBy,
    arrayUnion,
    EmailAuthProvider,
    linkWithCredential,
    serverTimestamp,
    sendPasswordResetEmail
};