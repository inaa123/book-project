import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { addComments, getComments, onUserState } from '../api/firebase';
import styled from 'styled-components';

function DetailReview() {
    const state = useLocation().state;
    const {id, title, text, userName} = state;
    const [user, setUser] = useState('');
    const [comment, setComment] = useState();
    const [commentList, setCommentList] = useState([]);

    useEffect(()=>{
        onUserState((user) => {
            setUser(user)
        })
    })
    const onSubmitEvent = async (e) => {
        e.preventDefault();
        try{
            await addComments(id, user.uid, user.displayName
                , comment);
            setComment('');
        }catch(error){
            console.error(error)
        }
    }

    useEffect(()=>{
        const fetchComments = async () => {
            try {
                const comments = await getComments(id);
                setCommentList(comments);
            }catch(error){
                console.error(error)
            }
        }
        fetchComments()
    }, [commentList])
    
    return (
        <DetailReviewContainer className='container'>
            <div className='reviewTop'>
                <p className='title'>{title}</p>
                <p className='writer'>작성자 <span > {userName} </span></p>
            </div>
            <div className='reviewContent'>
                <p>{text}</p>
            </div>
            <div className='commentWrap'>
                <form onSubmit={onSubmitEvent}>
                    <div className='inputComment'>
                    {user === null ? (
                        <input
                            type='text'
                            placeholder='로그인을 해주세요'
                            disabled
                        />
                    ) : (
                        <>
                        <input
                            type='text'
                            value={comment}
                            onChange={(e) => {setComment(e.target.value)}}
                            placeholder='댓글을 작성해주세요'
                        />
                        <button type='submit'>등록</button>
                        </>
                    )}
                    </div>
                </form>
                <ul className='commentList'>
                    <li>
                        {commentList && commentList.map(el=>(  
                        <div className='commentItem'>
                            <div className='commentUser'>
                                {el.userName} 
                            </div>
                            <div className='commentText'>
                                {el.text}
                            </div>
                        </div>
                    ))}
                    </li>
                </ul>
            </div>
        </DetailReviewContainer>
    )
}

export default DetailReview

const DetailReviewContainer = styled.div`
    .reviewTop{
        padding-bottom: 30px;
        border-bottom: solid 1px rgba(0,0,0,0.3);
        .title{
            font-size: 30px;
            font-weight: bold;
            padding-bottom: 20px;
        }
        .writer{
            font-size: 18px;
            span{
                font-size: 20px;
                font-weight: 600;
                padding-left: 10px;
            }
        }
    }
    .reviewContent{
        display: flex;
        padding: 100px 50px;
        font-size: 22px;
        min-height: 80px;
    }

    .commentWrap{
        .inputComment{
            display: flex;
            justify-content: space-between;
            width: 100%;
            padding-bottom: 20px;
            input{
                padding: 10px 20px;
                width: 1000px;
                height: 30px;
                border: 1px solid rgba(0,0,0,0.4);
                border-radius: 10px;
                font-size: 16px;
            }
            
            button{
                background-color: #0c4825;
                padding: 10px;
                color: white;
                width: 80px;
                height: 50px;
                border-radius: 10px;
                margin-right: 20px;
                font-size: 16px;
            }
        }
        .commentList{
            li{
                .commentItem{
                    display: flex;
                    gap: 15px;
                    padding-left: 10px;
                    line-height: 30px;
                    .commentUser{
                        font-weight: bold;
                    }
                }
            }
        }
    }
`