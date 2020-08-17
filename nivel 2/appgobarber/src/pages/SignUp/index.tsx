import React, { useRef } from 'react';
import { Image, View, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
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
              <Input name='name' icon='user' placeholder='Nome' />

              <Input name='email' icon='mail' placeholder='Email' />

              <Input name='password' icon='lock' placeholder='Senha' />

            </Form>
            <Button onPress={() => { console.log("é nois") }}>Entrar</Button>
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
