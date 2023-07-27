import AddGroupButton from '../../components/addGroupButton/AddGroupButton'
import { initDB } from '../../lib/databaseConfig'
import { getStoreData } from "../../lib/getData";
import { GroupContext } from '../../context/GroupContext'
import TasksTable from '../../components/tasksTable/TasksTable'
import GroupDropDown from '../../components/groupDropDown/GroupDropDown'
import { useContext, useEffect, useState } from 'react'
import DeleteGroupButton from '../../components/deleteGroupButton/DeleteGroupButton'

const Home = () => {
  const [latest, setLatest] = useState(false);
  const { groups, setGroups, tasks, setTasks } = useContext(GroupContext);

  useEffect(() => {
    try {
      const setDB = async () => {
        await initDB();
      }
      setDB();

      const getData = async (storename) => {
        const res = await getStoreData(storename);
        if (storename === 'groups') {
          setGroups(res);
        } else {
          setTasks(res);
          setLatest(true)
        }
      }

      getData('tasks');
      getData('groups');

    } catch (error) {
      console.error(error);
      setLatest(false);
    }
  }, []);

  return (
    <div className='app'>
      <div className='flex gap-20'>
        <div className="flex-8 flex flex-col gap-5">
          <GroupDropDown groups={groups} />
          <AddGroupButton />
          <DeleteGroupButton />
        </div>
        <div className="tasks flex-1">
          {
            latest &&
            <TasksTable tasks={tasks} />
          }
        </div>
      </div>

    </div>
  )
}

export default Home