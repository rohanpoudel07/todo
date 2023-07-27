import { useContext } from "react"
import { GroupContext } from "../../context/GroupContext";
import { deleteData } from "../../lib/deleteData";
import { getStoreData } from "../../lib/getData";

const DeleteGroupButton = () => {

  const { currentGroup, setCurrentGroup, setGroups } = useContext(GroupContext);

  const handleDelete = async () => {
    try {
      await deleteData('groups', parseInt(currentGroup)).then(async () => {
        const groupRes = await getStoreData('groups');
        setGroups(groupRes);
        setCurrentGroup(1);
      }
      );
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <button data-testid="delete_group_btn" className="px-2 py-2 bg-red-500 text-sm text-white hover:bg-red-600 focus:ring-2 ring-red-950 rounded-lg" onClick={handleDelete}>
        Delete Current Group {currentGroup}
      </button>
    </>
  )
}

export default DeleteGroupButton