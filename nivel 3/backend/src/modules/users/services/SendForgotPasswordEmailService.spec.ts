import AppError from '@shared/erros/AppError';
import FakeEmailProvider from '@shared/container/provider/EmailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import SendForgetPassWordEmailService from './SendForgotPasswordEmailService';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokenRepository';

let fakeUsersRepository: FakeUsersRepository;
let fakeEmailProvider: FakeEmailProvider;
let fakeUsersTokens: FakeUsersTokensRepository;
let sendForgotPasswordEmail: SendForgetPassWordEmailService;

describe('send forgot password email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeEmailProvider = new FakeEmailProvider();
    fakeUsersTokens = new FakeUsersTokensRepository();

    sendForgotPasswordEmail = new SendForgetPassWordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
      fakeUsersTokens,
    );
  });

  it('should be able to recover the password using the email', async () => {
    const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

    await fakeUsersRepository.create({
      name: 'gatão',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    await sendForgotPasswordEmail.execute({ email: 'gatao@gmail.com' });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not a be able to recover a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmail.execute({
        email: 'gatao@gmail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should generate a forget password token', async () => {
    const generateToken = jest.spyOn(fakeUsersTokens, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'gatão',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    await sendForgotPasswordEmail.execute({ email: 'gatao@gmail.com' });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
