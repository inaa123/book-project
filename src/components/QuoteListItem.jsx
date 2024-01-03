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
            <p>{post.title}</p>
        </QuoteItem>
    )
}

export default QuoteListItem

const QuoteItem = styled.div`
    
`
