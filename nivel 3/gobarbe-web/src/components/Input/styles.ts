import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #312e38;
  border-radius: 10px;
  border: 2px solid #232129;
  padding: 16px;
  width: 100%;
  display:flex;

  & + div{
    margin-top: 8px;
  }

  ${props => props.isFocused && css`
    color: #ff9000;
    border-color: #ff9000;
  `}

  ${props=> props.isFilled && css`
    color: #ff9000;
  `}

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