import React from 'react'
import styled from 'styled-components'
import Search from '../components/Search'
import RecBookList from '../components/RecBookList'

function Home() {
    return (
        <HomeContainer>
            <div className='container'>
                <div className='searchWrap'>
                    <Search/>
                </div>
                <div className='recBookWrap'>
                    <RecBookList/>
                </div>
            </div>
        </HomeContainer>
    )
}

export default Home

const HomeContainer = styled.div`
    
`
