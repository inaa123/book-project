import React from 'react'
import { useNavigate } from 'react-router-dom'

function DetailBookEvent({book}) {

    const navigate = useNavigate();
    const detailNavigate = () => {
        navigate(`/book/detail/${book.isbn}`, {
            state : {
                isbn : book.isbn,
                title : book.tite,
                image : book.image,
                author : book.author,
                publisher : book.publisher,
            }
        })
    }

    return (
        <div onClick={detailNavigate}>
            <img src={book.image}/>
        </div>
    )
}

export default DetailBookEvent
