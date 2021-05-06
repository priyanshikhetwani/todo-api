import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Todo from "App/Models/Todo";

export default class TodosController {
    public async index({request}: HttpContextContract){
        // pagination
        // const page = request.input('page', 1)
        // const limit= request.input('per_page', 2)
        // return Todo.query().paginate(page, limit)
        const todos = await Todo.all()
        return todos.map((todo) => todo.serialize({fields: ['id', 'title']}) 
            // id: todo.id,
            // title: todo.title
        )
    }

    public async store({request, response}: HttpContextContract ){
        Todo.create({title:request.input('title'), is_completed: false})
        return response.created({'created': true})
    }

    public async update({request, response, params}: HttpContextContract ){
        const todo= await Todo.findOrFail(params.id)
        todo.is_completed = request.input('is_completed')
        todo.save()
        return response.status(202).send(todo)
    }

    public async destroy({params, response}: HttpContextContract){
        // const todo = await Todo.findOrFail(params.id)
        // await todo.delete()

        // await Todo.find(params.id).delete()
        //   return response.json({message: 'Todo deleted!'})

        const todo = await Todo.findOrFail(params.id)
        await todo.delete()
        return response.json({message: 'Todo deleted!'})



        // session.flash('notification', 'Task deleted')
        // return response.status(204).send("deleted")

    }
}
