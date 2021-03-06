import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';
import getValidationErrors from '../../utils/getValidationError';

import { useAuth } from '../../hooks/auto';
import { useToast } from '../../hooks/toast';

import { Container, Content, AnimationContainer, Background } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}
const SignIn: React.FC = () => {
  const fromRef = useRef<FormHandles>(null);

  const { signIn } = useAuth();
  const { addToast } = useToast();
  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      const schama = Yup.object().shape({
        email: Yup.string().required('Email obrigatorio').email('Digite um email valido'),
        password: Yup.string().required('Senha obrigatoria')
      });

      await schama.validate(data, { abortEarly: false })
      await signIn({
        email: data.email,
        password: data.password,
      })
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        fromRef.current?.setErrors(errors);

        return;
      }
      addToast({
        type: 'success',
        title: 'Erro na autenticação',
        description: 'Ocorreu um erro ao fazer login, cheque as credenciais.'
      });
    }

  }, [signIn, addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
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
          <Link to="/signup"> <FiLogIn /> Criar conta</Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
}
export default SignIn;
