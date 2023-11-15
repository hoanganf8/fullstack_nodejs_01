import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  todoList: ["Item 1", "Item 2"],
};
export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    update: (state, action) => {
      state.todoList = action.payload;
    },
  },
});

//Redux Thunk
export const fetchTodos = () => {
  return async (dispatch) => {
    const response = await fetch(`https://jsonplaceholder.typicode.com/todos`);
    const data = await response.json();
    dispatch(todoSlice.actions.update(data));
  };
};
