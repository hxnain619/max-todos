import { TodoType } from "../types";
import { createContext, useState, useEffect, ReactNode } from "react";

interface MainContextInterface {
	todos: TodoType[];
	setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
	delTodo: (id: string) => void;
	deleteAll: () => void;
	editTodo: (id: string, text: string) => void;
	addTodo: ({ name, profession }: any) => void;
	moveTodo: (old: number, new_: number) => void;
}

interface Props {
	children: ReactNode;
}

const API = "https://x8ki-letl-twmt.n7.xano.io/api:vP9j-6m8/employees";
export const MainContext = createContext<MainContextInterface | null>(null);

export const MainProvider = ({ children }: Props) => {
	const [todos, setTodos] = useState<TodoType[]>(
		JSON.parse(localStorage.getItem("todos")!) || [],
	);

	useEffect(() => {
		localStorage.setItem("todos", JSON.stringify(todos));
	}, [todos]);

	const addTodo = ({ name, profession }: any) => {
		if (name.trim()) {
			const newTodo = {
				id: String(Math.floor(Math.random() * 5000)),
				name,
				profession,
			};
			fetch(API, {
				method: "POST",
				headers: {
					accept: "application/json",
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ ...newTodo }),
			}).then(() => {
				getList();
			});
		}
	};
	const getList = () => {
		fetch(API)
			.then((res) => res.json())
			.then((res) => {
				setTodos(res);
			});
	};
	const editTodo: (id: string, text: string) => void = (
		id: string,
		text: string,
	) => {
		if (!(text === null) && text.trim()) {
			setTodos(
				todos.map((todo) => {
					if (todo.id === id) todo.name = text;
					return todo;
				}),
			);
		}
	};

	const delTodo = (id: string) =>
		setTodos(todos.filter((todo) => todo.id !== id));
	const deleteAll = () => setTodos([]);
	const moveTodo = (old: number, new_: number) => {
		const copy = JSON.parse(JSON.stringify(todos));
		const thing = JSON.parse(JSON.stringify(todos[old]));
		copy.splice(old, 1);
		copy.splice(new_, 0, thing);
		setTodos(copy);
	};

	const mainContextValue: MainContextInterface = {
		todos,
		setTodos,
		delTodo,
		deleteAll,
		editTodo,
		addTodo,
		moveTodo,
	};

	return (
		<MainContext.Provider value={mainContextValue}>
			{children}
		</MainContext.Provider>
	);
};
