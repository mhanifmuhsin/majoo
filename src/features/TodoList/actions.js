import {
  START_FETCHING_TODO_LIST,
  SUCCESS_FETCHING_TODO_LIST,
  ERROR_FETCHING_TODO_LIST,
} from "./constants";
import { getTodoList } from "../../api/todo-list";

export const fetchTodoList = () => {
  return async (dispatch) => {
    dispatch(startFetchingTodoList());
    try {
      let { data } = await getTodoList();

      dispatch(
        successFetchingTodoList({
          data,
         
        })
      );
    } catch (err) {
      dispatch(errorFetchingTodoList());
    }
  };
};

export const startFetchingTodoList = () => {
  return {
    type: START_FETCHING_TODO_LIST,
  };
};

export const successFetchingTodoList = ({ data }) => {
  return {
    type: SUCCESS_FETCHING_TODO_LIST,
    data,
  };
};

export const errorFetchingTodoList = () => {
  return {
    type: ERROR_FETCHING_TODO_LIST,
  };
};