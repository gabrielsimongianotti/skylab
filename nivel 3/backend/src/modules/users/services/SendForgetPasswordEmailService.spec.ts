// import AppError from '@shared/erros/AppError';
import FakeEmailProvider from '@shared/container/provider/EmailProvider/fakes/FakeEmailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import SendForgetPassWordEmailService from './SendForgetPasswordEmailService';

describe('send forgot password email', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeEmailProvider = new FakeEmailProvider();

    const sendMail = jest.spyOn(fakeEmailProvider, 'sendMail');

    const sendForgetPasswordEmailService = new SendForgetPassWordEmailService(
      fakeUsersRepository,
      fakeEmailProvider,
    );

    await fakeUsersRepository.create({
      name: 'gatão',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    await sendForgetPasswordEmailService.execute({ email: 'gatao@gmail.com' });

    expect(sendMail).toHaveBeenCalled();
  });
});
