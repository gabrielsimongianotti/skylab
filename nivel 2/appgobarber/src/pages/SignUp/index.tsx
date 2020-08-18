import React, { useRef, useCallback } from 'react';
import { Image, View, KeyboardAvoidingView, ScrollView, Platform, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Container, Title, BackToSignIn, BackToSignInText } from './styles';
import Icon from 'react-native-vector-icons/Feather';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from "yup";

import getValidationErrors from '../../utils/getValidationError';
import api from '../../server/api';

import Input from '../../components/Input';
import Button from '../../components/Button';
import logoImg from '../../assets/logo.png';

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { goBack } = useNavigation();

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  interface SignUpFormData {
    email: string;
    password: string;
  }

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    try {
      const schama = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string().required('Email obrigatorio').email('Digite um email valido'),
        password: Yup.string().min(6, 'No mínimo  6 digitos')
      });

      await schama.validate(data, { abortEarly: false })

      api.post('/data',data);
      goBack();

      Alert.alert("cadastrado com sucesso!","Você ja pode fazer login na aplicação")
    } catch (err) {
      const errors = getValidationErrors(err);

      formRef.current?.setErrors(errors);

      Alert.alert('Erro na autenticação', 'Ocorreu um erro ao fazer login, cheque as credenciais.')
    }
  }, [])


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
            <Form ref={formRef} onSubmit={handleSignUp}>
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
                onSubmitEditing={() => { formRef.current?.submitForm() }}
                name='password'
                icon='lock'
                placeholder='Senha'
              />

            </Form>
            <Button onPress={() => { formRef.current?.submitForm() }}>Entrar</Button>
          </Container>
        </ScrollView>
        <BackToSignIn onPress={() => { formRef.current?.submitForm() }}>

          <Icon name='arrow-left' size={20} color="#fff" />

          <BackToSignInText>Voltar para login</BackToSignInText>

        </BackToSignIn>

      </KeyboardAvoidingView>

    </>
  );
}

export default SignUp;
