import { restoreTodo, Todo } from "domain/Todo";
import { TodoRepository } from "domain/todo/TodoRepository";

export const LocalStorageTodoRepository: TodoRepository = {
  getAllTodo: async () => {
    const raw = localStorage.getItem("todos");

    if (!raw) {
      return [];
    }

    const rawTodos = JSON.parse(raw);

    return rawTodos.map((item: Todo): Todo => {
      return restoreTodo(item);
    });
  },

  saveAllTodo: async (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  },

  removeTodo: async (id) => {
    const raw = localStorage.getItem("todos");
    if (!raw) return;
    const filtredRaw = JSON.parse(raw).filter((item: Todo) => {
      return item.id !== id;
    });
    await LocalStorageTodoRepository.saveAllTodo(filtredRaw);
  },
};
