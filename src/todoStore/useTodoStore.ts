import { create } from "zustand";

interface TodoItem {
  title: string;
  complated: boolean;
}

interface TodoState {
  todo: TodoItem[];
  addTodo: (newTodo: TodoItem) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number, newTodo: Partial<TodoItem>) => void;
}

export const useTodoStore = create<TodoState>((set) => {
    
  const loadTodos = () => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : []; 
  };

  return {
    todo: loadTodos(),
    addTodo: (newTodo) =>
      set((state) => {
        const updatedTodos = [...state.todo, newTodo];
        localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
        return { todo: updatedTodos };
      }),
    deleteTodo: (id) =>
      set((state) => {
        const updatedTodos = state.todo.filter((_, index) => index !== id);
        localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
        return { todo: updatedTodos };
      }),
    editTodo: (id, newTodo) =>
      set((state) => {
        const updatedTodos = state.todo.map((item, index) =>
          index === id ? { ...item, ...newTodo } : item
        );
        localStorage.setItem("todos", JSON.stringify(updatedTodos)); 
        return { todo: updatedTodos };
      }),
  };
});