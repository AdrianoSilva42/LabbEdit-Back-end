import {UserBusiness} from "../../../../src/business/UserBusiness"
import { HashManagerMock } from '../../HashManagerMock';
import { IdGeneratorMock } from '../../IdGeneratorMock';
import { UserDatabaseMock } from '../../UserDatabaseMock';
import { TokenManagerMock } from '../../TokenManagerMock';
import { loginUserSchema } from "../../../../src/dtos/user/login.dto";

describe("Teste de login", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("gerar token ao logar", async() => {
        const input = loginUserSchema.parse({
            email: "fulano@email.com",
            password: "fulano123"
        })
        const output = await userBusiness.login(input)

        expect(output).toEqual({ token: "token-mock-fulano" })
    })
})