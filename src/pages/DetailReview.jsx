import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { addComments, getComments, onUserState } from '../api/firebase';
import { useQuery } from 'react-query';

function DetailReview() {
    const state = useLocation().state;
    const {id, title, text, userName} = state;
    const [user, setUser] = useState('');
    const [comment, setComment] = useState();

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

    const {data : comments} = useQuery({
        queryKey : [`/review/${id}/comments`],
        queryFn : () => getComments(id)
    })

    return (
        <div className='container'>
            <div >
                <p>제목 : {title}</p>
                <p>내용 : {text}</p>
                <p>작성자 : {userName}</p>
            </div>
            <div>
                <strong>댓글</strong><br/>
            </div>
            <div className='commentWrap'>
                <form onSubmit={onSubmitEvent}>
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
                        <button type='submit'>작성하기</button>
                        </>
                    )}
                    
                </form>

                <ul>
                    {comments && comments.map(el=>(
                            <li>
                                <div>
                                    {el.userName} : {el.text}
                                </div>
                            </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default DetailReview
