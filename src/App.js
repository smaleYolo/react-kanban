import AddTask from "./components/AddTask";
import {useEffect, useState} from "react";
import ToDo from "./components/ToDo";
import {useDrop} from "react-dnd";

function App() {
    const [taskList, setTaskList] = useState([])
    const [completed, setCompleted] = useState([])

    useEffect(() => {
        let taskArr = localStorage.getItem('taskList')
        let completedArr = localStorage.getItem('completedList')

        if(taskArr) {
            setTaskList(JSON.parse(taskArr))
        }

        if(completedArr) {
            setCompleted(JSON.parse(completedArr))
        }

    },[])

    const [{isOver}, drop] = useDrop(() => ({
        accept: 'todo',
        drop: (item) => addToCompleted(item.id, item.projectName, item.taskDescription, item.duration, item.timestamp),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))



    const addToCompleted = (id, projectName, taskDescription, duration, timestamp) => {

        setCompleted((completed) => [...completed, {id, projectName, taskDescription, timestamp, duration}])
        setTaskList(prev => prev.filter((task) => task.id !== id))
    }

    useEffect(() => {
        localStorage.setItem('taskList', JSON.stringify(taskList))
        localStorage.setItem('completedList', JSON.stringify(completed))
    }, [taskList, completed])

    return (
        <>
            <h1 className='text-2xl font-bold py-6 pl-6'>Task Tracker</h1>
            <div className='flex flex-row items-center'>
                <p className='text-xl pl-6'>Click</p>
                <AddTask taskList={taskList} setTaskList={setTaskList}/>
                <p className='text-xl'>to add a new task!</p>
            </div>
           <div className='flex mx-10'>
               <div className='w-full'>
                   <h2 className='rounded-md text-xl font-semibold w-3/4 max-w-lg py-2 my-6 px-2 bg-gray-300'>To Do:</h2>
                   {taskList.map((task,i) => (
                       <ToDo key={i} index={i} task={task} setTaskList={setTaskList} taskList={taskList}/>
                   ))}
               </div>
               <div className='w-full flex-col' ref={drop}>
                   <h2 className='rounded-md text-xl font-semibold w-3/4 max-w-lg py-2 my-6 px-2 bg-gray-300'>Completed:</h2>
                   {completed.map((task,i) => (
                       <ToDo key={i} index={i} task={task} setTaskList={setCompleted} taskList={completed}/>
                   ))}
               </div>
           </div>
        </>
    );
}

export default App;
