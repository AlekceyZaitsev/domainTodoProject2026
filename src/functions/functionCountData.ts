import { Todo } from "domain/Todo";

export const functionCountData = <T extends Todo>(data: T[]): boolean => {
  return !data.length;
};
