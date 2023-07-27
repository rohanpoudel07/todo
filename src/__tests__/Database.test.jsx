import { initDB } from "../lib/databaseConfig"
import { getStoreData } from "../lib/getData"
import { editData } from "../lib/editData"
import { deleteData } from "../lib/deleteData"
import { addData } from "../lib/addData"

describe("Testing Indexed Database CRUD functions", () => {
  const testGroups = {
    group_name: "Group 1"
  }

  const testTasks = {
    title: "Task 1",
    desc: "Task Description",
    status: "pending",
    group_id: 1
  }

  it("Should Create the IndexedDB", async () => {
    await initDB();
  });

  it("Should Post", async () => {
    await addData('groups', { ...testGroups });
    await addData('tasks', { ...testTasks });
  })

  it("Should Retrive", async () => {
    const groupsResponse = await getStoreData("groups");
    const tasksResponse = await getStoreData("tasks");

    expect(groupsResponse).toStrictEqual([{ ...testGroups, group_id: 1 }]);
    expect(tasksResponse).toStrictEqual([{ ...testTasks, task_id: 1 }]);
    expect(groupsResponse).not.toStrictEqual([{ ...testGroups, group_id: 2 }]);
    expect(groupsResponse).not.toStrictEqual([{ ...testTasks, task_id: 4 }]);
  })

  it("Should Edit", async () => {
    const editedTask = {
      task_id: 1,
      title: "Task 1",
      desc: "Task Description",
      status: "completed",
      group_id: 1
    }
    const editedGroup = {
      group_id: 1,
      group_name: "Group 10"
    }

    const editedTaskResponse = await editData("tasks", editedTask);
    const editedGroupResponse = await editData("groups", editedGroup);

    expect(editedTaskResponse).toStrictEqual(editedTask);
    expect(editedGroupResponse).toStrictEqual(editedGroup);
    expect(editedTaskResponse).not.toStrictEqual({ ...editedTask, group_id: 2 });
    expect(editedGroupResponse).not.toStrictEqual({ ...editedGroup, group_name: "Group 11" });

  });

  it("Should Delete", async () => {


    const res = await getStoreData("tasks", 1);

    expect(res).toStrictEqual({
      task_id: 1,
      title: "Task 1",
      desc: "Task Description",
      status: "completed",
      group_id: 1
    });


    const deleteTaskPass = await deleteData("tasks", 1);
    const deleteGroupPass = await deleteData("groups", 1);

    expect(deleteTaskPass).toBe(true);
    expect(deleteGroupPass).toBe(true);

    try {
      const res = await getStoreData("groups", 1);
    } catch (error) {
      expect(error).toBeDefined();
    }

  })


});
