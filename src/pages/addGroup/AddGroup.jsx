import { useNavigate } from "react-router-dom"
import AddGroupComponent from "../../components/addGroupComponent/AddGroupComponent"

const AddGroup = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate('/');
  }
  return (
    <>
      <h1 className="text-[2rem] mb-5">Add Group</h1>
      <AddGroupComponent />
      <button data-testid="back_btn" className="p-2 bg-blue-500 font-bold text-white rounded-lg mt-5" onClick={goBack}>
        Go Back
      </button>
    </>
  )
}

export default AddGroup