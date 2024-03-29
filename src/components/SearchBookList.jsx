import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { onUserState } from '../api/firebase';

function SearchBookList({book}) {
    const [user, setUser] = useState();
    const [newAuthor, setNewAuthor] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        onUserState((user)=>{
            setUser(user);
            setNewAuthor(book.author.replaceAll('^', ','));
        })
    }, [])

    const detailNavigate = () => {
        navigate(`/book/detail/${book.isbn}`, {
            state : {
                isbn : book.isbn,
                title : book.title,
                image : book.image,
                author : newAuthor,
                publisher : book.publisher,
                description : book.description,
                pubdate : book.pubdate,
            }
        })
    }

    return (
        <SearchResult onClick={detailNavigate}>
            <div className='searchImg'>
                <img src={book.image}/>
            </div>
            <div className='bookWrap'>
                <h3>{book.title}</h3>
                <p>{newAuthor}</p>
                <p>{book.publisher}</p>
            </div>
        </SearchResult>
    )
}

export default SearchBookList

const SearchResult = styled.div`
    width: 100%;
    display: flex;
    gap: 60px;
    border-bottom: solid 1px rgba(0,0,0,0.1);
    padding : 20px 0px;
    .searchImg{
        img{
            width: 180px;
            height: 250px;
            padding-left: 10%;
        }
    }
    .bookWrap{
        display: flex;
        flex-direction: column;
        width: 100%;
        margin: 30px auto;
        h3{
            font-size: 24px;
            width: 100%;
            font-weight: 500;
            padding: 30px 0px;
            font-size: 26px;
        }
        p{
            padding-bottom: 15px;
            font-size: 18px;
        }
    }
    @media screen and (max-width: 768px) {
        
        .searchImg{
            img{
                width: 150px;
                height: 220px;
            }
        }
        .bookWrap{
            h3{
                font-size: 24px;
            }
            p{
                font-size: 16px;
            }
        }
    }
`

