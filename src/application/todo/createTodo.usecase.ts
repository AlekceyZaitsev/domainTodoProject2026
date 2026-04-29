import { createTodo } from "../../domain/Todo";
import { TodoRepository } from "../../domain/todo/TodoRepository";

export const createTodoUseCase = async (
  repo: TodoRepository,
  title: string,
) => {
  try {
    const localInstanceTodo = createTodo(title);
    const getCurrentTodoList = await repo.getAllTodo();

    const storageSaveLocalInstanceTodo = [
      ...getCurrentTodoList,
      localInstanceTodo,
    ];

    await repo.saveAllTodo(storageSaveLocalInstanceTodo);

    return { success: true, data: storageSaveLocalInstanceTodo };
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
