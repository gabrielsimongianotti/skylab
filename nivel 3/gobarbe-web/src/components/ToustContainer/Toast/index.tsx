import React, { useEffect } from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiXCircle } from 'react-icons/fi';

import { ToastMessage, useToast } from '../../../hooks/toast'
import { Container } from './styles';

interface ToastsData {
  message: ToastMessage;
  style: object;
}

const icons = {
  info: <FiInfo size={24} />,
  success: <FiAlertCircle size={24} />,
  error: <FiCheckCircle size={24} />,
}

const Toast: React.FC<ToastsData> = ({ message, style }) => {
  const { removeToast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => {
      removeToast(message.id);
    }, 3000)

    return () => {
      clearTimeout(timer);
    }
  }, [removeToast, message.id])

  return (
    <Container key={message.id} type={message.type} hasDescription={!!message.description} style={style}>
      {icons[message.type || 'info']}
      <div>
        <strong>{message.title}</strong>
        {message.description && <p>{message.description}</p>}
        <button onClick={() => removeToast(message.id)} type='button'>
          <FiXCircle size={18} />
        </button>
      </div>
    </Container>
  )
};
export default Toast;