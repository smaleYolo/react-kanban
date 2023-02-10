import React, {useEffect, useState} from 'react';
import EditTask from "./EditTask";
import {useDrag} from "react-dnd";

const ToDo = ({task, setTaskList, taskList, index}) => {
    const [time, setTime] = useState(task.duration)
    const [running, setRunning] = useState(false)
    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'todo',
        item: {
            id: task.id,
            projectName: task.projectName,
            taskDescription: task.taskDescription,
            duration: task.duration,
            timestamp: task.timestamp,
        },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))


    useEffect(() => {
        let interval;
        if(running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 10)
            }, 10)
        } else if(!running) {
            clearInterval(interval)
        }

        return () => clearInterval(interval)
    },[running])

    const deleteHandler = () => {
        setTaskList(prev => prev.filter(item => item.id !== task.id))
    }


    const handleStop = () => {
        setRunning(false)

        setTaskList(prevState =>
            prevState.map(item =>
                item.id === task.id
                    ? { ...item,
                        projectName: task.projectName,
                        taskDescription: task.taskDescription,
                        timestamp: task.timestamp,
                        duration: time
            }
                    : item
            )
        )
    }

    return (
        <>
            <div className='flex flex-col items-start justify-start
            bg-white my-4 ml-6 py-4 px-6 w-3/4 max-w-lg rounded-md shadow-md' ref={drag}>
                <div className='flex flex-row justify-between w-full items-center'>
                    <p className='font-semibold text-xl'>{task.projectName}</p>
                    <EditTask task={task} setTaskList={setTaskList} taskList={taskList} index={index}/>
                </div>
                <p className='text-lg py-2'>{task.taskDescription}</p>

                <div className='w-full flex flex-col sm:flex-row justify-center sm:justify-evenly items-center mb-5'>
                    <div className='sm:w-1/3  text-xl font-semibold py-4'>
                        <span>{("0" + Math.floor((time / 3600000) % 24)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 60000) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 1000) % 60)).slice(-2)}</span>
                        <span className='text-sm'>:{("0" + Math.floor((time / 10) % 100)).slice(-2)}</span>
                    </div>
                    <div className='w-1/3 max-w-sm flex flex-row justify-evenly'>
                        {running ? (
                            <button onClick={handleStop} className='border rounded-lg py-1 px-3'>Stop</button>
                        ) : (
                            <button onClick={() => setRunning(true)} className='border rounded-lg py-1 px-3'>Start</button>
                        )}
                        <button onClick={() => {
                            setRunning(false)
                            setTime(0)
                        }} className='border rounded-lg py-1 px-3'>Reset</button>
                    </div>
                </div>

                <div className='w-full flex justify-center'>
                    <button
                        onClick={deleteHandler}
                        className='bg-red-400 text-white rounded-md px-2 py-1 font-semibold
                    hover:scale-110 transition-all'>
                        Delete
                    </button>
                </div>
            </div>
        </>
    );
};

export default ToDo;