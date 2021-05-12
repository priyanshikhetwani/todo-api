import { Response } from '@adonisjs/http-server/build/standalone';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules} from '@ioc:Adonis/Core/Validator'
// import Schema from "@ioc:Adonis/Lucid/Schema";
import User from "App/Models/User";

export default class AuthController {
    public async register({request, response, auth}: HttpContextContract ){
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
        const u = await auth.login(user)
        const tokenValue = u.type+" "+u.token
        return tokenValue;
        // return response.created(user)
    }

    public async login({request, response, auth}:HttpContextContract ){
        // console.log(request);
        
        const email = request.input('email')
        const password = request.input('password')
        const token = await auth.attempt(email, password)
        // const Token =  
        return token.toJSON()

        // return response.status(200).send(Token)
    }

    public async destroy ({auth, response}:HttpContextContract) {
        await auth.logout()
        return response.send('logout success');
    }
    public async user ({request}:HttpContextContract) {
        const user = await User.findBy('email', request.input('email'));
        return user
    }
}
