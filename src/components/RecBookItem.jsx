import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

function RecBookItem({post}) {
    const navigate = useNavigate();

    const moveDetailBook = () => {
        navigate(`/book/detail/${post.isbn}`, {
            state : {
                isbn : post.isbn,
                title : post.title,
                image : post.image,
                author : post.author,
                publisher : post.publisher,
                description : post.description
            }
        })
    }

    useEffect(()=>{
        console.log(post)
    })

    return (
        <BookItem onClick={moveDetailBook}>
            <img src={post.image} alt={`${post.title}`} />
            <p>{post.title}</p>
        </BookItem>
    )
}

export default RecBookItem


const BookItem = styled.div`
    
`