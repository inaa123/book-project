import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { onUserState } from '../api/firebase';
import styled from 'styled-components';

function DetailBook() {
    const [user, setUser] = useState();
    const state = useLocation().state;
    const {isbn, image, title, author, publisher, discription} = state;
    const [books, setBooks] = useState([
        
    ]);

    const navigate = useNavigate();

    useEffect(()=>{
        onUserState((user) => {
            setUser(user)
            console.log(user)
        })
    })

    const onAddBook = () => {
        if(user){
            navigate(`/mybook/${user.uid}`)
        }
    }

    const onWriteQuote = () => {
        if(user){
            navigate(`/quote/write/${isbn}`, {
                state : {
                    title : title,
                    author : author,
                    isbn : isbn,
                }
            })
        }else{
            navigate(`/login`)
        }
        
    }
    return (
        <div className='container'>
            <DetailPage>
                <div>
                    <img src={image} alt={title}/>
                </div>
                <div>
                    <h3>{title}</h3>
                    <p>{author}</p>
                    <p>{publisher}</p>
                </div>
                <div>
                    <p>{discription}</p>
                </div>
            <button onClick={onWriteQuote}>한마디작성</button>
            <button onClick={onAddBook} >기록함추가</button>
            </DetailPage>
            
        </div>
        /* 책제목, 표지, 저자, 출판사 / 상태 : 읽는중, 읽은책 / 확인(submit) */
    )
}

export default DetailBook

const DetailPage = styled.div`
    img{
        max-width : 400px;
        width: 100%;
    }
`