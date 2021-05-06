import { Response } from '@adonisjs/http-server/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules} from '@ioc:Adonis/Core/Validator'

// import Schema from "@ioc:Adonis/Lucid/Schema";
import User from "App/Models/User";

export default class AuthController {
    public async register({request, response}: HttpContextContract ){
        const data = await schema.create({
            email: schema.string({}, [
                rules.email(),
                rules.unique({table: 'users', column: 'email'})
            ]),
            password: schema.string({}, [
                rules.confirmed()
            ])
        })

        const validatedData = await request.validate({schema:data})
        // return validatedData
        const user = await User.create(validatedData)
        return response.created(user)
    }

    public async login({request, response, auth}:HttpContextContract ){
        const email = request.input('email')
        const password = request.input('password')
        const token = await auth.attempt(email, password)

        return token.toJSON()

    }
}
