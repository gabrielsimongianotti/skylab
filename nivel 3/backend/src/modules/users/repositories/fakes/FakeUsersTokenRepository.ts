import IUsersTokenRepository from '@modules/users/repositories/IUsersTokenRepository';
import UserToken from '@modules/users/infra/typeorm/entities/UsersToken';
import { uuid } from 'uuidv4';

class FakeUsersTokenRepository implements IUsersTokenRepository {
  private userToken: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
      create_at: new Date(),
      updated_at: new Date(),
    });

    this.userToken.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const userToken = this.userToken.find(
      findToken => findToken.token === token,
    );

    return userToken;
  }
}

export default FakeUsersTokenRepository;
