import axios from 'axios';
import React, { useState, useEffect } from 'react'

function SearchBook() {
    const [keywords, setKeywords] = useState('');
    const [bookResults, setBookResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log(bookResults); // Log the state when it updates
    }, [bookResults]);

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
            const apiUrl = `/api/books/?query=${encodeURIComponent(keywords)}`;
            const res = await axios.get(apiUrl);
            if (res.headers['content-type']?.includes('application/json')) {
                const { data } = res;
                setBookResults(data);
            } else {
                console.error(res);    
                setError('no data');
            }
            
        } catch (error) {
            console.error(error);
            setError('no data');
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div>
            <input 
                value={keywords}
                onChange={bookSearchKeyword}
            />
            <button onClick={searchBookEvent}>검색</button>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {Array.isArray(bookResults) && bookResults.map((book, index) => (
            <div key={index}>
                <p>{book.title}</p>
            </div>
        ))}
        </div>
    )
}

export default SearchBook;