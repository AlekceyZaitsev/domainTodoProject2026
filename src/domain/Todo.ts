// * Домен, по сути физически это папка, внутри ее описываются сущности со своими вариациями, логикой, инвариантами
// * Если кода будет много, он декомпозируется

type TodoId = string & { readonly __brand: "TodoId" };
type isCompleted = boolean;

export type Todo = {
  readonly id: TodoId;
  readonly title: string;
  readonly completed: isCompleted;
  readonly createdAt: Date;
};

export const createTodo = (input: string) => {
  const normalizedTitle = input.trim();

  if (!normalizedTitle) {
    throw {
      type: "DOMAIN_ERROR",
      message: "Title not be empty",
    };
  }

  const factoryTodo: Todo = {
    id: crypto.randomUUID() as TodoId,
    title: normalizedTitle,
    completed: false,
    createdAt: new Date(),
  };

  return factoryTodo;
};

// * Возможно это будет завтрашней темой, по сути я защитил переписывание состояния через readonly для title и
// * complete, можно задача сейчас дать возможность самому домену решать, когда решение меняется или нет
// * Внизу описана функция изменения статуса complete для Todo

// ! --------------------------------------------------------------------
// ! Данные фрагменты заложены в будушие TODO кейсы
export const completeTodo = (todo: Todo): Todo => {
  const { id, title, completed, createdAt } = todo;

  const updatedStatus = completed ? true : false;

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

// ! --------------------------------------------------------------------
