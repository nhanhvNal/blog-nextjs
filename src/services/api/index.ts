import V1 from "./v1";
import UserService from "./UsersService";
import PostService from "./PostService";

const { client } = new V1();

export const userService = new UserService(client, "users");
export const postService = new PostService(client, "posts");
