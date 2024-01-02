import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import {getDatabase, ref, set} from 'firebase/database';
import { v4 as uuid} from 'uuid';


const firebaseConfig = {
    apiKey : process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain : process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    projectId : process.env.REACT_APP_FIREBASE_PROJECT_ID,
    databaseURL : process.env.REACT_APP_FIREBASE_DB_URL,
}

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const database = getDatabase(app);

//로그인
export async function loginEmail(email, password){
    try{
        const userData = await signInWithEmailAndPassword(auth, email, password)
        return userData.user
    }catch(error){
        console.error(error);
    }
}

export async function logoutEmail() {
    try{
        await signOut(auth);
    }catch(error){
        console.error(error);
    }
}

export function onUserState(callback){
    onAuthStateChanged(auth, async(user)=> {
        if(user){
            callback(user)
            // try{
            //     callback(user)
            // }catch(error){
            //     console.error(error);
            // }
        }else{
            callback(null)
        }
    })
}

//회원가입
export async function signupEmail(email, password, name){
    try{
        const auth = getAuth();
        const userData = await createUserWithEmailAndPassword(auth, email, password);
        console.log(userData)
        const user = userData.user;
        console.log(user)
        await updateProfile(user, {
            displayName : name
        })

        await signOut(auth);

        return {success : true}
    }catch(error){
        return {error : error.code}
    }
    
}

//게시글 저장
//addQuote(user, title, writer, text)
export async function addQuote(user, title, writer, text){
    const id = uuid(); //npm install uuid , yarn add uuid
    const postData = {
        id,
        user,
        title,
        writer,
        text
    }
    return set(ref(database, `/quote/${id}`), postData)
}