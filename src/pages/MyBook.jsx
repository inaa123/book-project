import React, { createContext, useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import { getAllBooks, getStateOptionBook, onUserState } from '../api/firebase';
import { useQuery } from 'react-query';
import MyBookListItem from '../components/MyBookListItem';
import OptionBookListItem from '../components/OptionBookListItem';
function MyBook() {
    const [user, setUser] = useState('');
    // const [isClick, setIsClick] = useState(false);
    // const [books, setBooks] = useState([]);
    // const {option} = useParams();

    useEffect(()=>{
        onUserState((user) => {
            setUser(user);
        })
    });

    const {data : bookItem} = useQuery({
        queryKey : 'bookItem',
        queryFn : () => getAllBooks(user.uid)
    })

    // const onClickEvent = () => {
    //     setIsClick(true);
    //     try{
    //         getStateOptionBook(bookItem.option, user.uid).then((book)=>{
    //             setBooks(book);
    //         })
    //     }catch(error){
    //         console.error(error)
    //     }   
    // }

    return (
        <MyBookContainer className='container'>
            <div className='btnContainer'>
                <button>읽는중</button>
                <button>읽은책</button>
            </div>
            <div className='bookListWrapper'>
                <ul>
                    { bookItem && bookItem.map((el)=>(
                        <MyBookListItem key={el.id} post={el}/>
                    ))}
                    {/* {isClick && bookItem && bookItem.map((el)=>(
                        <OptionBookListItem key={el.id} option={bookItem.option} bookList={el} />
                    ))} */}
                </ul>
            </div>
        </MyBookContainer>
    )
}

export default MyBook

const MyBookContainer = styled.div`
    
`
