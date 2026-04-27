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

    return { success: true, data: await repo.getAllTodo() };
  } catch (error) {
    return {
      success: false,
      error: { type: "REPO_ERROR", message: error.message },
    };
  }
};
