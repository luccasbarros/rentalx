import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";

interface IUsersTokensRepository {
  create({ expires_date, user_id, refresh_token }: ICreateUserTokenDTO);
}

export { IUsersTokensRepository };
