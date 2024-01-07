import React  from 'react'
import styled from 'styled-components';

function MyBookStateCategory({state, onSelect}) {
    const categories = [
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
                    >{el.text}</Category>
            ))}
        </CategoryContainer>
    )
}

export default MyBookStateCategory

const CategoryContainer = styled.div`
    display: flex;
`

const Category = styled.div`
    font-size: 1.125rem;
  cursor: pointer;
  white-space: pre;
  text-decoration: none;
  color: inherit;
  padding-bottom: 0.25rem;
 
  /* &:hover {
    color: #495057;
  } */
  &.active{
    font-weight: bold;
      &:hover {
        font-weight: bold;
      }
  }
`