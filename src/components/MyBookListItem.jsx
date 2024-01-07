import React from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components';

function MyBookListItem({post, state}) {
    const navigate = useNavigate();

    const moveDetailBook = () => {
        // console.log(post.state) //done, reading
        navigate(`/book/detail/${post.isbn}`, {
            state : {
                isbn : post.isbn,
                title : post.title,
                image : post.image,
                option : post.option
            }
        })
    }

    return (
        <>
            {(post.state === state) && (
                <MyBookItem onClick={moveDetailBook}>
                <img src={post.image}/>
                <p>{post.title}</p>
                </MyBookItem>
            )}
        </>
        
    )
}

export default MyBookListItem

const MyBookItem = styled.li`
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
    img{
        width : 100px;
    }
`