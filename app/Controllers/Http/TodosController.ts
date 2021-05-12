import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Todo from "App/Models/Todo";
// import User from "App/Models/User"

export default class TodosController {
    public async index({request}: HttpContextContract){
        const todolist = await Database.query().select('*').from('todos')
        return todolist
        // pagination
        // const page = request.input('page', 1)
        // const limit= request.input('per_page', 2)
        // return Todo.query().paginate(page, limit)
        //  const user_id = Number(auth.user?.id) - 1 
        // // const todos = await Todo.all()
    
        //  const user = auth.user
        //  await user?.preload('todos')
        // const userId = Number(auth.user?.id) - 1 
    
        // return todos.map((todo) => todo.serialize({fields: ['id', 'title','is_completed']}) 
    }

    public async store({request, response, auth}: HttpContextContract ){

       await auth.user?.related('todos').create({title:request.input('title'), is_completed:false})
       return response.status(201).json({'created': true})
        // const userId = Number(auth.user?.id) - 1 
        // const userId: auth.user?.id
        // await auth.user?.related('todos').create({title:request.input('title'), is_completed: false, user_id: userId})

    //    Todo.create({title:request.input('title'), is_completed: false})
        // return response.created({'created': true})
       
    }

    public async update({request, response, params}: HttpContextContract ){
        try {
           await Todo
          .query()
          .where('id', request.input('id'))
          .update({ is_completed: true })
        } catch {
            return response.send("Could not mark your task as done")
        }
        //const todo = await Todo.findOrFail(params.id)
        //todo.is_completed = !!!request.input('is_completed')
        //await todo.save();
        // console.log("is_completed",todo);
    
        //return response.status(200).send(todo)

    }

    public async undoupdate ({request, response}:HttpContextContract) {
        try {
           await Todo
          .query()
          .where('id', request.input('id'))
          .update({ is_completed: false })
        } catch {
            return response.send("Could not undo your task")
        }
    }

    public async destroy({response, request}: HttpContextContract){

        try {
            await Todo.query().where('id', request.input('id')).delete()
        } catch {
            return response.send("Could not delete the user")
        }

        // //const todo = await Todo.findOrFail(params.id)
       // // const toDo = todo
       // // await todo.delete()
        // //return response.status(200).send(toDo)



        // session.flash('notification', 'Task deleted')
        // return response.status(204).send("deleted")

    }
}
