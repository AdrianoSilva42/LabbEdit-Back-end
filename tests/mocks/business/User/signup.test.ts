import { TokenManagerMock } from './../../TokenManagerMock';
import { UserDatabaseMock } from './../../UserDatabaseMock';
import { IdGeneratorMock } from './../../IdGeneratorMock';
import { HashManagerMock } from './../../HashManagerMock';
import { UserBusiness } from './../../../../src/business/UserBusiness';
import { createdUserSchema } from '../../../../src/dtos/user/signup.dto';

describe("testando o signup", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve retornar um token", async() => {

        const input = createdUserSchema.parse({
            name: "Astrodev",
            email: "astrodev@email.com",
            password: "astrodev99"
        })
        const output = await userBusiness.signup(input)

        expect(output).toEqual({token: "token-mock"})
    })
})