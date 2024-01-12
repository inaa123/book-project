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
    const [state, setState] = useState('');
    const onSelect = useCallback(state => setState(state), []);
    

    useEffect(()=>{
        onUserState(setUser);
    },[])

    useEffect(()=>{
        const fetchBooks = async () => {
            try{
                const books = await getAllBooks(user.uid);
                if(books){
                    setBookList(books);
                }else{
                    setMsg('기록함이 비어있습니다.')
                }
            }catch(error){
                console.error(error);
            }
        }
        fetchBooks()
    }, [user.uid])


    return (
        <MyBookContainer className='container'>
            <MyBookStateCategory state={state} onSelect={onSelect} />
            <Swiper 
                className='swiper'
                spaceBetween={10}
                slidesPerView={1}
                // slidesPerGroup={4}
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
