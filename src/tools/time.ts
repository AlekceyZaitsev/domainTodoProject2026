import { MonthType } from "../types/TypesForNotes";

export const checkWhatYearIsItNow = (numberYear: number) => {
  const MONTH_DATA: MonthType = {
    1: "Января",
    2: "Февраля",
    3: "Марта",
    4: "Апреля",
    5: "Мая",
    6: "Июня",
    7: "Июля",
    8: "Августа",
    9: "Сентября",
    10: "Октября",
    11: "Ноября",
    12: "Декабря",
  };

  if (MONTH_DATA.hasOwnProperty(numberYear)) {
    for (const [keys, values] of Object.entries(MONTH_DATA)) {
      if (keys === numberYear.toString()) {
        return values;
      }
    }
  }
};

export const dateNow = new Date();
