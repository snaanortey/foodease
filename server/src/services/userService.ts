import { AppDataSource } from "../dataSource";
import { User } from "../entity/User";
import bcrypt from "bcrypt";

const saltRounds = 10;

// This UserCreatePayload type is to match what a user will input as req.body of the http request
interface UserCreatePayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
}

export class UserService {
  // This save method is the user data that should be saved in the db
  async save(userToInsert: UserCreatePayload): Promise<void> {
    // hash the password
    const hash = await bcrypt.hash(userToInsert.password, saltRounds);

    // set the timestamps
    const userDataToSave = {
      firstName: userToInsert.firstName,
      lastName: userToInsert.lastName,
      email: userToInsert.email,
      passwordHash: hash,
      createdAt: new Date(),
      lastModified: new Date(),
      dateOfBirth: userToInsert.dateOfBirth,
    };

    // save to database
    await AppDataSource.createQueryBuilder()
      .insert()
      .into(User)
      .values(userDataToSave)
      .execute();
  }

  // This method is to find a user in the db given the user's email
  async findByEmail(userEmail: string): Promise<User> {
    const user = await AppDataSource.getRepository(User)
      .createQueryBuilder("user")
      .where("user.email = :email", { email: userEmail })
      .getOneOrFail();

    return user;
  }
}
