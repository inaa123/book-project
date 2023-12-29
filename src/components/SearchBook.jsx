import React from 'react'

function SearchBook() {
    return (
        <div className='container'>
            <input 
                type='text'
                placeholder='책이름을 입력하세요'
            />
            <button>검색</button>
        </div>
    )
}

export default SearchBook
