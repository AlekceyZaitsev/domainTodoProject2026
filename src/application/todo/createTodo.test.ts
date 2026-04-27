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

// it("Добавление todo в пустой список", async () => {
//   const localRepo = fakeRepository();

//   await createTodoUseCase(localRepo, "");
//   const todos = await localRepo.getAllTodo();

//   expect(todos.length).toBe(1);
// });

// * ------------------------------------------------------------------------------------------------------

// ! Reject tests -----------------------------------------------------------------------------------------

// it("Title не должен передаваться пустой строкой", async () => {
//   // try {
//   //   const localRepo = fakeRepository();
//   //   if (await createTodoUseCase(localRepo, "")) {
//   //     throw new Error("Title not be empty");
//   //   }
//   //   // await expect(createTodoUseCase(localRepo, "")).rejects.toThrow(
//   //   //   "Title not be empty",
//   //   // );
//   // } catch (error) {
//   //   expect(error.message).toBe("Title not be empty");
//   // }

//   const localRepo = fakeRepository();
// });

it("Не корректный вызов saveAllTodo", async () => {
  const localRepo = fakeRepositoryError();
  const result = await createTodoUseCase(localRepo, "title");
  expect(result.success).toBe(false);
  expect(result.error.type).toBe("REPO_ERROR");
});

// ! ------------------------------------------------------------------------------------------------------
