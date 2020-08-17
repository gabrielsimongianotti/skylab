import React, { useCallback, useRef } from 'react';
import { Image, View, KeyboardAvoidingView, ScrollView, Platform, TextInput } from 'react-native';
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CreateAccountButtonText } from './styles';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import { Form } from '@unform/mobile'
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';

const SignIn: React.FC = () => {
  const { navigate } = useNavigation();
  const formRef = useRef<FormHandles>(null);
  const passwordInputRef = useRef<TextInput>(null);
  const hanbleSignIn = useCallback((data) => { console.log(data) }, []);

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
            <Form ref={formRef} onSubmit={hanbleSignIn}>
              <Input
                autoCorrect={false}
                autoCapitalize="none"
                keyboardType='email-address'
                name='email'
                icon='mail'
                placeholder='E-mail'
                returnKeyType="next"
                onSubmitEditing={() => [
                  passwordInputRef.current?.focus()
                ]}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                name='password'
                icon='lock'
                placeholder='Senha'
                returnKeyType='send'
                onSubmitEditing={() => {
                  formRef.current?.submitForm();
                }}
              />


            </Form>
            <Button onPress={() => { formRef.current?.submitForm() }}>Entrar</Button>
            <ForgotPassword>

              <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>

            </ForgotPassword>

          </Container>
        </ScrollView>
        <CreateAccountButton onPress={() => {
          navigate('SignUp');
          console.log("kj")
        }}>

          <Icon name='log-in' size={20} color="#ff9000" />

          <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>

        </CreateAccountButton>

      </KeyboardAvoidingView>

    </>
  );
}

export default SignIn;
