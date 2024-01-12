import React, { useCallback,  useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllBooks,  onUserState } from '../api/firebase';
import MyBookListItem from '../components/MyBookListItem';
import MyBookStateCategory from '../components/MyBookStateCategory';

import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import '../style/SwiperCustomCss.css';

function MyBook() {
    const [user, setUser] = useState('');
    const [msg, setMsg] = useState('');
    const [bookList, setBookList] = useState([]);
    const [state, setState] = useState('all');
    const onSelect = useCallback(state => setState(state), []);

    useEffect(()=>{
        onUserState(setUser);
    },[])

    useEffect(()=>{
        const fetchBooks = async () => {
            try{
                setBookList('');
                const books = await getAllBooks(user.uid);
                // console.log(state); // all , reading, done
                if(books){
                    if(state === 'all') {
                        // console.log(books); // 9개(전체)
                        setBookList(books);
                        console.log(bookList); // []빈배열
                    }else{
                        const filterBooks = books.filter((book)=>book.state === state);
                        setBookList(filterBooks);
                        console.log(bookList);
                    }
                }else{
                    setMsg('기록함이 비어있습니다.')
                }     
            }catch(error){
                console.error(error);
            }
        }
        if(user.uid){
            fetchBooks()
        }
    }, [user.uid, state])


    return (
        <MyBookContainer className='container'>
            <MyBookStateCategory state={state} onSelect={onSelect} />
            <Swiper 
                className='swiper'
                spaceBetween={10}
                slidesPerView={1}
                pagination
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
                  
                modules={[Pagination]} 
            >
                {!bookList && <p>{msg}</p>}
                {bookList && bookList.map((el,index) => (
                    <SwiperSlide key={index} >
                        <MyBookListItem key={el.id} post={el} state={state} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </MyBookContainer>
    )
}

export default MyBook

const MyBookContainer = styled.div`
    
`
