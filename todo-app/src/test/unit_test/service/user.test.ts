import expect from "expect";
import sinon from "sinon";
import * as userService from "../../../service/user";
import * as userModel from "../../../model/user";
import loggerWithNameSpace from "../../../utils/logger";
import { IUser } from "../../../interface/user";

describe("User Service Test Suite", () => {
  let loggerStub: sinon.SinonStub;

  before(() => {
    loggerStub = sinon.stub(loggerWithNameSpace("User Service"), "info");
  });

  after(() => {
    loggerStub.restore();
  });

  describe("getUsers", () => {
    let userModelGetUsersStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUsersStub = sinon.stub(userModel, "getUsers");
    });

    afterEach(() => {
      userModelGetUsersStub.restore();
    });

    it("Should return all users", () => {
      const users = [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@example.com",
          password: "password123",
          permissions: [],
        },
      ];
      userModelGetUsersStub.returns(users);

      const result = userService.getUsers();
      expect(result).toEqual(users);
    });
  });

  describe("getUserById", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(userModel, "getUserById");
    });

    afterEach(() => {
      userModelGetUserByIdStub.restore();
    });

    it("Should return user if user is found", () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        permissions: [],
      };
      userModelGetUserByIdStub.withArgs("1").returns(user);

      const result = userService.getUserById("1");
      expect(result).toEqual(user);
    });

    it("Should return undefined if user is not found", () => {
      userModelGetUserByIdStub.withArgs("2").returns(undefined);

      const result = userService.getUserById("2");
      expect(result).toBeUndefined();
    });
  });

  describe("createUser", () => {
    let userModelCreateUserStub: sinon.SinonStub;

    beforeEach(() => {
      userModelCreateUserStub = sinon.stub(userModel, "createUser");
    });

    afterEach(() => {
      userModelCreateUserStub.restore();
    });

    it("Should create a new user", () => {
      const newUser = {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "password123",
        permissions: [],
      };
      userModelCreateUserStub.returns({ id: "2", ...newUser });

      const result = userService.createUser(newUser);
      expect(result).toEqual({ id: "2", ...newUser });
    });
  });

  describe("getUserByEmail", () => {
    let userModelGetUserByEmailStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByEmailStub = sinon.stub(userModel, "getUserByEmail");
    });

    afterEach(() => {
      userModelGetUserByEmailStub.restore();
    });

    it("Should return user if email is found", () => {
      const user = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        permissions: [],
      };
      userModelGetUserByEmailStub
        .withArgs("john.doe@example.com")
        .returns(user);

      const result = userService.getUserByEmail("john.doe@example.com");
      expect(result).toEqual(user);
    });

    it("Should return undefined if email is not found", () => {
      userModelGetUserByEmailStub
        .withArgs("jane.doe@example.com")
        .returns(undefined);

      const result = userService.getUserByEmail("jane.doe@example.com");
      expect(result).toBeUndefined();
    });
  });

  describe("updateUser", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;
    let userModelUpdateUserStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(userModel, "getUserById");
      userModelUpdateUserStub = sinon.stub(userModel, "updateUser");
    });

    afterEach(() => {
      userModelGetUserByIdStub.restore();
      userModelUpdateUserStub.restore();
    });

    it("Should update user if user exists", () => {
      const userToUpdate: IUser = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        permissions: [],
      };
      const updatedUser: Omit<IUser, "id"> = {
        name: "John Smith",
        email: "john.smith@example.com",
        password: "newpassword123",
        permissions: [],
      };
      userModelGetUserByIdStub.withArgs("1").returns(userToUpdate);
      userModelUpdateUserStub
        .withArgs("1", updatedUser)
        .returns({ id: "1", ...updatedUser });

      const result = userService.updateUser("1", updatedUser);
      expect(result).toEqual({ id: "1", ...updatedUser });
    });

    it("Should return undefined if user does not exist", () => {
      userModelGetUserByIdStub.withArgs("2").returns(undefined);

      const result = userService.updateUser("2", {
        name: "Jane Doe",
        email: "jane.doe@example.com",
        password: "password123",
        permissions: [],
      });
      expect(result).toBeUndefined();
    });
  });

  describe("deleteUser", () => {
    let userModelGetUserByIdStub: sinon.SinonStub;
    let userModelDeleteUserStub: sinon.SinonStub;

    beforeEach(() => {
      userModelGetUserByIdStub = sinon.stub(userModel, "getUserById");
      userModelDeleteUserStub = sinon.stub(userModel, "deleteUser");
    });

    afterEach(() => {
      userModelGetUserByIdStub.restore();
      userModelDeleteUserStub.restore();
    });

    it("Should delete user if user exists", () => {
      const userToDelete: IUser = {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password123",
        permissions: [],
      };
      userModelGetUserByIdStub.withArgs("1").returns(userToDelete);
      userModelDeleteUserStub.withArgs("1").returns(userToDelete);

      const result = userService.deleteUser("1");
      expect(result).toEqual(userToDelete);
    });

    it("Should return undefined if user does not exist", () => {
      userModelGetUserByIdStub.withArgs("2").returns(undefined);

      const result = userService.deleteUser("2");
      expect(result).toBeUndefined();
    });
  });
});
