import { useContext, useState } from "react";
import { addData } from "../../lib/addData";
import { GroupContext } from "../../context/GroupContext";
import { getStoreData } from "../../lib/getData";
import { useNavigate } from "react-router-dom";

const AddGroupComponent = ({ edit, value }) => {

  const [groupName, setGroupName] = useState("");
  const navigate = useNavigate();
  const { setGroups } = useContext(GroupContext);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await addData('groups', {
        group_name: groupName
      });
      const groupsRes = await getStoreData('groups');
      setGroups(groupsRes);
    } catch (error) {
      console.error(error);
    }
    setGroupName("");
    navigate("/");
  }

  return (
    <>
      <form data-testid="add_group_form" className="flex gap-5" onSubmit={onSubmit}>
        <input data-testid="group_name_input_field" type="text" placeholder="Enter the group name" className="border px-2 py-2" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
        <button data-testid="submit" className="px-2 py-3 bg-green-500 text-white font-bold rounded-lg focus:ring-2 ring-green-950 hover:bg-green-600">Add new Group</button>
      </form>
    </>
  )
}

export default AddGroupComponent