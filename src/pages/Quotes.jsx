import React from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getQuotes } from '../api/firebase'

function Quotes() {
    
    const {data : quote} = useQuery({
        queryKey : 'quote',
        queryFn : getQuotes
    })

    return (
        <QuotesContainer className='container'>
            <div className='quote-top'>
                <h2>한마디</h2>
                <h3>인상깊은 책 문장을 남겨주세요.</h3>
                <button>작성하기</button>
            </div>
            <ul className='quotesList'>
                {quote && quote.map((el) => (
                    <QuoteListItem key={el.id} post={el}/>
                ))}
            </ul>
        </QuotesContainer>
    )
}

export default Quotes

const QuotesContainer = styled.div`
    
`

const QuoteListItem = styled.li`
    
`