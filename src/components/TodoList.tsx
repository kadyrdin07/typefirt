import React, { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { RootState, useAppSelector } from "../tools/store";
import scss from "../components/TodoSlice.module.scss";
import { TextField, Button } from "@mui/material";
import {
	addTodo,
	deleteAll,
	deleteItem,
	editFlag,
	toggleCompleted,
} from "./todoSlice";

const TodoList: FC = () => {
	const [name, setName] = useState("");
	const [age, setAge] = useState("");
	const [newName, setNewName] = useState("");
	const [newAge, setNewAge] = useState("");
	const [isEdit, setIsEdit] = useState<number | null>(null);

	const todo = useAppSelector((state: RootState) => state.todoReducer.data);
	const dispatch = useDispatch();

	const deleteAllHandler = () => {
		dispatch(deleteAll());
	};

	const handleAdd = () => {
		dispatch(addTodo({ name, age }));
		setName("");
		setAge("");
	};

	const handleDelete = (id: number) => {
		dispatch(deleteItem(id));
	};

	const toggleCompletedHandler = (id: number) => {
		dispatch(toggleCompleted(id));
	};

	const edit = (item: any) => {
		setNewName(item.name);
		setNewAge(item.age);
		setIsEdit(item._id);
	};

	const saveTodo = (id: number) => {
		dispatch(editFlag({ id, name: newName, age: newAge }));
		setIsEdit(null);
		setNewName("");
		setNewAge("");
	};

	return (
		<>
			<div className={scss.section}>
				<div className={scss.container}>
					<TextField
						value={name}
						onChange={(e) => setName(e.target.value)}
						id="standard-basic"
						label="Standard"
						variant="standard"
					/>

					<TextField
						value={age}
						onChange={(e) => setAge(e.target.value)}
						id="standard-basic"
						label="Standard"
						variant="standard"
					/>

					<Button onClick={handleAdd}>ADD</Button>

					<Button onClick={deleteAllHandler} variant="outlined" >
						Delete       <hr />All
					</Button>
				</div>
				{todo.map((item) => (
					<div key={item._id}>
						<hr />
						{isEdit === item._id ? (
							<>
								<div className={scss.contain}>
									<TextField
										value={newName}
										onChange={(e) => setNewName(e.target.value)}
										id="standard-basic"
										label="Standard"
										variant="standard"
									/>
									<TextField
										value={newAge}
										onChange={(e) => setNewAge(e.target.value)}
										id="standard-basic"
										label="Standard"
										variant="standard"
									/>

									<Button
										onClick={() => saveTodo(item._id)}
										variant="contained">
										SAVe
									</Button>
									<Button onClick={() => setIsEdit(null)} variant="contained">
										CANCEL
									</Button>
								</div>
							</>
						) : (
							<>
							<hr />

								<div className={scss.chekbox}>
									<input
										placeholder="text"
										type="checkbox"
										checked={item.completed}
										onChange={() => toggleCompletedHandler(item._id)}
										/>
									<h2>{item.name}</h2>
									<p>{item.age}</p>
								<Button
									onClick={() => edit(item)}
									variant="contained"
									color="success">
									EDIT
								</Button>
						<Button
							onClick={() => handleDelete(item._id)}
							variant="outlined"
							color="error">
							DELETE
						</Button>
								</div>
							</>
						)}
					</div>
				))}
			</div>
		</>
	);
};

export default TodoList;
