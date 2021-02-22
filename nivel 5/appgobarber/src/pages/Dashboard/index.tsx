import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { useAuth } from '../../hooks/auth';
import api from '../../services/api'

import { Container, Header, HeaderTitle, UserName, ProfileButton, UserAvatar, ProviderList, ProviderAvatar, ProviderContainer, ProviderName, ProviderInfo, ProviderMeta, ProviderMataText, ProviderListTitle } from './style';

interface IProvider {
  id: string;
  name: string;
  avatar_url: string;
}

const Dashboard: React.FC = () => {
  const { signOut, user } = useAuth();
  const [provider, setProvider] = useState<IProvider[]>([])
  const { navigate } = useNavigation();

  useEffect(() => {
    setProvider([{
      id: '12',
      name: "teste",
      avatar_url: 'https://xesque.rocketseat.dev/users/avatar/profile-12fc6c1c-8e57-4815-a3c3-8e910d031cb8.jpg'
    },
    {
      avatar_url: 'https://xesque.rocketseat.dev/users/avatar/profile-12fc6c1c-8e57-4815-a3c3-8e910d031cb8.jpg',
      id: '1234',
      name: '1'
    },
    {
      avatar_url: 'https://xesque.rocketseat.dev/users/avatar/profile-12fc6c1c-8e57-4815-a3c3-8e910d031cb8.jpg',
      id: '12345',
      name: '2'
    },
    {
      avatar_url: 'https://xesque.rocketseat.dev/users/avatar/profile-12fc6c1c-8e57-4815-a3c3-8e910d031cb8.jpg',
      id: '123456',
      name: '3'
    },
    {
      avatar_url: 'https://xesque.rocketseat.dev/users/avatar/profile-12fc6c1c-8e57-4815-a3c3-8e910d031cb8.jpg',
      id: '1234567',
      name: '5'
    },
    {
      avatar_url: 'https://xesque.rocketseat.dev/users/avatar/profile-12fc6c1c-8e57-4815-a3c3-8e910d031cb8.jpg',
      id: '12345678',
      name: '4'
    },
    {
      avatar_url: 'https://xesque.rocketseat.dev/users/avatar/profile-12fc6c1c-8e57-4815-a3c3-8e910d031cb8.jpg',
      id: '123456789',
      name: '5'
    },
    {
      avatar_url: 'https://xesque.rocketseat.dev/users/avatar/profile-12fc6c1c-8e57-4815-a3c3-8e910d031cb8.jpg',
      id: '1234567890',
      name: 'ojioi'
    },
    ])
  }, [])

  const navigateToProfile = useCallback(() => {
    navigate('Provider');
  }, [signOut]);

  const navigateToCreateAppointment = useCallback((providerId: string) => {
    navigate('CreateAppointment',{providerId});
  }, [navigate]);

  return (
    <Container >
      <Header>
        <HeaderTitle>
          Bem vindo, {"\n"}
          <UserName>Diego Fernandes</UserName>
        </HeaderTitle>

        <ProfileButton onPress={() => { navigateToProfile(); }}>
          <UserAvatar source={{ uri: 'https://xesque.rocketseat.dev/users/avatar/profile-12fc6c1c-8e57-4815-a3c3-8e910d031cb8.jpg' }} />
        </ProfileButton>
      </Header>
      <ProviderList
        data={provider}
        keyExtractor={(provider) => provider.id}
        ListHeaderComponent={
          <ProviderListTitle>Cabeleireiros</ProviderListTitle>
        }
        renderItem={({ item: provider }) => (
          <ProviderContainer onPress={() => {navigateToCreateAppointment(provider.id) }}>
            <ProviderAvatar source={{ uri: provider.avatar_url }} />
            <ProviderInfo>
              <ProviderName>{provider.name}</ProviderName>
              <ProviderMeta>
                <Icon name='calendar' size={14} color='#ff9000' />
                <ProviderMataText>Segunda a sexta</ProviderMataText>
              </ProviderMeta>
              <ProviderMeta>
                <Icon name='clock' size={14} color='#ff9000' />
                <ProviderMataText>8h as 18h</ProviderMataText>
              </ProviderMeta>
            </ProviderInfo>
          </ProviderContainer>
        )} />
    </Container>
  );
}
export default Dashboard;
