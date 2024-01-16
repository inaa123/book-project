import React, { useState } from 'react'
import styled from 'styled-components'
import { signupEmail } from '../api/firebase';
import { useNavigate } from 'react-router-dom';

function SignUp() {
    const [userNickName, setUserNickName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();

    const [psError, setPsError] = useState();
    const [emailError, setEmailError] = useState();
    const [nicknameError, setNickNameError] = useState();

    const navigate = useNavigate();

    const onSignUpEvent = async (e) => {
        e.preventDefault();
        setPsError('');
        setEmailError('');
        setNickNameError('')


        if(!userEmail){
            setEmailError('이메일을 입력해주세요!')
            return false
        }
        
        if(!userPassword || userPassword.length < 6){
            setPsError('비밀번호는 6글자 이상이어야 합니다!!')
            return
        }

        if(!userNickName){
            setNickNameError('닉네임을 입력해주세요!')
        }

        if(userEmail && userPassword && userNickName){
            try{
                const result = await signupEmail(userEmail, userPassword, userNickName);
                if(result.error){
                    if(result.error === 'auth/email-already-in-use'){
                        setEmailError('현재 사용중인 이메일입니다!!')
                    }
                    return
                }else{
                    navigate('/login')
                }
            }catch(error){
                console.error(error);
            }
        }
    }

    return (
        <SignUpContainer className='container'>
            <h2 className='title'>회원가입</h2>
            <form onSubmit={onSignUpEvent}>
                <div className='signup'>
                    <span>이메일</span>
                    <input 
                        type='email' 
                        placeholder='이메일을 입력하세요'
                        value={userEmail}
                        onChange={(e)=>setUserEmail(e.target.value)}
                    />
                </div>
                {emailError && <span className='errorTxt'>{emailError}</span>}
                <div className='signup'>
                    <span>비밀번호</span>
                    <input
                        type='password' 
                        placeholder='비밀번호를 입력하세요'
                        value={userPassword}
                        onChange={(e)=>setUserPassword(e.target.value)}
                    />
                </div>
                {psError && <p className='errorTxt'>{psError}</p>}
                <div className='signup'>
                    <span>닉네임</span>
                    <input 
                        type='text' 
                        placeholder='닉네임을 입력하세요'
                        value={userNickName}
                        onChange={(e)=>setUserNickName(e.target.value)}
                    />
                </div>
                {nicknameError && <p className='errorTxt'>{nicknameError}</p>}
                <button type='submit'>회원가입</button>
            </form>
        </SignUpContainer>
    )
}

export default SignUp

const SignUpContainer = styled.div`
    height: 500px;
    margin-top: 100px;
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
        .signup{
            display: flex;
            align-items: center;
            gap: 20px;
            input{
                padding: 10px;
                border: solid 1px rgba(0,0,0,0.3);
                border-radius: 10px;
            }
        }
        .errorTxt{
            color: red;
        }
        button{
            font-size: 16px;
        }
    }
`
