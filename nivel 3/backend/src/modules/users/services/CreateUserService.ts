import { hash } from 'bcryptjs';
import { inject, injectable } from "tsyringe";

import IUser from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/erros/AppError';
import IUsersRepository from "../repositories/IUsersRepository";

interface IRequestDTO {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(@inject('UsersRepository') private usersRepository: IUsersRepository) { }

  public async execute({ name, email, password }: IRequestDTO): Promise<IUser> {

    const checkSameEmail = await this.usersRepository.findByEmail(email);

    if (checkSameEmail) {
      throw new AppError('This e-mail is already registered.');
    }

    const hashedPassword = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
