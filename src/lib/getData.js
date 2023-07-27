export const getStoreData = (storeName, id = false) => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('todo');

    request.onerror = () => {
      reject(new Error("Error opening the database."));
    };

    request.onsuccess = () => {
      const db = request.result;
      const tx = db.transaction(storeName, 'readonly');
      const store = tx.objectStore(storeName);

      if (id) {
        const getRequest = store.get(parseInt(id));

        getRequest.onsuccess = () => {
          resolve(getRequest.result);
        };

        getRequest.onerror = () => {
          reject(new Error("Error fetching data by id."));
        };
      } else {
        const getAllRequest = store.getAll();

        getAllRequest.onsuccess = () => {
          resolve(getAllRequest.result);
        };

        getAllRequest.onerror = () => {
          reject(new Error("Error fetching all data."));
        };
      }
    };

    request.onerror = () => {
      reject(new Error("Error opening the database."));
    };
  });
};
