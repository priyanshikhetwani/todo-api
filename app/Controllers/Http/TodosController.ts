import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";
import User from "App/Models/User"

export default class TodosController {
    public async index({request}: HttpContextContract){
        // pagination
        // const page = request.input('page', 1)
        // const limit= request.input('per_page', 2)
        // return Todo.query().paginate(page, limit)
        //  const user_id = Number(auth.user?.id) - 1 
        // const todos = await Todo.query().where('user_id', user_id);
        const todos = await Todo.all()
        // const todos = await Todo.query().where('user_id', User.user_id);

        
        // const todos = await Todo.query().preload('user')
    
        //     const todos = await Todo.all()
        //  const user = auth.user
        //  await user?.preload('todos')
        // const userId = Number(auth.user?.id) - 1 
       
        // return {todos: user?.todos}
    
        return todos.map((todo) => todo.serialize({fields: ['id', 'title','is_completed']}) 
        )
    }

    public async store({request, response}: HttpContextContract ){
        // const userId = Number(auth.user?.id) - 1 
        // const userId: auth.user?.id
        // await auth.user?.related('todo').create({title:request.input('title'), is_completed: false, user_id: userId})

        Todo.create({title:request.input('title'), is_completed: false})
        // const todo = {title:request.input('title'), is_completed: false}
        return response.created({'created': true})
        // return response.status(200).send(todo)
       
    }

    public async update({request, response, params}: HttpContextContract ){
        const todo = await Todo.findOrFail(params.id)
        
        
        todo.is_completed = !!!request.input('is_completed')
        await todo.save();
        // console.log("is_completed",todo);
        // const todo = todo
        // const todo = {title:request.input('title'), is_completed: false}
        return response.status(200).send(todo)
        // return response.status(200)
    }

    public async destroy({params, response}: HttpContextContract){
        // const todo = await Todo.findOrFail(params.id)
        // await todo.delete()

        // await Todo.find(params.id).delete()
        //   return response.json({message: 'Todo deleted!'})

        const todo = await Todo.findOrFail(params.id)
        const toDo = todo
        await todo.delete()
        return response.status(200).send(toDo)



        // session.flash('notification', 'Task deleted')
        // return response.status(204).send("deleted")

    }
}
