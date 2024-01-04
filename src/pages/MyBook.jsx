import React, { createContext, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllBooks, onUserState } from '../api/firebase';
import { useQuery } from 'react-query';
import MyBookListItem from '../components/MyBookListItem';

function MyBook() {
    const [user, setUser] = useState('');

    useEffect(()=>{
        onUserState((user) => {
            setUser(user);
        })
    });

    const {data : bookItem} = useQuery({
        queryKey : 'bookItem',
        queryFn : getAllBooks(user.uid)
    })

    return (
        <MyBookContainer className='container'>
            <div className='btnContainer'>
                <button>읽는중</button>
                <button>읽은책</button>
            </div>
            <div className='bookListWrapper'>
                <ul>
                    <li>
                    {bookItem && bookItem.map((el)=>(
                        <MyBookListItem key={el.id} post={el}/>
                    ))}
                    </li>
                </ul>
            </div>
        </MyBookContainer>
    )
}

export default MyBook

const MyBookContainer = styled.div`
    
`
