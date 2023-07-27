export const editData = (storeName, data) => {
  let request;
  let db;
  let version;
  return new Promise((resolve) => {
    request = indexedDB.open('todo', version);

    request.onsuccess = () => {
      console.log('request.onsuccess - editData', data);
      db = request.result;
      const tx = db.transaction(storeName, 'readwrite');
      const store = tx.objectStore(storeName);
      store.put(data);
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