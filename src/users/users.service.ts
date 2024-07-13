import { Injectable } from '@nestjs/common';

interface User {
  id: number;
  username: string;
  password: string;
}

@Injectable()
export class UsersService {
  private readonly users: User[] = [
    {
      id: 1,
      username: 'user',
      password: 'password',
    },
  ];

  findByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
