// * Домен, по сути физически это папка, внутри ее описываются сущности со своими вариациями, логикой, инвариантами
// * Если кода будет много, он декомпозируется

type TodoId = string & { readonly __brand: "TodoId" };
type IsCompleted = "complete" | "incomplete";
type createNewTodoTitle = string;

export type Todo = {
  id: TodoId;
  readonly title: createNewTodoTitle;
  readonly completed: IsCompleted;
  createdAt: Date;
};

export const createTodo = (input: createNewTodoTitle) => {
  if (!input.trim()) {
    throw new Error("Title not be empty");
  }

  const factoryTodo: Todo = {
    id: crypto.randomUUID() as TodoId,
    title: input,
    completed: "incomplete",
    createdAt: new Date(),
  };

  return factoryTodo;
};

// * Возможно это будет завтрашней темой, по сути я защитил переписывание состояния через readonly для title и
// * complete, можно задача сейчас дать возможность самому домену решать, когда решение меняется или нет
// * Внизу описана функция изменения статуса complete для Todo

export const completeTodo = (todo: Todo): Todo => {
  const { id, title, completed, createdAt } = todo;

  const updatedStatus = completed ? "incomplete" : "complete";

  return {
    id,
    title,
    completed: updatedStatus,
    createdAt,
  };
};

export const restoreTodo = (todo: Todo): Todo => {
  const { id, title, completed, createdAt } = todo;

  return {
    id,
    title,
    completed,
    createdAt,
  };
};
