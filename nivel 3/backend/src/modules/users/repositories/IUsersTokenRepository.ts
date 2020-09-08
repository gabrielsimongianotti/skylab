import UsersToken from '../infra/typeorm/entities/UsersToken';

export default interface IUsersRepository {
  generate(user_id: string): Promise<UsersToken>;
}
