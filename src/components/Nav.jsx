import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { logoutEmail, onUserState } from '../api/firebase';

function Nav() {
    const [user, setUser] = useState();

    const navigate = useNavigate();

    useEffect(() => {
        onUserState((user) => {
            setUser(user);
        })
    }, [])

    const onMyBook = () => {
        if(user){
            navigate(`/mybook/${user.uid}`)
        }else{
            navigate('/login')
        }
    }

    const logoutEvent = () => {
        logoutEmail().then(setUser);
        navigate('/');
    }

    return (
        <HeaderContainer >
            <nav>
                <ul>
                    <li onClick={onMyBook}>기록함</li>
                    <li><Link to='/review'>한마디</Link></li>
                </ul>
                <h1 className='logo'><Link to='/'>차곡차곡</Link></h1>
                <div className='userWrapper'>
                    {user ? (
                        <>
                            <span>{user.displayName}<span className='subText'>님 환영합니다</span></span> 
                            <button className='logoutBtn' onClick={logoutEvent}>로그아웃</button>
                        </>
                    ) : (
                        <>
                            <button className='loginBtn' onClick={()=>navigate('/login')}>로그인</button>
                            <button className='signupBtn' onClick={()=>navigate('/signup')}>회원가입</button>
                        </>
                    )}
                </div>
            </nav>
        </HeaderContainer>
    )
}

export default Nav

const HeaderContainer = styled.header`
    background-color: #0c4825;
    color: #f9f7eb;
    cursor: pointer;
    position: fixed;
    top:0;
    width: 100%;
    font-size: 18px;
    z-index: 999;
    a, button{
        color: #f9f7eb;
    }
    nav{
        max-width : 1200px;
        margin: 0px auto;
        padding : 40px 10%;
        display: flex;
        justify-content: space-between;
        ul{
            display: flex;
            gap : 50px;
            li, a{
                &:hover{
                    color: #FFD700;
                }
            }
        }
        .logo{
            font-family: logo;
            font-size: 24px;
            font-weight: lighter;
        }
        .userWrapper{
            display: flex;
            align-items: center;
            gap: 20px;
            button{
                &:hover{
                    color: #FFD700;
                }
            }
            span{
                cursor: default;
                font-size: 16px;
                .subText{
                    font-size: 14px;
                }
            }
        }
    }
    
`
