import { Router } from "express";
import axios from "axios";
import { config } from "../config";

export const searchBooks = Router();

function naverSearch(req, res, next) {
    const api_url =
        "https://openapi.naver.com/v1/search/book.json?query=" +
        encodeURI(req.query.query);
    axios
        .get(api_url, {
            headers: {
                'X-Naver-Client-Id': process.env.REACT_APP_NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': process.env.REACT_APP_NAVER_SECRET_KEY,
            },
        })
        .then((data) => {
            res.send(data.data.items);
            
        })
        .catch((err) => next(err));
}

searchBooks.get("/", naverSearch);