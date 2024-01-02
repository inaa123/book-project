import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { onUserState } from '../api/firebase';
import styled from 'styled-components';

function DetailBook() {
    const [user, setUser] = useState();

    const state = useLocation().state;

    

    const navigate = useNavigate();

    useEffect(()=>{
        onUserState((user) => {
            setUser(user)
            console.log(user)
        })
    })

    const onWriteQuote = () => {
        if(user){
            navigate(`/quote/write`, {state : {email : user.email}})
        }else{
            navigate(`/login`)
        }
        
    }
    return (
        <div className='container'>
            <DetailPage>
            <button onClick={onWriteQuote}>한마디작성</button>
            </DetailPage>
            
        </div>
        /* 책제목, 표지, 저자, 출판사 / 상태 : 읽는중, 읽은책 / 확인(submit) */
    )
}

export default DetailBook

const DetailPage = styled.div`
    
`