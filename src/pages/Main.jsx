import React, { useEffect, useState } from 'react'
import Search from '../components/Search';
import styled from 'styled-components';
import MyBookListItem from '../components/MyBookListItem';
import { getAllBooks, onUserState } from '../api/firebase';

import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

function Main() {
    const [user,setUser] = useState('');
    const [bookList, setBookList] = useState([]);

    useEffect(()=>{
        onUserState(setUser);
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
        <MainContainer>
            <div className='container'>
                <div className='searchWrap'>
                    <Search />
                </div>
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
        </MainContainer>
    )
}

export default Main

const MainContainer = styled.div`
    .readingBookWrap{
        .button{
            display: flex;
            justify-content: space-between;
        }
        .readingBookList{
            /* gap: 20px; */
        display: grid;
        grid-template-columns: repeat(4, minmax(25%, auto));   
        grid-template-rows: "1fr ";
        /* flex-wrap: wrap; */
        .bookItem{
            width: 25%;
            flex-shrink: 0;
        }
        }
        
    }
`
