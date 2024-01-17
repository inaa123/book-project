import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { addBooks, onUserState } from '../api/firebase';
import styled from 'styled-components';
import { FaPaperPlane } from "react-icons/fa";
import { LuBookPlus } from "react-icons/lu";

function DetailBook() {
    const [user, setUser] = useState();
    const [selected, setSelected] = useState('');
    const [isClick, setIsClick] = useState(false);
    const navigate = useNavigate();
    const state = useLocation().state;
    const {isbn, image, title, author, publisher, description} = state;

    const today = new Date();
    const postDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
    console.log(postDate);

     const selectList = [
        {value : "reading", name : "읽는중"},
        {value : "done", name : "읽은책"}
    ]

    useEffect(()=>{
        onUserState((user) => {
            setUser(user)
        });
    }, [])

    const onClickEvent = async (e) => {
        e.preventDefault();
        if(!user){
            navigate('/login')
        }else{
            setIsClick(true)
            if(selected && setIsClick){
                try{
                    setIsClick(false);
                    await addBooks(isbn, image, title, author, publisher, description, selected, user.uid, postDate);
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
                    image : image,
                    date : postDate,
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
                        <div className='selectBox'>
                            <span>상태</span>
                            <select value={selected} onChange={handleSelect}>
                                <option value="" disabled>상태</option>
                                {selectList.map((item, index) => (
                                    <option key={index} value={item.value}>{item.name}</option>
                                ))}
                            </select>
                            <div className='stateMsg'>
                                {!selected && isClick && <p>상태를 선택하세요!</p>}
                            </div>
                        </div>
                        <div className='btnWrapper'>
                            <div className='mybookBtn'>
                                <button onClick={onClickEvent}>
                                <LuBookPlus /><p>기록함추가</p></button>
                            </div>
                            <div className='reviewBtn'>
                                <button onClick={onWriteReview}>
                                    <FaPaperPlane />
                                    <p>한마디</p></button>
                            </div>
                        </div>
                        
                    </div>{/*detailContent*/}
                </div>
                <div className='introBook'>
                    <h4>책소개</h4>
                    <p className='description'>{description}</p>
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
        border-bottom: solid 1px rgba(0,0,0,0.5);
        height: auto;
        padding: 30px;
        .thumbnail{
            margin-bottom: 10px;
            img{
                width : 300px;
                height : 400px;
            }
            
        }
        .detailContent{
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 80px;
            .bookData{
                margin-bottom: 50px;
                p{
                    font-size: 20px;
                    margin-bottom: 20px;
                    span{
                        font-size: 14px;
                        margin-right: 30px;
                    }
                }
            }
            .selectBox{
                display: flex;
                align-items: center;
                gap : 10px;
                span{
                    font-size: 14px;
                    margin-right: 30px;
                }
                select{
                    font-size: 20px;
                }
                p{
                    color: red;
                }
            }
            .btnWrapper{
                display: flex;
                gap: 100px;
                align-items: center;
                padding: 30px 0px;
                .mybookBtn{
                    button{
                        font-size: 20px;
                    }
                }
                .reviewBtn{
                    button{
                        font-size: 20px;
                    }
                }
            }
        }
    }
    .introBook{
        padding: 30px;
        h4{
            font-size: 20px;
            padding-bottom: 20px;
        }
        p{
            font-family: 'text';
            line-height: 35px;
        }
    }
    
`