import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllBooks,  onUserState } from '../api/firebase';
import { useQuery } from 'react-query';
import MyBookListItem from '../components/MyBookListItem';
import MyBookStateCategory from '../components/MyBookStateCategory';


function MyBook() {
    const [user, setUser] = useState('');
    const [isClick, setIsClick] = useState(false);
    // const [books, setBooks] = useState([]);
    const [state, setState] = useState('');
    const onSelect = useCallback(state => setState(state), []);

    useEffect(()=>{
        onUserState(setUser)
    },[])

    const {data : bookItem} = useQuery({
        queryKey : [`/mybook/${user.uid}`],
        queryFn : () => getAllBooks(user?.uid),
        enabled : !!user?.uid
    })
    
    return (
        <MyBookContainer className='container'>
            <MyBookStateCategory state={state} onSelect={onSelect} />
            <ul>
                {!bookItem && <p>기록함이 비어있습니다.</p>}
                {bookItem && bookItem.map(el => (
                    <MyBookListItem key={el.id} post={el} state={state} />
                ))}
                
                {/* {isClick && bookItem && bookItem.map(el=>(
                    <MyBookCategoryItem key={el.id} post={el} category={category}/>
                ))} */}
            </ul>
        </MyBookContainer>
    )
}

export default MyBook

const MyBookContainer = styled.div`
    
`
