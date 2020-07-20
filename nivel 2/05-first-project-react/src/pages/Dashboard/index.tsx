import React, { useState, useEffect, FormEvent } from "react";
import { FiChevronsRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import logoImg from "../../assets/logo.svg";

import { Title, Form, Repositories, Error } from "./styles";
import api from "../../services/api";

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState("");
  const [inputError, setInputError] = useState("")
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storegedRepositories = localStorage.getItem("@GithubExplorer:repositories");

    if (storegedRepositories) {
      return JSON.parse(storegedRepositories);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("@GithubExplorer:repositories", JSON.stringify(repositories))
  }, [repositories])

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError("Digite autor/nome do repositorio");
      return;
    }
    try {
      const response = await api.get(`repos/${newRepo}`);

      const repository = response.data

      setRepositories([...repositories, repository])
      setNewRepo("")
      setInputError("")
    }
    catch (err) {
      setInputError("Error na busca por esse repositorio");
    }
  }

  return (
    <>
      <img src={logoImg} alt="github exploer" />
      <Title>Explotre repositorios no github</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          placeholder="Digite o nome do repositorio"
          onChange={(e) => setNewRepo(e.target.value)}
        />
        <button>Pesquisar</button>
      </Form>
      {inputError && <Error>{inputError}</Error>}
      <Repositories>
        {
          repositories.map(repository => (
            <Link key={repository.full_name} to={`repository/${repository.full_name}`}>
              <img
                src={repository.owner.avatar_url}
                alt={repository.owner.login}
              />
              <div>
                <strong>{repository.full_name}</strong> 
                <p>{repository.description}</p>
              </div>
              <FiChevronsRight size={20} />
            </Link>
          ))
        }
      </Repositories>


    </>
  );
}

export default Dashboard;