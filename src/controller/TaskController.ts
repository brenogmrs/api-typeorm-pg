import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {Tasks} from "../entity/Tasks";

export const getTasks = async (req: Request, res: Response) => {

    const tasks = await getRepository(Tasks).find();
    return res.json(tasks);
};

export const getTask = async (req: Request, res: Response) => {
    const { id } = req.params;


    const task = await getRepository(Tasks).findOne(id);

    return res.json(task);
};


export const saveTask = async (req: Request, res: Response) => {
    const task = req.body;

    const tasks = await getRepository(Tasks).save(task);
    return res.json(tasks);
};

export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;

    const task = await getRepository(Tasks).delete(id);

    if(task.affected === 1){
        const taskUpdated = await getRepository(Tasks).findOne(id);
        return res.json({message: "Tarefa deletada"});
    }

    return res.status(404).json({message: "Tarefa não encontrada"});

};

export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const taskInfo = req.body;

    const task = await getRepository(Tasks).update(id, taskInfo);
    
    if(task.affected === 1){
        const taskUpdated = await getRepository(Tasks).findOne(id);
        return res.json(taskUpdated);
    }

    return res.status(404).json({message: "Tarefa não encontrada"});
};



export const finishTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const taskInfo = req.body;

    const task = await getRepository(Tasks).update(id, {
        finished: true
    });
    
    if(task.affected === 1){
        const taskUpdated = await getRepository(Tasks).findOne(id);
        return res.json({message: "Tarefa finalizada"});
    }

    return res.status(404).json({message: "Tarefa não encontrada"});
};