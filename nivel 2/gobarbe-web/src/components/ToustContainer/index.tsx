import React from 'react';
import { useTransition } from 'react-spring';

import { Container } from './styles';
import { ToastMessage } from '../../hooks/toast';
import Toasts from './Toast';

interface ToastContainerProps {
  messages: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(messages, message => message.id, { from: { right: "-120%" }, enter: { right: '0%' }, leave: { right: '-120%' } })
  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
      <Toasts
        style={props}
        key={key}
        message={item}
      />
      ))}
    </Container>
  )
}

export default ToastContainer;
