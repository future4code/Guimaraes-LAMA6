import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { IdGenerator } from "../services/IdGenerator";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { InvalidEmail, InvalidName, InvalidPassword, MissingInformation } from "../error/BaseError";

export class UserBusiness {

    private userDatabase: UserDatabase
	constructor() {
		this.userDatabase = new UserDatabase()
	}

    async createUser(user: UserInputDTO) {

        const { name, email, password, role} = user

        if (!name || !email || !password || !role) {
            throw new MissingInformation()
        }

        if (name.length < 3) {
            throw new InvalidName()
        }

        if (!email.includes("@")) {
            throw new InvalidEmail()
        }

        if (password.length < 6) {
            throw new InvalidPassword()
        }

        const idGenerator = new IdGenerator();
        const id = idGenerator.generate();

        const hashManager = new HashManager();
        const hashPassword = await hashManager.hash(user.password);

        await this.userDatabase.createUser(id, user.email, user.name, hashPassword, user.role);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id, role: user.role });

        return accessToken;
    }


    async getUserByEmail(user: LoginInputDTO) {

        const { email, password } = user

        if (!email || !password) {
            throw new MissingInformation()
        }

        const userDatabase = new UserDatabase();
        const userFromDB = await userDatabase.getUserByEmail(user.email);

        if (!userFromDB) {
            throw new InvalidEmail()
        }

        const hashManager = new HashManager();
        const hashCompare = await hashManager.compare(user.password, userFromDB.password);

        const authenticator = new Authenticator();
        const accessToken = authenticator.generateToken({ id: userFromDB.id, role: userFromDB.role });

        if (!hashCompare) {
            throw new Error("Invalid Password!");
        }

        return accessToken;
    }

}