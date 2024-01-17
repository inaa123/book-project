import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    /* v2.0 | 20110126
    http://meyerweb.com/eric/tools/css/reset/ 
    License: none (public domain)
    */
    html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    /* font: inherit; */
    vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
    display: block;
    }
    body {
    line-height: 1;
    }
    ol, ul {
    list-style: none;
    }
    blockquote, q {
    quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
    content: '';
    content: none;
    }
    table {
    border-collapse: collapse;
    border-spacing: 0;
    }
    a{
    text-decoration: none;
    }
    img{
    display: block;
    width: 100%;
    }

    button{
        border: none;
        outline: none;
        background: transparent;
        cursor: pointer;
        font-family : 'Pretendard';
    }
    body{
        background-color: #f9f7eb;
        font-family : 'Pretendard';
        overflow-y : scroll;
        -ms-overflow-style: none;  // 인터넷 익스플로어
        scrollbar-width: none; // 파이어폭스
    }
    ::-webkit-scrollbar {
        display: none; //크롬, 사파리, 오페라, 엣지
    }
    
    input{
        background: transparent;
        border : none;
        font-family : 'Pretendard'
    }
    .container{
        max-width : 1200px;
        margin: 50px auto;
        padding : 100px 5%;
        border-radius: 10px;
    }
`



export default GlobalStyle;