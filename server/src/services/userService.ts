import { hashPasswordAsync } from "../utils/promisify";
import { AppDataSource } from "../dataSource";
import { User } from "../entity/User";
const saltRounds = 10;

interface UserCreatePayload {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: Date;
}

export class UserService {
  async save(userToInsert: UserCreatePayload): Promise<void> {
    // hash the password
    // Note: The usual bcrpt.has function is an async function so the rest of
    // the code continues to run while the password has not finished hashing
    // creating the issue of sending the user a 201 message even if the user data
    // in database has not been validated because the has must be created before the user
    // details is saved in the db. E.g. in the instance of a duplicate email address
    const hash = await hashPasswordAsync(userToInsert.password, saltRounds);

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
}
