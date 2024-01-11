import React, { useCallback,  useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllBooks,  onUserState } from '../api/firebase';
import MyBookListItem from '../components/MyBookListItem';
import MyBookStateCategory from '../components/MyBookStateCategory';


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
            <ul>
                {!bookList && <li><p>{msg}</p></li>}
                {bookList && bookList.map(el => (
                    <MyBookListItem key={el.id} post={el} state={state} />
                ))}
            </ul>
        </MyBookContainer>
    )
}

export default MyBook

const MyBookContainer = styled.div`
    
`
