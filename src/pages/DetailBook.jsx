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
    const {isbn, image, title, author, publisher, description, pubdate} = state;

    const today = new Date();
    const postDate = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()} ${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;

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
                    publisher : publisher,
                    description : description,
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
                            <div className='book-author-pub'>
                                <p>저자</p>
                                <p>출판사</p>
                            </div>
                            <div className='bookData-author-pub'>
                                <p>{author}</p>
                                <p>{publisher}</p>
                            </div>
                        </div>
                        {user && (
                        <>
                        <div className='btnWrapper'>
                            <div className='mybookBtn'>
                                <button onClick={onClickEvent} >
                                <LuBookPlus /><p>기록함추가</p></button>
                            </div>
                            <div className='reviewBtn'>
                                <button onClick={onWriteReview}>
                                <FaPaperPlane /><p>한마디</p></button>
                            </div>
                        </div>
                        <div className='selectBox'>
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
                        </>
                        )}
                    </div>
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
                width : 280px;
                height : 400px;
            }
        }
        .detailContent{
            display: flex;
            flex-direction: column;
            gap: 10px;
            margin-top: 80px;
            .bookData{
                display: flex;
                gap: 30px;
                font-size: 20px;
                padding-bottom: 20px;
                .book-author-pub{
                    display:flex;
                    flex-direction: column;
                    gap: 20px;
                    padding-bottom:
                }
                .bookData-author-pub{
                    display:flex;
                    flex-direction: column;
                    gap: 20px;
                }
            }
            .selectBox{
                display: flex;
                align-items: center;
                justify-content: center;
                gap : 10px;
                select{
                    font-size: 20px;
                }
                .stateMsg{
                    width: 100%;
                    max-width: 180px;
                    text-align: left;
                }
                p{
                    color: red;
                }
            }
            .btnWrapper{
                display: flex;
                gap: 100px;
                align-items: center;
                justify-content: center;
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
        padding: 50px 30px;
        h4{
            font-size: 20px;
            padding-bottom: 20px;
        }
        p{
            font-family: 'text';
            line-height: 35px;
        }
    }
    
    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        text-align: center;
        .title{
            font-size: 32px;
        }
        .content{
            flex-direction: column;
            text-align: center;
            justify-content: center;
            gap: 30px;
            padding-bottom: 60px;
            .detailContent{
                margin-top: 10px;
                .bookData{
                    font-size: 16px;
                    align-items: center;
                    justify-content: center;
                }
                .btnWrapper{
                    .mybookBtn{
                        button{
                            font-size: 34px;
                            p{font-size: 18px;}
                        }
                    }
                    .reviewBtn{
                        button{
                            font-size: 34px;
                            p{font-size: 18px;}
                        }
                    }
                }
                .selectBox{
                    padding-left: 10%;
                }
            }
            
        }
    }

    @media screen and (max-width: 428px) {
        .content{
            .detailContent{
                .btnWrapper{
                    .mybookBtn{
                        button{
                            p{font-size: 14px;}
                        }
                    }
                    .reviewBtn{
                        button{
                            p{font-size: 14px;}
                        }
                    }
                }
            }
        }
        
    }

`