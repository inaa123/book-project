import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

function ReviewListItem({post}) {

    const navigate = useNavigate();
    const onDetail = () => {
        navigate(`/review/detail/${post.id}`, {
            state : {
                id : post.id,
                isbn : post.isbn,
                title : post.title,
                text : post.text,
                image : post.image,
                author : post.author,
                userName : post.userName,
                publisher : post.publisher,
                description : post.description,
            }
        })
    }

    return (
        <ReviewItem onClick={onDetail}>
            <div className='content'>
                <p>{post.title}</p>
                <p>{post.userName}</p>
                <p>{post.text}</p>
            </div>
        </ReviewItem>
    )
}

export default ReviewListItem

const ReviewItem = styled.div`
    display: block;
    border : solid 1px rgba(0,0,0,0.5);
    border-radius: 15%;
    width : 300px;
    height: 300px;
    padding: 20px;
    justify-content: center;
    flex-wrap: wrap;
    flex-shrink: 0;
    flex-basis: 30%;
    
`

