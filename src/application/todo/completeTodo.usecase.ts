import { completeTodo } from "domain/Todo";
import { Todo } from "domain/Todo";
import { LocalStorageTodoRepository } from "infrastructure/todo";

export const completeTodoUseCase = async (todo: Todo) => {
  const changeCompleteTodo = completeTodo(todo);
  return changeCompleteTodo;
};

const todos = await LocalStorageTodoRepository.getAllTodo();

const findTodos = todos.find((item, id: any) => {
  if (!findTodos) {
    return;
  }
  if (item.id === id) {
    return item.id;
  }
});

const completedTodo = completeTodo(findTodos);

const updatedTodos = todos.map((item) => {
  if (item.id === completedTodo.id) {
    return completedTodo;
  }

  return item;
});

await LocalStorageTodoRepository.saveAllTodo(updatedTodos);
