// ------------------------------------------------------------------------------

// ! Добавил расширения для подсветки комментариев, сразу распишу доступные цвета

// ! Красный
// TODO: Оранжевый
// ? Синий
// * Зеленый

// ------------------------------------------------------------------------------

// -----------------------------------------------------------------------------------------------------------------------

import "./TodoPage.scss";
import { ChangeEvent, useEffect, useState } from "react";
import { Todo } from "domain/Todo";
import { completeTodoUseCase } from "application/todo/completeTodo.usecase";
import { TodoSettings } from "types/TypesForNotes";
import { LocalStorageTodoRepository } from "infrastructure/todo";
import { ButtonsAdd } from "ui/buttons/add/ButtonsAdd";
import { validateInputData } from "functions/functionValidate";
import { functionCountData } from "functions/functionCountData";
import { emojiEmotions } from "ui/emoji/emotions/emoji-emotions";
import { objectEmojiStatusAction } from "ui/emoji/status:action/emoji-status/action";
import { createTodoUseCase } from "application/todo/createTodo.usecase";
import { getCurrentTodos } from "application/todo/getTodos.usercase";

const TodoPage = () => {
  useEffect(() => {
    const loading = async function data() {
      const dataTodo = await LocalStorageTodoRepository.getAllTodo();
      setTodoList(dataTodo);
    };
    loading();
  }, []);

  const [titleTodoList, setTitleTodoList] = useState<string>("");
  const [todoList, setTodoList] = useState([]);

  // ! Основной функционал с работой ToDo----------------------------------------------------

  // TODO: Создание нового Todo

  const localCreateNewInstanceTodo = async function () {
    await createTodoUseCase(LocalStorageTodoRepository, titleTodoList); // Создание нового Todo
    const localCurrentTodo = await getCurrentTodos(); // Получение актуального списка
    setTodoList(localCurrentTodo); // Отображение актуального списка Todos
    setTitleTodoList("");
  };

  // TODO: ----------------------------------------------------------------------------------

  // TODO: Получение вводимых данных из Input

  const takeTitleTodoList = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleTodoList(e.target.value);
  }; // Функция которая считывает инпут поле ввода пользователя
  // // Также добавлена проверка на каждый симвом, все пробелы удаляются

  // TODO: ----------------------------------------------------------------------------------

  // TODO: Изменение состояния для todo, например зачеркнуть заметку или наоборот сделать активной

  // const changeStatus = (pickItem: TodoSettings) => {
  //   const elements = todoList.map((item) => {
  //     if (item.id === pickItem.id) {
  //       return { ...item, stateChange: !pickItem.stateChange };
  //     } else {
  //       return item;
  //     }
  //   });

  //   setTodoList(elements); // ! Старая рабочая версия, но все решает UI

  // const changeStatus = (pickItem: Todo) => {
  //   const elements = todoList.map((item) => {
  //     if (item.id === pickItem.id) {
  //       return completeTodoUseCase(item);
  //     } else {
  //       return item;
  //     }
  //   });
  //   // Позволяет переключать статус в объекте для статуса с true на false и обратно
  // };

  // TODO: ----------------------------------------------------------------------------------

  // TODO: Удаление ненужных todo

  // const deleteTodoItem = (itemDelete: Todo) => {
  //   const filters = todoList.filter((item) => item.id !== itemDelete.id);

  //   setTodoList(filters); // удаление не нужных записей тодо
  // };

  // TODO: ----------------------------------------------------------------------------------

  return (
    <div className="todo-container">
      <h2 className="todo-title">TODO</h2>
      <div className="todo-block-container">
        <div className="todo-block-addTodo">
          {todoList.map((item: Todo) => (
            <div className="todo-block-item" key={item.id}>
              <div className={"todo-block-item-date"}>
                {`  
                  ${objectEmojiStatusAction.calendar}
                  ${item.createdAt} 
                  `}
              </div>
              <div
                className={`todo-block-item-title ${item.completed ? "completed" : ""}`}
              >
                {item.title}
              </div>
              <button
                className={`todo-block-item-btn ${item.completed ? "completed-button" : "list-btn-change"}`}
              >
                {objectEmojiStatusAction.access}
              </button>
              <button className="todo-block-item-btn btn-delete">
                Удалить
              </button>
            </div>
          ))}
          <input
            name="todo-input"
            value={titleTodoList}
            className={"todo-input"}
            onChange={takeTitleTodoList}
            // onKeyDown={(event) =>
            //   functionKeyBoard(event, "Enter", createNewTodo, titleTodoList)
            // }
            placeholder={"Введите новую заметку"}
          />
          {
            <ButtonsAdd
              title={"Добавить"}
              className={`btn-add ${validateInputData(titleTodoList) ? "btn-disabled" : ""}`}
              disabled={validateInputData(titleTodoList)}
              functions={localCreateNewInstanceTodo}
            ></ButtonsAdd>
          }
        </div>
      </div>
    </div>
  );
};

export default TodoPage;

// Название блока для записи ------------------------------------------------------------

//=======================================================================================

{
  /* <div className="todo-block">
          {functionCountData(todoList) && (
            <div className="todo-block-none">{`Добавь новую заметку! ${emojiEmotions.smile}`}</div>
          )}
          {todoList.map((item: Todo) => (
            <div className="todo-block-item" key={item.id}>
              <div className={"todo-block-item-date"}>
                {`  
                  ${objectEmojiStatusAction.calendar}
                  ${item.createdAt} 
                  ${item.createdAt} 
                  `}
              </div>
              <div
                className={`todo-block-item-title ${item.completed ? "completed" : ""}`}
              >
                {item.title}
              </div>
              <button
                onClick={() => changeStatus(item)}
                className={`todo-block-item-btn ${item.completed ? "completed-button" : "list-btn-change"}`}
              >
                {objectEmojiStatusAction.access}
              </button>
              <button className="todo-block-item-btn btn-delete">
                Удалить
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        className={"todo-block-counter"}
      >{`Количество заметок: ${length}`}</div>
    </div> */
}
