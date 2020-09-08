// import AppError from '@shared/erros/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokenRepository';
import ResetPasswordService from './ResetPasswordServices';

let fakeUsersRepository: FakeUsersRepository;
let fakeUsersTokensRepository: FakeUsersTokensRepository;
let resetPassword: ResetPasswordService;

describe('send forgot password email', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersTokensRepository = new FakeUsersTokensRepository();

    resetPassword = new ResetPasswordService(
      fakeUsersRepository,
      fakeUsersTokensRepository,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsersRepository.create({
      name: 'gatão',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    const { token } = await fakeUsersTokensRepository.generate(user.id);

    await resetPassword.execute({ password: '12345678', token });

    const updateUser = await fakeUsersRepository.findById(user.id);

    expect(updateUser?.password).toBe('12345678');
  });
});
