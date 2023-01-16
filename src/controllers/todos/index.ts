import {Response, Request} from "express"
import {ITodo} from "./../../types/todo"
import Todo from "../../models/todo"

//use the function getTodos() to fetch data. It receives a req and res parameter and returns a promise.
const getTodos= async(req: Request, res: Response): Promise<void> =>{
    try{
        const todos: ITodo[]= await Todo.find()
        res.status(200).json({todos})
    }catch (error){
        throw error
    }
}

//the function addTodo() receives the body object that contains data entered by the user.
const addTodo = async (req: Request, res: Response): Promise<void> => {
    try {
     const body = req.body as Pick<ITodo, "name" | "description" | "status">
 
     const todo: ITodo = new Todo({
       name: body.name,
       description: body.description,
       status: body.status,
     })
 
     const newTodo: ITodo = await todo.save()
     const allTodos: ITodo[] = await Todo.find()
 
     res
       .status(201)
       .json({ message: "Todo added", todo: newTodo, todos: allTodos })
   } catch (error) {
     throw error
   }
 }

 
/*To update a todo, we need to extract the id and the body from the req object and then pass them to findByIdAndUpdate(). 
This utility will find the Todo on the database and update it. 
And once the operation is completed, we can now return the updated data to the user.*/
 const updateTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const {
        params: { id },
        body,
      } = req
      const updateTodo: ITodo | null = await Todo.findByIdAndUpdate(
        { _id: id },
        body
      )
      const allTodos: ITodo[] = await Todo.find()
      res.status(200).json({
        message: "Todo updated",
        todo: updateTodo,
        todos: allTodos,
      })
    } catch (error) {
      throw error
    }
  }
  
//The function deleteTodo() allows you to delete a Todo from the database. Here, we pull out the id from req and pass it as an argument to findByIdAndRemove() to access the corresponding Todo and delete it from the DB.
  const deleteTodo = async (req: Request, res: Response): Promise<void> => {
    try {
      const deletedTodo: ITodo | null = await Todo.findByIdAndRemove(
        req.params.id
      )
      const allTodos: ITodo[] = await Todo.find()
      res.status(200).json({
        message: "Todo deleted",
        todo: deletedTodo,
        todos: allTodos,
      })
    } catch (error) {
      throw error
    }
  }
  
  export { getTodos, addTodo, updateTodo, deleteTodo }