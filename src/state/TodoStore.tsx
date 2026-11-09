import { Todo } from "domain/Todo";

type initialState = "idle" | "loading" | "success" | "error";

export interface mainState {
  status: initialState;
  data: Todo[] | { type: string; message: string };
}

const Store = () => {
  let state: mainState = {
    status: "idle",
    data: [],
  };
  return {
    setLoadingState: (isLoading: initialState) => {
      return (state = {
        ...state,
        status: isLoading,
      });
    },
    setNewState: (newState: mainState) => {
      state = {
        ...state,
        status: newState.status,
        data: newState.data,
      };
    },
    getState: () => {
      return state;
    },
  };
};

export const TodoStore = Store();
