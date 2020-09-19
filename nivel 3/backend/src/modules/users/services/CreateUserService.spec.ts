import AppError from '@shared/erros/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('Create user', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });
  it('should be able to createa new appointment', async () => {
    const user = await createUser.execute({
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to createa two user on the same email', async () => {
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
