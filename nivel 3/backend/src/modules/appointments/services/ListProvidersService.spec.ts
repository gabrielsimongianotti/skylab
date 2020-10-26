import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeCacheRepository from '@shared/container/provider/CacheProvider/fakes/FakeCacheProvider';

import ListProvidersService from './ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProvider: ListProvidersService;
let fakeCacheRepository: FakeCacheRepository;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeCacheRepository = new FakeCacheRepository();

    listProvider = new ListProvidersService(
      fakeUserRepository,
      fakeCacheRepository,
    );
  });

  it('should be able to list the profile', async () => {
    const user1 = await fakeUserRepository.create({
      name: 'gatao',
      email: 'gat@gmail.com',
      password: '1234567',
    });

    const user2 = await fakeUserRepository.create({
      name: 'gatao',
      email: 'ga@gmail.com',
      password: '1234567',
    });

    const loggerdUser = await fakeUserRepository.create({
      name: 'gatao',
      email: 'gatao@gmail.com',
      password: '1234567',
    });
    const provider = await listProvider.execute({
      user_id: loggerdUser.id,
    });

    expect(provider).toEqual([user1, user2]);
  });
});
