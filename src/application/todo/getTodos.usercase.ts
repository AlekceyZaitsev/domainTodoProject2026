import { LocalStorageTodoRepository } from "infrastructure/todo";
import { TodoRepository } from "domain/todo/TodoRepository";

export const getCurrentTodos = async () => {
  const currentTodos = await LocalStorageTodoRepository.getAllTodo();

  return currentTodos;
};
