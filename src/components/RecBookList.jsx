import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { delRecBooks, getRecBooks, onUserState } from '../api/firebase';
import MyBookListItem from './MyBookListItem';
import RecBookItem from './RecBookItem';

import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';

function RecBookList() {
    const [user, setUser] = useState('');
    const [bookList, setBookList] = useState([]);
    const [msg, setMsg] = useState('');
    
    useEffect(()=>{
        onUserState((user)=>{
            setUser(user);
        })
    }, [])

    useEffect(()=>{
        const fetchRecBook = async () => {
            try{
                const books = await getRecBooks();
                // const sortedBooks = books.sort(function(a,b){
                //     return b.id - a.id
                // }) recBooks가 10개 넘으면 오래된(id값 젤 앞) 삭제만들기
                if(books.length > 0) {
                    setBookList(books);
                    console.log(bookList);
                }else{
                    setMsg('추천책이 없습니다!')
                }
            }catch(error){
                console.error(error);
            }
        }
        fetchRecBook();
    });

    // const recBookList = () => {
    //     let result = [];
    //     for(let i = 0; i < 4; i++){
    //         console.log(bookList[i]);
    //         result.push(
    //             <div>
    //                 <img src={bookList[i].image}/>
    //             </div>
    //         )       
    //     }
    //     return result;
    // }

    return (
        <RecBookContainer>
            <div className='container'>
                <div className='rebBookTop'>
                    <h3>추천도서</h3>
                    <button>더보기</button>
                </div>
                <Swiper
                    className='swiper'
                    spaceBetween={10}
                    slidesPerView={1}
                    autoplay
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
                    {bookList && bookList.map((el, idx)=>(
                        <SwiperSlide key={idx} >
                            <MyBookListItem key={el.id} post={el} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </RecBookContainer>
    )
}

export default RecBookList

const RecBookContainer = styled.div`
    
`
