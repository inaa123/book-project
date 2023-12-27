import React from 'react'
import styled from 'styled-components'

function LogIn() {
    return (
        <LoginContainer className='container'>
            <h2 className='title'>로그인</h2>
            <form>
                <div>
                    <span>이메일</span>
                    <input type='email' placeholder='이메일을 입력하세요'/>
                </div>
                <div>
                    <span>비밀번호</span>
                    <input type='password' placeholder='비밀번호를 입력하세요'/>
                </div>
                <button type='submit'>로그인</button>
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
