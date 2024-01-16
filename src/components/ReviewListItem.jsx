import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { RiDoubleQuotesL } from "react-icons/ri";
import { RiDoubleQuotesR } from "react-icons/ri";


function ReviewListItem({post}) {

    const navigate = useNavigate();
    const onDetail = () => {
        navigate(`/review/detail/${post.id}`, {
            state : {
                id : post.id,
                isbn : post.isbn,
                title : post.title,
                text : post.text,
                image : post.image,
                author : post.author,
                userName : post.userName,
                publisher : post.publisher,
                description : post.description,
            }
        })
    }

    return (
        <ReviewItem onClick={onDetail}>
            <div className='contentWrap'>
                <div className='contentTop'>
                    <p className='text'>{post.userName}</p>
                </div>
                <div className='content'>
                    <span className='quotes'><RiDoubleQuotesL /></span>
                    <p className='text'>{post.text}</p>
                    <span className='quotes'><RiDoubleQuotesR /></span>
                </div>
                <div className='contentBottom'>
                    <p className='bookTitle'>
                        {post.title.length < 13
                            ? post.title
                            : post.title.slice(0, 12) + '...'}
                    </p>
                    <img src={post.image}/>
                </div>
            </div>
        </ReviewItem>
    )
}

export default ReviewListItem

const ReviewItem = styled.div`
    border: solid 1px rgba(0,0,0,0.5);
    border-radius: 30px;
    padding: 30px 20px;
    display: flex;
    height: auto;
    min-height: 200px;
    
    .contentWrap{
        .contentTop{
            padding-bottom: 20px;
            border-bottom: solid 1px black;
            margin-bottom: 20px;
        }
        .content{
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 0px;
            height: 70px;
            .quotes{
                font-size: 22px;
            }
            .text{
                font-family: 'batang';
                font-weight: 500;
                font-size: 18px;
                padding: 0px 5px;
            }
        }
        .contentBottom{
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-top: 10px;
            .bookTitle{
                font-style: italic;
                padding-right: 10px;
            }
            img{
                width: 60px;
                height: 80px;
            }
        }
    }
    
`

