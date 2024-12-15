import './App.css'
import Addtodo from './components/Addtodo'
import TodoList from './components/TodoList'

function App() {

  return (
    <>
      <div className='container mx-auto w-[700px] space-y-4 flex flex-col items-center justify-center mt-10'>
        <Addtodo />
        <TodoList />
      </div>
    </>
  )
}

export default App
