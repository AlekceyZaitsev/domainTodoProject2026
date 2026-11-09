// ------------------------------------------------------------------------------

// ! Добавил расширения для подсветки комментариев, сразу распишу доступные цвета

// ! Красный
// TODO: Оранжевый
// ? Синий
// * Зеленый

// ------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------

import { ChangeEvent, useEffect, useState } from "react";
import { LocalStorageTodoRepository } from "infrastructure/todo";
import { TodoController } from "state/TodoController";
import { TodoStore } from "state/TodoStore";
import { Todo } from "domain/Todo";

const TodoPage = () => {
  const [titleTodoList, setTitleTodoList] = useState<string>("");
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [subscribe, setSubscribe] = useState(TodoStore.getState());

  // ! Основной функционал с работой ToDo----------------------------------------------------

  // TODO: Создание нового Todo

  const localCreateNewInstanceTodo = async () => {
    (await TodoController(titleTodoList)).addTodo();
    setSubscribe(TodoStore.getState());
  };

  useEffect(() => {
    const loading = async function data() {
      const dataTodo = await LocalStorageTodoRepository.getAllTodo();
      setTodoList(dataTodo);
    };
    loading();
  }, []);
  // TODO: ----------------------------------------------------------------------------------

  // TODO: Получение вводимых данных из Input

  const takeTitleTodoList = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleTodoList(e.target.value);
  }; // Функция которая считывает инпут поле ввода пользователя
  // // Также добавлена проверка на каждый симвом, все пробелы удаляются

  // TODO: ----------------------------------------------------------------------------------

  // TODO: Изменение состояния для todo, например зачеркнуть заметку или наоборот сделать активной

  // TODO: ----------------------------------------------------------------------------------

  // TODO: Удаление ненужных todo
  // TODO: ----------------------------------------------------------------------------------

  return (
    <div>
      <input onChange={takeTitleTodoList} type="text" />
      <button onClick={localCreateNewInstanceTodo}>Добавить</button>
      <div>current status - {subscribe.status}</div>
      <div>
        ----------------------------------------------------------------------------------
      </div>
      <div>
        {todoList.map((item) => (
          <div>title todo - {item.title}</div>
        ))}
      </div>
    </div>
  );
};

export default TodoPage;
