export const addData = (storeName, data) => {
  let request;
  let db;
  let version;
  return new Promise((resolve) => {
    request = indexedDB.open('todo', version);

    request.onsuccess = () => {
      console.log('request.onsuccess - addData', data);
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.add(data);
      resolve(data);
    };

    request.onerror = () => {
      const error = request.error?.message
      if (error) {
        resolve(error);
      } else {
        resolve('Unknown error');
      }
    };
  });
};