import { useState } from "react";
import { useTodoStore } from "../todoStore/useTodoStore"

const TodoList = () => {
    const [editIndex, setEditIndex] = useState<number | null>(null);
    const [editTitle, setEditTitle] = useState("");
    const [editComplated, setEditComplated] = useState(false);
    const todos = useTodoStore(state => state.todo);
    const deleteTodo = useTodoStore(state => state.deleteTodo);
    const editTodo = useTodoStore(state => state.editTodo);

    const startEdit = (index: number, title: string, complated: boolean) => {
        setEditIndex(index);
        setEditTitle(title);
        setEditComplated(complated);
    }

    const handleEdit = (index: number) => {
        editTodo(index, { title: editTitle, complated: editComplated })
        setEditIndex(null);
    }

    return (
        <div className="space-y-1">
            {todos.map((todo, index) => (
                <div key={index} className="flex items-center justify-between w-[600px] p-3">
                    {editIndex === index ?
                        <div className="flex items-center gap-3">
                            <input className="px-3 outline-none w-[400px] border h-[40px]" type="text" placeholder="Add todo" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />

                            <input type="checkbox" checked={editComplated} onChange={e => setEditComplated(e.target.checked)} />
                            {editComplated ? "Complated" : "Waiting"}
                            <button className="bg-green-500 h-[40px] px-3 text-white" type="submit" onClick={() => handleEdit(index)}>Submit</button>
                        </div>
                        : <div className="flex items-center justify-between w-[550px] border p-5">
                            <span>{todo.title}</span>
                            <div className="flex items-center gap-5">
                                <span>{todo.complated ? "Complated" : "Waiting"}</span>

                                <button className="bg-yellow-500 px-3 py-1 text-white" onClick={() => startEdit(index, todo.title, todo.complated)}>Edit</button>
                                <button className="bg-red-500 px-3 py-1 text-white" onClick={() => deleteTodo(index)}>Delete</button>
                            </div>
                        </div>
                    }
                </div>
            ))}
        </div>
    )
}

export default TodoList