import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
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
  ${props => props.isErrored && css`
    color:#c53030;
    border-color: #c53030;
  `}

  ${props => props.isFocused && css`
    color: #ff9000;
    border-color: #ff9000;
  `}

  ${props => props.isFilled && css`
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

export const Error = styled(Tooltip)`
  height:20px;
  margin-left: 16px;

  svg {
    margin:0;
  }

  span{
    background:#c53030;
    color: #fff;

    &::before{
      border-color:#c53030 transparent;
    }
  }


`;
