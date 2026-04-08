import { it, expect } from "vitest";
import { createTodoUseCase } from "./createTodo.usecase";
import { Todo } from "domain/Todo";
import { TodoRepository } from "domain/todo/TodoRepository";

it("Добавление todo в пустой список", async () => {
  const fakeRepo = {
    todos: <Todo[]>[
      {
        id: "1",
        title: "Testing system",
        createdAt: new Date(),
        completed: "incomplete",
      },
    ],
    async getAllTodo() {
      return this.todos;
    },
    async saveAllTodo(newTodos: Todo[]) {
      this.todos = newTodos;
    },
    async removeTodo() {},
  };

  await createTodoUseCase(fakeRepo, "Test system 2й");
  const todos = await fakeRepo.getAllTodo();

  // expect(todos.length).toBe(1); // Проверяет, добавился ли вообще Todo в список
  expect(todos[1].title).toBe("Test system 2"); // Проверяет, сейчас там два элемента?
});
