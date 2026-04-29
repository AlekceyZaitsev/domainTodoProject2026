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
      throw {
        type: "REPO_ERROR",
        message: "DB crashed",
      };
    },
    async removeTodo() {},
  };
};

// ? -----------------------------------------------------------------------------------------------------

// * Happy Tests -----------------------------------------------------------------------------------------

// it("Добавление одного todo в пустой список", async () => {
//   const localRepo = fakeRepository();

//   const result = await createTodoUseCase(localRepo, "title");
//   expect(result.success).toBe(true);
//   expect(result.data.length).toBe(1);
//   expect(result.data[0].title).toBe("title");
// });

// * ------------------------------------------------------------------------------------------------------

// ! Reject tests -----------------------------------------------------------------------------------------

it("Title не должен передаваться пустой строкой", async () => {
  const localRepo = fakeRepository();
  const result = await createTodoUseCase(localRepo, "");
  expect(result.success).toBe(false);
  expect(result.error.type).toBe("DOMAIN_ERROR");
  expect(result.error.message).toContain("Title");
});

it("Не корректный вызов saveAllTodo", async () => {
  const localRepo = fakeRepositoryError();
  const result = await createTodoUseCase(localRepo, "title");
  expect(result.success).toBe(false);
  expect(result.error.type).toBe("REPO_ERROR");
});

// ! ------------------------------------------------------------------------------------------------------
