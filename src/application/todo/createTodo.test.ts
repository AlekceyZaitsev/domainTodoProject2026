import { it, expect } from "vitest";
import { createTodoUseCase } from "./createTodo.usecase";
import { Todo } from "domain/Todo";

// ? Factory ----------------------------------------------------------------------------------------------

const fakeRepository = () => {
  return {
    todos: [] as Todo[],
    async getAllTodo() {
      return this.todos;
    },
    async saveAllTodo(newTodos: Todo[]) {
      this.todos = newTodos;
    },
    async removeTodo() {},
  };
};

const fakeRepositoryError = () => {
  return {
    todos: [] as Todo[],
    async getAllTodo() {
      return this.todos;
    },
    async saveAllTodo() {
      throw new Error("DB crashed");
    },
    async removeTodo() {},
  };
};

// ? -----------------------------------------------------------------------------------------------------

// * Happy Tests -----------------------------------------------------------------------------------------

it("Добавление todo в пустой список", async () => {
  const localRepo = fakeRepository();

  await createTodoUseCase(localRepo, "1");
  const todos = await localRepo.getAllTodo();

  expect(todos.length).toBe(1);
});

// * ------------------------------------------------------------------------------------------------------

// ! Reject tests -----------------------------------------------------------------------------------------

it("Title не должен передаваться пустой строкой", async () => {
  const localRepo = fakeRepository();
  await expect(createTodoUseCase(localRepo, "")).rejects.toThrow(
    "Title not be empty",
  );
});

it("Не корректный вызов saveAllTodo", async () => {
  const localRepo = fakeRepositoryError();
  await expect(createTodoUseCase(localRepo, "title")).rejects.toThrow(
    "DB crashed",
  );
});

// ! ------------------------------------------------------------------------------------------------------
