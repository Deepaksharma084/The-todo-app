import { useState, useEffect, useRef } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import myImage from './cat.webp';

function App() {
  //states
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);//it holds the all todos
  const [ShowFinished, setShowFinished] = useState(true);

  //gets data from localstorage when page is refreshed or loaded
  useEffect(() => {
    const todosString = localStorage.getItem("todos");
    if (todosString) {//true hongey toh hi parse hongey varna error ayega is if ke bina
      const storedTodos = JSON.parse(todosString);
      setTodos(storedTodos);
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  //functions
  const handlechange = (e) => {
    setTodo(e.target.value)//when we hit save button then setTodo is set to nothing and that gets displayed in input so we are connecting this function with input ,so that input gets updated automatically
  }

  const handleSave = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])//this syntax updates the list of tasks with the new task at the end while keeping all the previous tasks in the list. [...todos] means keep this as it is and add todo and isCompleted to todos at the end
    setTodo("")
  }

  const toggleShowFinished = (e) => {
    setShowFinished(!ShowFinished)
  }

  const toggleIsCompleted = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {//here findIndex findes the index if the id matches with any todo and stores in index variable
      return item.id === id;
    })
    let newTodos = [...todos];//[...todos] -> need to refer like this because todos is a new array when we click check or save button
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }

  const handleEdit = (id) => {
    let t = todos.filter(item => {
      return item.id === id;
    })
    setTodo(t[0].todo);//at the time of saving we set the setTodo to black but now when editting we are setting it to particular todo at index 0 so that the value of input which has todo gets displayed on input and through handleChange function we can change and later can be saved


    //we need to delete after we got the todo in the input so that todo will be updated rather than having both new and old todo
    const newTodos = todos.filter(item => {
      return item.id !== id
    })
    setTodos(newTodos)
  }

  const handleDelete = (id) => {
    const newTodos = todos.filter(item => {//.filter() method to create a new array (newTodos) that contains all the todos except the one with the id you want to delete.
      return item.id !== id
    })
    setTodos(newTodos)


    // Clear localStorage if no todos remain
    if (newTodos.length === 0) {
      localStorage.removeItem("todos");
    }
  }
  //explaination:-Using onClick={() => handleDelete(items.id)} is the correct and intended way to ensure the function executes only when the button is clicked andThink of onClick={handleDelete(items.id)} as saying, "As soon as I see this button, go ahead and delete the item!" — this happens immediately, without waiting for any user action.

  return (
    <>
      <nav className='flex justify-between font-bold text-lg text-white bg-slate-500'>
        <ul className='flex justify-between gap-4 mx-4 my-4'>
          <li>home</li>
          <li>About</li>
        </ul>
        <ul className='mx-4 my-4'>
          <li>Contact Us</li>
        </ul>
      </nav>


      <div className='text-white flex justify-center bg-slate-300 min-h-[80vh] '>
        <div className='bg-[#85899f] min-h-[70vh] w-[80vw] rounded-xl my-4 max-sm:w-[90vw] min-h-[170.9vw] my-6 min-md:bg-red-900'>

          <div>
            <h1 className='text-xl my-4 mx-10 text-black font-bold'>Your task manager</h1>
          </div>

          <div className='todo flex items-center justify-center gap-[2vw] h-[5vw] w-[80vw] max-sm:h-[10vw]'>
            <input type="text" onChange={handlechange} value={todo} className='text-black hover:bg-[#eaebed] h-[2.1vw] w-[60vw]  rounded-xl p-2 max-sm:h-[8vw]' />
            <button onClick={handleSave} disabled={todo.length < 1} className='text-black flex justify-center items-center h-[2.1vw] w-[5vw] bg-[#29ff77] rounded-xl font-medium text-lg  max-sm:h-[8vw] w-[15vw]'>Save</button>{/* gets disabled if characters are less than 1 i.e 0*/}
          </div>

          <div className='flex items-center gap-3 w-[80vw]'>
            <input onChange={toggleShowFinished} checked={ShowFinished} className='h-[0.9vw] ml-24 max-sm:h-[5vw] max-sm:ml-10' type="checkbox" name="" id="" />
            <p className="text-[1vw] cursor-pointer text-black max-sm:text-[4vw]">Show finished</p>
          </div>

          <hr className="h-[0.2vw] bg-gray-400" />

          <h1 className='text-lg mx-10 text-black font-bold'>Your Todos</h1>


          {todos.length === 0 &&
            <div className='relative flex justify-center mt-10 items-center flex-col mx-24 text-black'>
              <p className='absolute mt-[-7rem] ml-[-2rem]'>Empty....Zzz</p>
              <img src={myImage} alt="" />
            </div>}{/*visible only when no todos are there*/}

          {todos.map(items => {
            return (ShowFinished || !items.isCompleted) && <div key={items.id} className='flex w-full my-4'>

              <div className='flex gap-4 w-[60vw] break-words'>

                <input name={items.id} onChange={toggleIsCompleted} checked={items.isCompleted} className='ml-24 max-sm:ml-10' type="checkbox" id="toggle" />
                <div className={items.isCompleted ? "line-through decoration-[#000]" : ""}>
                  <div className='text-black break-words w-[40vw] h-auto'>
                    {items.todo}
                  </div>
                </div>

              </div>

              <div className='flex h-full gap-4'>
                <button onClick={() => handleEdit(items.id)} className='text-black flex justify-center items-center h-[1.7vw] w-[5vw] bg-[#edffea] rounded-xl font-medium text-lg max-sm:h-[6vw] w-[7vw] rounded-md text-sm'><i class="ri-quill-pen-line"></i></button>
                <button onClick={() => handleDelete(items.id)} className='text-black flex justify-center items-center h-[1.7vw] w-[5vw] bg-[#edffea] rounded-xl font-medium text-lg max-sm:h-[6vw] w-[7vw] rounded-md text-sm'><i class="ri-delete-bin-6-line"></i></button>
              </div>

            </div>
          })}

        </div>

      </div>

    </>
  )
}

export default App
