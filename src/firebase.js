import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";




const firebaseConfig = {
  apiKey: "AIzaSyBBKGcxRloeCy-DpR_XX50PFOYQfkP3HuI",
  authDomain: "netflix-clone-1b6f0.firebaseapp.com",
  projectId: "netflix-clone-1b6f0",
  storageBucket: "netflix-clone-1b6f0.appspot.com",
  messagingSenderId: "561735112825",
  appId: "1:561735112825:web:b86d23e6e4464e8a2d5ca8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db, "user"),{
            uid: user.uid,
            name,
            authProvider:"local",
            email,
        })
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
        
    }

}

const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
        
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
        
        
    }

}

const logout = ()=>{
    signOut(auth);

}

export {auth,db,login,signup,logout};