import { compareSync, genSaltSync, hashSync } from "bcrypt-nodejs";
import { getRepository } from "typeorm";
import { UserInterface, UserLoginInterface } from "../interfaces/interfaces";
import { User } from "../models/User.entity";
import { buildResponse } from "../utils/helpers";
import { buildJWT } from "../utils/security";

export default class UserService {
  private userRepo = getRepository(User);

  async createUser(userData: UserInterface) {
    try {
      const password = this.hashPassword(userData.password);
      userData.password = password;
      let user = this.userRepo.create(userData);
      user = await this.userRepo.save(user);

      return buildResponse(200, true, {
        message: "User created successfully.",
      });
    } catch (error) {
      console.log(error);
      if (error.code === "23505") {
        return buildResponse(
          400,
          false,
          null,
          "User with given email already exist."
        );
      }

      return buildResponse(
        500,
        false,
        null,
        "Error while registering new user"
      );
    }
  }

  async loginUser(loginDetails: UserLoginInterface) {
    try {
      const user = await this.userRepo.findOne({
        where: { email: loginDetails.email },
        select: ["id", "email", "password", "role", "firstName", "lastName"],
      });
      if (!user) {
        return buildResponse(400, false, null, "Invalid email or password");
      }

      if (!compareSync(loginDetails.password, user.password)) {
        return buildResponse(400, false, null, "Invalid email or password");
      }

      return buildResponse(200, true, {
        user: { ...user, password: undefined },
        accessToken: buildJWT(user),
      });
    } catch (error) {
      console.log("error", error);
      return buildResponse(500, false, null, "Error occured while signing in.");
    }
  }

  private hashPassword(password: string) {
    return hashSync(password, genSaltSync(10));
  }

  async getUser(id: string) {
    return this.userRepo.findOne({ id });
  }
}
