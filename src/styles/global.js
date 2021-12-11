import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

    * {
        margin: 0; 
        padding: 0; 
        outline: none; 
        box-sizing: border-box; 
    } 

    html, body, #root {
        height: 100%
    }

    body {
        font-family: 'Montserrat', sans-serif; 
        background: #565554; 
        color: #FFFFF3; 
        -webkit-font-smoothing: antialiased !important;
    } 

    a {
        text-decoration: none;
    }

    ul {
        list-style: none; 
    }
`;

export default GlobalStyle;
