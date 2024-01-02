import axios from "axios";

const instance = axios.create({
    headers: {
        'Content-Type' : 'application/json',
        Accept : 'application/json',
        'X-Naver-Client-Id' : process.env.REACT_APP_CLIENT_ID,
        'X-Naver-Client-Secret': process.env.REACT_APP_CLIENT_SECRET,
    }
})

export default instance;