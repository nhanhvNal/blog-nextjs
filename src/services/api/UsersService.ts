import { UserModel } from "@/types/user.model";
import RestService from "./RestService";
import { User } from "next-auth";

export default class UserService extends RestService<User> {
  createUser(payload: Partial<UserModel & User>) {
    return this.create(payload);
  }
}
