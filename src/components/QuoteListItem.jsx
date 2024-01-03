import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

function QuoteListItem({post}) {

    const navigate = useNavigate();
    const onDetail = () => {
        navigate(`/book/detail/${post.isbn}`, {
            state : {
                isbn : post.isbn,
                title : post.title,
                image : post.image,
                author : post.author,
                publisher : post.publisher,
                description : post.description,
            }
        })
    }

    return (
        <QuoteItem onClick={onDetail}>
            <div className='content'>
                <p>{post.title}</p>
                <p>{post.userName}</p>
                <p>{post.text}</p>
            </div>
        </QuoteItem>
    )
}

export default QuoteListItem

const QuoteItem = styled.div`
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
