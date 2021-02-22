import { useRoute } from '@react-navigation/native';
import React from 'react';

import { useAuth } from '../../hooks/auth'
import { Container } from './styles';

interface RouteParams {
  providerId: string;
}
const CreateAppointment: React.FC = () => {
  const route = useRoute();
  const { signOut } = useAuth();
  return (
    <Container />
  );
}
export default CreateAppointment;
