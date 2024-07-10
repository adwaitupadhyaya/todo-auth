import { IUser } from "../interface/user";

let users: IUser[] = [
  {
    name: "adw8",
    email: "adw8@gmail.com",
    password: "$2b$10$N5zpXnpAd9yqwebahVEYHeT2APESXkefOkCLwb3484TLirasXMDqe",
    id: "1",
    permissions: ["superAdmin"],
  },
  {
    name: "adw",
    email: "adw@gmail.com",
    password: "$2b$10$N5zpXnpAd9yqwebahVEYHeT2APESXkefOkCLwb3484TLirasXMDqe",
    id: "2",
    permissions: [""],
  },
];

export function getUsers() {
  return users;
}

export function getUserById(id: string) {
  return users.find(({ id: userId }) => userId === id);
}

export function getUserByEmail(email: string) {
  return users.find(({ email: userEmail }) => userEmail === email);
}

export function createUser(
  body: Pick<IUser, "name" | "email" | "password" | "permissions">
) {
  users.push({ ...body, id: `${users.length + 1}` });
}

export function updateUser(id: string, body: Omit<IUser, "id">) {
  return (users = users.map((element) => {
    if (element.id === id) {
      element = { id, ...body };
      return element;
    }
    return element;
  }));
}

export function deleteUser(id: string) {
  return (users = users.filter((element) => element.id !== id));
}
