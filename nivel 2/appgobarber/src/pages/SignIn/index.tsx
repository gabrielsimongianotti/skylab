import React from 'react';
import { Image, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled
      >
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Image source={logoImg} />
            <View>
              <Title>Faça seu login</Title>
            </View>
            <Input name='email' icon='mail' placeholder='Email' />

            <Input name='password' icon='lock' placeholder='Senha' />

            <Button onPress={() => { console.log("é nois") }}>Entrar</Button>
            <ForgotPassword>

              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>

            </ForgotPassword>

          </Container>
        </ScrollView>
        <CreateAccountButton onPress={() => { navigate('SignUp')}}>

          <Icon name='log-in' size={20} color="#ff9000" />

          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>

        </CreateAccountButton>

      </KeyboardAvoidingView>

    </>
  );
}

export default SignIn;
