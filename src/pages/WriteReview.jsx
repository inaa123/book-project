import React, { useEffect, useState } from 'react'
import { addReview, onUserState } from '../api/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function WriteReview() {
    const [user, setUser] = useState();
    const [bookText, setBookText] = useState('');

    const state = useLocation().state;
    const {isbn, author, title, image} =state;

    const navigate = useNavigate();

    useEffect(()=>{
        onUserState((user) => {
            setUser(user)
        })
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try{
            await addReview(user.email, user.displayName, isbn, title, author, bookText, image);
            navigate('/review')
        }catch(error){
            console.error(error)
        }
    }


    return (
        <ReviewForm className='container'>
            <form onSubmit={onSubmit}>
                <div className='title'>
                    <label>제목</label>
                    <p>{title}</p>
                </div>
                <div className='writeBox'>
                    <label>내용</label>
                    <textarea
                        value={bookText}
                        maxLength={30}
                        onChange={(e)=>setBookText(e.target.value)}
                    />
                </div>
                <button 
                    type='submit' 
                    className='submitBtn'>
                작성하기</button>
            </form>
        </ReviewForm>
    )
}

export default WriteReview

const ReviewForm = styled.div`
    form{
        display: flex;
        flex-direction: column;
        gap: 30px;
        padding: 100px;
        font-size: 20px;

        .title{
        display: flex;
        gap: 20px;
        }
        .writeBox{
            display: flex;
            gap: 30px;
            textarea{
                width: 500px;
                height: 80px;
            }
            
        }
        .submitBtn{
            display: flex;
            justify-content: center;
            width: 80px;
            padding: 10px;
            background-color: #0c4825;
            color: white;
            border-radius: 10px;
        }
    }
    
`