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
        <SignUpContainer >
            <div className='container'>
            <h2 className='title'>회원가입</h2>
            <form onSubmit={onSignUpEvent}>
                <div className='signup'>
                    <input 
                        type='email' 
                        placeholder='이메일을 입력하세요'
                        value={userEmail}
                        onChange={(e)=>setUserEmail(e.target.value)}
                    />
                    {emailError && <p className='errorTxt'>{emailError}</p>}
                </div>
                <div className='signup'>
                    <input
                        type='password' 
                        placeholder='비밀번호를 입력하세요'
                        value={userPassword}
                        onChange={(e)=>setUserPassword(e.target.value)}
                    />
                    {psError && <p className='errorTxt'>{psError}</p>}
                </div>
                <div className='signup'>
                    <input 
                        type='text' 
                        placeholder='닉네임을 입력하세요'
                        value={userNickName}
                        onChange={(e)=>setUserNickName(e.target.value)}
                    />
                    {nicknameError && <p className='errorTxt'>{nicknameError}</p>}
                </div>
                <button type='submit'>가입하기</button>
            </form>
            </div>
        </SignUpContainer>
    )
}

export default SignUp

const SignUpContainer = styled.div`
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
        .signup{
            display: block;
            /* align-items: center; */
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
            .errorTxt{
                font-size: 14px;
                margin-top: 12px;
                color: red;
            }
        }
        button{
            width: 400px;
            height: 50px;
            border-radius: 20px;
            background-color: #0c4825;
            font-size: 16px;
            color: white;
            letter-spacing: 4px;
        }
    }
`
