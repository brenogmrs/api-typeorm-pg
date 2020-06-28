import {Router, Request, Response} from 'express'
import {getTask, getTasks, saveTask, updateTask, finishTask, deleteTask} from '../src/controller/TaskController'

const routes = Router()

routes.get('/', (req: Request, res: Response) =>{
    return res.json({message: "Hello world"})
});

routes.get('/tasks', getTasks)
routes.get('/tasks/:id', getTask)
routes.post('/tasks', saveTask)
routes.put('/tasks/:id', updateTask)
routes.patch('/tasks/:id', finishTask)
routes.delete('/tasks/:id', deleteTask)




export default routes