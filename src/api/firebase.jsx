import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile} from "firebase/auth";
import {get, getDatabase, ref, remove, set} from 'firebase/database';
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
            try{
                // callback(user);
                const updateUser = await adminUser(user);
                callback(updateUser);
            }catch(error){
                console.error(error);
            }
        }else{
            callback(null)
        }
    })
}

async function adminUser(user){
    try{
        const snapshot = await get(ref(database, 'admin'));
        if(snapshot.exists()){
            const admins = snapshot.val();
            const isAdmin = admins.includes(user.email);
            return {...user, isAdmin}
        }
        return user
    }catch(error){
        console.error(error);
    }
}

//회원가입
export async function signupEmail(email, password, name){
    try{
        const auth = getAuth();
        const userData = await createUserWithEmailAndPassword(auth, email, password);
        const user = userData.user;
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
export async function addReview(user, userName, isbn, title, writer, text, image, date){
    const id = uuid();
    const postData = {
        id,
        isbn,
        user,
        userName,
        title,
        writer,
        text,
        image,
        date
    }
    return set(ref(database, `/review/${id}`), postData)
}

//게시글 가져오기
export async function getReviews(){
    return get(ref(database, 'review'))
    .then((snapshot) => {
        if(snapshot.exists()){
            return Object.values(snapshot.val());
        }
        return[]
    })
}

//addMyBook
export async function addBooks(isbn, image, title, author, publisher, description, state, user, date){
    return set(ref(database, `myBooks/${user}/${isbn}`), {
        isbn,
        image,
        title,
        author,
        publisher,
        description,
        state,
        user,
        date,
    })
}

//myBook출력하기
export async function getAllBooks(userId){
    return get(ref(database, `myBooks/${userId}`))
    .then((snapshot) => {
        if(snapshot.exists()){
            // console.log(Object.values(snapshot.val())[0].title);
            return Object.values(snapshot.val());
        }
        return[]
    })
}

//댓글작성
export async function addComments(reviewId, user, userName, text, date){
    const commentId = uuid();
    const postData = {
        commentId,
        user,
        userName,
        text,
        date
    }
    return set(ref(database, `/review/${reviewId}/comments/${commentId}`), postData)
}

//댓글출력
export async function getComments(reviewId){
    return get(ref(database,  `/review/${reviewId}/comments`))
    .then((snapshot)=>{
        if(snapshot.exists()){
            return Object.values(snapshot.val());
        }
        return []
    })
}

// 최신도서저장 (관리자,)
export async function latestBooks(isbn, image, title, author, publisher, description, pubdate, user,  date){

    return set(ref(database, `/latestBooks/${isbn}`))
}

//추천도서저장(관리자)
export async function addRecBooks(id, isbn, image, title, author, publisher, description, pubdate, user, date){
    
    const postData = {
        id,
        isbn,
        image,
        title,
        author,
        publisher,
        description,
        pubdate,
        user,
        date
    }
    return set(ref(database, `/recBooks/${isbn}`), postData)
}

export async function getRecBooks(){
    return get(ref(database, `/recBooks`))
    .then((snapshot) => {
        if(snapshot.exists()){
            return Object.values(snapshot.val());
        }
        return []
    })
}



export async function delRecBooks(isbn){
    return remove(ref(database, `/recBooks/${isbn}`))
}