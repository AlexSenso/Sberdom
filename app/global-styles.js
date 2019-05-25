import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html,
  body {
    height: 100%;
    width: 100%;
  }

  body {
    font-family: OpenSans;
  }

  body.fontLoaded {
    font-family: OpenSans;
  }

  #app {
    background-color: #fafafa;
    min-height: 100%;
    min-width: 100%;
  }

  p,
  label {
    font-family: Georgia, Times, 'Times New Roman', serif;
    line-height: 1.5em;
  }
  
  .wrapper {
    width: 100%;
    max-width: 970px;
    margin: 0 auto;
    padding: 0 15px;
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
