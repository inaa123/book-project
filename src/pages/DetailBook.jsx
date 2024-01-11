import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { addBooks, onUserState } from '../api/firebase';
import styled from 'styled-components';

function DetailBook() {
    const [user, setUser] = useState();
    const [selected, setSelected] = useState('');
    const [isClick, setIsClick] = useState(false);
    const state = useLocation().state;
    const {isbn, image, title, author, publisher, description} = state;

     const selectList = [
        {value : "reading", name : "읽는중"},
        {value : "done", name : "읽은책"}
    ]

    const navigate = useNavigate();

    useEffect(()=>{
        onUserState((user) => {
            setUser(user)
            // console.log(user)
            // console.log(selected)
        })
    })

    const onClickEvent = async (e) => {
        e.preventDefault();
        if(!user){
            navigate('/login')
        }else{
            setIsClick(true)
            if(selected && setIsClick){
                try{
                    setIsClick(false);
                    await addBooks(isbn, image, title, author, publisher, description, selected, user.uid);
                }catch(error){
                    console.error(error);
                }finally{
                    navigate(`/mybook/${user.uid}`)
                }
            }
        }
    }

    const onWriteReview = () => {
        if(user){
            navigate(`/review/write/${isbn}`, {
                state : {
                    title : title,
                    author : author,
                    isbn : isbn,
                    image : image
                }
            })
        }else{
            navigate(`/login`)
        }
    }

    const handleSelect = (e) => {
        setSelected(e.target.value);
    }

    return (
        <div className='container'>
            <DetailPage>
                <div className='title'>
                    <h3>{title}</h3>
                </div>
                <div className='content'>
                    <div className='thumbnail'>
                        <img src={image} alt={title}/>
                    </div>
                    <div className='detailContent'>
                        <div className='bookData'>
                            <p><span>저자</span>{author}</p>
                            <p><span>출판사</span>{publisher}</p>
                        </div>
                        <div className='btnWrapper'>
                            <div className='mybookBtn'>
                                <select value={selected} onChange={handleSelect}>
                                    <option value="" disabled>상태</option>
                                    {selectList.map((item, index) => (
                                        <option key={index} value={item.value}>{item.name}</option>
                                    ))}
                                </select>
                                <button onClick={onClickEvent}>기록함추가</button>
                            </div>
                            <div className='reviewBtn'>
                                <button onClick={onWriteReview}>한마디작성</button>
                            </div>
                        </div>
                        <div className='stateMsg'>
                            {!selected && isClick && <p>상태를 선택하세요!</p>}
                        </div>
                    </div>{/*detailContent*/}
                </div>
                <div className='introBook'>
                    <p>{description}</p>
                </div>
            </DetailPage>
        </div>
    )
}

export default DetailBook

const DetailPage = styled.div`
    .title{
        font-size: 40px;
        padding-bottom: 30px;
    }
    .content{
        display: flex;
        gap : 60px;
        .thumbnail{
            width : 300px;
            height : 350px;
        }
        .detailContent{
            display: flex;
            flex-direction: column;
            gap: 150px;
            margin-top: 50px;
            .bookData{
                p{
                    font-size: 20px;
                    margin-bottom: 20px;
                    span{
                        font-size: 14px;
                        margin-right: 30px;
                    }
                }
            }
            .btnWrapper{
                display: flex;
                gap: 100px;
                justify-content: c;
                align-items: center;
                .mybookBtn{
                    display:flex;
                    flex-direction: column;

                }
            }
        }
    }
    
`