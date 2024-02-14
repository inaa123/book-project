import React, { useState } from 'react'
import instance from '../api/axios';
import styled from 'styled-components';
import SearchBookList from './SearchBookList';

import { LuSearch } from "react-icons/lu";
import { MdClear } from "react-icons/md";

function Search() {
    const [keywords, setKeywords] = useState('');
    const [bookList, setBookList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showClearBtn, setShowClearBtn] = useState(false);
    const [isClick, setIsClick] = useState(false);

    const PROXY = window.location.hostname === 'localhost' ? '' : '/proxy'
    const URL = `${PROXY}/v1/search/book.json`;

    const bookSearchKeyword = (e) => {
        setKeywords(e.target.value);
        if(e.target.value.trim()){
            setError('')
            setShowClearBtn(true);
        }else{
            setShowClearBtn(false)
        }
    }

    const searchBookEvent = async () => {
        setIsLoading(true);
        setError(null);
        try {
            if (!keywords.trim()) {
                setError('검색어가 없습니다.')
                return;
            }
            // Append keywords to the URL
            const res = await instance.get(`${URL}?query=${encodeURIComponent(keywords)}`);
            setIsClick(true);
            if (res.headers['content-type']?.includes('application/json')) {
                setBookList(res.data.items); // Assuming 'items' is the correct field in the response
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
    
    const clearEvent = (e) => {
        e.preventDefault();
        setKeywords('');
        setShowClearBtn(false);
        setIsClick(false);
    }

    return (
           <SearchForm>
                <div className='search'>
                    <div className='inputWrap'>
                        <input 
                            type='text'
                            className='searchKeyword'
                            value={keywords}
                            placeholder='검색할 책을 입력해주세요.'
                            onChange={bookSearchKeyword}
                        />
                        {showClearBtn &&
                            <button className='clearBtn' onClick={clearEvent}>
                                <MdClear />
                            </button>
                        }
                    </div>
                    <button className='searchBtn' onClick={searchBookEvent}><LuSearch /></button>
                </div>
                <div className='searchText'>
                    {isLoading && <p>Loading...</p>}
                    {error && <p>{error}</p>}
                </div>
                
                {isClick &&
                    <ResultContainer className='resultContainer'>
                        <ul className='searchList'>
                            <li>
                                {Array.isArray(bookList) && bookList.map((book) => (
                                    <SearchBookList 
                                        key={book.id} book={book}
                                    />
                                ))}
                            </li>
                        </ul>
                    </ResultContainer>
                }
                
           </SearchForm>
    );
}

export default Search

const SearchForm = styled.div`
    .search{
        display: flex;
        justify-content: center;
        gap: 10px;
        .searchBtn{
            font-size: 30px;
        }
        .inputWrap{
            position: relative;
            .searchKeyword{
                width: 300px;
                height: 50px;
                border-radius: 10px;
                border: solid 3px;
                border-color: #0c4825;
                font-size: 20px;
                padding : 0px 40px 0px 20px;
            }
            .clearBtn{
                font-size: 20px;
                position: absolute;
                top: 16px;
                right: 8px;
                padding-left : 10px;
            }
        }
        
    }
    .searchText{
        display: flex;
        justify-content: center;
    }

    @media screen and (max-width: 768px){
        .search{
            gap: 5px;
            .inputWrap{
                .searchKeyword{
                    width: 210px;
                }
            }
            .searchBtn{
                font-size: 28px;
            }
        }
    }

    @media screen and (max-width: 428px){
        .search{
            .searchBtn{
                font-size: 24px;
            }
            .inputWrap{
                .searchKeyword{
                    width: 210px;
                }
            }
        }
    }

`
const ResultContainer = styled.div`
    position: absolute;
    background-color: #f9f7eb;
    z-index: 11;
    max-width: 1200px;
    width: 100%;
    height: 100%;
    .searchList{
        display: flex;
        justify-content: center;
        padding-top: 20px;
        li{
            width: 100%;
        }
    }
    @media screen and (max-width: 768px) {
        left: 0px;
    }
`
