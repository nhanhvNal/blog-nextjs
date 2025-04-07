import V1 from "./v1";
import UserService from "./UsersService";
import PostService from "./PostService";
import CommentService from "./CommentService";
import AboutService from "./AboutService";

const { client } = new V1();

export const userService = new UserService(client, "users");
export const postService = new PostService(client, "posts");
export const commentService = new CommentService(client, "comments");
export const aboutService = new AboutService(client, "about");
