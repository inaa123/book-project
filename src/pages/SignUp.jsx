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

    const [emptyInput, setEmptyInput] = useState(false);

    const navigate = useNavigate();

    const onSignUpEvent = async (e) => {
        e.preventDefault();
        setPsError('');
        setEmailError('');

        if(!userEmail){
            setEmailError('이메일을 입력해주세요')
            return false
        }
        
        if(userPassword.length < 6){
            setPsError('비밀번호는 6글자 이상이어야 합니다!!')
            return
        }

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

    return (
        <SignUpContainer className='container'>
            <h2 className='title'>회원가입</h2>
            <form onSubmit={onSignUpEvent}>
                <div>
                    <span>이메일</span>
                    <input 
                        type='email' 
                        placeholder='이메일을 입력하세요'
                        value={userEmail}
                        onChange={(e)=>setUserEmail(e.target.value)}
                    />
                    {emailError && <span className='errorTxt'>{emailError}</span>}
                </div>
                <div>
                    <span>비밀번호</span>
                    <input
                        type='password' 
                        placeholder='비밀번호를 입력하세요'
                        value={userPassword}
                        onChange={(e)=>setUserPassword(e.target.value)}
                    />
                    {psError && <p className='errorTxt'>{psError}</p>}
                </div>
                <div>
                    <span>닉네임</span>
                    <input 
                        type='text' 
                        placeholder='닉네임을 입력하세요'
                        value={userNickName}
                        onChange={(e)=>setUserNickName(e.target.value)}
                    />
                </div>
                <button type='submit'>완료</button>
                {emptyInput && <p>회원정보를 입력하세요!</p>}
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
