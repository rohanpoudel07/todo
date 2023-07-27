export const deleteData = async (storeName, key) => {
  try {
    const db = await new Promise((resolve, reject) => {
      const request = indexedDB.open('todo', 1);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    const tx = db.transaction(['groups', 'tasks'], 'readwrite');
    const store = tx.objectStore(storeName);

    if (storeName === 'groups') {
      const groupRequest = store.get(key);
      const group = await new Promise((resolve, reject) => {
        groupRequest.onsuccess = () => resolve(groupRequest.result);
        groupRequest.onerror = () => reject(groupRequest.error);
      });

      if (!group) {
        console.log('Group not found');
        reject(false);
      }

      const taskStore = tx.objectStore('tasks');
      const index = taskStore.index('group_id');
      const taskRequest = index.getAll(key);

      const tasksToDelete = await new Promise((resolve, reject) => {
        taskRequest.onsuccess = () => resolve(taskRequest.result);
        taskRequest.onerror = () => reject(taskRequest.error);
      });

      const deleteTaskPromises = tasksToDelete.map((task) => {
        return new Promise((resolve, reject) => {
          const deleteRequest = taskStore.delete(task.task_id);
          deleteRequest.onsuccess = () => resolve();
          deleteRequest.onerror = () => reject();
        });
      });

      await Promise.all(deleteTaskPromises);
    }

    const deleteRequest = store.delete(key);
    await new Promise((resolve, reject) => {
      deleteRequest.onsuccess = () => resolve();
      deleteRequest.onerror = () => reject();
    });

    console.log('Deleted Successfully');
    return true;
  } catch (error) {
    console.error('Unable to delete', error);
    return false;
  }
};
