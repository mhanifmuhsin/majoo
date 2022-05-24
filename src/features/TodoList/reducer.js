import {
  START_FETCHING_TODO_LIST,
  SUCCESS_FETCHING_TODO_LIST,
  ERROR_FETCHING_TODO_LIST,
  DELETE_TODO_LIST,
  CREATE_TODO_LIST,
} from "./constants";

const statuslist = {
  idle: "idle",
  process: "process",
  success: "success",
  error: "error",
};

const initialState = {
  data: [],
  status: statuslist.idle,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case START_FETCHING_TODO_LIST:
      return { ...state, status: statuslist.process };

    case SUCCESS_FETCHING_TODO_LIST:
      return { ...state, data: action.data, status: statuslist.success };

    case ERROR_FETCHING_TODO_LIST:
      return { ...state, status: statuslist.error };

    case DELETE_TODO_LIST:
      return { data: state.data.filter((todo) => todo.id !== action.id) };
    case CREATE_TODO_LIST:
        console.log(action.data,"pay")
      return { ...state ,data: [...state.data, action.data,] };
    default:
      return state;
  }
}
