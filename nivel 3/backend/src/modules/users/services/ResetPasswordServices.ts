import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';

import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequestDTO {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordServices {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ token, password }: IRequestDTO): Promise<void> {
    const userToken = await this.usersTokenRepository.findByToken(token);

    if (!userToken) throw new AppError('User token does not exists');

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) throw new AppError('User does not exists');

    const tokenCreatedAt = userToken.created_at;
    const capareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), capareDate)) throw new AppError('Token expired');

    user.password = await this.hashProvider.generateHash(password);

    this.usersRepository.save(user);
  }
}

export default ResetPasswordServices;
