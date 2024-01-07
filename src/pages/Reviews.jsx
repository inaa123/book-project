import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import styled from 'styled-components'
import { getReviews, onUserState } from '../api/firebase'
import { useNavigate } from 'react-router-dom'
import ReviewListItem from '../components/ReviewListItem'

function Reviews() {
    const [user, setUser] = useState();
    const navigate = useNavigate();

    const {data : review} = useQuery({
        queryKey : 'review',
        queryFn : getReviews
    })

    useEffect(()=>{
        onUserState((user) => {
            setUser(user)
        })
    })

    const onWrite = () => {
        if(user){
            navigate(`/book/search`)
        }else{
            navigate(`/login`)
        }
        
    }

    return (
        <ReviewsContainer className='container'>
            <div className='review-top'>
                <h2>한마디</h2>
                <h3>인상 깊은 책의 리뷰를 남겨주세요.</h3>
                <button onClick={onWrite}>작성하기</button>
            </div>
            <ul className='reviewList'>
                <li>
                {review && review.map((el) => (
                    <ReviewListItem key={el.id} post={el}/>
                ))}
                </li>
            </ul>
        </ReviewsContainer>
    )
}

export default Reviews

const ReviewsContainer = styled.div`
    .reviewList{
        li{
            display: flex;
            gap: 10px;
        }
    }
`