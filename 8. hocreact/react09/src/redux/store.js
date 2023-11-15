//Kho chứa state
import { combineReducers, legacy_createStore as createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { counterReducer } from "./reducers/counterReducer";
import { todoReducer } from "./reducers/todoReducer";

const rootReducer = combineReducers({
  counter: counterReducer,
  todos: todoReducer,
});

export const store = createStore(rootReducer, composeWithDevTools());

// console.log(store);
// store.dispatch({
//   type: "counter/increment",
// });
// console.log(store.getState());

/*
rootReducer ==> combineReducers
  - counterReducer
  - todoReducer
  - productReducer
  
*/
