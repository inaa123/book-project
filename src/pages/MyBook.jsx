import React, { useCallback,  useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllBooks,  onUserState } from '../api/firebase';
import MyBookListItem from '../components/MyBookListItem';
import MyBookStateCategory from '../components/MyBookStateCategory';
import {Swiper, SwiperSlide} from 'swiper/react';


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
    }, [bookList])


    return (
        <MyBookContainer className='container'>
            <MyBookStateCategory state={state} onSelect={onSelect} />
            <Swiper
                slidesPerView={8}
                slidesPerGroup={8}
                loop
            >
            <ul>
                
                <li>
                {!bookList && <p>{msg}</p>}
                {bookList && bookList.map((el,index) => (
                    <SwiperSlide key={index}>
                        <MyBookListItem key={el.id} post={el} state={state} />
                    </SwiperSlide>
                    
                ))}
                </li>
            </ul>
            
            </Swiper>
        </MyBookContainer>
    )
}

export default MyBook

const MyBookContainer = styled.div`
    ul{
        margin: 20px auto;
        li{
            display: grid;
            grid-template-columns: repeat(4, minmax(282px, auto));
            gap: 24px;
        }
    }
`
