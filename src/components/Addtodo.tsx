import { useState } from "react"
import { useTodoStore } from "../todo/useTodoStore";

const Addtodo = () => {

    const [title, setTitle] = useState("");
    const [complated, setcomplated] = useState(false);
    const addTodo = useTodoStore(state => state.addTodo);


    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (title === "") {
            return false;

        } else if (title.trim()) {

            addTodo({ title, complated })
            setTitle("");
            setcomplated(false);
            localStorage.setItem("title", title);
            localStorage.setItem("complated", complated.toString());
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <input className="px-3 outline-none w-[500px] border h-[50px]" type="text" placeholder="Add todo" value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="checkbox" checked={complated} onChange={e => setcomplated(e.target.checked)} />
                {complated ? "Complated" : "Waiting"}
                <button className="bg-green-500 h-[40px] px-5 text-white" type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Addtodo