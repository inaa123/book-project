import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { addBooks, onUserState } from '../api/firebase';
import styled from 'styled-components';

function DetailBook() {
    const [user, setUser] = useState();
    const [selected, setSelected] = useState('');
    const state = useLocation().state;
    const {isbn, image, title, author, publisher, discription} = state;

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
            if(selected){
                try{
                    await addBooks(isbn, image, title, selected, user.uid);
                }catch(error){
                    console.error(error);
                }finally{
                    navigate(`/mybook/${user.uid}`)
                }
            }
        }
    }

    const onWriteQuote = () => {
        if(user){
            navigate(`/quote/write/${isbn}`, {
                state : {
                    title : title,
                    author : author,
                    isbn : isbn,
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
                <div>
                    <img src={image} alt={title}/>
                </div>
                <div>
                    <h3>{title}</h3>
                    <p>{author}</p>
                    <p>{publisher}</p>
                </div>
                <div>
                    <p>{discription}</p>
                </div>
                <div className='btnWrapper'>
                <select value={selected} onChange={handleSelect} required>
                    <option value="" disabled>상태</option>
                    {selectList.map((item, index) => (
                        <option key={index} value={item.value}>{item.name}</option>
                    ))}
                </select>
                <button onClick={onClickEvent}>기록함추가</button>
                <button onClick={onWriteQuote}>한마디작성</button>
                
                {!selected && <p>상태를 선택하세요!</p>}
                </div>
                {/* {isClick && (
                    <select value={selected} onChange={handleSelect}>
                    <option>상태</option>
                    {selectList.map((item, index) => (
                        <option key={index} value={item.value} onClick={(e)=>onClickEvent}>{item.name}</option>
                    ))}
                    </select>
                )} */}
            {/* {isClick && 
                <select value={selected} onChange={handleSelect} >
                    <option value=''>클릭</option>
                    {selectList.map((el, idx) => (
                        <option key={idx} value={el} onClick={addMyBook}>{el.name}</option>
                    ))}
                </select>
            } */}
            </DetailPage>
            
        </div>
        /* 책제목, 표지, 저자, 출판사 / 상태 : 읽는중, 읽은책 / 확인(submit) */
    )
}

export default DetailBook

const DetailPage = styled.div`
    img{
        max-width : 400px;
        width: 100%;
    }
`