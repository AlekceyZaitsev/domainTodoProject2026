import { createTodo } from "../../domain/Todo";
import { TodoRepository } from "../../domain/todo/TodoRepository";

export const createTodoUseCase = async (
  repo: TodoRepository,
  title: string,
) => {
  try {
    const newTodo = createTodo(title);
    const currentTodoList = await repo.getAllTodo();

    const updatedTodoList = [...currentTodoList, newTodo];

    await repo.saveAllTodo(updatedTodoList);

    return { success: true, data: await repo.getAllTodo() };
  } catch (error) {
    return {
      success: false,
      error: {
        type: error?.type ?? "Unknown error",
        message: error?.message ?? "Unknown error",
      },
    };
  }
};
