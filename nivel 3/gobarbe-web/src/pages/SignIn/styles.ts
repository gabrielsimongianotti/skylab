import styled from 'styled-components';
import signInBackgroundImg from '../../assets/sign-in-background.png';

export const Container = styled.div`
  height: 100vh;

  display: flex;
  align-items: stretch;

`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items:center;

  place-content: center;

  width: 100%;
  max-width: 700px;

  form{
    margin: 80px 0;
    width: 340px;
    text-align: center;

    h1{
      margin-botton: 24px;
    }

    input {
      background: #232129;
      border-radius: 10px;
      border: 2px solid #232129;
      padding: 16px;
      width: 100%;

      & + input{
        margin-top: 8px;
      }
    }

    button{
      background: #ff9000;
      height: 56px;
      border-radius: 10px;
      border: 0px;
      padding: 0 16px;
      width: 100%;
      color: #312e38;
    }
  }
`;

export const Background = styled.div`
  flex: 1;
  background: url(${signInBackgroundImg})no-repeat center;
  background-size: cover;

`;
