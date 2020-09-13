import { inject, injectable } from 'tsyringe';
import IMailProvider from '@shared/container/provider/MailProvider/models/IEmailProvider';
import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUsersTokenRepository from '../repositories/IUsersTokenRepository';

interface IRequestDTO {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('UsersTokenRepository')
    private usersTokenRepository: IUsersTokenRepository,
  ) { }

  public async execute({ email }: IRequestDTO): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (!checkUserExists) throw new AppError('user does not exist.');

    const { token } = await this.usersTokenRepository.generate(
      checkUserExists.id,
    );

    await this.mailProvider.sendMail(
      email,
      `pedido de recuperação de senha  recebido: ${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;
