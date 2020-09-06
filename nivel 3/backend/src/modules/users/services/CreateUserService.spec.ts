import AppError from '@shared/erros/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

describe('Create user', () => {
  it('should be able to createa new appointment', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to createa two user on the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    await expect(
      createUser.execute({
        name: 'gatao',
        email: 'gatao@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
