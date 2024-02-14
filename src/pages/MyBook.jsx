import React, { useCallback,  useEffect, useState } from 'react'
import { getAllBooks,  onUserState } from '../api/firebase';
import MyBookListItem from '../components/MyBookListItem';
import MyBookStateCategory from '../components/MyBookStateCategory';
import styled from 'styled-components'

import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';

function MyBook() {
    const [user, setUser] = useState('');
    const [msg, setMsg] = useState('');
    const [bookList, setBookList] = useState([]);
    const [state, setState] = useState('all');
    
    const onSelect = useCallback(state => setState(state), []);
    const navigate = useNavigate();

    useEffect(()=>{
        onUserState(setUser);
    }, [])

    useEffect(()=>{
        const fetchBooks = async () => {
            try{
                setBookList('');
                setMsg('')
                const books = await getAllBooks(user.uid);
                const sortedBooks = books.sort(function(a, b) {
                    return new Date(b.date) - new Date(a.date)
                })
                if(sortedBooks.length > 0){
                    if(state === 'all') {
                        setBookList(sortedBooks);
                    }else{
                        const filterBooks = sortedBooks.filter((book)=>book.state === state);
                        if(filterBooks.length > 0){
                            setBookList(filterBooks);
                        }else{
                            if(state === 'reading'){
                                setMsg('현재 읽고 있는 책이 없습니다.')
                            }else if(state === 'done'){
                                setMsg('다 읽은 책이 없습니다.')
                            }
                        }
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

    const onClickEvent = () => {
        if(user){
            navigate(`/`)
        }else{
            navigate(`/login`)
        }
    }
    return (
        <MyBookContainer className='container'>
            <div className='mybookTop'>
                <MyBookStateCategory state={state} onSelect={onSelect} />
                <button onClick={onClickEvent}>추가하기</button>
            </div>
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
                {!bookList && <p className='msg'>{msg}</p>}
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
.mybookTop{
    display: flex;
    justify-content: space-between;
    align-items: center;
    button{
        width: auto;
        padding : 15px 20px;
        background-color: #0c4825;
        border-radius: 20px;;
        color: white;
        letter-spacing: 2px;
        line-height: 15px;
        font-size: 16px;
    }
}
.swiper{
    padding: 20px 0px;
    .msg{
        padding: 10px 20px;
    }
}

.swiper-pagination{
    bottom: 0px!important;
    display: flex;
    text-align: center;
}
.swiper-pagination .swiper-pagination-bullet{
    width: 100%;
    height: 3px;
    border-radius: 0;
    background: gray;
}

@media screen and (max-width: 428px){
    .mybookTop{
        button{
            padding : 10px 14px;
            font-size: 12px;
        }
    }
}
`
