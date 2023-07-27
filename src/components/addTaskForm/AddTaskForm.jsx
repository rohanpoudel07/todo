import { useContext, useEffect, useState } from "react";
import { addData } from "../../lib/addData";
import { GroupContext } from "../../context/GroupContext";
import { getStoreData } from "../../lib/getData";
import { editData } from "../../lib/editData";

const AddTaskForm = ({ edit = false }) => {

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("pending");

  const { currentGroup, setTasks } = useContext(GroupContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (edit) {
        const res = await editData('tasks', {
          task_id: parseInt(edit.task_id),
          title,
          desc,
          status,
          group_id: parseInt(currentGroup)
        });
      } else {
        const res = await addData('tasks', {
          title,
          desc,
          status,
          group_id: parseInt(currentGroup)
        });
      }

      const tasksRes = await getStoreData('tasks');
      setTasks(tasksRes);
    } catch (error) {
      console.error(error);
    }
    if (!edit) {
      setTitle("");
      setDesc("");
      setStatus("");
    }
  }

  useEffect(() => {
    if (edit) {
      setTitle(edit.title);
      setDesc(edit.desc);
      setStatus(edit.status);
    }
  }, [])

  return (
    <div>
      <h2 data-testid="form_title" className="text-lg font-bold mb-2">
        {
          edit ? "Edit this task here" :
            "Add New Task Here"
        }
      </h2>
      <form data-testid="task_form" className="flex flex-col gap-5" onSubmit={handleSubmit}>
        <input data-testid="task title input field" name="title" type="text" placeholder="Task Title" onChange={(e) => setTitle(e.target.value)} value={title} required className="border p-2" />
        <textarea data-testid="task description input field" name="desc" placeholder="Enter the description" cols="30" rows="10" onChange={(e) => setDesc(e.target.value)} value={desc} required className="border p-2"></textarea>
        <select data-testid="task status select field" name="status" onChange={(e) => setStatus(e.target.value)} value={status} required className="border p-2">
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
        <button data-testid="submit-button" type="submit" className="p-2 bg-green-500 rounded-lg text-white font-bold focus:ring-2 ring-green-950 hover:bg-green-600">{edit ? "Edit Task" : "Add Task"}</button>
      </form>
    </div>
  )
}

export default AddTaskForm