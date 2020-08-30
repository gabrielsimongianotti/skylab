import AppError from '@shared/erros/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateAppointment', () => {
  it('should be able to createa new appointment', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    const user = await createUser.execute({
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to createa two user on the same email', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUsersRepository);

    await createUser.execute({
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '1234567',
    });

    expect(
      createUser.execute({
        name: 'gatao',
        email: 'gatao@gmail.com',
        password: '1234567',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
