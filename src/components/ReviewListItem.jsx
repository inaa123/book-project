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
                <p>{post.userName}</p>
                <p>{post.text}</p>
                <p>{post.title}</p>
            </div>
        </ReviewItem>
    )
}

export default ReviewListItem

const ReviewItem = styled.div`
    display: flex;
    border : solid 1px rgba(0,0,0,0.5);
    border-radius: 20%;
    width: 200px;
    height: 250px;
    flex-shrink: 0;
    flex-basis: 25%;
    .content{
        padding : 30px;
    }
    
`

