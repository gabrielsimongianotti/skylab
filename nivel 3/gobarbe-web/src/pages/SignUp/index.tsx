import React from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';

import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={logoImg} alt="Gobarber" />
      <form>
        <h1>Faça seu cadastro</h1>
        <Input name="name" icon={FiUser} placeholder="Nome" />

        <Input name="email" icon={FiMail} placeholder="E-mail" />

        <Input name="password" icon={FiLock} type="password" placeholder="Senha" />

        <Button type="submit">Cadastrar</Button>

      </form>
      <a href="login"><FiArrowLeft /> Volta para login</a>
    </Content>

  </Container>
);

export default SignUp;
