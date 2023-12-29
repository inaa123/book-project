import React from 'react'

function SearchBook() {
    return (
        <div className='container'>
            <p>오늘은 어떤 책을 읽었나요?</p>
            <input 
                type='text'
                placeholder='책이름을 입력하세요'
            />
            <button>검색</button>
        </div>
    )
}

export default SearchBook
