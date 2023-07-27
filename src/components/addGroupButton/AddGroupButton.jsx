import { Link } from "react-router-dom"

const AddGroupButton = ({ }) => {
  return (
    <>
      <Link to="/create_group">
        <button className="bg-green-100 px-2 py-2 rounded-md focus:ring-2 ring-green-950" >
          Add New Group
        </button>
      </Link>
    </>
  )
}

export default AddGroupButton