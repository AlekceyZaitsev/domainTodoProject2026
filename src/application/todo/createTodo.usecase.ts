import { createTodo } from "../../domain/Todo";
import { TodoRepository } from "../../domain/todo/TodoRepository";

export const createTodoUseCase = async (
  repo: TodoRepository,
  title: string,
) => {
  const localInstanceTodo = createTodo(title);
  const getCurrentTodoList = await repo.getAllTodo();

  const storageSaveLocalInstanceTodo = [
    ...getCurrentTodoList,
    localInstanceTodo,
  ];

  await repo.saveAllTodo(storageSaveLocalInstanceTodo);

  return repo.getAllTodo();
};
