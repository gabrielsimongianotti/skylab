import styled from 'styled-components';

export const Container = styled.div`
  background: #312e38;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  display:flex;

  & + div{
    margin-top: 8px;
  }

  input {
    flex:1;
    background:transparent;
    color:#F4EDE8;
    border:0;

    &::placeholder {
      color:#777360
    }


  }

  svg {
    margin-right: 16px;
  }

`;
