import { inject, injectable } from 'tsyringe';

// import IUser from '@modules/users/infra/typeorm/entities/Users';
// import AppError from '@shared/erros/AppError';
import IMailProvider from '@shared/container/provider/EmailProvider/models/IEmailProvider';
import IUsersRepository from '../repositories/IUsersRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequestDTO): Promise<void> {
    this.mailProvider.sendMail(email, 'pedido de recuperação de senha ');
  }
}

export default CreateUserService;
