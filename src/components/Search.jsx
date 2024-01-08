import React, { useState } from 'react'
import instance from '../api/axios';
import styled from 'styled-components';
import SearchBookList from './SearchBookList';

function Search() {
    const [keywords, setKeywords] = useState('');
    const [bookList, setBookList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'
    const URL = `${PROXY}/v1/search/book.json`;

    const bookSearchKeyword = (e) => {
        setKeywords(e.target.value);
    }

    const searchBookEvent = async () => {
        if (!keywords.trim()) {
            console.log('검색어 없음');
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            // Append keywords to the URL
            const res = await instance.get(`${URL}?query=${encodeURIComponent(keywords)}`);
            console.log(res);
            if (res.headers['content-type']?.includes('application/json')) {
                setBookList(res.data.items); // Assuming 'items' is the correct field in the response
                console.log(bookList);
            } else {
                console.error(res);    
                setError('No data available');
            }
        } catch (error) {
            console.error(error);
            setError('Failed to load data');
        } finally {
            setIsLoading(false);
        }
    };
    

    return (
        <div className='container'>
           <SearchForm>
                <div className='search'>
                <input 
                    type='text'
                    className='searchKeword'
                    value={keywords}
                    placeholder='책이름을 입력하세요.'
                    onChange={bookSearchKeyword}
                />
                <button onClick={searchBookEvent}>검색</button>
                </div>
                <div className='searchText'>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </div>
                <ul className='searchList'>
                    <li>
                        {Array.isArray(bookList) && bookList.map((book) => (
                            <SearchBookList 
                                key={book.id} book={book}
                            />
                        ))}
                    </li>
                </ul>
           </SearchForm>
        </div>
    );
}

export default Search

const SearchForm = styled.div`
    display:flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 30px;
    .searchKeword{
        width: 300px;
        height: 30px;
        border-radius: 10px;
        border: solid 2px;
        border-color: #c17c74;
    }
`
