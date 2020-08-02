import React, { useCallback, useRef, useContext } from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationError';
import { AuthContext } from '../../context/AutoContext';

import { Container, Content, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const fromRef = useRef<FormHandles>(null);

  const { user, signIn } = useContext(AuthContext);

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      const schama = Yup.object().shape({
        email: Yup.string().required('Email obrigatorio').email('Digite um email valido'),
        password: Yup.string().required('Senha obrigatoria')
      });

      await schama.validate(data, { abortEarly: false })
      signIn({
        email: data.email,
        password: data.password,
      })
    } catch (err) {
      const errors = getValidationErrors(err);

      fromRef.current?.setErrors(errors);
    }

  }, [signIn]);

  return (
    <Container>
      <Content>
        <img src={logoImg} alt="Gobarber" />
        <Form ref={fromRef}
        initialData={{ email: "gabrielgianotti@outlook.com", password: "1234567" }}
         onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          <Input name="email" icon={FiMail} placeholder="E-mail" />

          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

          <Button type="submit">Entrar</Button>

          <a href="forgot">Esquici minha senha</a>
        </Form>
        <a href=""> <FiLogIn /> Criar conta</a>
      </Content>
      <Background />
    </Container>
  );
}
export default SignIn;
