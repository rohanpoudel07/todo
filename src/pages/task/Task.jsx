import { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { getStoreData } from "../../lib/getData"

const Task = () => {

  const [task, setTask] = useState({});
  const id = useLocation().search.replace("?", "")
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getStoreData('tasks', id);
      setTask(res);
    }
    fetchData();
  }, [])

  const goBack = () => {
    navigate('/');
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="border-b-2 pb-2">
        <h1 className="font-bold">Task Title: </h1>
        <span>{task.title}</span>
      </div>
      <div className="border-b-2 pb-2">
        <h1 className="font-bold">Task Desc: </h1>
        <span>{task.desc}</span>
      </div>
      <div className="border-b-2 flex gap-2 items-center pb-2">
        <h1 className="font-bold">Task Status: </h1>
        {
          task.status === 'pending' ? (
            <span className="bg-yellow-500 p-1 rounded-lg text-white font-bold">{task.status}</span>
          ) :
            (<span className="bg-green-500 p-1 rounded-lg text-white font-bold line-through">{task.status}</span>)
        }
      </div>
      <button className="px-2 py-2 rounded-lg bg-blue-500 mr-auto text-white font-bold" onClick={goBack}>{"Go Back"}</button>
    </div>
  )
}

export default Task