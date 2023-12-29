import React from 'react'
import { Link } from 'react-router-dom'

function MyBook() {
    return (
        <div className='container'>
            <span>오늘은 어떤 책을 읽었나요?</span>
            <button><Link to='/mybook/addbook'>추가하기</Link></button>
        </div>
    )
}

export default MyBook
