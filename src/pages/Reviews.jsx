import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getReviews, onUserState } from '../api/firebase'
import { useNavigate } from 'react-router-dom'
import ReviewListItem from '../components/ReviewListItem'

function Reviews() {
    const [user, setUser] = useState();
    const [reviewList, setReviewList] = useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        onUserState((user) => {
            setUser(user)
        })
    }, [])

    useEffect(()=>{
        const orderReviews = async () => {
            try{
                const reviews = await getReviews();
                const sortedReviews = reviews.sort(function(a, b) {
                    return new Date(b.date) - new Date(a.date)
                })
                setReviewList(sortedReviews);
            }catch(error){
                console.error(error)
            }
        }
        orderReviews()
    }, [])

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
                    {reviewList && reviewList.map((el) => (
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
        padding-bottom: 16px;
        border-bottom: solid 1px #75737368;
        button{
            width: auto;
            padding : 15px 20px;
            background-color: #0c4825;
            color: white;
            border-radius: 20px;
            letter-spacing: 2px;
            line-height: 15px;
            font-size: 16px;
        }
    }
 
    .reviewList{
        padding: 40px 30px 20px 0px;
        li{
            display: grid;
            grid-template-columns: repeat(4, minmax(25%, auto));
            gap: 10px;
            cursor: pointer;
        }
    }

    
    @media screen and (max-width: 1024px){
        .reviewList{
            li{
            grid-template-columns: repeat(3, minmax(33%, auto));
            }
        }
    }

    @media screen and (max-width: 768px){
        .review-top{
            button{
                font-size: 14px;
            }
        }
        .reviewList{
            li{
            grid-template-columns: repeat(2, minmax(50%, auto));
            }
        }
    }

    @media screen and (max-width: 500px){
        
        .reviewList{
            padding: 40px 20px 0px;
            li{
            grid-template-columns: repeat(1, minmax(100%, auto));
            gap: 20px;
            }
        }
    }
`

