import React, { useRef } from 'react';
import { Image, View, KeyboardAvoidingView, ScrollView, Platform, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { goBack } = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

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
              <Title>Crie sua conta</Title>
            </View>
            <Form ref={formRef} onSubmit={() => { }}>
              <Input
                autoCapitalize="words"
                returnKeyType='next'
                name='name'
                icon='user'
                placeholder='Nome'
                onSubmitEditing={() => {
                  emailInputRef.current?.focus();
                }}
              />

              <Input
                ref={emailInputRef}
                keyboardType='email-address'
                returnKeyType='next'
                autoCorrect={false}
                autoCapitalize='none'
                name='email'
                icon='mail'
                placeholder='Email'
                onSubmitEditing={() => {
                  passwordInputRef.current?.focus();
                }}
              />

              <Input
                ref={passwordInputRef}
                secureTextEntry
                returnKeyType='send'
                onSubmitEditing={() => { formRef.current?.submitForm }}
                name='password'
                icon='lock'
                placeholder='Senha'
              />

            </Form>
            <Button onPress={() => { formRef.current?.submitForm }}>Entrar</Button>
          </Container>
        </ScrollView>
        <BackToSignIn onPress={() => { goBack() }}>

          <Icon name='arrow-left' size={20} color="#fff" />

          <BackToSignInText>Voltar para login</BackToSignInText>

        </BackToSignIn>

      </KeyboardAvoidingView>

    </>
  );
}

export default SignUp;
