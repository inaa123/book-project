import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';

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
                    <p>{post.userName}</p>
                </div>
                <div className='content'>
                    <span>"</span><p>{post.text}</p><span>"</span>
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
    padding: 30px;
    /* width: 50%; */
    display: flex;
    width: 200px;
    height: auto;
    min-height: 200px;
    
    .contentWrap{
        display: block;
        .contentTop{
            padding-bottom: 20px;
            border-bottom: solid 1px black;
            margin-bottom: 20px;
        }

        .content{
            display: flex;
            justify-content: center;
            padding-bottom: 20px;
            margin-bottom: 20px;
        }

        .contentBottom{
            display: flex;
            align-items: center;
            .bookTitle{
                font-weight: bold;
            }
            img{
                width: 60px;
                height: 80px;
            }
        }
    }
    
`

