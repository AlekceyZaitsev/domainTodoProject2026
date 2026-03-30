export interface dataType {
  dateNumber: number;
  dateMonth: string;
  dateHours: number;
  dateMinutes: number;
  dateYear: number;
}
export interface TodoSettings {
  id: number;
  title: string;
  stateChange: boolean;
  dateCreate: dataType;
}

export type MonthType = {
  [key: number]: string;
};
