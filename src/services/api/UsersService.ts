import { UserModel } from "@/types/user.model";
import RestService from "./RestService";

export default class UserService extends RestService {
  createUser(
    payload: Partial<UserModel>
  ): Promise<{ data: UserModel } | unknown> {
    return this.create(payload);
  }
}
