import { createTodoUseCase } from "application/todo/createTodo.usecase";
import { TodoStore } from "./TodoStore";
import { LocalStorageTodoRepository } from "infrastructure/todo";

export const TodoController = async (title: string) => {
  const result = await createTodoUseCase(LocalStorageTodoRepository, title);
  const takeCurrentStatus = result.success ? "success" : "error";
  const takeCurrentData = result.data
    ? result.data
    : { type: result.error.type, message: result.error.message };
  return {
    addTodo: () => {
      TodoStore.setLoadingState("loading");
      TodoStore.setNewState({
        status: takeCurrentStatus,
        data: takeCurrentData,
      });
    },
  };
};
