import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import {get, getDatabase, ref, set} from 'firebase/database';
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
//addQuote(user, title, writer, text) isbn:책id
export async function addQuote(user, userName, isbn, title, writer, text){
    const id = uuid(); //게시글id, npm install uuid , yarn add uuid
    const postData = {
        id,
        isbn,
        user,
        userName,
        title,
        writer,
        text
    }
    return set(ref(database, `/quote/${id}`), postData)
}

//게시글 가져오기
export async function getQuotes(){
    return get(ref(database, 'quote'))
    .then((snapshot) => {
        if(snapshot.exists()){
            return Object.values(snapshot.val());
        }
        return[]
    })
}

//addMyBook
export async function addBooks(isbn, image, title, state, user){
    return set(ref(database, `myBooks/${user}/${isbn}`), {
        isbn,
        image,
        title,
        state,
        user
    })
}

//myBook출력하기
export async function getAllBooks(userId){
    return get(ref(database, `myBooks/${userId}`))
    .then((snapshot) => {
        if(snapshot.exists()){
            return Object.values(snapshot.val());
        }
        return[]
    })
}

//state option
export async function getStateOptionBook(option, userId){

    return get(ref(database, `myBooks/${userId}`)).then((snapshot) => {
        if(snapshot.exists()){
            const allBooks = Object.values(snapshot.val());
            console.log(allBooks)
            const filterBooks = allBooks.filter((book) => book.option === option);
            return filterBooks
        }
        return [];
    })
}