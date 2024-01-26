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
                navigate('/')
            }else{
                setErrorMsg('이메일이나 비밀번호가 일치하지 않습니다.')
            }
            
        }catch(error){
            console.error(error);
        }
    }

    return (
        <LoginContainer >
            <div className='container'>
                <h2 className='title'>로그인</h2>
                <form onSubmit={onLoginEvent}>
                    <div className='login'>
                        <div className='userLogin'>
                            <input 
                                type='email' 
                                placeholder='이메일을 입력하세요'
                                value={email}
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                        </div>
                        <div className='userLogin'>
                            <input 
                                type='password' 
                                placeholder='비밀번호를 입력하세요'
                                value={password}
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                        </div>
                        {errorMsg && <p className='errorTxt'>{errorMsg}</p>}
                    </div>
                    <div className='btnWrapper'>
                        <button type='submit'>로그인</button>
                        <button type='button'><Link to='/signup'>회원가입</Link></button>
                    </div>
                </form>
                <div className='tempMsg'>
                    <p>체험해보세요!</p>
                    <p>아이디: test@test.com</p>
                    <p>비번 : 123456</p>
                </div>
            </div>
        </LoginContainer>
    )
}

export default LogIn

const LoginContainer = styled.div`
    height: 500px;
    margin-top: 10%;
    display: block;
    text-align: center;
    justify-content: center;
    .title{
        margin-bottom: 40px;
        font-size: 20px;
    }
    form{
        display: flex;
        flex-direction: column;
        gap: 20px;
        align-items: center;
        .login{
            display: block;
            height: 160px;
        }
        .userLogin{
            display: block;
            height: 70px;
            input{
                font-size: 16px;
                width : 400px;
                height: 48px;
                padding: 0px 50px 0px 40px;
                border: solid 1px rgba(0,0,0,0.3);
                border-radius: 10px;
                box-sizing: border-box;
            }
        }
        .errorTxt{
            font-size: 14px;
            color: red;
            padding-bottom: 12px;
        }
        .btnWrapper{
            display: flex;
            gap: 20px;
            justify-content: center;
            button{
                width: 180px;
                height: 50px;
                font-size: 16px;
                border-radius: 20px;
                background-color: #0c4825;
                font-size: 16px;
                color: white;
                letter-spacing: 4px;
                a{
                    color: white;
                }
            }
        }
    }
    .tempMsg{
        padding-top: 50px;
        font-size: 14px;
    }
`
