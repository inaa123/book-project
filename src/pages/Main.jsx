import React, { useEffect, useState } from 'react'
import Search from '../components/Search';
import styled from 'styled-components';
import MyBookListItem from '../components/MyBookListItem';
import { getAllBooks, onUserState } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

import {Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules'

import 'swiper/css';


function Main() {
    const [user,setUser] = useState('');
    const [bookList, setBookList] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        onUserState((user) => {
            setUser(user);
            if(!user){
                navigate(`/login`);
            }
        })
    }, [])

    useEffect(()=>{
        const fetchReadingBook = async () => {
            try{
                const books = await getAllBooks(user.uid);
                const filterBooks = books.filter((book)=>book.state === 'reading');
                setBookList(filterBooks);
            }catch(error){
                console.error(error);
            }
        }
        if(user){
            fetchReadingBook()
        }
    },[user.uid])

    // const newBookList = () => {
    //     const result = [];
    //     for(let i = 0; i < bookList.length; i++){
    //         result.push(<MyBookListItem post={bookList[i]} state={bookList[i].state}/>)
    //     }
    //     return result;
    // }

    return (
        <MainContainer>
            <div className='container'>
                <div className='searchWrap'>
                    <Search />
                </div>
                <div className='readingBookWrap'>
                    <div className='button'>
                        <h3>현재 읽는 중</h3>
                        <button onClick={()=>navigate(`/mybook/${user.uid}`)}>더보기</button>
                    </div>
                    <Swiper
                        className='swiper'
                        spaceBetween={10}
                        slidesPerView={1}
                        allowTouchMove={false}
                        // loop
                        // autoplay={{
                        //     delay:2000,
                        // }}
                        // speed={2000}
                        // modules={[Autoplay]}
                        breakpoints={{
                            768: {
                            slidesPerView: 3,
                            slidesPerGroup:3
                            },
                            1200: {
                            slidesPerView: 4,
                            slidesPerGroup:4
                            },
                        }}
                    >
                        <div className='readingBookList'>
                            {!bookList && <p>현재 읽고 있는 책이 없습니다!</p>}
                            {bookList && bookList.map((el, index)=>(
                                <SwiperSlide key={index}>
                                    <MyBookListItem post={el} state={el.state} className='bookItem'/>
                                </SwiperSlide>
                            ))}
                        </div>
                    </Swiper>
                </div>
            </div>
        </MainContainer>
    )
}

export default Main

const MainContainer = styled.div`
    .readingBookWrap{
        padding: 40px 10px;
        .button{
            display: flex;
            justify-content: space-between;
        }
        .swiper{
            .readingBookList{
                display: grid;
                grid-template-columns: repeat(4, minmax(25%, auto));   
                grid-template-rows: "1fr ";
            }
        }
        
    }
`
