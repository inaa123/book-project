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
                <div className='logo'>
                    <h1 ><Link to='/'>차곡차곡</Link></h1>
                </div>
                <div className='userWrapper'>
                    {user ? (
                        <div>
                            <span>{user.displayName}님<span className='subText'>환영합니다</span></span> 
                            <button className='logoutBtn' onClick={logoutEvent}>로그아웃</button>
                        </div>
                    ) : (
                        <div>
                            <button className='loginBtn' onClick={()=>navigate('/login')}>로그인</button>
                            <button className='signupBtn' onClick={()=>navigate('/signup')}>회원가입</button>
                        </div>
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
        display: flex;
        justify-content: space-around;
        max-width : 1200px;
        margin: 0px auto;
        padding : 40px 10%;
        display: flex;
        justify-content: space-between;
        align-items: center;
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
            div{
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
    }

    @media screen and (max-width : 768px){
        nav{
            ul{
                gap: 10px;
                font-size: 14px;
            }
        }
        .userWrapper{
            span{
                .subText{
                    display: none;
                }
            }
        }
    }

    @media screen and (max-width: 428px){
        nav{
            .logo{
                font-size: 18px;
            }
        }
    }
    
`
