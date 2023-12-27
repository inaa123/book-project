import React from 'react'
import styled from 'styled-components'

function SignUp() {
    return (
        <SignUpContainer className='container'>
            <h2 className='title'>회원가입</h2>
            <form>
                <div>
                    <span>아이디</span>
                    <input type='text' placeholder='아이디를 입력하세요'/>
                </div>
                <div>
                    <span>비밀번호</span>
                    <input type='password' placeholder='비밀번호를 입력하세요'/>
                </div>
                <div>
                    <span>닉네임</span>
                    <input type='text' placeholder='닉네임을 입력하세요'/>
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
