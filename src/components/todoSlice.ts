// import { createSlice } from "@reduxjs/toolkit";

// interface createSliceType {
// 	_id: number;
// 	name: string;
// 	age: number;
// 	completed: boolean;
// }
// const initialState: { data: createSliceType[] } = {
// 	data: [],
// };
// const todoSlice = createSlice({
// 	name: "todoSlice",
// 	initialState,
// 	reducers: {
// 		addTodo: (state, action) => {
// 			const newData = {
// 				_id: Date.now(),
// 				name: action.payload.name,
// 				age: action.payload.age,
// 				completed: false,
// 			};
// 			state.data.push(newData);
// 		},
// 		deleteAll: (state) => {
// 			state.data = [];
// 		},
// 		deleteItem: (state, action) => {
// 			state.data = state.data.filter((item) => item._id !== action.payload);
// 		},
// 		toggleCompleted: (state, action) => {
// 			const todo = state.data.find((item) => item._id === action.payload._id);
// 			if (todo) {
// 				todo.completed = !todo.completed;
// 			}
// 		},
// 		editFlag: (state, action) => {
// 			const todo = state.data.find((item) => item._id === action.payload._id);
// 			if (todo) {
// 				todo.name = action.payload.name;
// 				todo.age = action.payload.age;
// 			}
// 		},
// 	},
// });
// export const { addTodo, deleteAll, deleteItem, toggleCompleted, editFlag } =
// 	todoSlice.actions;
// export const todoReducer = todoSlice.reducer;
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TodoItem {
	_id: number;
	name: string;
	age: number;
	completed: boolean;
}

interface TodoState {
	data: TodoItem[];
}

const initialState: TodoState = {
	data: [],
};

const todoSlice = createSlice({
	name: "todoSlice",
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<{ name: string; age: number }>) => {
			const { name, age } = action.payload;
			const newTodo: TodoItem = {
				_id: Date.now(),
				name,
				age,
				completed: false,
			};
			state.data.push(newTodo);
		},
		deleteAll: (state) => {
			state.data = [];
		},
		deleteItem: (state, action: PayloadAction<number>) => {
			state.data = state.data.filter((item) => item._id !== action.payload);
		},
		toggleCompleted: (state, action: PayloadAction<number>) => {
			const todo = state.data.find((item) => item._id === action.payload);
			if (todo) {
				todo.completed = !todo.completed;
			}
		},
		editFlag: (
			state,
			action: PayloadAction<{ _id: number; name: string; age: number }>
		) => {
			const { _id, name, age } = action.payload;
			const todo = state.data.find((item) => item._id === _id);
			if (todo) {
				todo.name = name;
				todo.age = age;
			}
		},
	},
});

export const { addTodo, deleteAll, deleteItem, toggleCompleted, editFlag } =
	todoSlice.actions;
export const todoReducer = todoSlice.reducer;
