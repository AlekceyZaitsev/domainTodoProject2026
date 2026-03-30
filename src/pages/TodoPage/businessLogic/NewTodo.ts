import { TodoSettings } from "../../../types/TypesForNotes";
import { dateNow } from "../../../tools/time";
import { checkWhatYearIsItNow } from "../../../tools/time";

export const newTodo = (titleTodoList: string) => {
  const createNewObjectForTodoList: TodoSettings = {
    id: Date.now(),
    title: titleTodoList.trim(),
    stateChange: false,
    dateCreate: {
      dateNumber: dateNow.getDate(),
      dateMonth: checkWhatYearIsItNow(dateNow.getMonth() + 1),
      dateHours: dateNow.getHours(),
      dateMinutes: dateNow.getMinutes(),
      dateYear: dateNow.getFullYear(),
    },
  };

  return createNewObjectForTodoList;
}; // Создание нового Todo
