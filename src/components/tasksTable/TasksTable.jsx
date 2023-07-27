import React from "react"
import { useContext, useMemo } from "react"
import AddTask from "../addTask/AddTask"
import { GroupContext } from "../../context/GroupContext"
import { deleteData } from "../../lib/deleteData"
import { getStoreData } from "../../lib/getData"
import Modal from "../modal/Modal"
import AddTaskForm from "../addTaskForm/AddTaskForm"
import { Link } from "react-router-dom"

const TasksTable = ({ tasks }) => {

  const { currentGroup, setTasks } = useContext(GroupContext);
  const [editStates, setEditStates] = React.useState({});

  const filteredTask = useMemo(() => tasks?.filter(task => task.group_id == currentGroup), [currentGroup, tasks])

  const handleDelete = async (id) => {
    try {
      await deleteData('tasks', id);
      const tasksRes = await getStoreData('tasks');
      setTasks(tasksRes);
    } catch (error) {
      console.error(error)
    }
  }

  const handleToggleEdit = (taskId) => {
    setEditStates(prevState => ({
      ...prevState,
      [taskId]: !prevState[taskId]
    }));
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="font-bold mb-1 text-xl">Tasks</h1>
        <AddTask />
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table data-testid="task_table" className="min-w-full text-left text-sm font-light">
                <thead className="border-b font-medium dark:border-neutral-500">
                  <tr>
                    <th scope="col" className="px-6 py-4">#</th>
                    <th scope="col" className="px-6 py-4">Task Title</th>
                    <th scope="col" className="px-6 py-4">Task Description</th>
                    <th scope="col" className="px-6 py-4">Status</th>
                    <th scope="col" className="px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    filteredTask?.map((task, index) => (
                      <tr className="border-b dark:border-neutral-500" key={index}>
                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + 1}</td>
                        <td className="whitespace-nowrap px-6 py-4 hover:animate-pulse">
                          <Link data-testid="task-title" to={{ pathname: '/task', search: JSON.stringify(task.task_id) }} >
                            {task.title}
                          </Link>
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">{task.desc}</td>
                        {
                          task.status === 'pending' ? (
                            <td className="whitespace-nowrap px-6 py-4 bg-yellow-200">{task.status}</td>
                          ) :
                            (
                              <td className="whitespace-nowrap px-6 py-4 bg-green-200 line-through">{task.status}</td>
                            )
                        }
                        <td className="whitespace-nowrap px-6 py-4">
                          <div className="flex gap-20 items-center">
                            <button data-testid="edit-task-btn" onClick={() => handleToggleEdit(task.task_id)}>✏️</button>
                            <button data-testid="delete-task-btn" onClick={() => handleDelete(task.task_id)}>🗑️</button>
                            {editStates[task.task_id] && (
                              <Modal state={() => handleToggleEdit(task.task_id)} content={<AddTaskForm edit={task} />} />
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div >
    </>
  )
}

export default TasksTable