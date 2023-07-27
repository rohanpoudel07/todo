import { useContext } from "react"
import { GroupContext } from "../../context/GroupContext"

const GroupDropDown = ({ groups }) => {
  const { setCurrentGroup, currentGroup } = useContext(GroupContext);
  return (
    <select data-testid="groups-dropdown" name="groups" value={currentGroup} onChange={(e) => setCurrentGroup(e.target.value)}>
      {
        groups?.map((group) => (
          <option value={group.group_id} key={group.group_id}>{group.group_name}</option>
        ))
      }
    </select>
  )
}

export default GroupDropDown