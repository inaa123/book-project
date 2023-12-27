import React, { useState } from 'react'
import styled from 'styled-components'

function SignUp() {
    const [userNickName, setUserNickName] = useState();
    const [userEmail, setUserEmail] = useState();
    const [userPassword, setUserPassword] = useState();

    // const onSignUpEvent = async (e) => {
    //     e.preventDefault();
        
    // }

    return (
        <SignUpContainer className='container'>
            <h2 className='title'>회원가입</h2>
            <form >
                <div>
                    <span>이메일</span>
                    <input 
                        type='email' 
                        placeholder='이메일을 입력하세요'
                        value={userEmail}
                        onChange={(e)=>setUserEmail(e.target.value)}
                    />
                </div>
                <div>
                    <span>비밀번호</span>
                    <input 
                        type='password' 
                        placeholder='비밀번호를 입력하세요'
                        value={userPassword}
                        onChange={(e)=>setUserPassword(e.target.value)}
                    />
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
