import { createContext, useEffect, useState } from "react";
import { getStoreData } from "../lib/getData";

export const GroupContext = createContext();

export const GroupContextProvider = ({ children }) => {
  const [currentGroup, setCurrentGroup] = useState(1);
  const [tasks, setTasks] = useState([]);
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const getFirst = async () => {
      const res = await getStoreData('groups');
      if (res && res.length > 0) {
        setCurrentGroup(res[0].group_id);
      }
    };
    getFirst();
  }, []);

  return (
    <GroupContext.Provider value={{ currentGroup, setCurrentGroup, tasks, setTasks, groups, setGroups }}>
      {children}
    </GroupContext.Provider>
  )
}