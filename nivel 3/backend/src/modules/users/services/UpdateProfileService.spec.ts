import AppError from '@shared/erros/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';

import UpdateProfileService from './UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able update the profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'Gatao',
      email: 'Gatao@gmail.com',
      old_password: '1234567',
    });

    expect(updateUser.name).toBe('Gatao');
    expect(updateUser.email).toBe('Gatao@gmail.com');
    // expect(updateUser.password).toBe('7654321');
  });

  it('should be able to change the another user email', async () => {
    await fakeUserRepository.create({
      name: 'gato',
      email: 'gato@gmail.com',
      password: '1234567',
    });
    const user = await fakeUserRepository.create({
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'Gatao',
        email: 'gato@gmail.com',
        old_password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '123567',
      old_password: '1234567',
    });

    expect(updateUser.password).toBe('123567');
  });

  it('should not be able update the password without olb password', async () => {
    const user = await fakeUserRepository.create({
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'gatao',
        email: 'gatao@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able update the password with incorrect olb password', async () => {
    const user = await fakeUserRepository.create({
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'gatao',
        email: 'gatao@gmail.com',
        old_password: '123567',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
