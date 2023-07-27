import React from "react";
import Modal from "../modal/Modal";
import AddTaskForm from "../addTaskForm/AddTaskForm";

const AddTask = () => {
  const [showModal, setShowModal] = React.useState(false);
  console.log(showModal)
  return (
    <>
      <button data-testid="Add New Task Button" className='p-2 bg-yellow-500 rounded-lg focus:ring-2 ring-orange-950' onClick={() => setShowModal(!showModal)}>
        Add New Task
      </button>
      {showModal &&
        <Modal state={setShowModal} content={<AddTaskForm />} />
      }
    </>
  )
}

export default AddTask