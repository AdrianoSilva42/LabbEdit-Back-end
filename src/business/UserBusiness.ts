import { UserDatabase } from "../database/UserDatabase"
import { loginUserInputDTO, loginUserOutputDTO } from "../dtos/user/login.dto";
import { CreateUserInputDTO, CreateUserOutputDTO } from "../dtos/user/signup.dto";
import { BadRequestError } from "../errors/BadRequestError";
import { NotFoundError } from "../errors/NotFoundError";
import { User } from "../models/User";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";
import { TokenManager } from "../services/TokenManager";
import { TokenPayload, UserDB, USER_ROLES } from "../types";

export class UserBusiness {
    constructor(
        private userDatabase: UserDatabase,
        private idGenerator: IdGenerator,
        private tokenManager: TokenManager,
        private hashManager: HashManager
    ) {}

    public signup = async (input: CreateUserInputDTO): Promise<CreateUserOutputDTO> => {
        const { name, email, password } = input


        const id = this.idGenerator.generate()
        const hashedPassword = await this.hashManager.hash(password)
        const role = USER_ROLES.NORMAL
        const createdAt = new Date().toISOString()

        const newUser = new User(
            id,
            name,
            email,
            hashedPassword,
            role,
            createdAt
        )

        const userDB = newUser.toDBModel()

        await this.userDatabase.insert(userDB)

        const payload: TokenPayload = {
            id: newUser.getId(),
            name: newUser.getName(),
            role: newUser.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: CreateUserOutputDTO = {
            token
        }

        return output
    }

    public login = async (input: loginUserInputDTO): Promise<loginUserOutputDTO> => {
        const { email, password } = input

        const userDB: UserDB | undefined = await this.userDatabase.findByEmail(email)

        if (!userDB) {
            throw new NotFoundError("'email' não cadastrado")
        }

        const user = new User(
            userDB.id,
            userDB.name,
            userDB.email,
            userDB.password,
            userDB.role,
            userDB.created_at
        )

        const hashedPassword = user.getPassword()

        const isPasswordCorrect = await this.hashManager
            .compare(password, hashedPassword)
        
        if (!isPasswordCorrect) {
            throw new BadRequestError("'password' incorreto")
        }
        
        const payload: TokenPayload = {
            id: user.getId(),
            name: user.getName(),
            role: user.getRole()
        }

        const token = this.tokenManager.createToken(payload)

        const output: loginUserOutputDTO = {
            token
        }

        return output
    }
}