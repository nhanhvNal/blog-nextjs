 
 
import V1 from './v1';
import UserService from './UsersService';

const { client } = new V1();

export const userService = new UserService(client, 'users');
