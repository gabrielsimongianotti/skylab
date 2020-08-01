import React, { useCallback } from 'react';
import { FiArrowLeft, FiLock, FiMail, FiUser } from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import LogoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schama = Yup.object().shape({
        name: Yup.string().required('Nome obrigatorio'),
        email: Yup.string().required('Email obrigatorio').email('Digite um email valido'),
        password: Yup.string().min(6, 'No mínimo  6 digitos')
      });

      await schama.validate(data, { abortEarly: true })
    } catch (err) {
      console.log(err)
    }
    console.log(data)
  }, [])

  return (
    <Container>
      <Background />
      <Content>
        <img src={LogoImg} alt="Gobarber" />

        <Form initialData={{ name: "gabriel", email: "gabrielgianotti@gmail.com", password: "12345678" }} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} type="password" placeholder="Senha" />
          <Button type="submit">Cadastrar</Button>
        </Form>

        <a href="login"><FiArrowLeft /> Volta para login</a>
      </Content>

    </Container>
  );
}

export default SignUp;
