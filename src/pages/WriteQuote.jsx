import React, { useState } from 'react'
import { addQuote } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

function WriteQuote() {
    const [bookTitle, setPhraseBookTitle] = useState('');
    const [bookWriter, setPhraseBookWriter] = useState('');
    const [bookText, setPhraseBookText] = useState('');

    const navigate = useNavigate();

    const onSubmit = async (e) => {
        e.preventDefault();
        try{
            // await addQuote(email, bookTitle, bookWriter, bookText);
            await addQuote(bookTitle, bookWriter, bookText);
            navigate('/phrase')
        }catch(error){
            console.log(error)
        }
    }


    return (
        <div className='container'>
            <form onSubmit={onSubmit}>
                <div className='write-box'>
                    <label>제목</label>
                    <input type='text'/>
                    <label>저자</label>
                    <input type='text'/>
                </div>
                <div className='write-box'>
                    <label>내용</label>
                    <textarea/>
                </div>
                <button type='submit' className='submit-btn'>작성하기</button>
            </form>
        </div>
    )
}

export default WriteQuote
