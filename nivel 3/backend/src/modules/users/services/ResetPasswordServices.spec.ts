import AppError from '@shared/erros/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeUsersTokensRepository from '../repositories/fakes/FakeUsersTokenRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import ResetPasswordService from './ResetPasswordServices';

let fakeUsers: FakeUsersRepository;
let fakeUsersTokens: FakeUsersTokensRepository;
let fakeHashProvider: FakeHashProvider;
let resetPassword: ResetPasswordService;

describe('send forgot password email', () => {
  beforeEach(() => {
    fakeUsers = new FakeUsersRepository();
    fakeUsersTokens = new FakeUsersTokensRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPassword = new ResetPasswordService(
      fakeUsers,
      fakeUsersTokens,
      fakeHashProvider,
    );
  });

  it('should be able to reset the password', async () => {
    const user = await fakeUsers.create({
      name: 'gatão',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');
    const { token } = await fakeUsersTokens.generate(user.id);

    await resetPassword.execute({ password: '12345678', token });

    const updateUser = await fakeUsers.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith(updateUser?.password);
    expect(updateUser?.password).toBe('12345678');
  });

  it('should not be able to reeset the password with non-existen token', async () => {
    await expect(
      resetPassword.execute({
        token: 'non-existing-token',
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reeset the password with non-existen user', async () => {
    const { token } = await fakeUsersTokens.generate('blablabla');

    await expect(
      resetPassword.execute({
        token,
        password: '12345678',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset password if passed more than 2 hours', async () => {
    const user = await fakeUsers.create({
      name: 'gatão',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    const { token } = await fakeUsersTokens.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPassword.execute({
        password: '1234567890',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
