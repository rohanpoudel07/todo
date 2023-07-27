export const initDB = () => {
  let request;
  let db;
  let version;
  return new Promise((resolve) => {
    request = indexedDB.open('todo');

    request.onupgradeneeded = () => {
      db = request.result;

      if (!db.objectStoreNames.contains("tasks")) {
        console.log('Creating tasks store');
        const tasksStore = db.createObjectStore('tasks', { keyPath: 'task_id', autoIncrement: true });
        tasksStore.createIndex('group_id', 'group_id', { unique: false });
      }

      if (!db.objectStoreNames.contains("groups")) {
        console.log('Creating groups store');
        db.createObjectStore('groups', { keyPath: 'group_id', autoIncrement: true });
      }
    };

    request.onsuccess = () => {
      db = request.result;
      version = db.version;

      console.log('request.onsuccess - initDB', version);
      resolve(true);
    };

    request.onerror = () => {
      resolve(false);
    };
  });
};