import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { onUserState } from '../api/firebase';

function SearchBookList({book}) {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(()=>{
        onUserState((user)=>{
            setUser(user);
        })
    })

    const detailNavigate = () => {
        navigate(`/book/detail/${book.isbn}`, {
            state : {
                isbn : book.isbn,
                title : book.title,
                image : book.image,
                author : book.author,
                publisher : book.publisher,
                description : book.description,
            }
        })
    }

    return (
        <SearchResult onClick={detailNavigate}>
            <img src={book.image}/>
            <div className='bookWrap'>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.publisher}</p>
            </div>
        </SearchResult>
    )
}

export default SearchBookList

const SearchResult = styled.div`
    display: flex;
    background-color: blanchedalmond;
    img{
        max-height: 400px;
        flex-shrink: 0;
        flex-basis: 30%;
        
    }
`

