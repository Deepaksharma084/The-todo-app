import { useState, useEffect, useRef } from 'react'
import './App.css'
import { v4 as uuidv4 } from 'uuid';
import myImage from './cat.webp';
import myImage2 from './peach-cat.gif';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faPen, faPenRuler } from '@fortawesome/free-solid-svg-icons';
import gsap from 'gsap';
import NavLogo from './tasks.png';


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

  // const handleSave = () => {
  //   setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])//this syntax updates the list of tasks with the new task at the end while keeping all the previous tasks in the list. [...todos] means keep this as it is and add todo and isCompleted to todos at the end
  //   setTodo("")
  // }

  const handleSave = () => {
    if (todo.trim().length > 0) { // Ensure that the todo isn't empty or just spaces
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
      setTodo(""); // Clear input after saving
    }
  }


  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSave(); // Trigger save on Enter key press
    }
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
  //explaination:-Using onClick={() => handleDelete(items.id)} is the correct and intended way to ensure the function executes only when the button is clicked and Think of onClick={handleDelete(items.id)} as saying, "As soon as I see this button, go ahead and delete the item!" — this happens immediately, without waiting for any user action.


  //GSAP
  const icon2 = useRef(null);

  useEffect(() => {
    gsap.to(icon2.current, {
      opacity: 1,
      // y: -20,
      // ease: "bounce.out",
      duration: 1,
      delay:0.2
  })
  }, []);

  const contact = useRef(null);

  useEffect(() => {
    if (contact.current) { // Check if the ref is assigned
      const contactInnerText = contact.current.innerText; // Get the innerText
      const splittedContactInnerText = contactInnerText.split(""); // Correct the typo: "splict" to "split"
      console.log(splittedContactInnerText); // Just for debugging

      let KhaliDabba = "<a href='https://www.linkedin.com/in/deepak-sharma-d440/' target='_blank' rel='noopener noreferrer'>"; // Start anchor tag

      splittedContactInnerText.forEach(function (char) {
        KhaliDabba = KhaliDabba + `<span>${char}</span>`
      })
      contact.current.innerHTML = KhaliDabba
      gsap.from(contact.current.querySelectorAll('span'), {
        opacity: 0,
        delay: 0.2,
        duration: 3,
        stagger: 0.09,
      })
    }
  }, []);

  const Zzz = useRef(null);

  useEffect(() => {
    if (Zzz.current) { // Check if the ref is assigned
      const ZzzInnerText = Zzz.current.innerText; // Get the innerText
      const splittedZzzInnerText = ZzzInnerText.split(""); // Correct the typo: "splict" to "split"
      console.log(splittedZzzInnerText); // Just for debugging

      let KhaliDabba = "<a href='https://www.linkedin.com/in/deepak-sharma-d440/' target='_blank' rel='noopener noreferrer'>"; // Start anchor tag

      splittedZzzInnerText.forEach(function (char) {
        KhaliDabba = KhaliDabba + `<span>${char}</span>`
      })
      Zzz.current.innerHTML = KhaliDabba
      const tl = gsap.timeline({ repeat: -1 })
      tl.from(Zzz.current.querySelectorAll('span'), {
        opacity: 0,
        delay: 0.6,
        y: 20,
        duration: 1,
        stagger: 0.09,
      })
      tl.from(Zzz.current.querySelectorAll('span'), {
        opacity: 0,
        delay: 0.6,
        y: 20,
        duration: 1,
        stagger: -0.09,
      })

    }
  }, []);



  return (
    <>
      <nav className='drop-shadow-xl flex justify-between items-center font-bold text-lg w-[100vw] max-sm:h-[16vw] h-[4vw] text-white bg-[#434145]'>
        <div className=" max-sm:ml-5 ml-[12vw] h-[4vw] max-sm:h-[16vw] flex justify-center items-center icon-container relative">
          {/* <FontAwesomeIcon className='text-2xl absolute bottom-0' ref={icon1} icon={faPen} style={{ opacity: 0 }} /> */}
          <div className='bg-white rounded-full max-sm:p-1 p-2'>

          <img className='max-sm:h-[8vw] h-[2vw]' src={NavLogo} alt="" />
          </div>
          {/* <FontAwesomeIcon className='text-2xl absolute' ref={icon2} icon={faPenToSquare} style={{ opacity: 0 }} /> */}
          {/* <FontAwesomeIcon className='text-2xl absolute' ref={icon3} icon={faPenRuler} style={{ opacity: 0 }} /> */}
        </div>


        <ul className='max-sm:mr-[4vw] mr-[11vw] my-4'>
          <li ref={contact}>Contact</li>
        </ul>
      </nav>


      <div className='text-white flex justify-center min-h-[70vh] '>

        {todos.length > 0 &&
          <div className='absolute max-sm:top-[40.5vw] top-[9.5vw] max-sm:right-[-22vw] right-[-5vw]  flex justify-center mt-10 items-center flex-col mx-24 text-black'>
            <img className='select-none z-40 max-sm:h-[30vw] h-[9vw]' src={myImage2} alt="" />
          </div>}{/*visible only when no todos are there*/}

        <div className='bg-[#f0ebd7] drop-shadow-xl relative min-h-[70vh] w-[80vw] overflow-hidden rounded-xl my-24 max-sm:w-[95vw] max-sm:min-h-[170.9vw] max-sm:my-6 min-md:bg-red-900'>

          <div>
            <h1 className='text-xl my-4 max-sm:mx-5 mx-10 text-black font-bold select-none'>Your task manager</h1>
          </div>

          <div className='todo bg-[#58565b] flex items-center justify-center max-sm:gap-[4vw] gap-[2vw] h-[5vw] w-[78vw] max-sm:h-[14vw] max-sm:w-[89.9vw] mx-auto rounded-xl max-sm:rounded-xl max-sm:mx-auto'>
            <input onKeyDown={handleKeyDown} type="text" onChange={handlechange} value={todo} className='text-black hover:bg-[#eaebed] h-[2.1vw] max-sm:w-[66vw] w-[60vw]  rounded-xl p-2 max-sm:h-[8vw]' />
            <button onClick={handleSave} disabled={todo.length < 1} className='text-black flex justify-center items-center h-[2.1vw] w-[5vw] bg-[#0aff1b] rounded-xl font-medium text-lg  max-sm:h-[8vw] text-white max-sm:w-[15vw] select-none'>Save</button>{/* gets disabled if characters are less than 1 i.e 0*/}
          </div>

          <div className='flex items-center gap-3 w-[80vw]'>
            <input onChange={toggleShowFinished} checked={ShowFinished} className='h-[0.9vw] ml-24 max-sm:h-[5vw] max-sm:ml-5 max-sm:my-5' type="checkbox" name="" id="" />
            <p className="text-[1vw] cursor-pointer text-black max-sm:text-[4vw] select-none">Show finished</p>
          </div>

          <hr className="h-[0.2vw] bg-gray-400" />

          <h1 className='text-lg max-sm:mx-5 mx-10 max-sm:my-5 text-black font-bold select-none'>Your Todos</h1>


          {todos.length === 0 &&
            <div className='relative flex justify-center mt-10 items-center flex-col mx-24 text-black'>
              <div className='flex justify-center items-center'>
                <span className='select-none'>No todos yet</span>
              </div>

              <div className='relative'>
                <span ref={Zzz} className='inline absolute right-0 top-5'>Zzz</span>
                <img className='select-none max-sm:h-[36vw] h-[12vw]' src={myImage} alt="" />
              </div>
            </div>}{/*visible only when no todos are there*/}



          {todos.map(items => {
            return (ShowFinished || !items.isCompleted) && <div key={items.id} className='flex w-full my-4'>

              <div className='mr-3 mt-1'>
                <input name={items.id} onChange={toggleIsCompleted} checked={items.isCompleted} className='ml-24 max-sm:ml-5 ' type="checkbox" id="toggle" />
              </div>

              <div className='flex gap-4 w-[60vw] break-words'>
                <div className={items.isCompleted ? "line-through decoration-[#f00]" : ""}>
                  <div className='text-black break-words w-[40vw] h-auto'>
                    {items.todo}
                  </div>
                </div>

              </div>

              <div className='flex h-full gap-3'>

                <button onClick={() => handleEdit(items.id)} className='ml-1 text-black flex justify-center items-center h-[1.7vw] max-sm:w-[7vw] bg-[#A0E3F9] rounded-xl font-medium max-sm:text-lg max-sm:h-[6vw] w-[3vw] max-sm:rounded-md text-sm'><i class="ri-quill-pen-line"></i></button>

                <button onClick={() => handleDelete(items.id)} className='text-black flex justify-center items-center h-[1.7vw] w-[3vw] bg-[#A0E3F9] rounded-xl font-medium text-lg max-sm:h-[6vw] max-sm:w-[7vw] max-sm:rounded-md max-sm:text-sm'><i class="ri-delete-bin-6-line"></i></button>

              </div>


            </div>
          })}

        </div>

      </div>

    </>
  )
}

export default App
