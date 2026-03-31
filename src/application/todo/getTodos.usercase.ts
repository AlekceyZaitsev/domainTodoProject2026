import { LocalStorageTodoRepository } from "infrastructure/todo";

export const getCurrentTodos = () => {
  const currentTodos = LocalStorageTodoRepository.getAllTodo();

  return currentTodos;
};
