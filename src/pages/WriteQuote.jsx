import React, { useState } from 'react'
import { addQuote } from '../api/firebase';
import { useLocation, useNavigate } from 'react-router-dom';

function WriteQuote() {
    const state = useLocation().state;
    const email = state;

    const [bookTitle, setBookTitle] = useState('');
    const [bookWriter, setBookWriter] = useState('');
    const [bookText, setBookText] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            // await addQuote(email, bookTitle, bookWriter, bookText);
            await addQuote(email, bookTitle, bookWriter, bookText);
            navigate('/quote')
        }catch(error){
            console.log(error)
        }
    }


    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <div className='write-box'>
                    <label>제목</label>
                    <input 
                        type='text'
                        value={bookTitle}
                        onChange={(e)=>setBookTitle(e.target.value)}
                        required
                    />
                    <label>저자</label>
                    <input 
                        type='text'
                        value={bookWriter}
                        onChange={(e)=>setBookWriter(e.target.value)}
                        required
                    />
                </div>
                <div className='write-box'>
                    <label>내용</label>
                    <textarea
                        value={bookText}
                        onChange={(e)=>setBookText(e.target.value)}
                    />
                </div>
                <button type='submit' className='submit-btn'>작성하기</button>
            </form>
        </div>
    )
}

export default WriteQuote
