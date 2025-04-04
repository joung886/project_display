// src/styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0; padding: 0; box-sizing: border-box;
  }
  body {
    font-family: 'Pretendard', sans-serif;
    background-color: #fff;
    color: #222;
  }
`;

export default GlobalStyle;
