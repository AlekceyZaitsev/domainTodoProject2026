import { Todo } from "domain/Todo";

export interface TodoRepository {
  getAllTodo(): Promise<Todo[]>;
  saveAllTodo(todos: Todo[]): Promise<void>;
  removeTodo(id: string): Promise<void>;
}
