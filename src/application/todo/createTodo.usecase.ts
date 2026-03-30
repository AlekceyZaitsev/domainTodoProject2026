import { createTodo } from "domain/Todo";
import { LocalStorageTodoRepository } from "infrastructure/todo";

export const createTodoUseCase = async (title: string) => {
  const localInstanceTodo = createTodo(title);
  const getCurrentTodoList = await LocalStorageTodoRepository.getAllTodo();

  const storageSaveLocalInstanceTodo = [
    ...getCurrentTodoList,
    localInstanceTodo,
  ];

  await LocalStorageTodoRepository.saveAllTodo(storageSaveLocalInstanceTodo);

  console.log(getCurrentTodoList);
  console.log(Array.isArray(getCurrentTodoList));
  return LocalStorageTodoRepository.getAllTodo();
};
