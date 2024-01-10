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
                    <img src={image} alt={title}/>
                    <div className='subContent'>
                        <p>{author}</p>
                        <p>{publisher}</p>
                    </div>
                    <div className='btnWrapper'>
                        <select value={selected} onChange={handleSelect}>
                            <option value="" disabled>상태</option>
                            {selectList.map((item, index) => (
                                <option key={index} value={item.value}>{item.name}</option>
                            ))}
                        </select>
                        <button onClick={onClickEvent}>기록함추가</button>
                        <button onClick={onWriteReview}>한마디작성</button>
                        
                        {!selected && isClick && <p>상태를 선택하세요!</p>}
                    </div>
                </div>
                <div className='content2'>
                    <p>{description}</p>
                </div>
            </DetailPage>
            
        </div>
        /* 책제목, 표지, 저자, 출판사 / 상태 : 읽는중, 읽은책 / 확인(submit) */
    )
}

export default DetailBook

const DetailPage = styled.div`
    .title{
        font-size: 40px;
    }
    .content{
        display: flex;
        
        /* flex-direction: column; */
        img{
            max-width : 400px;
            width: 100%;
        }
        .subContent{
            display: flex;
        }
        .btnWrapper{
            display: block;
        }
    }
`