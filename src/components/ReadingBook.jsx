import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import MyBookListItem from '../components/MyBookListItem';
import { getAllBooks, onUserState } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

function ReadingBook() {
    const [user,setUser] = useState('');
    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        onUserState(setUser);
        if(!user){
            navigate('/login')
        }
    }, [])

    useEffect(()=>{
        const fetchReadingBook = async () => {
            try{
                const books = await getAllBooks(user.uid);
                // console.log(books);
                const filterBooks = books.filter((book,)=>book.state === 'reading');
                setBookList(filterBooks);
            }catch(error){
                console.error(error);
            }
        }
        if(user){
            fetchReadingBook()
        }
    },[user.uid])

    const newBookList = () => {
        const result = [];
        for(let i = 0; i < 4; i++){
            result.push(<MyBookListItem post={bookList[i]} state='reading' className='bookItem'/>)
        }
        return result;
    }

    return (
        <ReadingBookContainer>
            <div className='container'>
                <div className='readingBookWrap'>
                    <div className='button'>
                        <h3>현재 읽는 중</h3>
                        <button>더보기</button>
                    </div>
                    <div className='readingBookList'>
                        {newBookList()}
                    </div>
                </div>
            </div>
        </ReadingBookContainer>
    )
}

export default ReadingBook

const ReadingBookContainer = styled.div`
    
`
