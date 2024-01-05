import React, { useState } from 'react'
import styled from 'styled-components'
import { loginEmail } from '../api/firebase';
import { Link, useNavigate } from 'react-router-dom';

function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const navigate = useNavigate();

    const onLoginEvent = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        try{
            const result = await loginEmail(email, password);
            if(result){
                console.log(email);
                navigate('/')
            }else{
                setErrorMsg('이메일이나 비밀번호가 일치하지 않습니다.')
            }
            
        }catch(error){
            console.error(error);
        }
    }

    return (
        <LoginContainer className='container'>
            <h2 className='title'>로그인</h2>
            <form onSubmit={onLoginEvent}>
                <div>
                    <span>이메일</span>
                    <input 
                        type='email' 
                        placeholder='이메일을 입력하세요'
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <span>비밀번호</span>
                    <input 
                        type='password' 
                        placeholder='비밀번호를 입력하세요'
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />
                </div>
                {errorMsg && <p className='errorTxt'>{errorMsg}</p>}
                <div className='btn-wrapper'>
                <button type='submit'>로그인</button>
                <button><Link to='/signup'>회원가입</Link></button>
                </div>
            </form>
        </LoginContainer>
    )
}

export default LogIn

const LoginContainer = styled.div`
    height: 500px;
    margin-top: 100px;
    display: block;
    text-align: center;
    justify-content: center;

    box-sizing: border-box;
    .title{
        margin-bottom: 40px;
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
`
