import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

function Nav() {
    return (
        <HeaderContainer >
            <nav>
                <ul>
                    <li><Link to='/mybook'>기록함</Link></li>
                    <li><Link to='/phrase'>한마디</Link></li>
                </ul>
                <h1 className='logo'><Link to='/'>ㅊㄱㅊㄱ</Link></h1>
                <div className='userWrapper'>
                    <button><Link to='/login'>LogIn</Link></button>
                    <button><Link to='/signup'>SignUp</Link></button>
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
