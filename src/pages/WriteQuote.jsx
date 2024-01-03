import React, { useEffect, useState } from 'react'
import { addQuote, onUserState } from '../api/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

function WriteQuote() {
    const [user, setUser] = useState();
    const [bookText, setBookText] = useState('');

    const state = useLocation().state;
    // const email = state;
    const {isbn, author, title} =state;

    const navigate = useNavigate();

    useEffect(()=>{
        onUserState((user) => {
            setUser(user)
        })
    })



    const onSubmit = async (e) => {
        e.preventDefault();
        console.log(isbn)
        try{
            // await addQuote(email, bookTitle, bookWriter, bookText);
            await addQuote(user.email, isbn, title, author, bookText);
            navigate('/quote')
        }catch(error){
            console.error(error)
        }
    }


    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <div className='write-box'>
                    <label>제목</label>
                    <p>{title}</p>
                    <label>저자</label>
                    <p>{author}</p>
                </div>
                <div className='write-box'>
                    <label>내용</label>
                    <textarea
                        value={bookText}
                        onChange={(e)=>setBookText(e.target.value)}
                    />
                </div>
                <button 
                    type='submit' 
                    className='submit-btn'>
                작성하기</button>
            </form>
        </div>
    )
}

export default WriteQuote
