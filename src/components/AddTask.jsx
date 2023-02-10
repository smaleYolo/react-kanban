import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

const AddTask = ({ taskList, setTaskList }) => {
    const [addModal, setAddModal] = useState(false)
    const [projectName, setProjectName] = useState('')
    const [taskDescription, setTaskDescription] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const handleAdd = () => {
        if(!projectName){
            setErrorMessage('Enter project name to continue')
        } else {
            console.log('handleAdd')
            let timestamp = new Date()
            let tempList = taskList
            tempList.push({
                id: uuidv4(),
                projectName,
                taskDescription,
                timestamp,
                duration: 0
            })
            localStorage.setItem('taskList', JSON.stringify(tempList))
            window.location.reload()

            setAddModal(false)


            setProjectName('')
            setTaskDescription('')
        }
    }

    const handleInput = e => {
        const {name, value} = e.target

        if (name === 'projectName') {
            setProjectName(value)
            setErrorMessage('')
        }
        if(name === 'projectName' && value === ''){
            setErrorMessage('Enter project name to continue')
        }
        if (name === 'taskDescription') setTaskDescription(value)
    }

    const handleClose = () => {
        setAddModal(false)
        setErrorMessage('')
    }

    return (
        <>
            <button
                onClick={() => setAddModal(true)}
                className='relative text-xl px-2 mx-2 py-1 bg-blue-500 text-white border rounded-lg text-center
           hover:scale-105 hover:opacity-90 transition-all cursor-pointer'
                type='button'
            >
                + New
            </button>

            {addModal ? (
                <>
                    <div className='flex items-center justify-center overflow-x-hidden overflow-y-auto fixed inset-0 z-10'>
                       <div className='w-9/12 max-w-lg shadow-md border bg-white rounded-lg relative flex flex-col'>
                           <div className='flex flex-row justify-between items-center p-5 border-b-2 border-slate-200 rounded-t'>
                               <h3 className='text-2xl font-semibold'>Add New Task</h3>
                               <button
                                   className='px-1 text-gray-400 float-right text-3xl leading-none font-semibold block hover:scale-125 transition'
                                   onClick={handleClose}
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
                                       className={`w-full outline-none pl-3 py-2 bg-gray-200 ${errorMessage && 'bg-red-100'}
                                   rounded-md hover:bg-gray-100 hover:text-gray-700 focus:bg-gray-100 transition-all `}
                                       id='project-name'
                                       name='projectName'
                                       type="text"
                                       placeholder='Project name'
                                       required
                                   />
                                   {errorMessage && <span className='flex justify-center text-red-500'>{errorMessage}</span>}
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
                                   onClick={handleAdd}
                                   className='bg-blue-500 text-white font-semibold uppercase
                                   text-sm px-3 py-2 rounded-md hover:opacity-60 transition'
                               >
                                   Add task
                               </button>
                           </div>
                       </div>
                    </div>
                </>
            ):null}
        </>
    );
};

export default AddTask;