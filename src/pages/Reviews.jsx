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
            navigate('/')
        }else{
            navigate('/login')
        }
    }

    return (
        <ReviewsContainer className='container'>
            <div className='review-top'>
                <h3 className='subText'>인상 깊은 책의 리뷰를 남겨주세요.</h3>
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
    .review-top{
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px; 
        border-bottom: solid 1px black;
        button{
            width: auto;
            background-color: #0c4825;
            padding: 15px 30px;
            border-radius: 20px;
            color: white;
            letter-spacing: 3px;
            line-height: 20px;
            font-size: 16px;
            font-weight: 500;
        }
    }
 
    .reviewList{
        margin: 50px auto;
        li{
            display: grid;
            grid-template-columns: repeat(4, minmax(282px, auto));
            gap: 24px;
            cursor: pointer
        }
    }
`