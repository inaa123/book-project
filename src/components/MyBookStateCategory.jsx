import React, { useState }  from 'react'
import styled from 'styled-components';

function MyBookStateCategory({state, onSelect}) {
    const categories = [
        { name : 'all', text:'전체'},
        { name : 'reading', text: '읽는중'},
        { name : 'done', text : '읽은책'}
    ];

    return (
        <CategoryContainer>
            {categories.map(el => (
                <Category 
                    key={el.name}
                    className={(el.name === state) ? 'active' : ''}
                    onClick={()=>onSelect(el.name)}
                >
                {el.text}
                </Category>
            ))}
            
        </CategoryContainer>
    )
}

export default MyBookStateCategory

const CategoryContainer = styled.div`
    display: flex;
    align-items: center;
`

const Category = styled.div`
  font-size: 16px;
  cursor: pointer;
  white-space: pre;
  padding : 10px 20px;
  &.active{
    border-radius: 30px;
    background : green;
    color: white;
  }
`