import User from "../infra/typeorm/entities/Users";
import ICreateUserDTO from "../dtos/ICreateUsersDTO";

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(date: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
