import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

function DetailBookEvent({book}) {

    const navigate = useNavigate();
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
        <SearchBookList onClick={detailNavigate}>
            <img src={book.image}/>
            <div className='bookWrap'>
                <h3>{book.title}</h3>
                <p>{book.author}</p>
                <p>{book.publisher}</p>
            </div>
        </SearchBookList>
    )
}

export default DetailBookEvent

const SearchBookList = styled.div`
    display: flex;
    background-color: blanchedalmond;
    img{
        max-height: 400px;
        flex-shrink: 0;
        flex-basis: 30%;
        
    }
`
