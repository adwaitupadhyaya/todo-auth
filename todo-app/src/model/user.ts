import { IUser } from "../interface/user";

const users: IUser[] = [
  {
    name: "user1",
    email: "user1@g.com",
    password: "$2b$10$N5zpXnpAd9yqwebahVEYHeT2APESXkefOkCLwb3484TLirasXMDqe",
    id: "1",
  },
];

export function getUsers() {
  return users;
}

export function getUserByEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail === email);
}

export function createUser(body: Pick<IUser, "name" | "email" | "password">) {
  users.push({ ...body, id: `${users.length + 1}` });
}
