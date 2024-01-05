import React, { createContext, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllBooks, getStateOptionBook, onUserState } from '../api/firebase';
import { useQuery } from 'react-query';
import MyBookListItem from '../components/MyBookListItem';
import OptionBookListItem from '../components/OptionBookListItem';


function MyBook() {
    const [user, setUser] = useState('');
    const [isClick, setIsClick] = useState(false);
    const [books, setBooks] = useState([]);

    useEffect(()=>{
        onUserState(setUser)
    },[])

    const {data: bookItem} = useQuery('bookItem', () => getAllBooks(user?.uid), {
        enabled: !!user?.uid 
    });


    const onClickEvent = () => {
        setIsClick(true)
        bookItem.map((el)=>(
            getStateOptionBook(el.option, user.uid)
        ))
        // bookItem.map((el)=>(
        //     setBooks(el),
        //     getStateOptionBook(el.option, books)
        // ))
        // console.log(books)
    }

    return (
        <MyBookContainer className='container'>
            <div className='btnContainer' >
                <button onClick={onClickEvent}>읽는중</button>
                <button>읽은책</button>
            </div>
            <div className='bookListWrapper'>
                <ul>
                    {!isClick && bookItem && bookItem.map((el)=>(
                        <MyBookListItem key={el.id} post={el}/>
                    ))}
                    {isClick && bookItem && bookItem.map((el)=>(
                        <OptionBookListItem key={el.id} option={el.option} bookList={el} />
                    ))}
                </ul>
            </div>
        </MyBookContainer>
    )
}

export default MyBook

const MyBookContainer = styled.div`
    
`
