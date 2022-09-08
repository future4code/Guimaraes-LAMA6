import { BaseDatabase } from "./BaseDatabase";

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "lama_usuarios";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error:any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  // public async login(email: string, password: string): Promise<any> {

  //   try {
  //     await this.getConnection()
  //     .select("email", "password")
  //     .where({ email })
  //     .into(UserDatabase.TABLE_NAME)
  //   } catch (error:any) {
  //     throw new Error(error.sqlMessage || error.message)
  //   }


  // }

  public async getUserByEmail(email: string): Promise<any> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    return result[0];
  }

}
