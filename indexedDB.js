// Open database
const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = function (event) {
  const db = event.target.result;
  if (!db.objectStoreNames.contains('myObjectStore')) {
    db.createObjectStore('myObjectStore', { keyPath: 'id' });
  }
};

request.onsuccess = function (event) {
  const db = event.target.result;

  // Add data
  let transaction = db.transaction(['myObjectStore'], 'readwrite');
  let objectStore = transaction.objectStore('myObjectStore');
  objectStore.add({ id: 1, name: 'John Doe', email: 'john.doe@example.com' });

  // Retrieve data
  transaction = db.transaction(['myObjectStore'], 'readonly');
  objectStore = transaction.objectStore('myObjectStore');
  const getRequest = objectStore.get(1);

  getRequest.onsuccess = function (event) {
    const data = event.target.result;
    console.log('Retrieved data:', data);

    // Update data
    transaction = db.transaction(['myObjectStore'], 'readwrite');
    objectStore = transaction.objectStore('myObjectStore');
    const updatedData = { id: 1, name: 'John Smith', email: 'john.smith@example.com' };
    objectStore.put(updatedData);

    // Delete data
    const deleteRequest = objectStore.delete(1);
    deleteRequest.onsuccess = function (event) {
      console.log('Data deleted successfully');
    };
  };
};

request.onerror = function (event) {
  console.error('Database error:', event.target.errorCode);
};
