import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { logoutEmail, onUserState } from '../api/firebase';

function Nav() {
    const [user, setUser] = useState();

    const navigate = useNavigate();

    const login = () => {
        navigate('/login')
    }

    const signup = () => {
        navigate('/signup')
    }

    const logout = () => {
        logoutEmail().then(setUser);
    }

    useEffect(() => {
        onUserState((user) => {
            setUser(user);
        })
    }, [])

    return (
        <HeaderContainer >
            <nav>
                <ul>
                    <li><Link to='/mybook'>기록함</Link></li>
                    <li><Link to='/quote'>한마디</Link></li>
                </ul>
                <h1 className='logo'><Link to='/'>ㅊㄱㅊㄱ</Link></h1>
                <div className='userWrapper'>
                    {user ? (
                        <>
                            <span>{user.displayName}</span>
                            <button className='logoutBtn' onClick={logout}>LogOut</button>
                        </>
                    ) : (
                        <>
                            <button className='loginBtn' onClick={login}>LogIn</button>
                            <button className='signupBtn' onClick={signup}>SignUp</button>
                        </>
                    )}

                    
                </div>
            </nav>
        </HeaderContainer>
    )
}

export default Nav

const HeaderContainer = styled.header`
    max-width : 1200px;
    padding : 50px 0px;
    margin : 0px auto;
    a{
        color: black;
    }
    nav{
        display: flex;
        justify-content: space-between;
        ul{
            display: flex;
            gap : 50px;
        }
        .userWrapper{
            display: flex;
            gap: 50px;
        }
    }
`
