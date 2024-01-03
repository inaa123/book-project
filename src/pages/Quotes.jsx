import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getQuotes, onUserState } from '../api/firebase'
import { useNavigate } from 'react-router-dom'
import QuoteListItem from '../components/QuoteListItem'

function Quotes() {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const {data : quote} = useQuery({
        queryKey : 'quote',
        queryFn : getQuotes
    })

    useEffect(()=>{
        onUserState((user) => {
            setUser(user)
        })
    })

    const onWrite = () => {
        if(user){
            // navigate(`/quote/write`, , {state : user.eamil})
            navigate(`/book/search`)
        }else{
            navigate(`/login`)
        }
        
    }

    return (
        <QuotesContainer className='container'>
            <div className='quote-top'>
                <h2>한마디</h2>
                <h3>인상깊은 책 문장을 남겨주세요.</h3>
                <button onClick={onWrite}>작성하기</button>
            </div>
            <ul className='quotesList'>
                <li>
                {quote && quote.map((el) => (
                    <QuoteListItem key={el.id} post={el}/>
                ))}
                </li>
            </ul>
        </QuotesContainer>
    )
}

export default Quotes

const QuotesContainer = styled.div`
    .quotesList{
        li{
            display: flex;
            gap: 10px;
            border-bottom: solid 1px black;
        }
    }
`