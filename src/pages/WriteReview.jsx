import React, { useEffect, useState } from 'react'
import { addReview, onUserState } from '../api/firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function WriteReview() {
    const [user, setUser] = useState();
    const [bookText, setBookText] = useState('');
    let [textCount, setTextCount] = useState(0);
    const state = useLocation().state;
    const {isbn, author, title, image, date, publisher, description} =state;

    const navigate = useNavigate();

    useEffect(()=>{
        onUserState((user) => {
            setUser(user)
        })
    }, [])

    const onSubmit = async (e) => {
        e.preventDefault();
        
        try{
            await addReview(user.email, user.displayName, isbn, title, author, bookText, image, date, publisher, description);
            navigate('/review')
        }catch(error){
            console.error(error)
        }
    }

    const onChangeHandler = (e) => {
        setBookText(e.target.value);
        setTextCount(e.target.value.length);
    }


    return (
        <ReviewForm className='container'>
            <form onSubmit={onSubmit}>
                <div className='title'>
                    <h3>{title}</h3>
                </div>
                <div className='reviewText'>
                    <textarea
                        value={bookText}
                        maxLength={30}
                        onChange={onChangeHandler}
                    />
                    <p className='textNum'>
                        <span>{textCount}</span>
                        <span> / 30</span>
                    </p>
                </div>
                
                <button 
                    type='submit' 
                    className='submitBtn'>작성하기
                </button>
                
            </form>
        </ReviewForm>
    )
}

export default WriteReview

const ReviewForm = styled.div`
    form{
        padding: 50px;
        font-size: 18px;
        .reviewText{
            margin-right: 20px;
            textarea{
                resize: none;
                width: 100%;
                height: 40px;
                margin-top: 24px;
                display: block;
                padding : 20px 10px;
                font-family: Pretendard;
            }
            .textNum{
                text-align: right;
                color: #8b8b8b;
                margin-top: 10px;
            }
        }
        
        .submitBtn{
            margin-top: 20px;
            width: 100%;
            height: 56px;
            background-color: #0c4825;
            color: white;
            border-radius: 10px;
            font-size: 18px;
        }
    }
    
`