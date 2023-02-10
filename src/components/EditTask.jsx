import React, { useEffect, useState } from 'react';

const EditTask = ({task, setTaskList, taskList, index}) => {
    const [editModal, setEditModal] = useState(false)
    const [projectName, setProjectName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')

    useEffect(() => {
        setProjectName(task.projectName)
        setTaskDescription(task.taskDescription)
    }, [task])



    const handleUpdate = () => {
        setTaskList(prevState =>
            prevState.map(item =>
                item.id === task.id
                    ? { ...item, projectName, taskDescription, timestamp: task.timestamp, duration: task.duration}
                    : item
            )
        )

        setEditModal(false)
    }


    const handleInput = e => {
        const {name, value} = e.target

        if (name === 'projectName') setProjectName(value)
        if (name === 'taskDescription') setTaskDescription(value)
    }

    return (
        <>
            <button
                onClick={() => setEditModal(true)}
                className='bg-gray-300 rounded-md px-2 py-1 font-semibold hover:scale-110
                    hover:opacity-80 transition-all'
            >
                Edit
            </button>
            {editModal ? (
                <>
                    <div
                        className='flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-10'>
                        <div className='w-9/12 max-w-lg shadow-md border bg-white rounded-lg relative flex flex-col'>
                            <div
                                className='flex flex-row justify-between items-center p-5 border-b-2 border-slate-200 rounded-t'>
                                <h3 className='text-2xl font-semibold'>Edit Task</h3>
                                <button
                                    onClick={() => setEditModal(false)}
                                    className='px-1 text-gray-400 float-right text-3xl leading-none font-semibold block hover:scale-125 transition'
                                >
                                    &times;
                                </button>
                            </div>
                            <form className='p-6 pt-6 pb-4'>
                                <div>
                                    <label
                                        className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2 pl-1'
                                        htmlFor='project-name'
                                    >
                                        Project Name
                                    </label>
                                    <input
                                        value={projectName}
                                        onChange={handleInput}
                                        className='w-full outline-none pl-3 py-2 bg-gray-200 text-black
                                   rounded-md hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 transition-all'
                                        id='project-name'
                                        name='projectName'
                                        type="text"
                                        placeholder='Project name'
                                        required
                                    />
                                </div>
                                <div className='mt-3'>
                                    <label
                                        className='tracking-wide uppercase text-gray-700 text-xs font-semibold mb-2 pl-1'
                                        htmlFor="project-description">Project Description</label>
                                    <textarea
                                        value={taskDescription}
                                        onChange={handleInput}
                                        className='w-full outline-none pl-3 py-2 bg-gray-200 text-black
                                   rounded-md hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 transition-all'
                                        id="project-description"
                                        name='taskDescription'
                                        rows="4"
                                        placeholder='Project Description'
                                    />
                                </div>
                            </form>
                            <div className='flex justify-end p-6 border-t-2 border-slate-200 rounded-b'>
                                <button
                                    onClick={handleUpdate}
                                    className='bg-blue-500 text-white font-semibold uppercase
                                   text-sm px-3 py-2 rounded-md hover:opacity-60 transition uppercase'
                                >
                                    Update task
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            ) : null}
        </>
    );
};

export default EditTask;